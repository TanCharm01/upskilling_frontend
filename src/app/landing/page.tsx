'use client';

import { useState } from 'react';

export default function LandingPage() {
  const courses = [
    { id: 1, title: "Building a Growth Mindset", author: "Marcus John", description: "Develop resilient thinking for success." },
    { id: 2, title: "Effective Communication", author: "Jane Doe", description: "Enhance your speaking and listening skills." },
    { id: 3, title: "Intro to Digital Skills", author: "Kwame Adu", description: "Master essential computer and tech skills." },
    { id: 4, title: "Career Planning", author: "Ama Serwaa", description: "Design your personal path to success." },
    { id: 5, title: "Critical Thinking", author: "Tariro M.", description: "Train your brain to think better and faster." },
    { id: 6, title: "Teamwork & Collaboration", author: "Lerato M.", description: "Learn how to work well with others." },
  ];

  const students = [
    { id: 1, name: "Marcus John", quote: "This platform changed my life and career." },
    { id: 2, name: "Marcus John", quote: "Now I work in tech, all thanks to Uncommon." },
    { id: 3, name: "Marcus John", quote: "The mentorship and courses were a game changer." },
  ];

  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 shadow">
        <h1 className="text-xl font-bold text-blue-700">uncommon</h1>
        <ul className="flex gap-6 text-sm font-medium">
          <li><a href="/home" className="hover:text-blue-600">Home</a></li>
          <li><a href="/courses" className="hover:text-blue-600">Courses</a></li>
          <li><a href="/about" className="hover:text-blue-600">About</a></li>
        </ul>
        <div className="flex gap-2">
          <button className="text-blue-700 font-semibold border border-blue-700 px-4 py-2 rounded hover:bg-blue-50">Login</button>
          <button className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">Sign Up</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-8 py-16 max-w-7xl mx-auto">
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl font-bold mb-4 leading-snug">
            continue your <br className="hidden md:block" />
            <span className="text-blue-700">uncommon journey</span>
          </h2>
          <p className="text-gray-700 mb-6 text-sm">
            Enhance your employability with our upskilling courses.
          </p>
          <button className="bg-blue-700 text-white px-6 py-3 rounded hover:bg-blue-800 text-sm">
            Start Learning
          </button>

          {/* Stats */}
          <div className="flex gap-6 mt-10 text-left text-sm text-gray-800">
            <div>
              <h3 className="text-2xl font-bold text-blue-700">1100+</h3>
              <p>Students</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-blue-700">100+</h3>
              <p>Courses</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-blue-700">10+</h3>
              <p>Instructors</p>
            </div>
          </div>
        </div>

        <div className="md:w-1/2 mb-10 md:mb-0 flex justify-center">
          <img
            src="/hero_image.avif" // make sure this image exists in /public/
            alt="Student"
            className="max-w-xs md:max-w-sm rounded-lg shadow-md"
          />
        </div>
      </section>

      {/* Browse Courses */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Browse Courses</h2>
          <p className="text-gray-600 mb-10">
            Explore a wide range of courses designed to help you learn new skills and advance your career.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="p-4 border rounded shadow hover:shadow-md transition">
                <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                <p className="text-sm text-gray-700 mb-3">{course.description}</p>
                <div className="text-sm text-blue-700 font-medium">By {course.author}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Success Stories */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Student Success Stories</h2>
          <p className="text-gray-600 mb-10">
            Discover how the Uncommon upskilling platform has transformed careers and empowered learners.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {students.map((student) => (
              <div key={student.id} className="p-6 bg-white border rounded shadow hover:shadow-md transition">
                <div className="flex items-center mb-4">
                  <img src="/dummy_profile.jpg" alt={student.name} className="w-12 h-12 rounded-full mr-3" />
                  <div>
                    <h4 className="font-semibold">{student.name}</h4>
                    <p className="text-xs text-gray-500">Graduate</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">"{student.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Your Next Step Begins Here!</h2>
          <p className="text-gray-700 mb-6">
            This platform was created to help Uncommon alumni keep growing beyond the bootcamp.It fills in the gaps, covering soft skills, advanced digital tools, and new career pathways that weren’t fully explored during the one-year program. Whether you're refining your communication, boosting your tech skills, or preparing for real-world challenges, this space is here to support your next step.
          </p>
          <button className="bg-blue-700 text-white px-6 py-3 rounded hover:bg-blue-800">Get Started</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Newsletter */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold mb-2">Subscribe to our mailing list</h3>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded"
              />
              <button type="submit" className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800">
                Subscribe
              </button>
            </form>
          </div>

          {/* Links + Socials */}
          <div className="flex flex-col gap-2">
            <p className="font-semibold">Follow us:</p>
            <div className="flex gap-4 text-blue-700">
              <a href="#">FB</a>
              <a href="#">IG</a>
              <a href="#">TW</a>
            </div>
          </div>
        </div>

        <div className="text-center text-sm mt-10 text-gray-500">
          &copy; {new Date().getFullYear()} Uncommon. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
