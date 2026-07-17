import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Search, 
  Filter, 
  MoreVertical, 
  Mail, 
  Phone, 
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2,
  ChevronRight,
  UserPlus
} from 'lucide-react';
import { collection, query, orderBy, getDocs, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { motion, AnimatePresence } from 'motion/react';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'new' | 'contacted' | 'enrolled' | 'lost';
  source: string;
  createdAt: any;
}

const Leads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Lead[];
      setLeads(items);
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: Lead['status']) => {
    try {
      await updateDoc(doc(db, 'leads', id), { status: newStatus });
      fetchLeads();
    } catch (error) {
      console.error('Error updating lead status:', error);
    }
  };

  const filteredLeads = filter === 'all' ? leads : leads.filter(l => l.status === filter);

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-neutral-900 tracking-tight mb-2">Lead Management</h1>
          <p className="text-neutral-500 font-medium">Track and convert potential students into enrollments.</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="bg-white border border-neutral-200 p-1 rounded-xl flex items-center">
            {['all', 'new', 'contacted', 'enrolled'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
                  filter === f ? 'bg-primary text-white shadow-md' : 'text-neutral-400 hover:text-neutral-600'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-[3rem] border border-neutral-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-neutral-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
            <input 
              type="text" 
              placeholder="Search leads by name or email..." 
              className="w-full bg-neutral-100 border-none rounded-2xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
          <button className="flex items-center space-x-2 text-neutral-500 font-bold text-sm hover:text-primary transition-colors">
            <Filter size={18} />
            <span>Advanced Filters</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-neutral-50">
                <th className="px-8 py-4 text-xs font-black text-neutral-400 uppercase tracking-widest">Student Info</th>
                <th className="px-8 py-4 text-xs font-black text-neutral-400 uppercase tracking-widest">Contact</th>
                <th className="px-8 py-4 text-xs font-black text-neutral-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-4 text-xs font-black text-neutral-400 uppercase tracking-widest">Date Joined</th>
                <th className="px-8 py-4 text-xs font-black text-neutral-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center">
                    <Loader2 className="animate-spin mx-auto text-primary" size={32} />
                  </td>
                </tr>
              ) : filteredLeads.length > 0 ? filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-neutral-50 transition-all group">
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center font-black text-primary text-lg">
                        {lead.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-neutral-900">{lead.name}</p>
                        <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">{lead.source || 'Website Form'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-neutral-500 text-sm font-medium">
                        <Mail size={14} className="text-neutral-300" />
                        <span>{lead.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-neutral-500 text-sm font-medium">
                        <Phone size={14} className="text-neutral-300" />
                        <span>{lead.phone || 'N/A'}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <select 
                      value={lead.status}
                      onChange={(e) => handleStatusChange(lead.id, e.target.value as Lead['status'])}
                      className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer ${
                        lead.status === 'new' ? 'bg-blue-50 text-blue-600' :
                        lead.status === 'contacted' ? 'bg-orange-50 text-orange-600' :
                        lead.status === 'enrolled' ? 'bg-green-50 text-green-600' :
                        'bg-red-50 text-red-600'
                      }`}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="enrolled">Enrolled</option>
                      <option value="lost">Lost</option>
                    </select>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-2 text-neutral-400 text-sm font-medium">
                      <Calendar size={14} />
                      <span>{lead.createdAt ? new Date(lead.createdAt.seconds * 1000).toLocaleDateString() : 'N/A'}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-2 text-neutral-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all">
                        <Mail size={18} />
                      </button>
                      <button className="p-2 text-neutral-400 hover:text-secondary hover:bg-secondary/5 rounded-lg transition-all">
                        <UserPlus size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center justify-center text-neutral-400">
                      <AlertCircle size={48} className="mb-4 opacity-20" />
                      <p className="font-bold">No leads found matching your criteria.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leads;
