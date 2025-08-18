import React from 'react'
import Navbar from '../components/Navbar'

export default function AdminDashboard() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 p-6 grid gap-4 md:grid-cols-3">
        <section className="bg-white rounded-2xl shadow-soft p-6 md:col-span-2">
          <h3 className="text-lg font-semibold mb-2">Admin Overview 🛡️</h3>
          <p className="text-gray-600">Only admins can see this page. Update the widgets to fit your needs.</p>
        </section>
        <section className="bg-white rounded-2xl shadow-soft p-6">
          <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
          <ul className="list-disc pl-5 text-gray-600 space-y-1">
            <li>Invite new member</li>
            <li>Create project</li>
            <li>Review tasks</li>
          </ul>
        </section>
      </main>
    </div>
  )
}
