import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Plus, 
  Search, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Eye, 
  Globe, 
  ShieldCheck,
  Loader2,
  AlertCircle,
  Save,
  X
} from 'lucide-react';
import { collection, query, orderBy, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { motion, AnimatePresence } from 'motion/react';

interface Page {
  id: string;
  slug: string;
  title: string;
  content: string;
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
  lastUpdated: any;
}

const CMS = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<Page | null>(null);
  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    content: '',
    seoTitle: '',
    seoDescription: '',
    seoKeywords: ''
  });

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'pages'), orderBy('slug', 'asc'));
      const snapshot = await getDocs(q);
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Page[];
      setPages(items);
    } catch (error) {
      console.error('Error fetching pages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (page: Page | null = null) => {
    if (page) {
      setEditingPage(page);
      setFormData({
        slug: page.slug,
        title: page.title,
        content: page.content,
        seoTitle: page.seo?.title || '',
        seoDescription: page.seo?.description || '',
        seoKeywords: page.seo?.keywords || ''
      });
    } else {
      setEditingPage(null);
      setFormData({
        slug: '',
        title: '',
        content: '',
        seoTitle: '',
        seoDescription: '',
        seoKeywords: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const pageData = {
        slug: formData.slug,
        title: formData.title,
        content: formData.content,
        seo: {
          title: formData.seoTitle,
          description: formData.seoDescription,
          keywords: formData.seoKeywords
        },
        lastUpdated: serverTimestamp()
      };

      if (editingPage) {
        await updateDoc(doc(db, 'pages', editingPage.id), pageData);
      } else {
        await addDoc(collection(db, 'pages'), pageData);
      }
      
      setIsModalOpen(false);
      fetchPages();
    } catch (error) {
      console.error('Error saving page:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this page?')) {
      setLoading(true);
      try {
        await deleteDoc(doc(db, 'pages', id));
        fetchPages();
      } catch (error) {
        console.error('Error deleting page:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-neutral-900 tracking-tight mb-2">Content Management</h1>
          <p className="text-neutral-500 font-medium">Manage your website's dynamic pages and SEO settings.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="btn-primary px-8 py-3 text-sm font-bold shadow-lg shadow-primary/20 flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Create New Page</span>
        </button>
      </div>

      {/* Pages List */}
      <div className="bg-white rounded-[3rem] border border-neutral-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-neutral-100 flex items-center justify-between">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
            <input 
              type="text" 
              placeholder="Filter pages..." 
              className="w-full bg-neutral-100 border-none rounded-2xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-neutral-50">
                <th className="px-8 py-4 text-xs font-black text-neutral-400 uppercase tracking-widest">Page Title</th>
                <th className="px-8 py-4 text-xs font-black text-neutral-400 uppercase tracking-widest">Slug</th>
                <th className="px-8 py-4 text-xs font-black text-neutral-400 uppercase tracking-widest">Last Updated</th>
                <th className="px-8 py-4 text-xs font-black text-neutral-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {loading && pages.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center">
                    <Loader2 className="animate-spin mx-auto text-primary" size={32} />
                  </td>
                </tr>
              ) : pages.length > 0 ? pages.map((page) => (
                <tr key={page.id} className="hover:bg-neutral-50 transition-all group">
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-4">
                      <div className="bg-primary/5 p-3 rounded-xl text-primary">
                        <FileText size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-neutral-900">{page.title}</p>
                        <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Dynamic Page</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-2 text-neutral-500 font-bold text-sm">
                      <Globe size={14} className="text-neutral-300" />
                      <span>/{page.slug}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-sm text-neutral-500 font-medium">
                      {page.lastUpdated ? new Date(page.lastUpdated.seconds * 1000).toLocaleDateString() : 'N/A'}
                    </p>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        onClick={() => handleOpenModal(page)}
                        className="p-2 text-neutral-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(page.id)}
                        className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center justify-center text-neutral-400">
                      <AlertCircle size={48} className="mb-4 opacity-20" />
                      <p className="font-bold">No dynamic pages found.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Page Editor Modal */}
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
              className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[3rem] shadow-2xl relative z-10"
            >
              <div className="p-10">
                <div className="flex items-center justify-between mb-10">
                  <div>
                    <h2 className="text-3xl font-black text-neutral-900 tracking-tight">
                      {editingPage ? 'Edit Page' : 'Create New Page'}
                    </h2>
                    <p className="text-neutral-500 font-medium">Configure content and SEO settings.</p>
                  </div>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="p-3 text-neutral-400 hover:bg-neutral-100 rounded-full transition-all"
                  >
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-10">
                  {/* Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-neutral-400 ml-4">Page Title</label>
                      <input 
                        type="text" 
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        className="w-full bg-neutral-100 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="e.g. Summer Camp 2026"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-neutral-400 ml-4">URL Slug</label>
                      <div className="relative">
                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                        <input 
                          type="text" 
                          required
                          value={formData.slug}
                          onChange={(e) => setFormData({...formData, slug: e.target.value})}
                          className="w-full bg-neutral-100 border-none rounded-2xl pl-12 pr-6 py-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                          placeholder="summer-camp-2026"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Content Editor */}
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-neutral-400 ml-4">Page Content (Markdown/HTML)</label>
                    <textarea 
                      required
                      value={formData.content}
                      onChange={(e) => setFormData({...formData, content: e.target.value})}
                      rows={10}
                      className="w-full bg-neutral-100 border-none rounded-[2rem] px-6 py-6 text-sm focus:ring-2 focus:ring-primary/20 transition-all font-mono"
                      placeholder="# Welcome to our page..."
                    />
                  </div>

                  {/* SEO Settings */}
                  <div className="bg-neutral-50 p-8 rounded-[2.5rem] border border-neutral-100 space-y-8">
                    <div className="flex items-center space-x-3 text-primary">
                      <ShieldCheck size={20} />
                      <h3 className="font-black uppercase tracking-widest text-xs">SEO & Meta Settings</h3>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-neutral-400 ml-4">Meta Title</label>
                        <input 
                          type="text" 
                          value={formData.seoTitle}
                          onChange={(e) => setFormData({...formData, seoTitle: e.target.value})}
                          className="w-full bg-white border border-neutral-200 rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                          placeholder="Page title for search engines"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-neutral-400 ml-4">Meta Description</label>
                        <textarea 
                          value={formData.seoDescription}
                          onChange={(e) => setFormData({...formData, seoDescription: e.target.value})}
                          rows={3}
                          className="w-full bg-white border border-neutral-200 rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                          placeholder="Brief description for search results"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-neutral-400 ml-4">Keywords</label>
                        <input 
                          type="text" 
                          value={formData.seoKeywords}
                          onChange={(e) => setFormData({...formData, seoKeywords: e.target.value})}
                          className="w-full bg-white border border-neutral-200 rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                          placeholder="tuition, nottingham, academy, etc."
                        />
                      </div>
                    </div>
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
                          <span>Save Page</span>
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

export default CMS;
