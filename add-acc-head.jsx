import React, { useState } from 'react';
import { Plus, ArrowLeft, Building2, TrendingUp, TrendingDown, Edit3, CheckCircle, AlertCircle, Loader2, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AccountHead = () => {
  const [accountType, setAccountType] = useState('');
  const [accountHead, setAccountHead] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  const [accounts, setAccounts] = useState([
    { id: 1, accountType: 'Asset', accountHead: 'Current Asset' },
    { id: 2, accountType: 'Asset', accountHead: 'Loans And Advance(Asset)' },
    { id: 3, accountType: 'Asset', accountHead: 'Account Receivable' },
    { id: 4, accountType: 'Liability', accountHead: 'Account Payable' },
    { id: 5, accountType: 'Asset', accountHead: 'Cash in Hand' },
    { id: 6, accountType: 'Liability', accountHead: 'Current Liability' },
    { id: 7, accountType: 'Liability', accountHead: 'Capital Account' },
    { id: 8, accountType: 'Asset', accountHead: 'Bank Account' },
    { id: 9, accountType: 'Asset', accountHead: 'Fixed Asset' },
    { id: 10, accountType: 'Asset', accountHead: 'Investment' },
    { id: 11, accountType: 'Liability', accountHead: 'Loans(Liability)' },
    { id: 12, accountType: 'Asset', accountHead: 'Misc. Expense(Asset)' },
    { id: 13, accountType: 'Liability', accountHead: 'Provisions' },
  ]);

  const handleAdd = async () => {
    if (!accountType.trim()) {
      setError('Please select an account type');
      return;
    }
    if (!accountHead.trim()) {
      setError('Please enter an account head name');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const newAccount = {
        id: Math.max(...accounts.map(a => a.id)) + 1,
        accountType: accountType.trim(),
        accountHead: accountHead.trim()
      };
      
      setAccounts([...accounts, newAccount]);
      setAccountType('');
      setAccountHead('');
      setSuccess(true);
      
      // Auto-hide success message
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      setError('Failed to add account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (id) => {
    setAccounts(accounts.filter(account => account.id !== id));
  };

  const getAccountTypeIcon = (type) => {
    return type === 'Asset' ? 
      <TrendingUp className="text-green-600" size={16} /> : 
      <TrendingDown className="text-red-600" size={16} />;
  };

  const getAccountStats = () => {
    const assetCount = accounts.filter(acc => acc.accountType === 'Asset').length;
    const liabilityCount = accounts.filter(acc => acc.accountType === 'Liability').length;
    return { assetCount, liabilityCount };
  };

  const { assetCount, liabilityCount } = getAccountStats();

  return (
    <div className="w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen p-0 m-0 font-sans">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white px-6 py-5 shadow-2xl border-b-4 border-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent"></div>
        <div className="flex items-center gap-4 max-w-7xl mx-auto relative z-10">
          <button 
            className="bg-white/10 backdrop-blur-md border border-white/20 text-white p-3 rounded-xl cursor-pointer flex items-center justify-center transition-all duration-300 w-12 h-12 hover:bg-white/20 hover:scale-105 active:scale-95 shadow-lg"
            onClick={() => navigate('/')}
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-4">
            <div className="bg-white/15 p-3 rounded-xl backdrop-blur-sm">
              <Building2 size={28} className="text-blue-200" />
            </div>
            <div>
              <h1 className="m-0 text-white text-2xl font-bold tracking-wide">ACCOUNT HEAD MANAGEMENT</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-8 pt-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/50">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-xl">
                <TrendingUp className="text-green-600" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800">{assetCount}</h3>
                <p className="text-slate-600 font-medium">Asset Accounts</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/50">
            <div className="flex items-center gap-4">
              <div className="bg-red-100 p-3 rounded-xl">
                <TrendingDown className="text-red-600" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800">{liabilityCount}</h3>
                <p className="text-slate-600 font-medium">Liability Accounts</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/50">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-xl">
                <Building2 className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800">{accounts.length}</h3>
                <p className="text-slate-600 font-medium">Total Accounts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="px-8 pb-8 max-w-7xl mx-auto">
        <div className="flex gap-8 items-start">
          {/* Enhanced Left Form Section */}
          <div className="flex-none w-96 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full -translate-y-16 translate-x-16 opacity-70"></div>
            
            {/* Form Header */}
            <div className="bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 text-white px-8 py-6 rounded-t-3xl flex items-center gap-4 shadow-xl relative z-10">
              <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                <Plus className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold m-0">Add New Account</h3>
              </div>
            </div>
            
            {/* Success/Error Messages */}
            {success && (
              <div className="mx-8 mt-6 bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3">
                <CheckCircle className="text-green-600 flex-shrink-0" size={20} />
                <div>
                  <p className="text-green-800 font-semibold text-sm">Account added successfully!</p>
                </div>
              </div>
            )}

            {error && (
              <div className="mx-8 mt-6 bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center gap-3">
                <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
                <div>
                  <p className="text-red-800 font-semibold text-sm">{error}</p>
                </div>
              </div>
            )}
            
            {/* Form Body */}
            <div className="p-8 relative z-10">
              {/* Account Type Field */}
              <div className="mb-6">
                <label className="block mb-3 font-bold text-slate-700 text-sm flex items-center gap-2">
                  <Building2 size={16} className="text-slate-500" />
                  Account Type
                  <span className="text-red-500 font-bold">*</span>
                </label>
                <select 
                  value={accountType} 
                  onChange={(e) => {
                    setAccountType(e.target.value);
                    if (error) setError('');
                  }}
                  className="w-full h-12 border-2 border-slate-200 rounded-2xl px-4 text-base bg-white/90 backdrop-blur-sm transition-all duration-300 text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 shadow-lg font-medium"
                  disabled={isLoading}
                >
                  <option value="">Select Account Type</option>
                  <option value="Asset">Asset</option>
                  <option value="Liability">Liability</option>
                </select>
              </div>
              
              {/* Account Head Field */}
              <div className="mb-8">
                <label className="block mb-3 font-bold text-slate-700 text-sm flex items-center gap-2">
                  <Edit3 size={16} className="text-slate-500" />
                  Account Head Name
                  <span className="text-red-500 font-bold">*</span>
                </label>
                <input 
                  type="text" 
                  value={accountHead}
                  onChange={(e) => {
                    setAccountHead(e.target.value);
                    if (error) setError('');
                  }}
                  className="w-full h-12 border-2 border-slate-200 rounded-2xl px-4 text-base bg-white/90 backdrop-blur-sm transition-all duration-300 text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 placeholder-slate-400 shadow-lg font-medium"
                  placeholder="Enter account head name"
                  disabled={isLoading}
                />
              </div>
              
              {/* Add Button */}
              <button 
                className="w-full bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 text-white border-none rounded-2xl cursor-pointer flex items-center justify-center gap-3 text-base font-bold transition-all duration-300 py-4 h-14 hover:from-blue-600 hover:via-blue-700 hover:to-indigo-700 hover:shadow-xl hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed disabled:from-slate-400 disabled:to-slate-500 disabled:scale-100 active:scale-95 shadow-lg uppercase tracking-wide"
                onClick={handleAdd}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <Plus size={20} />
                    Add Account
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Enhanced Right Table Section */}
          <div className="flex-1 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 min-w-0 overflow-hidden">
            {/* Table Header */}
            <div className="bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 text-white px-8 py-6 flex items-center gap-4 shadow-xl">
              <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                <Building2 className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold m-0">Account Head Directory</h3>
              </div>
            </div>
            
            {/* Table Container */}
            <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-slate-50 to-slate-100 sticky top-0 z-10">
                    <th className="border-b-2 border-slate-300 border-r border-slate-200 py-4 px-6 text-left font-bold text-slate-700 uppercase tracking-wide text-sm">
                      #
                    </th>
                    <th className="border-b-2 border-slate-300 border-r border-slate-200 py-4 px-6 text-left font-bold text-slate-700 uppercase tracking-wide text-sm">
                      Account Type
                    </th>
                    <th className="border-b-2 border-slate-300 border-r border-slate-200 py-4 px-6 text-left font-bold text-slate-700 uppercase tracking-wide text-sm">
                      Account Head
                    </th>
                    <th className="border-b-2 border-slate-300 py-4 px-6 text-center font-bold text-slate-700 uppercase tracking-wide text-sm">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {accounts.map((account, index) => (
                    <tr 
                      key={account.id} 
                      className={`${index % 2 === 1 ? 'bg-slate-50/50' : 'bg-white'} hover:bg-blue-50 transition-all duration-200 border-b border-slate-200`}
                    >
                      <td className="border-r border-slate-200 py-4 px-6 align-middle text-slate-600 font-semibold">
                        {index + 1}
                      </td>
                      <td className="border-r border-slate-200 py-4 px-6 align-middle">
                        <div className="flex items-center gap-3">
                          {getAccountTypeIcon(account.accountType)}
                          <span className={`font-semibold ${account.accountType === 'Asset' ? 'text-green-700' : 'text-red-700'}`}>
                            {account.accountType}
                          </span>
                        </div>
                      </td>
                      <td className="border-r border-slate-200 py-4 px-6 align-middle text-slate-700 font-medium">
                        {account.accountHead}
                      </td>
                      <td className="py-4 px-6 align-middle text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button className="bg-blue-100 text-blue-600 border border-blue-200 rounded-lg px-4 py-2 text-xs font-bold transition-all duration-200 hover:bg-blue-600 hover:text-white hover:shadow-lg hover:scale-105 active:scale-95 flex items-center gap-2">
                            <Edit3 size={14} />
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDelete(account.id)}
                            className="bg-red-100 text-red-600 border border-red-200 rounded-lg px-4 py-2 text-xs font-bold transition-all duration-200 hover:bg-red-600 hover:text-white hover:shadow-lg hover:scale-105 active:scale-95 flex items-center gap-2"
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountHead;
