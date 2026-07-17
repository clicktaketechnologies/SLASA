import React from 'react';
import { motion } from 'motion/react';
import { FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  return (
    <div className="pt-24 pb-20">
      <section className="bg-gradient-to-br from-primary via-brand-orange to-secondary text-white py-20 mb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-red rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-yellow rounded-full blur-[150px] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            The rules and guidelines for using Slasa Academy services.
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
            <div className="bg-secondary/10 p-3 rounded-2xl">
              <FileText className="text-secondary" size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold m-0">Terms & Conditions</h2>
              <p className="text-primary/50 m-0">Last updated: March 17, 2026</p>
            </div>
          </div>

          <h3>1. Acceptance of Terms</h3>
          <p>
            By accessing or using our services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing our services.
          </p>

          <h3>2. Educational Services</h3>
          <p>
            Slasa Academy provides educational tutoring and support services. We reserve the right to modify or discontinue any service at any time without notice.
          </p>

          <h3>3. Registration and Accounts</h3>
          <p>
            When you register for an account, you must provide accurate and complete information. You are responsible for maintaining the confidentiality of your account and password.
          </p>

          <h3>4. Fees and Payments</h3>
          <p>
            Fees for our courses and services are as listed on our website or communicated during registration. All payments are due in advance unless otherwise agreed.
          </p>

          <h3>5. Cancellation and Refunds</h3>
          <p>
            Our cancellation and refund policies vary by course type. Please refer to the specific course documentation or contact us for detailed information.
          </p>

          <h3>6. Code of Conduct</h3>
          <p>
            Students and parents are expected to behave respectfully towards our staff and other students. We reserve the right to terminate services for anyone who violates our code of conduct.
          </p>

          <h3>7. Intellectual Property</h3>
          <p>
            All educational materials provided by Slasa Academy are protected by copyright and other intellectual property laws. These materials are for personal, non-commercial use only.
          </p>

          <h3>8. Limitation of Liability</h3>
          <p>
            Slasa Academy shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use our services.
          </p>

          <h3>9. Governing Law</h3>
          <p>
            These terms shall be governed by and construed in accordance with the laws of the United Kingdom.
          </p>

          <h3>10. Contact Information</h3>
          <p>
            Questions about the Terms of Service should be sent to us via our <Link to="/contact" className="text-primary font-bold hover:underline">contact page</Link> or at:
            <br />
            <strong>Email:</strong> legal@slasa.co.uk
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfService;
