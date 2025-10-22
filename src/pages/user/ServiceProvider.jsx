import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import Layout from "../../components/Layout";
import { useServiceProvider } from "../../context/ServiceProviderContext";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

// Constants
const SERVICE_OPTIONS = [
  "Plumber",
  "House Cleaner",
  "Electrician",
  "Painter",
  "House Shifter",
  "Carpenter",
];

const DZONGKHAG_OPTIONS = [
  { value: "Thimphu", label: "Thimphu" },
  { value: "Paro", label: "Paro" },
  { value: "Punakha", label: "Punakha" },
  { value: "Wangdue Phodrang", label: "Wangdue Phodrang" },
  { value: "Bumthang", label: "Bumthang" },
  { value: "Trongsa", label: "Trongsa" },
  { value: "Zhemgang", label: "Zhemgang" },
  { value: "Mongar", label: "Mongar" },
  { value: "Trashigang", label: "Trashigang" },
  { value: "Samdrup Jongkhar", label: "Samdrup Jongkhar" },
  { value: "Pemagatshel", label: "Pemagatshel" },
  { value: "Samtse", label: "Samtse" },
  { value: "Chukha", label: "Chukha" },
  { value: "Haa", label: "Haa" },
  { value: "Gasa", label: "Gasa" },
  { value: "Trashi Yangtse", label: "Trashi Yangtse" },
  { value: "Dagana", label: "Dagana" },
  { value: "Tsirang", label: "Tsirang" },
  { value: "Sarpang", label: "Sarpang" },
  { value: "Lhuentse", label: "Lhuentse" },
];

const CITY_OPTIONS = {
  Thimphu: ["Thimphu City", "Babesa", "Changzamtog"],
  Paro: ["Paro Town", "Shaba", "Dopshari"],
  Punakha: ["Punakha Town", "Lobesa", "Wangdue"],
  "Wangdue Phodrang": ["Wangdue Town", "Rinchengang", "Sephu"],
  Bumthang: ["Jakar", "Chumey", "Tang"],
  Trongsa: ["Trongsa Town", "Nubi", "Langthel"],
  Zhemgang: ["Zhemgang Town", "Panbang", "Ngangla"],
  Mongar: ["Mongar Town", "Sengor", "Drepong"],
  Trashigang: ["Trashigang Town", "Rangjung", "Samkhar"],
  "Samdrup Jongkhar": ["Samdrup Jongkhar Town", "Deothang", "Orong"],
  Pemagatshel: ["Pemagatshel Town", "Shumar", "Norbugang"],
  Samtse: ["Samtse Town", "Dophuchen", "Tendu"],
  Chukha: ["Phuentsholing", "Gedu", "Tsimakha"],
  Haa: ["Haa Town", "Katsho", "Sombaykha"],
  Gasa: ["Gasa Town", "Laya", "Lunana"],
  "Trashi Yangtse": ["Trashi Yangtse Town", "Bumdeling", "Jamkhar"],
  Dagana: ["Dagapela", "Tsirang", "Kana"],
  Tsirang: ["Damphu", "Gewog", "Rangthangling"],
  Sarpang: ["Gelephu", "Sarpang", "Chuzagang"],
  Lhuentse: ["Lhuentse Town", "Kurtoe", "Menchari"],
};

const PRICING_TYPES = {
  HOUR: "hr",
  JOB: "onejob",
};

const STATUS = {
  NOT_REGISTERED: "not_registered",
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
};

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "application/pdf",
];

