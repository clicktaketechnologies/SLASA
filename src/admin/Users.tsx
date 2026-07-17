import React, { useState, useEffect } from 'react';
import { 
  Users as UsersIcon, 
  Search, 
  Shield, 
  MoreVertical, 
  Mail, 
  ShieldCheck,
  ShieldAlert,
  UserCheck,
  UserX,
  Loader2,
  AlertCircle,
  ChevronRight,
  UserPlus,
  X
} from 'lucide-react';
import { collection, query, orderBy, getDocs, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { motion, AnimatePresence } from 'motion/react';

interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  role: 'super_admin' | 'admin' | 'staff' | 'teacher' | 'student' | 'parent';
  createdAt: any;
  lastLogin: any;
}

const Users = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'users'), orderBy('role', 'asc'));
      const snapshot = await getDocs(q);
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as UserProfile[];
      setUsers(items);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (id: string, newRole: UserProfile['role']) => {
    try {
      await updateDoc(doc(db, 'users', id), { role: newRole });
      fetchUsers();
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  const filteredUsers = filter === 'all' ? users : users.filter(u => u.role === filter);

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'super_admin': return 'bg-red-50 text-red-600 border-red-100';
      case 'admin': return 'bg-orange-50 text-orange-600 border-orange-100';
      case 'staff': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'teacher': return 'bg-purple-50 text-purple-600 border-purple-100';
      case 'student': return 'bg-green-50 text-green-600 border-green-100';
      case 'parent': return 'bg-neutral-50 text-neutral-600 border-neutral-100';
      default: return 'bg-neutral-50 text-neutral-600 border-neutral-100';
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-neutral-900 tracking-tight mb-2">User Management</h1>
          <p className="text-neutral-500 font-medium">Manage roles and permissions for all system users.</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="bg-white border border-neutral-200 p-1 rounded-xl flex items-center overflow-x-auto max-w-[50vw]">
            {['all', 'admin', 'staff', 'teacher', 'student', 'parent'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                  filter === f ? 'bg-primary text-white shadow-md' : 'text-neutral-400 hover:text-neutral-600'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-[3rem] border border-neutral-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-neutral-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
            <input 
              type="text" 
              placeholder="Search users by name or email..." 
              className="w-full bg-neutral-100 border-none rounded-2xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
          <button className="btn-primary px-6 py-3 text-xs font-black uppercase tracking-widest flex items-center space-x-2">
            <UserPlus size={18} />
            <span>Add New User</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-neutral-50">
                <th className="px-8 py-4 text-xs font-black text-neutral-400 uppercase tracking-widest">User Details</th>
                <th className="px-8 py-4 text-xs font-black text-neutral-400 uppercase tracking-widest">Current Role</th>
                <th className="px-8 py-4 text-xs font-black text-neutral-400 uppercase tracking-widest">Last Activity</th>
                <th className="px-8 py-4 text-xs font-black text-neutral-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center">
                    <Loader2 className="animate-spin mx-auto text-primary" size={32} />
                  </td>
                </tr>
              ) : filteredUsers.length > 0 ? filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-neutral-50 transition-all group">
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center font-black text-neutral-400 text-lg">
                        {user.displayName?.charAt(0) || user.email.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-neutral-900">{user.displayName || 'Unnamed User'}</p>
                        <div className="flex items-center space-x-2 text-neutral-400 text-xs font-medium">
                          <Mail size={12} />
                          <span>{user.email}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-3">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${getRoleBadgeColor(user.role)}`}>
                        {user.role.replace('_', ' ')}
                      </span>
                      <select 
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.id, e.target.value as UserProfile['role'])}
                        className="bg-transparent border-none text-[10px] font-black uppercase tracking-widest text-neutral-400 focus:ring-0 cursor-pointer hover:text-primary transition-colors"
                      >
                        <option value="super_admin">Super Admin</option>
                        <option value="admin">Admin</option>
                        <option value="staff">Staff</option>
                        <option value="teacher">Teacher</option>
                        <option value="student">Student</option>
                        <option value="parent">Parent</option>
                      </select>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-sm text-neutral-500 font-medium">
                      {user.lastLogin ? new Date(user.lastLogin.seconds * 1000).toLocaleDateString() : 'Never'}
                    </p>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-all">
                      <button className="p-2 text-neutral-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all">
                        <ShieldCheck size={18} />
                      </button>
                      <button className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                        <UserX size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center justify-center text-neutral-400">
                      <AlertCircle size={48} className="mb-4 opacity-20" />
                      <p className="font-bold">No users found.</p>
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

export default Users;
