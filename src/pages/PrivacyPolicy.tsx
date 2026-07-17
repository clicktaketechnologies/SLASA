import React from 'react';
import { motion } from 'motion/react';
import { Shield, Lock, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="pt-24 pb-20">
      <section className="bg-gradient-to-br from-primary via-brand-orange to-secondary text-white py-20 mb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-red rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-yellow rounded-full blur-[150px] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            How we handle and protect your personal information at Slasa Academy.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] border border-primary/10 shadow-lg p-8 md:p-12 prose prose-primary max-w-none"
        >
          <div className="flex items-center space-x-4 mb-8">
            <div className="bg-primary/10 p-3 rounded-2xl">
              <Shield className="text-primary" size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold m-0">Your Privacy Matters</h2>
              <p className="text-primary/50 m-0">Last updated: March 17, 2026</p>
            </div>
          </div>

          <h3>1. Information We Collect</h3>
          <p>
            We collect information that you provide directly to us when you register for a course, sign up for our newsletter, or contact us for support. This may include:
          </p>
          <ul>
            <li>Name and contact information (email, phone number, address)</li>
            <li>Student information (name, age, educational background)</li>
            <li>Payment information (processed securely through our payment partners)</li>
            <li>Feedback and communications you send to us</li>
          </ul>

          <h3>2. How We Use Your Information</h3>
          <p>
            We use the information we collect to:
          </p>
          <ul>
            <li>Provide, maintain, and improve our educational services</li>
            <li>Process registrations and manage student accounts</li>
            <li>Send administrative messages and updates</li>
            <li>Respond to your comments, questions, and requests</li>
            <li>Communicate with you about courses, services, and events</li>
          </ul>

          <h3>3. Information Sharing</h3>
          <p>
            We do not sell or rent your personal information to third parties. We may share information with service providers who perform services on our behalf, such as payment processing and email delivery.
          </p>

          <h3>4. Data Security</h3>
          <p>
            We implement appropriate technical and organizational measures to protect the security of your personal information. However, please note that no method of transmission over the Internet is 100% secure.
          </p>

          <h3>5. Your Choices</h3>
          <p>
            You may update or correct your account information at any time by contacting us. You can also opt-out of receiving promotional emails from us by following the instructions in those emails.
          </p>

          <h3>6. Contact Us</h3>
          <p>
            If you have any questions about this Privacy Policy, please <Link to="/contact" className="text-primary font-bold hover:underline">contact us</Link> at:
            <br />
            <strong>Email:</strong> privacy@slasa.co.uk
            <br />
            <strong>Address:</strong> 64a-66b Northgate New, Basford Nottingham NC7 7FY
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
