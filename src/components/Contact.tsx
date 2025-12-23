"use client";

import { useState } from 'react';
import { Bolt } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const services = [
    'Marketing & Events',
    'Logistics & Supply Chain',
    'Manufacturing',
    'Business Consulting',
    'Technology Solutions',
    'Other'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In production, you would send the data to your backend
      console.log('Form submitted:', formData);
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-12 px-4 sm:px-6 bg-gray-200 to-black">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-10 h-px bg-gradient-to-r from-transparent via-red-500/90 to-transparent"></div>
            <span className="text-red-700 text-xs font-semibold uppercase tracking-wider">Get in Touch</span>
            <div className="w-10 h-px bg-gradient-to-r from-transparent via-red-500/90 to-transparent"></div>
          </div>
          <h2 className="text-2xl md:text-2xl font-bold text-gray-900 mb-3 tracking-tight">
            Lets Start a Conversation
          </h2>
          <p className="text-gray-600 text-sm max-w-xl mx-auto leading-relaxed">
            Share your project details and we will get back to you within 24 hours
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-5">
            <div className="p-5 bg-gradient-to-br from-gray-900/90 to-black/50 rounded-lg ">
              <h3 className="text-white text-lg font-bold mb-4">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-md bg-gradient-to-br from-red-500/20 to-amber-500/10 flex items-center justify-center">
                    <span className="text-sm">📧</span>
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs mb-0.5">Email</div>
                    <a href="mailto:Info@energize-sa.com" className="text-white text-sm hover:text-red-400 font-bold transition-colors">
                      Info@energize-sa.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-md bg-gradient-to-br from-red-500/20 to-amber-500/10 flex items-center justify-center">
                    <span className="text-sm">📞</span>
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs mb-0.5">Phone</div>
                    <a href="tel:0126825858" className=" font-bold text-white text-sm hover:text-red-400 transition-colors">
                      0126825858
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-md bg-gradient-to-br from-red-500/20 to-amber-500/10 flex items-center justify-center">
                    <span className="text-sm">🏢</span>
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs mb-0.5">Address</div>
                    <div className="font-bold text-white text-sm">Al-Madinah Al-Munawarah Road, Jeddah, Saudi Arabia</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-md bg-gradient-to-br from-red-500/20 to-amber-500/10 flex items-center justify-center">
                    <span className="text-sm">🕐</span>
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs mb-0.5">Working Hours</div>
                    <div className="text-white text-sm">Sunday - Thursday: 9:00 AM - 6:00 PM</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="p-4 bg-gradient-to-r from-red-500/40 to-transparent rounded-lg ">
  <div className="flex items-center gap-3">
    <Bolt className="w-4 h-4 text-red-700" />
    <div>
      <div className="text-black text-sm font-bold">Quick Response</div>
      <div className="text-gray-700 text-xs">We typically respond within 24 hours</div>
    </div>
  </div>
</div>

            {/* Preferred Contact */}
            <div className="p-4 bg-gradient-to-br from-gray-900/90 to-black/50 rounded-lg ">
              <div className="text-white text-sm font-bold mb-2">Prefer to Call?</div>
              <a
                href="tel:0126825858"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-700 to-black  text-white text-xs rounded-lg hover:border-red-900 transition-all"
              >
                <span>📞 Call Now</span>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-5 bg-transparent rounded-lg ">
            {submitStatus === 'success' ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 flex items-center justify-center text-2xl">
                  ✓
                </div>
                <h3 className="text-white text-lg font-bold mb-2">Message Sent!</h3>
                <p className="text-gray-400 text-sm">
                  Thank you for contacting us. We will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitStatus('idle')}
                  className="mt-4 px-4 py-2 text-red-400 text-sm hover:text-red-300 transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="font-bold text-black text-xs block mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className=" w-full px-3 py-2 bg-gray-800 border border-gray-800/50 rounded-lg text-white text-sm focus:outline-none focus:border-red-500/50 transition-colors placeholder-gray-400"
                      placeholder="Your Name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="font-bold text-black text-xs block mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 bg-gray-900/90 rounded-lg text-white text-sm focus:outline-none focus:border-red-500/50 transition-colors placeholder-gray-400"
                      placeholder="Your Email"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="font-bold text-black text-xs block mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-900/90 rounded-lg text-white text-sm focus:outline-none focus:border-red-500/50 transition-colors placeholder-gray-400"
                      placeholder="Your Phone"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="font-bold text-black text-xs block mb-1.5">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-900/90 rounded-lg text-white text-sm focus:outline-none focus:border-red-500/50 transition-colors placeholder-gray-400"
                      placeholder="Your Company"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="font-bold text-black text-xs block mb-1.5">
                    Service Interest *
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="cursor-pointer w-full px-3 py-2 bg-gray-900/90 rounded-lg text-white text-sm focus:outline-none focus:border-red-500/50 transition-colors appearance-none"
                  >
                    <option value="" disabled>Select a service</option>
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="font-bold text-black text-xs block mb-1.5">
                    Project Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-3 py-2 bg-gray-900/90 rounded-lg text-white text-sm focus:outline-none focus:border-red-500/50 transition-colors placeholder-gray-400 resize-none"
                    placeholder="Tell us about your project, requirements, and timeline..."
                  />
                </div>

                {submitStatus === 'error' && (
                  <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <p className="text-red-400 text-xs">
                      There was an error submitting your message. Please try again.
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="cursor-pointer w-full py-2.5 bg-gradient-to-r from-gray-800 to-gray-800 border border-gray-800 text-white text-sm font-semibold rounded-lg hover:border-red-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </>
                  )}
                </button>

                <p className="text-gray-400 text-xs text-center">
                  By submitting this form, you agree to our Privacy Policy and consent to contact.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}