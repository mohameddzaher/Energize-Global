"use client";

import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast"; // مكتبة Toast

interface NewsletterProps {
  title?: string;
  subtitle?: string;
}

export default function Newsletter({
  title = "Stay Updated with Energize",
  subtitle = "Subscribe to receive the latest news, insights, and updates from Energize Global."
}: NewsletterProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;

    try {
      await emailjs.send(
        "service_tapq0ay",      // Service ID
        "template_nnnbn17",     // Newsletter Template ID
        {
          email: email,
          time: new Date().toLocaleString(),
        },
        "XYvZHem5gyeZzC-75"     // Public Key
      );

      form.reset();
      toast.success("Thank you for subscribing! ✅"); // Toast نجاح
    } catch (error) {
      console.error("Newsletter EmailJS Error:", error);
      toast.error("Something went wrong. Please try again."); // Toast خطأ
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-gray-200 relative">
      {/* Toast Container */}
      <Toaster position="top-right" reverseOrder={false} />

      <div className="mx-auto">
        <div className="relative bg-gray-200 p-8 md:p-10 overflow-hidden">

          {/* Background Effects */}
          <div className="absolute inset-0 bg-gray-200 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-red-900/15 via-transparent to-transparent rounded-full blur-3xl opacity-40 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-red-800/10 via-transparent to-transparent rounded-full blur-3xl opacity-40 pointer-events-none"></div>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] opacity-10 pointer-events-none"></div>

          <div className="relative z-10 text-center">

            {/* Icon */}
            <div className="w-9 h-9 mx-auto mb-6 rounded-xl bg-gradient-to-br from-red-900/30 to-black flex items-center justify-center relative">
              <FaPaperPlane className="w-3 h-3 text-red-400" />
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-red-600/3 rounded-xl blur-md pointer-events-none"></div>
            </div>

            <h2 className="text-black text-2xl md:text-xl font-bold mb-3 tracking-tight">
              {title}
            </h2>

            <p className="text-gray-600 text-sm mb-8 max-w-lg mx-auto leading-relaxed">
              {subtitle}
            </p>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
                className="flex-1 px-4 py-3.5 bg-gray-900/80 border border-gray-800/80 rounded-xl text-white placeholder-gray-200 text-sm focus:outline-none focus:border-red-900/80 tracking-wide"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3.5 bg-gradient-to-r from-gray-900 to-black border border-gray-800 text-white font-semibold rounded-xl text-sm tracking-wide whitespace-nowrap cursor-pointer hover:border-red-900/80 hover:shadow-lg hover:shadow-red-900/10 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-800/60">
              <p className="text-gray-600 text-xs">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from us.
              </p>
            </div>
          </div>

          {/* Corners */}
          <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-gradient-to-br from-red-900/30 to-transparent pointer-events-none"></div>
          <div className="absolute bottom-4 left-4 w-3 h-3 rounded-full bg-gradient-to-br from-red-900/30 to-transparent pointer-events-none"></div>

        </div>
      </div>
    </section>
  );
}
