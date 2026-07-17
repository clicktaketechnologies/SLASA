import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Loader2,
  AlertCircle,
  Save,
  X,
  Layers,
  Clock,
  DollarSign
} from 'lucide-react';
import { collection, query, orderBy, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { motion, AnimatePresence } from 'motion/react';

interface Course {
  id: string;
  title: string;
  category: string;
  duration: string;
  price: string;
  description: string;
}

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'GCSE',
    duration: '',
    price: '',
    description: ''
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'courses'), orderBy('title', 'asc'));
      const snapshot = await getDocs(q);
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Course[];
      setCourses(items);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (course: Course | null = null) => {
    if (course) {
      setEditingCourse(course);
      setFormData({
        title: course.title,
        category: course.category,
        duration: course.duration,
        price: course.price,
        description: course.description
      });
    } else {
      setEditingCourse(null);
      setFormData({
        title: '',
        category: 'GCSE',
        duration: '',
        price: '',
        description: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingCourse) {
        await updateDoc(doc(db, 'courses', editingCourse.id), {
          ...formData,
          updatedAt: serverTimestamp()
        });
      } else {
        await addDoc(collection(db, 'courses'), {
          ...formData,
          createdAt: serverTimestamp()
        });
      }
      setIsModalOpen(false);
      fetchCourses();
    } catch (error) {
      console.error('Error saving course:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setLoading(true);
      try {
        await deleteDoc(doc(db, 'courses', id));
        fetchCourses();
      } catch (error) {
        console.error('Error deleting course:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-neutral-900 tracking-tight mb-2">Course Management</h1>
          <p className="text-neutral-500 font-medium">Create and manage academic courses and pricing.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="btn-primary px-8 py-3 text-sm font-bold shadow-lg shadow-primary/20 flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add New Course</span>
        </button>
      </div>

      <div className="bg-white rounded-[3rem] border border-neutral-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-neutral-100 flex items-center justify-between">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
            <input 
              type="text" 
              placeholder="Filter courses..." 
              className="w-full bg-neutral-100 border-none rounded-2xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-neutral-50">
                <th className="px-8 py-4 text-xs font-black text-neutral-400 uppercase tracking-widest">Course Title</th>
                <th className="px-8 py-4 text-xs font-black text-neutral-400 uppercase tracking-widest">Category</th>
                <th className="px-8 py-4 text-xs font-black text-neutral-400 uppercase tracking-widest">Duration</th>
                <th className="px-8 py-4 text-xs font-black text-neutral-400 uppercase tracking-widest">Price</th>
                <th className="px-8 py-4 text-xs font-black text-neutral-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {loading && courses.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center">
                    <Loader2 className="animate-spin mx-auto text-primary" size={32} />
                  </td>
                </tr>
              ) : courses.length > 0 ? courses.map((course) => (
                <tr key={course.id} className="hover:bg-neutral-50 transition-all group">
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-4">
                      <div className="bg-primary/5 p-3 rounded-xl text-primary">
                        <BookOpen size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-neutral-900">{course.title}</p>
                        <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Academic Program</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-neutral-100 text-neutral-600 text-[10px] font-black uppercase tracking-widest rounded-full">
                      {course.category}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-2 text-neutral-500 font-bold text-sm">
                      <Clock size={14} className="text-neutral-300" />
                      <span>{course.duration}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-1 text-neutral-900 font-black text-sm">
                      <DollarSign size={14} className="text-neutral-400" />
                      <span>{course.price}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        onClick={() => handleOpenModal(course)}
                        className="p-2 text-neutral-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(course.id)}
                        className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center text-neutral-400">
                    <AlertCircle size={48} className="mx-auto mb-4 opacity-20" />
                    <p className="font-bold">No courses found.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Course Editor Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
            ></motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl relative z-10"
            >
              <div className="p-10">
                <div className="flex items-center justify-between mb-10">
                  <div>
                    <h2 className="text-3xl font-black text-neutral-900 tracking-tight">
                      {editingCourse ? 'Edit Course' : 'Add New Course'}
                    </h2>
                    <p className="text-neutral-500 font-medium">Configure course details and pricing.</p>
                  </div>
                  <button onClick={() => setIsModalOpen(false)} className="p-3 text-neutral-400 hover:bg-neutral-100 rounded-full transition-all">
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-neutral-400 ml-4">Category</label>
                      <select 
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        className="w-full bg-neutral-100 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                      >
                        <option value="GCSE">GCSE</option>
                        <option value="A-Level">A-Level</option>
                        <option value="Primary">Primary</option>
                        <option value="Secondary">Secondary</option>
                        <option value="Retakes">Retakes</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-neutral-400 ml-4">Duration</label>
                      <input 
                        type="text" 
                        required
                        value={formData.duration}
                        onChange={(e) => setFormData({...formData, duration: e.target.value})}
                        className="w-full bg-neutral-100 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="e.g. 12 Weeks"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-neutral-400 ml-4">Course Title</label>
                      <input 
                        type="text" 
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        className="w-full bg-neutral-100 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="e.g. Mathematics GCSE"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-neutral-400 ml-4">Price (per month/total)</label>
                      <input 
                        type="text" 
                        required
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                        className="w-full bg-neutral-100 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="e.g. 120"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-neutral-400 ml-4">Description</label>
                    <textarea 
                      required
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      rows={4}
                      className="w-full bg-neutral-100 border-none rounded-[2rem] px-6 py-6 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="Course overview and syllabus details..."
                    />
                  </div>

                  <div className="flex items-center justify-end space-x-4 pt-6 border-t border-neutral-100">
                    <button 
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-8 py-4 text-sm font-bold text-neutral-500 hover:bg-neutral-100 rounded-2xl transition-all"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      disabled={loading}
                      className="btn-primary px-12 py-4 text-sm font-bold shadow-xl shadow-primary/20 flex items-center space-x-2"
                    >
                      {loading ? <Loader2 className="animate-spin" size={20} /> : (
                        <>
                          <Save size={20} />
                          <span>Save Course</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Courses;
