import React from 'react'

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* ✅ NAVBAR */}
      {/* <nav className="flex justify-between items-center px-10 py-5 bg-white shadow">
        <h1 className="text-2xl font-bold text-green-600">PassOp</h1>

        <div className="space-x-4">
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-100">
            Read More
          </button>

          <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
            Login
          </button>
        </div>
      </nav> */}

      {/* ✅ HERO SECTION */}
      <section className="flex flex-col items-center text-center mt-20 px-4">
        <h2 className="text-4xl font-bold mb-4">
          Secure Your Passwords With Ease 🔐
        </h2>

        <p className="text-gray-600 max-w-xl mb-8">
          Store, manage and protect your passwords in one secure place.
          Simple, fast and encrypted.
        </p>

        <div className="flex gap-4">
            <a href="/signin">
          <button className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600">
            Get Started
          </button>
          </a>
 
          <a href="features">
          <button className="px-6 py-3 border rounded-lg hover:bg-gray-100">
            Explore
          </button>
          </a>
        </div>
      </section>

      {/* ✅ FEATURES SECTION */}
      <section className="mt-20 max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">🔐 Secure Storage</h3>
          <p className="text-gray-600">
            Your data is encrypted and protected with industry-level security.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">⚡ Fast Access</h3>
          <p className="text-gray-600">
            Access your saved credentials instantly anytime, anywhere.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">📱 Multi-Device</h3>
          <p className="text-gray-600">
            Works beautifully across mobile, tablet and desktop devices.
          </p>
        </div>

      </section>

      {/* ✅ CTA SECTION */}
      {/* <section className="mt-24 bg-green-500 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Secure Your Passwords?
        </h2>

        <button className="px-6 py-3 bg-white text-green-600 rounded-lg font-semibold hover:bg-gray-100">
          Create Free Account
        </button>
      </section> */}

    </div>
  );
}

  


export default Home