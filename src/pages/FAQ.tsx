import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, HelpCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    question: "What age groups do you provide tuition for?",
    answer: "We provide comprehensive tuition for students from Key Stage 1 (Year 1) all the way up to GCSE (Year 11). This includes specialized preparation for the 11+ entrance exams."
  },
  {
    question: "How large are your class sizes?",
    answer: "We believe in personalized attention. Our classes are kept small, typically between 4 to 8 students, ensuring that every child gets the support they need while still benefiting from group interaction."
  },
  {
    question: "Are all your tutors DBS checked?",
    answer: "Yes, absolutely. The safety and well-being of our students are our top priorities. Every tutor and staff member at Slasa undergoes a rigorous enhanced DBS check before joining our team."
  },
  {
    question: "Do you provide study materials and homework?",
    answer: "Yes, we provide all necessary learning materials, including custom workbooks and past paper packs. We also set weekly homework to reinforce what was learned in class and track progress."
  },
  {
    question: "What are your tuition fees?",
    answer: "Our fees vary depending on the level of study. KS1 and KS2 start at £15/hour, while GCSE and 11+ prep are £20/hour. We offer discounts for siblings and block bookings."
  },
  {
    question: "Where is the academy located in Nottingham?",
    answer: "We are located at 64a-66b Northgate New, Basford Nottingham NC7 7FY. Our venue is easily accessible via major bus routes and is just a short walk from the city center."
  },
  {
    question: "Do you offer a free trial class?",
    answer: "Yes! We offer a free initial assessment and a trial class for all new students. This allows us to understand your child's current level and ensures you are happy with our teaching style before enrolling."
  },
  {
    question: "How do you track student progress?",
    answer: "We use a digital progress tracking system. Parents receive monthly reports detailing their child's strengths, areas for improvement, and mock exam results. We also hold regular parent-teacher consultations."
  }
];

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  key?: React.Key;
}

const FAQItem = ({ question, answer, isOpen, onClick }: FAQItemProps) => {
  return (
    <div className="border-b border-primary/10 last:border-0">
      <button
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
      >
        <span className={`text-lg font-bold transition-colors ${isOpen ? 'text-primary' : 'text-primary/70 group-hover:text-primary'}`}>
          {question}
        </span>
        <div className={`shrink-0 ml-4 p-1 rounded-full transition-colors ${isOpen ? 'bg-primary text-white' : 'bg-primary/5 text-primary/40'}`}>
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-black leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="pt-24 pb-20">
      <section className="bg-gradient-to-br from-primary via-brand-orange to-secondary text-white py-20 mb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-red rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-yellow rounded-full blur-[150px] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Find answers to common questions about our tuition programs, enrollment process, and academy policies.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[2.5rem] border border-primary/10 shadow-xl p-8 md:p-12">
          <div className="flex items-center space-x-4 mb-10">
            <div className="bg-primary/10 p-3 rounded-2xl">
              <HelpCircle className="text-primary" size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold">General Questions</h2>
              <p className="text-black text-sm">Everything you need to know to get started.</p>
            </div>
          </div>

          <div className="divide-y divide-primary/10">
            {faqs.map((faq, idx) => (
              <FAQItem
                key={idx}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === idx}
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              />
            ))}
          </div>
        </div>

        {/* Still have questions? */}
        <div className="mt-16 bg-primary/5 rounded-[2.5rem] p-10 text-center border border-primary/10">
          <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
          <p className="text-black mb-8">
            If you couldn't find the answer you were looking for, please don't hesitate to contact our friendly team.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact" className="btn-primary">
              Contact Us
            </Link>
            <Link to="/registration" className="btn-outline border-primary/20 text-primary hover:bg-primary/5">
              Book a Free Trial
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
