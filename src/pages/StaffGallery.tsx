import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Users, Loader2, GraduationCap, Award, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';

interface StaffMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  order?: number;
}

const StaffGallery = () => {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);

  const fallbackStaff = [
    { id: '1', name: 'Dr. Sarah Ahmed', role: 'Head of Academy', bio: 'PhD in Education with 15+ years of experience in academic leadership.', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400' },
    { id: '2', name: 'Mr. David Wilson', role: 'Lead Maths Tutor', bio: 'Specialist in GCSE and A-Level Mathematics with a focus on exam techniques.', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400' },
    { id: '3', name: 'Ms. Fatima Khan', role: 'Urdu Language Head', bio: 'Native speaker and linguist dedicated to preserving cultural heritage through language.', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400' },
    { id: '4', name: 'Mr. James Taylor', role: 'Science Coordinator', bio: 'Expert in Physics and Chemistry with a passion for making science accessible.', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400' },
    { id: '5', name: 'Ms. Emily Chen', role: 'English Literature Lead', bio: 'Published author and educator specializing in creative writing and analysis.', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400' },
    { id: '6', name: 'Mr. Robert Brown', role: 'Primary Education Specialist', bio: 'Dedicated to building strong foundations in KS1 and KS2 students.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400' }
  ];

  useEffect(() => {
    const q = query(collection(db, 'staff'), orderBy('order', 'asc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as StaffMember[];
      
      setStaff(items.length > 0 ? items : fallbackStaff);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'staff');
      setStaff(fallbackStaff);
      setLoading(false);
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Meet Our Teachers & Staff</h1>
          <p className="text-white text-lg max-w-2xl mx-auto">
            The dedicated professionals behind our students' academic success.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-primary" size={48} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {staff.map((member, idx) => (
              <motion.div
                key={member.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-white rounded-[3rem] overflow-hidden shadow-sm border border-primary/10 hover:shadow-xl transition-all"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                    <p className="text-white text-sm italic leading-relaxed">"{member.bio}"</p>
                  </div>
                </div>
                <div className="p-8 text-center">
                  <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                  <p className="text-primary font-bold text-sm uppercase tracking-widest mb-4">{member.role}</p>
                  <div className="flex justify-center space-x-4 text-primary/20">
                    <GraduationCap size={20} />
                    <Award size={20} />
                    <BookOpen size={20} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-24 bg-primary rounded-[4rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-black mb-6">Want to Join Our Team?</h2>
            <p className="text-white text-xl mb-10 max-w-2xl mx-auto">
              We are always looking for passionate educators to join our growing academy in Nottingham.
            </p>
            <Link to="/careers" className="btn-secondary bg-white text-primary hover:bg-white/90 text-lg px-10 py-4">
              View Career Opportunities
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffGallery;
