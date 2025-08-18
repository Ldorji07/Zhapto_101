import React from 'react'
import Navbar from '../components/Navbar'

export default function UserDashboard() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 p-6 grid gap-4 md:grid-cols-2">
        <section className="bg-white rounded-2xl shadow-soft p-6">
          <h3 className="text-lg font-semibold mb-2">Welcome, User 👋</h3>
          <p className="text-gray-600">This is a placeholder user dashboard. Protects with role-based routing.</p>
        </section>
        <section className="bg-white rounded-2xl shadow-soft p-6">
          <h3 className="text-lg font-semibold mb-2">Upcoming</h3>
          <div className="h-24 rounded-xl bg-gradient-to-r from-gray-50 to-yellow-50 border"></div>
        </section>
      </main>
    </div>
  )
}
