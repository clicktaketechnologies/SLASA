import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Image as ImageIcon, Camera, Loader2 } from 'lucide-react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';

interface GalleryItem {
  id: string;
  url: string;
  title: string;
  category?: string;
}

const Gallery = () => {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fallbackImages = [
    { id: '1', url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800', title: 'Interactive Learning' },
    { id: '2', url: 'https://images.unsplash.com/photo-1523050335392-9bf5674293ca?auto=format&fit=crop&q=80&w=800', title: 'Graduation Ceremony' },
    { id: '3', url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800', title: 'Modern Classrooms' },
    { id: '4', url: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=800', title: 'Library Resources' },
    { id: '5', url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800', title: 'Group Study' },
    { id: '6', url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800', title: 'Focused Sessions' },
    { id: '7', url: 'https://images.unsplash.com/photo-1544531585-9847b68c8c86?auto=format&fit=crop&q=80&w=800', title: 'Student Collaboration' },
    { id: '8', url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800', title: 'Our Facilities' },
  ];

  useEffect(() => {
    const q = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as GalleryItem[];
      
      setImages(items.length > 0 ? items : fallbackImages);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'gallery');
      setImages(fallbackImages);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="pt-24 pb-20">
      <section className="bg-gradient-to-br from-primary via-secondary to-accent-yellow text-white py-20 mb-12 relative overflow-hidden shadow-2xl shadow-primary/20">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-red rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-orange rounded-full blur-[150px] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Gallery</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            A visual journey through life at Slasa Academy.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-primary" size={48} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {images.map((img, idx) => (
              <motion.div
                key={img.id || idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative aspect-square overflow-hidden rounded-3xl shadow-md"
              >
                <img 
                  src={img.url} 
                  alt={img.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="text-white">
                    <p className="font-bold text-lg">{img.title}</p>
                    {img.category && (
                      <span className="text-xs font-bold uppercase tracking-widest text-secondary">{img.category}</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-20 bg-primary/5 rounded-[3rem] p-12 text-center border border-primary/10">
          <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <Camera className="text-primary" size={32} />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-primary">Follow Us on Social Media</h2>
          <p className="text-black mb-0">Check out more photos and updates on our Instagram and Facebook pages.</p>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
