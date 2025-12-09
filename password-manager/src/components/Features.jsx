import React from 'react'

const Features = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">

      {/* ✅ PAGE HEADING */}
      <div className="text-center mb-14">
        <h1 className="text-4xl font-bold mb-3">My Mini Applications</h1>
        <p className="text-gray-600">
          Live tools built for productivity and daily use
        </p>
      </div>

      {/* ✅ FEATURE CARDS */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">

        {/* ✅ TODO APP CARD */}
        <div className="bg-white border rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
          <h2 className="text-2xl font-bold mb-3">✅ Todo Application</h2>

          <p className="text-gray-600 mb-6">
            Manage your daily tasks efficiently with a clean and simple
            Todo application. Add, remove and track your progress easily.
          </p>

          <div className="flex gap-4">
            <a
              href="https://todolist-puce-pi.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Open Live
            </a>

            <a
              href="https://github.com/MA1ya1nk/reactRevise/tree/main/04Todo"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-green-600 text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-green-50 transition"
            >
              Repo
            </a>
          </div>
        </div>

        {/* ✅ CURRENCY CONVERTER CARD */}
        <div className="bg-white border rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
          <h2 className="text-2xl font-bold mb-3">💱 Currency Converter</h2>

          <p className="text-gray-600 mb-6">
            Convert currencies in real-time with this fast and user-friendly
            currency converter. Supports multiple global currencies.
          </p>

          <div className="flex gap-4">
            <a
              href="https://currency-convertor.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Open Live
            </a>

            <a
              href="https://github.com/MA1ya1nk/Currency-Convertor"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-green-600 text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              Visit
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

  

export default Features