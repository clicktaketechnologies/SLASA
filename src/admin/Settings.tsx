import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Mail, 
  Phone, 
  Shield, 
  Globe, 
  Save, 
  Loader2,
  Smartphone,
  Zap,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { motion } from 'motion/react';

const Settings = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-neutral-900 tracking-tight mb-2">System Settings</h1>
          <p className="text-neutral-500 font-medium">Configure global academy settings and automation triggers.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={loading}
          className="btn-primary px-10 py-3 text-sm font-bold shadow-lg shadow-primary/20 flex items-center space-x-2"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : (
            <>
              {success ? <CheckCircle size={20} /> : <Save size={20} />}
              <span>{success ? 'Settings Saved' : 'Save Changes'}</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* General Settings */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-10 rounded-[3rem] border border-neutral-100 shadow-sm space-y-8">
            <div className="flex items-center space-x-3 text-primary">
              <Globe size={20} />
              <h3 className="font-black uppercase tracking-widest text-xs">Academy Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-neutral-400 ml-4">Academy Name</label>
                <input 
                  type="text" 
                  defaultValue="HRMA Academy"
                  className="w-full bg-neutral-100 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all font-bold"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-neutral-400 ml-4">Support Email</label>
                <input 
                  type="email" 
                  defaultValue="support@hrma.edu"
                  className="w-full bg-neutral-100 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all font-bold"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-neutral-400 ml-4">Contact Phone</label>
                <input 
                  type="text" 
                  defaultValue="+44 115 123 4567"
                  className="w-full bg-neutral-100 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all font-bold"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-neutral-400 ml-4">Address</label>
                <input 
                  type="text" 
                  defaultValue="123 Academy Way, Nottingham"
                  className="w-full bg-neutral-100 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all font-bold"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[3rem] border border-neutral-100 shadow-sm space-y-8">
            <div className="flex items-center space-x-3 text-secondary">
              <Zap size={20} />
              <h3 className="font-black uppercase tracking-widest text-xs">Automation & Alerts</h3>
            </div>
            
            <div className="space-y-6">
              {[
                { label: 'Fee Payment Reminders', desc: 'Send automatic SMS/Email 3 days before due date.', icon: Smartphone, enabled: true },
                { label: 'Exam Schedule Alerts', desc: 'Notify students when new exam dates are published.', icon: Bell, enabled: true },
                { label: 'Weekly Progress Reports', desc: 'Email parents a summary of their child\'s weekly performance.', icon: Mail, enabled: false },
                { label: 'Lead Follow-up', desc: 'Auto-reply to new website inquiries via WhatsApp.', icon: Phone, enabled: true },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-6 rounded-3xl bg-neutral-50 border border-neutral-100 hover:border-primary/20 transition-all group">
                  <div className="flex items-center space-x-6">
                    <div className="bg-white p-4 rounded-2xl text-neutral-400 group-hover:text-primary transition-all shadow-sm">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <p className="font-black text-neutral-900">{item.label}</p>
                      <p className="text-xs text-neutral-500 font-medium">{item.desc}</p>
                    </div>
                  </div>
                  <button className={`w-14 h-8 rounded-full relative transition-all ${item.enabled ? 'bg-primary' : 'bg-neutral-300'}`}>
                    <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${item.enabled ? 'left-7' : 'left-1'}`}></div>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Security & Access */}
        <div className="space-y-10">
          <div className="bg-neutral-900 text-white p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center space-x-3 text-primary mb-8">
                <Shield size={20} />
                <h3 className="font-black uppercase tracking-widest text-xs">Security Controls</h3>
              </div>
              
              <div className="space-y-8">
                <div>
                  <p className="text-sm font-black mb-4">Two-Factor Authentication</p>
                  <button className="w-full py-3 rounded-xl bg-white/10 border border-white/10 text-xs font-black uppercase tracking-widest hover:bg-white/20 transition-all">
                    Enable 2FA
                  </button>
                </div>
                <div>
                  <p className="text-sm font-black mb-4">IP Whitelisting</p>
                  <p className="text-xs text-neutral-400 mb-4">Restrict admin access to specific IP addresses.</p>
                  <button className="w-full py-3 rounded-xl bg-white/10 border border-white/10 text-xs font-black uppercase tracking-widest hover:bg-white/20 transition-all">
                    Configure IPs
                  </button>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-primary/10 rounded-full blur-3xl"></div>
          </div>

          <div className="bg-white p-8 rounded-[3rem] border border-neutral-100 shadow-sm">
            <div className="flex items-center space-x-3 text-red-500 mb-6">
              <AlertCircle size={20} />
              <h3 className="font-black uppercase tracking-widest text-xs">Danger Zone</h3>
            </div>
            <p className="text-xs text-neutral-500 mb-6">Once you delete data, it cannot be recovered. Please be careful.</p>
            <button className="w-full py-4 rounded-2xl bg-red-50 text-red-600 text-xs font-black uppercase tracking-widest hover:bg-red-100 transition-all">
              Reset System Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