export default function ServiceProvider() {
  const { registerProvider } = useServiceProvider();
  const { user } = useUser();
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const initialForm = {
    dzongkhag: "",
    city: "",
    category: [],
    cid: user?.cid || "",
    pricing: "",
    certificates: [],
    status: STATUS.NOT_REGISTERED,
  };

  const [form, setForm] = useState(initialForm);
  const [pricingType, setPricingType] = useState("");
  const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Validation functions
  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!form.dzongkhag) {
      newErrors.dzongkhag = "Please select a dzongkhag";
    }

    if (!form.city) {
      newErrors.city = "Please select a city";
    }

    if (form.category.length === 0) {
      newErrors.category = "Please select at least one service category";
    }

    if (!form.cid || form.cid.length < 11) {
      newErrors.cid = "Please enter a valid 11-digit CID";
    }

    if (!pricingType) {
      newErrors.pricingType = "Please select a pricing type";
    }

    if (!form.pricing || form.pricing <= 0) {
      newErrors.pricing = "Please enter a valid pricing amount";
    }

    if (form.certificates.length === 0) {
      newErrors.certificates = "Please upload at least one certificate";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [form, pricingType]);

  const validateFile = useCallback((file) => {
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return `File type ${file.type} is not allowed. Please upload JPG, PNG, or PDF files.`;
    }

    if (file.size > MAX_FILE_SIZE) {
      return `File size must be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB`;
    }

    return null;
  }, []);

  // Memoized city options based on selected dzongkhag
  const availableCities = useMemo(() => {
    return CITY_OPTIONS[form.dzongkhag] || [];
  }, [form.dzongkhag]);

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setForm((f) => ({ ...f, [name]: value }));

      // Clear city when dzongkhag changes
      if (name === "dzongkhag") {
        setForm((f) => ({ ...f, city: "" }));
      }

      // Clear errors when user starts typing
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    },
    [errors]
  );

  const handleFileSelect = useCallback(
    (e) => {
      const files = Array.from(e.target.files);
      const validFiles = [];
      const fileErrors = [];

      files.forEach((file) => {
        const error = validateFile(file);
        if (error) {
          fileErrors.push(`${file.name}: ${error}`);
        } else {
          validFiles.push(file);
        }
      });

      if (fileErrors.length > 0) {
        setErrors((prev) => ({ ...prev, certificates: fileErrors.join(", ") }));
      } else {
        setForm((f) => ({
          ...f,
          certificates: [...f.certificates, ...validFiles],
        }));
        setErrors((prev) => ({ ...prev, certificates: "" }));
      }
    },
    [validateFile]
  );

  const handleAddServiceCategory = useCallback(
    (service) => {
      if (!form.category.includes(service)) {
        setForm((f) => ({ ...f, category: [...f.category, service] }));
        setErrors((prev) => ({ ...prev, category: "" }));
      }
      setServiceDropdownOpen(false);
    },
    [form.category]
  );

  const handleRemoveServiceCategory = useCallback((service) => {
    setForm((f) => ({
      ...f,
      category: f.category.filter((s) => s !== service),
    }));
  }, []);

  const handlePricingTypeChange = useCallback((type) => {
    setPricingType((prev) => (prev === type ? "" : type));
    setForm((f) => ({ ...f, pricing: "" }));
    setErrors((prev) => ({ ...prev, pricingType: "", pricing: "" }));
  }, []);

  const handleRegister = useCallback(
    async (e) => {
      e.preventDefault();

      if (!validateForm()) return;

      setIsSubmitting(true);
      setIsLoading(true);

      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("User is not authenticated.");

        // Debug: log token before sending
        console.log("JWT token being sent:", token);

        const formData = new FormData();
        formData.append("dzongkhag", form.dzongkhag);
        formData.append("city", form.city);
        formData.append("cid", form.cid);
        formData.append("pricing", form.pricing);
        formData.append("pricingType", pricingType);

        // Send each category individually
        form.category.forEach((c) => formData.append("category", c));

        // Append files
        form.certificates.forEach((file) => formData.append("files", file));

        // Debug: Check formData entries
        // for (let pair of formData.entries()) console.log(pair[0], pair[1]);

        const res = await fetch(
          `http://localhost:8080/api/providers/register`,
          {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
          }
        );

        if (!res.ok) {
          let msg = `Error ${res.status}`;
          try {
            const j = await res.json();
            msg += j.message || j.error || "";
          } catch {
            const text = await res.text().catch(() => "");
            if (text) msg += `: ${text}`;
          }
          throw new Error(msg);
        }

        setForm((f) => ({ ...f, status: STATUS.PENDING }));
        alert(
          "Registration submitted successfully! Please wait for admin approval."
        );
      } catch (error) {
        console.error("Registration failed:", error);
        alert(
          "Registration failed: " + (error?.message || "Please try again.")
        );
        setForm((f) => ({ ...f, status: STATUS.NOT_REGISTERED }));
      } finally {
        setIsSubmitting(false);
        setIsLoading(false);
      }
    },
    [form, pricingType, validateForm, user]
  );

  const handleCancel = useCallback(() => {
    if (window.confirm("Are you sure you want to cancel your registration?")) {
      setForm(initialForm);
      setPricingType("");
      setErrors({});
      setServiceDropdownOpen(false);
      alert("Your registration has been cancelled. You can register again.");
    }
  }, [initialForm]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (serviceDropdownOpen && !event.target.closest(".service-dropdown")) {
        setServiceDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [serviceDropdownOpen]);

  // Redirect if approved
  useEffect(() => {
    if (form.status === STATUS.APPROVED) {
      navigate("/provider/dashboard");
    }
  }, [form.status, navigate]);

  // Loading state
  if (isLoading) {
    return (
      <Layout pageTitle="Service Provider Registration">
        <div className="flex items-center justify-center min-h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout pageTitle="Service Provider Registration">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl p-8 space-y-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Service Provider Registration
            </h1>
            <p className="text-gray-600">
              Join our platform and start providing services to customers
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            {/* Location */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Location Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dzongkhag <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="dzongkhag"
                    value={form.dzongkhag}
                    onChange={handleChange}
                    className={`w-full border rounded-lg px-4 py-3 text-sm transition-colors focus:ring-2 focus:ring-yellow-400 focus:outline-none ${
                      errors.dzongkhag
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    required
                    disabled={form.status !== STATUS.NOT_REGISTERED}
                    aria-describedby={
                      errors.dzongkhag ? "dzongkhag-error" : undefined
                    }
                  >
                    <option value="">Select Dzongkhag</option>
                    {DZONGKHAG_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.dzongkhag && (
                    <p
                      id="dzongkhag-error"
                      className="mt-1 text-sm text-red-600"
                    >
                      {errors.dzongkhag}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    className={`w-full border rounded-lg px-4 py-3 text-sm transition-colors focus:ring-2 focus:ring-yellow-400 focus:outline-none ${
                      errors.city
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    required
                    disabled={
                      form.status !== STATUS.NOT_REGISTERED || !form.dzongkhag
                    }
                    aria-describedby={errors.city ? "city-error" : undefined}
                  >
                    <option value="">Select City</option>
                    {availableCities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  {errors.city && (
                    <p id="city-error" className="mt-1 text-sm text-red-600">
                      {errors.city}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Service Category */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Service Categories
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Services <span className="text-red-500">*</span>
                </label>

                {form.status === STATUS.NOT_REGISTERED && (
                  <div className="relative inline-block service-dropdown">
                    <button
                      type="button"
                      className={`border rounded-lg px-4 py-3 bg-white shadow-sm flex items-center justify-between min-w-48 transition-colors hover:border-gray-400 ${
                        errors.category
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300"
                      }`}
                      onClick={() => setServiceDropdownOpen((s) => !s)}
                      aria-expanded={serviceDropdownOpen}
                      aria-haspopup="listbox"
                    >
                      <span className="text-sm">
                        {form.category.length === 0
                          ? "Select services"
                          : "Add more services"}
                      </span>
                      <svg
                        className={`w-4 h-4 text-gray-400 transition-transform ${
                          serviceDropdownOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {serviceDropdownOpen && (
                      <div className="absolute z-20 left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-64 max-h-60 overflow-y-auto">
                        {SERVICE_OPTIONS.filter(
                          (opt) => !form.category.includes(opt)
                        ).map((opt) => (
                          <button
                            type="button"
                            key={opt}
                            className="block w-full text-left px-4 py-3 text-sm hover:bg-yellow-50 hover:text-yellow-700 transition-colors"
                            onClick={() => handleAddServiceCategory(opt)}
                          >
                            {opt}
                          </button>
                        ))}
                        {SERVICE_OPTIONS.filter(
                          (opt) => !form.category.includes(opt)
                        ).length === 0 && (
                          <div className="px-4 py-3 text-sm text-gray-500">
                            All services selected
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                <div className="flex flex-wrap mt-3 gap-2">
                  {form.category.map((service) => (
                    <span
                      key={service}
                      className="inline-flex items-center border border-gray-200 rounded-full px-4 py-2 bg-yellow-50 text-yellow-800 text-sm font-medium"
                    >
                      {service}
                      {form.status === STATUS.NOT_REGISTERED && (
                        <button
                          type="button"
                          className="ml-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                          onClick={() => handleRemoveServiceCategory(service)}
                          aria-label={`Remove ${service}`}
                        >
                          ×
                        </button>
                      )}
                    </span>
                  ))}
                </div>

                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                )}
              </div>
            </div>

            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Personal Information
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Citizen ID (CID) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="cid"
                  value={form.cid}
                  onChange={handleChange}
                  className={`w-full border rounded-lg px-4 py-3 text-sm transition-colors focus:ring-2 focus:ring-yellow-400 focus:outline-none ${
                    errors.cid
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  placeholder="Enter your 11-digit CID"
                  maxLength={11}
                  required
                  disabled={form.status !== STATUS.NOT_REGISTERED}
                  aria-describedby={errors.cid ? "cid-error" : undefined}
                />
                {errors.cid && (
                  <p id="cid-error" className="mt-1 text-sm text-red-600">
                    {errors.cid}
                  </p>
                )}
              </div>
            </div>

            {/* Certificates */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Certificates & Documents
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Certificates <span className="text-red-500">*</span>
                </label>

                <div className="space-y-3">
                  {form.status === STATUS.NOT_REGISTERED && (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-yellow-400 hover:bg-yellow-50 transition-colors"
                    >
                      <div className="flex flex-col items-center">
                        <svg
                          className="w-12 h-12 text-gray-400 mb-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <p className="text-sm text-gray-600 mb-1">
                          Click to upload certificates
                        </p>
                        <p className="text-xs text-gray-500">
                          JPG, PNG, PDF (Max 5MB each)
                        </p>
                      </div>
                    </div>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".jpg,.jpeg,.png,.pdf"
                    className="hidden"
                    onChange={handleFileSelect}
                    disabled={form.status !== STATUS.NOT_REGISTERED}
                  />

                  {form.certificates.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">
                        Uploaded Files ({form.certificates.length})
                      </p>
                      <div className="space-y-1">
                        {form.certificates.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2"
                          >
                            <div className="flex items-center space-x-2">
                              <svg
                                className="w-4 h-4 text-gray-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                              </svg>
                              <span className="text-sm text-gray-700 truncate">
                                {file.name}
                              </span>
                              <span className="text-xs text-gray-500">
                                ({(file.size / (1024 * 1024)).toFixed(1)}MB)
                              </span>
                            </div>
                            {form.status === STATUS.NOT_REGISTERED && (
                              <button
                                type="button"
                                onClick={() => {
                                  setForm((f) => ({
                                    ...f,
                                    certificates: f.certificates.filter(
                                      (_, i) => i !== index
                                    ),
                                  }));
                                }}
                                className="text-red-500 hover:text-red-700 p-1"
                                aria-label={`Remove ${file.name}`}
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {errors.certificates && (
                    <p className="text-sm text-red-600">
                      {errors.certificates}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Pricing Information
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Pricing Type <span className="text-red-500">*</span>
                </label>

                <div className="flex gap-3 mb-4">
                  <button
                    type="button"
                    disabled={form.status !== STATUS.NOT_REGISTERED}
                    className={`px-4 py-3 rounded-lg border-2 transition-all ${
                      pricingType === PRICING_TYPES.HOUR
                        ? "border-yellow-400 bg-yellow-50 text-yellow-700"
                        : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                    } ${
                      form.status !== STATUS.NOT_REGISTERED
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    onClick={() => handlePricingTypeChange(PRICING_TYPES.HOUR)}
                  >
                    <div className="flex items-center space-x-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="font-medium">Per Hour</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    disabled={form.status !== STATUS.NOT_REGISTERED}
                    className={`px-4 py-3 rounded-lg border-2 transition-all ${
                      pricingType === PRICING_TYPES.JOB
                        ? "border-yellow-400 bg-yellow-50 text-yellow-700"
                        : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                    } ${
                      form.status !== STATUS.NOT_REGISTERED
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    onClick={() => handlePricingTypeChange(PRICING_TYPES.JOB)}
                  >
                    <div className="flex items-center space-x-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <span className="font-medium">Per Job</span>
                    </div>
                  </button>
                </div>

                {errors.pricingType && (
                  <p className="text-sm text-red-600 mb-3">
                    {errors.pricingType}
                  </p>
                )}

                {pricingType && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 text-sm">Nu.</span>
                      </div>
                      <input
                        type="number"
                        name="pricing"
                        value={form.pricing}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg text-sm transition-colors focus:ring-2 focus:ring-yellow-400 focus:outline-none ${
                          errors.pricing
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                        placeholder={`Enter amount (${
                          pricingType === PRICING_TYPES.HOUR
                            ? "per hour"
                            : "per job"
                        })`}
                        min="0"
                        step="0.01"
                        required
                        disabled={form.status !== STATUS.NOT_REGISTERED}
                        aria-describedby={
                          errors.pricing ? "pricing-error" : undefined
                        }
                      />
                    </div>
                    {errors.pricing && (
                      <p
                        id="pricing-error"
                        className="mt-1 text-sm text-red-600"
                      >
                        {errors.pricing}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 border-t border-gray-200">
              {form.status === STATUS.NOT_REGISTERED && (
                <div className="space-y-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-4 rounded-lg font-semibold hover:from-yellow-600 hover:to-yellow-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>Submit Registration</span>
                      </>
                    )}
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    By submitting, you agree to our terms and conditions. Your
                    registration will be reviewed by our admin team.
                  </p>
                </div>
              )}

              {form.status === STATUS.PENDING && (
                <div className="text-center space-y-4">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <div className="flex items-center justify-center mb-3">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
                    </div>
                    <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                      Registration Pending
                    </h3>
                    <p className="text-yellow-700 text-sm">
                      Your registration is being reviewed by our admin team. You
                      will be notified once approved.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors font-medium"
                  >
                    Cancel Registration
                  </button>
                </div>
              )}

              {form.status === STATUS.APPROVED && (
                <div className="text-center space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <div className="flex items-center justify-center mb-3">
                      <svg
                        className="w-8 h-8 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-green-800 mb-2">
                      Registration Approved!
                    </h3>
                    <p className="text-green-700 text-sm">
                      Congratulations! Your registration has been approved. You
                      can now start providing services.
                    </p>
                  </div>
                </div>
              )}

              {form.status === STATUS.REJECTED && (
                <div className="text-center space-y-4">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <div className="flex items-center justify-center mb-3">
                      <svg
                        className="w-8 h-8 text-red-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-red-800 mb-2">
                      Registration Rejected
                    </h3>
                    <p className="text-red-700 text-sm">
                      Your registration was not approved. Please contact support
                      for more information.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setForm(initialForm);
                      setPricingType("");
                      setErrors({});
                    }}
                    className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors font-medium"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
