import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, ArrowRight, Tag, User, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';

interface NewsArticle {
  id: string;
  date: string;
  title: string;
  category: string;
  author: string;
  content: string;
  image: string;
}

const News = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  const mockArticles: NewsArticle[] = [
    {
      id: '1',
      date: 'Oct 15, 2025',
      title: 'GCSE Revision Workshop Success',
      category: 'Academic',
      author: 'Dr. Sarah Ahmed',
      content: 'Our recent intensive weekend workshop focusing on exam board specific techniques was a huge success with over 50 students attending.',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: '2',
      date: 'Nov 02, 2025',
      title: '11+ Mock Exam Series Announced',
      category: 'Exams',
      author: 'Mr. David Wilson',
      content: 'Register for our upcoming mock exams to simulate the real test environment and build student confidence.',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: '3',
      date: 'Dec 10, 2025',
      title: 'Urdu Cultural Day Celebration',
      category: 'Culture',
      author: 'Ms. Fatima Khan',
      content: 'A celebration of language and culture featuring student performances, traditional food, and poetry recitations.',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800'
    }
  ];

  useEffect(() => {
    const q = query(collection(db, 'news'), orderBy('date', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newsData: NewsArticle[] = [];
      snapshot.forEach((doc) => {
        newsData.push({ id: doc.id, ...doc.data() } as NewsArticle);
      });
      setArticles(newsData.length > 0 ? newsData : mockArticles);
      setLoading(false);
    }, (err) => {
      console.error("Error fetching news:", err);
      setArticles(mockArticles);
      setLoading(false);
      handleFirestoreError(err, OperationType.LIST, 'news');
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="pt-24 pb-20">
      <section className="bg-gradient-to-br from-primary via-brand-orange to-secondary text-white py-20 mb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-red rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-yellow rounded-full blur-[150px] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">News & Events</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Stay updated with the latest happenings, academic achievements, and upcoming events at Slasa.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {articles.map((article, idx) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-[2.5rem] overflow-hidden border border-primary/10 shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-6 left-6">
                    <span className="bg-white/90 backdrop-blur-sm text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center space-x-4 text-primary/60 text-sm mb-4">
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-1.5" />
                      {article.date}
                    </div>
                    <div className="flex items-center">
                      <User size={14} className="mr-1.5" />
                      {article.author}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-primary/80 mb-8 line-clamp-3">
                    {article.content}
                  </p>
                  <Link to="/contact" className="text-primary font-bold flex items-center hover:underline">
                    Read Full Story <ArrowRight className="ml-2" size={18} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        <div className="mt-20 p-12 bg-primary rounded-[3rem] text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">Get the latest academic tips, event notifications, and academy news delivered straight to your inbox.</p>
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <input type="email" className="flex-grow px-6 py-4 rounded-2xl text-primary outline-none" placeholder="Email Address" />
            <button className="btn-secondary whitespace-nowrap">Subscribe</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default News;
