import React, { useState } from "react";
import Layout from "../../components/Layout";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { DollarSign, Users, Briefcase } from "lucide-react";

export default function AdminReports() {
  const [registrationData] = useState([
    { day: "Mon", registrations: 5 },
    { day: "Tue", registrations: 12 },
    { day: "Wed", registrations: 8 },
    { day: "Thu", registrations: 20 },
    { day: "Fri", registrations: 15 },
    { day: "Sat", registrations: 10 },
    { day: "Sun", registrations: 18 },
  ]);

  const [bookingBreakdown] = useState([
    { name: "Approved", value: 8 },
    { name: "Pending", value: 4 },
    { name: "Rejected", value: 2 },
  ]);

  const [serviceData] = useState([
    { service: "Plumber", count: 12 },
    { service: "Electrician", count: 8 },
    { service: "Painter", count: 5 },
    { service: "House Cleaner", count: 7 },
  ]);

  const COLORS = ["#22c55e", "#facc15", "#ef4444"];
  const totalRevenue = registrationData.reduce((sum, d) => sum + d.registrations * 50, 0);
  const totalCustomers = 50;
  const totalServices = serviceData.reduce((sum, d) => sum + d.count, 0);

  return (
    <Layout pageTitle="Reports & Analytics" role="admin">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {[
          { icon: DollarSign, title: "Total Revenue", value: `$${totalRevenue}`, color: "bg-green-50", textColor: "text-green-600" },
          { icon: Users, title: "Total Customers", value: totalCustomers, color: "bg-blue-50", textColor: "text-blue-600" },
          { icon: Briefcase, title: "Total Services", value: totalServices, color: "bg-yellow-50", textColor: "text-yellow-600" },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className={`p-6 rounded-xl shadow hover:shadow-xl transition flex items-center gap-4 ${stat.color}`}
            >
              <Icon className={`w-10 h-10 ${stat.textColor}`} />
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <h2 className="text-2xl font-bold text-gray-800">{stat.value}</h2>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Registrations */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">User Registrations</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={registrationData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="registrations" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Bookings Breakdown */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Bookings Breakdown</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={bookingBreakdown}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {bookingBreakdown.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Most Used Services */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition md:col-span-2">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Most Used Services</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={serviceData}>
              <XAxis dataKey="service" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#FACC15" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Layout>
  );
}
