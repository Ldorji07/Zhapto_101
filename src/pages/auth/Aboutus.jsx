import React from 'react'
import Navbar from '../../components/Navbar'
import { motion } from 'framer-motion'

const team = [
  { name: 'Hari Prasad Kafley', role: 'Founder', bio: 'Visionary behind the Bhutan Digital Initiative.', image: '/images/team1.jpg' },
  { name: 'Lhundup Dorji', role: 'Frontend Deplover', bio: 'Crafts intuitive experiences rooted in Bhutanese aesthetics.', image: '/images/team2.jpg' },
  { name: 'Sherab Nima Rigzin', role: 'Backend Deplover', bio: 'Builds scalable systems with precision and integrity.', image: '/images/team3.jpg' },
]

export default function Aboutus() {
  return (
    <div className="bg-gray-50 font-sans text-gray-800">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-yellow-300 via-pink-200 to-pink-300 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-32 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-extrabold text-purple-700 mb-6"
          >
            About Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-lg md:text-xl max-w-3xl mx-auto mb-8"
          >
            Discover Bhutanese culture through our unique blend of modern digital experiences and traditional heritage.
          </motion.p>
          <motion.a
            href="#team"
            className="inline-block px-8 py-4 bg-purple-600 text-white rounded-full font-medium shadow-lg hover:bg-purple-700 transition"
          >
            Meet Our Team
          </motion.a>
        </div>
        {/* Decorative Shapes */}
        <div className="absolute -bottom-10 -left-20 w-96 h-96 bg-purple-200 rounded-full opacity-50 animate-pulse"></div>
        <div className="absolute -top-20 -right-16 w-72 h-72 bg-yellow-200 rounded-full opacity-50 animate-pulse"></div>
      </section>

      {/* Story Sections */}
      <section className="max-w-6xl mx-auto px-6 py-20 space-y-20">
        {[
          { title: 'Our Story', text: 'Inspired by Bhutanese traditions, we blend modern tech with mindful, community-oriented culture.', image: '/images/story.jpg' },
          { title: 'Our Mission', text: 'Delivering a platform that empowers users while honoring Bhutanese heritage.', image: '/images/mission.jpg' },
          { title: 'Our Vision', text: 'Bridge tradition and technology, creating meaningful digital experiences for all.', image: '/images/vision.jpg' },
        ].map((section, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`flex flex-col md:flex-row items-center gap-10 bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition duration-300 ${
              i % 2 === 1 ? 'md:flex-row-reverse' : ''
            }`}
          >
            <img
              src={section.image}
              alt={section.title}
              className="md:w-1/2 w-full h-64 md:h-80 object-cover rounded-2xl shadow-md"
            />
            <div className="md:w-1/2">
              <h2 className="text-3xl font-semibold text-purple-700 mb-3">{section.title}</h2>
              <p className="text-gray-700 text-lg leading-relaxed">{section.text}</p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Team Section */}
      <section id="team" className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center text-purple-700 mb-12">Meet the Team</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl shadow-lg p-8 text-center hover:shadow-2xl hover:-translate-y-2 transition duration-300"
            >
              <div className="w-28 h-28 mx-auto mb-4">
                <img src={member.image} alt={member.name} className="rounded-full w-full h-full object-cover border-4 border-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-purple-700 mb-1">{member.name}</h3>
              <p className="text-purple-500 mb-2">{member.role}</p>
              <p className="text-gray-700">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-10 text-center border-t border-gray-200">
        <p>© 2025 Bhutan Digital Initiative. All rights reserved.</p>
        <p className="mt-2 text-purple-700 italic">“Preserving heritage through innovation.”</p>
      </footer>
    </div>
  )
}
