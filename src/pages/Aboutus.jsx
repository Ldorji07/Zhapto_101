import React from 'react'
import Navbar from '../components/Navbar'
import { motion } from 'framer-motion'

const team = [
  {
    name: 'Tashi Dorji',
    role: 'Founder',
    bio: 'Visionary behind the Bhutan Digital Initiative. Leads with purpose and cultural pride.',
  },
  {
    name: 'Sonam Choden',
    role: 'UX Designer',
    bio: 'Crafts intuitive experiences rooted in Bhutanese aesthetics and user empathy.',
  },
  {
    name: 'Karma Wangchuk',
    role: 'Backend Engineer',
    bio: 'Builds scalable systems with precision and a deep respect for data integrity.',
  },
]

export default function Aboutus() {
  return (
    <div className="bg-[#FFF8E7] text-gray-800 font-sans">
      <Navbar />

      {/* Hero */}
      <section className="px-6 py-24 text-center bg-gradient-to-br from-[#FDE68A] via-[#FFD27F] to-[#FCA5A5] rounded-b-[3rem] shadow-md">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-semibold text-[#B45309] mb-4"
        >
          About Us
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-base max-w-2xl mx-auto text-[#4B5563]"
        >
          Discover Bhutanese culture through our unique blend of modern digital experiences and traditional heritage.
        </motion.p>
      </section>

      {/* Story Sections */}
      <section className="max-w-5xl mx-auto px-6 py-16 space-y-24">
        {[
          {
            title: 'Our Story',
            text: 'Inspired by Bhutanese traditions, we blend modern tech with mindful, community-oriented culture.',
            image: '/images/story.jpg',
          },
          {
            title: 'Our Mission',
            text: 'Delivering a platform that empowers users while honoring Bhutanese heritage.',
            image: '/images/mission.jpg',
          },
          {
            title: 'Our Vision',
            text: 'Bridge tradition and technology, creating meaningful digital experiences for all.',
            image: '/images/vision.jpg',
          },
        ].map((section, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`flex flex-col md:flex-row items-center gap-10 ${
              i % 2 === 1 ? 'md:flex-row-reverse' : ''
            }`}
          >
            <div className="md:w-1/2">
              <img
                src={section.image}
                alt={section.title}
                className="rounded-xl shadow-lg w-full h-64 object-cover"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-xl font-medium text-[#7C3AED] mb-3">{section.title}</h2>
              <p className="text-sm text-gray-700 leading-relaxed">{section.text}</p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Team Section */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-lg font-semibold text-[#B45309] mb-8 text-center">Meet the Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-base font-semibold text-[#7C3AED] mb-1">{member.name}</h3>
              <p className="text-sm text-[#B45309] mb-2">{member.role}</p>
              <p className="text-sm text-gray-700">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-10 text-sm text-gray-600 bg-[#FFF8E7] border-t border-gray-300">
        <p>© 2025 Bhutan Digital Initiative. All rights reserved.</p>
        <p className="mt-2 italic text-[#B45309]">“Preserving heritage through innovation.”</p>
      </footer>
    </div>
  )
}
