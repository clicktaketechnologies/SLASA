import React from 'react';
import { motion } from 'motion/react';
import { Cookie, Info, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const CookiePolicy = () => {
  return (
    <div className="pt-24 pb-20">
      <section className="bg-gradient-to-br from-primary via-brand-orange to-secondary text-white py-20 mb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-red rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-yellow rounded-full blur-[150px] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Cookie Policy</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            How we use cookies and similar technologies on our website.
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
              <Cookie className="text-primary" size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold m-0">Cookie Information</h2>
              <p className="text-primary/50 m-0">Last updated: March 17, 2026</p>
            </div>
          </div>

          <h3>1. What are Cookies?</h3>
          <p>
            Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the owners of the site.
          </p>

          <h3>2. How We Use Cookies</h3>
          <p>
            We use cookies for several reasons:
          </p>
          <ul>
            <li><strong>Essential Cookies:</strong> These are necessary for the website to function properly, such as for security and authentication.</li>
            <li><strong>Performance Cookies:</strong> These help us understand how visitors interact with our website by collecting and reporting information anonymously.</li>
            <li><strong>Functional Cookies:</strong> These allow the website to remember choices you make (such as your language or the region you are in) and provide enhanced features.</li>
          </ul>

          <h3>3. Types of Cookies We Use</h3>
          <table className="min-w-full border-collapse border border-primary/10 mt-4">
            <thead>
              <tr className="bg-primary/5">
                <th className="border border-primary/10 p-3 text-left">Type</th>
                <th className="border border-primary/10 p-3 text-left">Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-primary/10 p-3 font-bold">Session Cookies</td>
                <td className="border border-primary/10 p-3">Temporary cookies used during your visit to remember your progress through the site.</td>
              </tr>
              <tr>
                <td className="border border-primary/10 p-3 font-bold">Analytics Cookies</td>
                <td className="border border-primary/10 p-3">Help us measure traffic and usage patterns to improve our website.</td>
              </tr>
              <tr>
                <td className="border border-primary/10 p-3 font-bold">Preference Cookies</td>
                <td className="border border-primary/10 p-3">Store your settings and preferences for a more personalized experience.</td>
              </tr>
            </tbody>
          </table>

          <h3>4. Managing Cookies</h3>
          <p>
            Most web browsers allow you to control cookies through their settings. You can choose to block or delete cookies, but please note that doing so may affect the functionality of our website.
          </p>
          <p>
            To find out more about cookies, including how to see what cookies have been set and how to manage and delete them, visit <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer">www.aboutcookies.org</a>.
          </p>

          <h3>5. Changes to This Policy</h3>
          <p>
            We may update our Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.
          </p>

          <h3>6. Contact Us</h3>
          <p>
            If you have any questions about our use of cookies, please <Link to="/contact" className="text-primary font-bold hover:underline">contact us</Link> at:
            <br />
            <strong>Email:</strong> info@slasa.co.uk
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default CookiePolicy;
