import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

export default function UserDashboard() {
  const navigate = useNavigate();

  const services = [
    { name: "Plumber", path: "/certified/plumber", img: "/service-plumber.jpg" },
    { name: "Electrician", path: "/certified/electrician", img: "/service-electrician.jpg" },
    { name: "Carpenter", path: "/certified/carpenter", img: "/service-carpenter.jpg" },
    { name: "Painter", path: "/certified/painter", img: "/service-painter.jpg" },
    { name: "House Shifter", path: "/certified/house-shifter", img: "/service-house-shifter.jpg" },
    { name: "House Cleaner", path: "/certified/house-cleaner", img: "/service-house-cleaner.jpg" },
  ];

  return (
    <Layout pageTitle="Zhapto Portal">
      <section className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <div
            key={service.name}
            onClick={() => navigate(service.path)}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center cursor-pointer transition-all transform hover:scale-105 hover:shadow-xl hover:bg-gradient-to-r hover:from-yellow-400 hover:via-orange-300 hover:to-red-400 group"
          >
            <img
              src={service.img}
              alt={service.name}
              className="w-20 h-20 object-cover mb-4 rounded-full border-2 border-yellow-300 bg-gray-100 transition group-hover:scale-110"
            />
            <h3 className="font-semibold text-gray-800 group-hover:text-white">{service.name}</h3>
            <p className="text-sm text-gray-500 text-center mt-2 group-hover:text-white">
              Certified {service.name} professionals available.
            </p>
          </div>
        ))}
      </section>
    </Layout>
  );
}
