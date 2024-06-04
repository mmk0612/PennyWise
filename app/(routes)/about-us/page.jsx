import React from "react";
import Image from "next/image";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto py-16 px-6 lg:px-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">About Us</h1>
          <p className="mt-4 text-gray-500">Welcome to PennyWise</p>
        </div>
        <div className="bg-slate-200 rounded-lg shadow-lg p-8">
          <div className="flex flex-col lg:flex-row lg:gap-12">
            <div className="lg:w-1/2 lg:mb-0">
              <img
                src="./about-us-img.jpg"
                alt="About Us"
                width={500}
                height={600}
                className="mt-[70px] rounded-lg"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Our Mission
              </h2>
              <p className="text-gray-500 mb-4">
                Our mission is to provide a user-friendly platform that
                simplifies personal finance management. We aim to empower
                individuals and families to take control of their finances, make
                informed decisions, and build a secure financial future.
              </p>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Our Story
              </h2>
              <p className="text-gray-500 mb-4">
                PennyWise was born out of a personal need for better financial
                management tools. Our founder, frustrated with the complexity
                and inefficiency of existing expense trackers, decided to create
                a solution that was both powerful and easy to use.
              </p>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                What We Offer?
              </h2>
              <ul className="list-disc list-inside text-gray-500 mb-4">
                <li>Expense Tracking</li>
                <li>Budget Management</li>
                <li>Insights and Reports</li>
                <li>Secure and Private</li>
              </ul>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Why Choose PennyWise?
              </h2>
              <ul className="list-disc list-inside text-gray-500 mb-4">
                <li>User-Friendly</li>
                <li>Comprehensive Tools</li>
                <li>Community-Driven</li>
                <li>Reliable Support</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Join Us on Our Journey
            </h2>
            <p className="text-gray-500 mb-8">
              We invite you to join the PennyWise community and take the first
              step towards financial freedom. With PennyWise, you can track your
              expenses, manage your budgets, and make smarter financial
              decisions.
            </p>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Contact Us
            </h2>
            <p className="text-gray-500">
              Have questions or need assistance? Feel free to reach out to our
              support team at{" "}
              <a href="mailto:support@pennywise.com" className="text-blue-600">
                support@pennywise.com
              </a>
              . We’re here to help!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
