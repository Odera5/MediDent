import React from "react";

export function About() {
  return (
    <section className="bg-white text-blue-900 py-20">
      <div className="max-w-6xl mx-auto px-8">
        {/* Header */}
        <h1 className="text-5xl font-bold mb-6">About LumiaGlobe Jobs</h1>
        <p className="text-lg mb-6 leading-relaxed opacity-90">
          LumiaGlobe Jobs is Nigeria's premier platform connecting healthcare
          professionals with leading hospitals. Our mission is to streamline
          recruitment in the medical sector, helping both job seekers and
          hospitals find their perfect match.
        </p>
        <p className="text-lg mb-6 leading-relaxed opacity-90">
          Whether you’re looking to grow your medical career or hire top talent,
          our platform offers the tools and resources to make the process
          seamless and efficient.
        </p>

        {/* Vision & Mission */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-teal-50 p-6 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-2">Our Vision</h3>
            <p className="opacity-90">
              To be the leading healthcare recruitment platform in Nigeria,
              empowering professionals and institutions alike.
            </p>
          </div>
          <div className="bg-teal-50 p-6 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-2">Our Mission</h3>
            <p className="opacity-90">
              To simplify hiring, improve access to talent, and support career
              growth in the healthcare sector.
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-teal-50 p-6 rounded-xl shadow-lg text-center">
              <h3 className="text-xl font-semibold mb-2">Trusted Hospitals</h3>
              <p className="opacity-90">
                We partner only with verified hospitals to ensure credibility.
              </p>
            </div>
            <div className="bg-teal-50 p-6 rounded-xl shadow-lg text-center">
              <h3 className="text-xl font-semibold mb-2">Easy Applications</h3>
              <p className="opacity-90">
                Apply for jobs in just a few clicks, and track your
                applications.
              </p>
            </div>
            <div className="bg-teal-50 p-6 rounded-xl shadow-lg text-center">
              <h3 className="text-xl font-semibold mb-2">Career Growth</h3>
              <p className="opacity-90">
                Access resources, tips, and guidance to boost your medical
                career.
              </p>
            </div>
          </div>
        </div>

        {/* Meet Our Team */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <img
                src="/images/team1.jpg"
                alt="CEO"
                className="mx-auto w-32 h-32 rounded-full mb-4"
              />
              <h3 className="font-semibold text-xl">Dr. Ani</h3>
              <p className="opacity-90">CEO & Founder</p>
            </div>
            <div className="text-center">
              <img
                src="/images/team2.jpg"
                alt="CTO"
                className="mx-auto w-32 h-32 rounded-full mb-4"
              />
              <h3 className="font-semibold text-xl">Mr. John</h3>
              <p className="opacity-90">CTO</p>
            </div>
            <div className="text-center">
              <img
                src="/images/team3.jpg"
                alt="COO"
                className="mx-auto w-32 h-32 rounded-full mb-4"
              />
              <h3 className="font-semibold text-xl">Mrs. Ada Okafor</h3>
              <p className="opacity-90">COO</p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-16 bg-blue-50 p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">
            What Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <blockquote className="p-6 bg-white rounded-lg shadow">
              <p className="opacity-90">
                “LumiaGlobe Jobs helped me land my dream job at a top hospital!”
              </p>
              <footer className="mt-4 text-right font-semibold">
                — Dr. Ada
              </footer>
            </blockquote>
            <blockquote className="p-6 bg-white rounded-lg shadow">
              <p className="opacity-90">
                “Hiring via this platform was seamless and efficient.”
              </p>
              <footer className="mt-4 text-right font-semibold">
                — General Hospital Admin
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
