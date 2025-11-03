import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";

export default function UserDashboard({ preLogin }) {
  const navigate = useNavigate();

  // ✅ Always navigate to listing pages, unless preLogin is true
  const services = [
    { name: "Plumber", path: "/certified/plumber", img: "Gemini_Generated_Image_om2prfom2prfom2p.png" },
    { name: "Electrician", path: "/certified/electrician", img: "Gemini_Generated_Image_vga0krvga0krvga0.png" },
    { name: "Carpenter", path: "/certified/carpenter", img: "Gemini_Generated_Image_dtd0cgdtd0cgdtd0.png" },
    { name: "Painter", path: "/certified/painter", img: "Gemini_Generated_Image_o6aob4o6aob4o6ao.png" },
    { name: "House Shifter", path: "/certified/house-shifter", img: "Gemini_Generated_Image_tn5sdatn5sdatn5s.png" },
    { name: "House Cleaner", path: "/certified/house-cleaner", img: "Gemini_Generated_Image_ai3aroai3aroai3a.png" },
  ];

  const containerClass = preLogin ? "pt-24 max-w-7xl mx-auto px-6" : "";

  const content = (
    <section className={`grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${preLogin ? "" : "pt-10"}`}>
      {services.map((service) => (
        <div
          key={service.name}
          onClick={() => navigate(preLogin ? "/signin" : service.path)} // ✅ Redirect to signin if preLogin
          className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center cursor-pointer transition-all transform hover:scale-105 hover:shadow-xl hover:bg-gradient-to-r hover:from-yellow-400 hover:via-orange-300 hover:to-red-400 group"
        >
          <div className="w-24 h-24 mb-4 rounded-full overflow-hidden border-4 border-yellow-300 bg-gray-100 transition group-hover:scale-110 shadow-sm">
            <img
              src={service.img}
              alt={service.name}
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-white tracking-wide">
            {service.name}
          </h3>
          <p className="text-sm text-gray-500 text-center mt-2 group-hover:text-white">
            Certified {service.name} professionals available.
          </p>
        </div>
      ))}
    </section>
  );

  return preLogin ? (
    <div className={containerClass}>
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-yellow-700 tracking-tight">Welcome to Zhapto</h1>
        <p className="text-gray-600 mt-3 text-lg">
          Trusted services across Bhutan, delivered with heart and heritage.
        </p>
      </header>
      {content}
    </div>
  ) : (
    <Layout pageTitle="Zhapto Portal">{content}</Layout>
  );
}
