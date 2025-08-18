import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function UserDashboard() {
  const navigate = useNavigate()

  const services = [
    {
      name: 'Plumber',
      path: '/certified/plumber',
      img: '/WhatsApp Image 2025-08-18 at 15.40.45 (1).jpeg',
    },
    {
      name: 'Electrician',
      path: '/certified/electrician',
      img: '/WhatsApp Image 2025-08-18 at 15.40.45.jpeg',
    },
    {
      name: 'Carpenter',
      path: '/certified/carpenter',
      img: '/WhatsApp Image 2025-08-18 at 15.40.44 (3).jpeg',
    },
    {
      name: 'Painter',
      path: '/certified/painter',
      img: '/WhatsApp Image 2025-08-18 at 15.40.44 (1).jpeg',
    },
    {
      name: 'House Shifter',
      path: '/certified/house-shifter',
      img: '/WhatsApp Image 2025-08-18 at 15.40.44 (2).jpeg',
    },
    {
      name: 'House Cleaner',
      path: '/certified/house-cleaner',
      img: '/WhatsApp Image 2025-08-18 at 15.40.44.jpeg',
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 p-6 grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {/* Welcome & Services Section */}
        <section className="bg-white rounded-2xl shadow-soft p-6">
          <h3 className="text-lg font-semibold mb-4">Welcome, User 👋</h3>
          <p className="text-gray-600 mb-6">
            This is a placeholder user dashboard. Protected with role-based routing.
          </p>

          <h4 className="text-md font-semibold mb-3">Type of Services</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.name}
                onClick={() => navigate(service.path)}
                className="bg-white rounded-xl shadow-lg p-6 h-48 flex flex-col items-center justify-center cursor-pointer transition-transform transform hover:scale-105 hover:shadow-xl hover:bg-gradient-to-r hover:from-red-400 hover:via-yellow-400 hover:to-orange-400"
              >
                <img
                  src={service.img}
                  alt={`${service.name} icon`}
                  className="w-20 h-20 object-cover mb-4 rounded-full border-2 border-yellow-300 bg-gray-100"
                />
                <span className="font-semibold text-center text-base text-gray-800">{service.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming Section */}
        <section className="bg-white rounded-2xl shadow-soft p-6">
          <h3 className="text-lg font-semibold mb-2">Upcoming</h3>
          <div className="h-24 rounded-xl bg-gradient-to-r from-gray-50 to-yellow-50 border"></div>
        </section>
      </main>
    </div>
  )
}
