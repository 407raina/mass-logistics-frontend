import React, { useState } from 'react';
import { Search, ArrowLeft, DollarSign, Plus, Trash2, Calculator, Calendar, FileText, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AssignExpenses = () => {
  const [searchForm, setSearchForm] = useState({
    operationNo: '',
    clientName: ''
  });

  const [expenseForm, setExpenseForm] = useState({
    item: '',
    actualAmount: '',
    vatPercentage: 0,
    vatAmount: 0,
    amount: '',
    dateOfPayment: ''
  });

  const [expenses, setExpenses] = useState([
    {
      id: 1,
      item: 'Container Claims (مطالبة الحويات)',
      actualAmount: 90.85,
      vatPercentage: 0,
      vatAmount: 0.00,
      amount: 90.85,
      dateOfPayment: '2025-02-05'
    }
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const expenseItems = [
    'Container Claims (مطالبة الحويات)',
    'Transportation Costs',
    'Storage Fees',
    'Handling Charges',
    'Documentation Fees',
    'Customs Clearance',
    'Port Charges',
    'Insurance Premium',
    'Demurrage Charges',
    'Other Expenses'
  ];

  const handleSearchChange = (field, value) => {
    setSearchForm(prev => ({ ...prev, [field]: value }));
  };

  const handleExpenseChange = (field, value) => {
    setExpenseForm(prev => {
      const updated = { ...prev, [field]: value };
      
      if (field === 'actualAmount' || field === 'vatPercentage') {
        const actualAmount = parseFloat(updated.actualAmount) || 0;
        const vatPercentage = parseFloat(updated.vatPercentage) || 0;
        const vatAmount = (actualAmount * vatPercentage) / 100;
        
        updated.vatAmount = vatAmount;
        updated.amount = (actualAmount + vatAmount).toFixed(2);
      }
      
      return updated;
    });
  };

  const addExpense = async () => {
    if (!expenseForm.item || !expenseForm.actualAmount) {
      setError('Please select an expense item and enter the actual amount.');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const newExpense = {
        id: Date.now(),
        item: expenseForm.item,
        actualAmount: parseFloat(expenseForm.actualAmount),
        vatPercentage: parseFloat(expenseForm.vatPercentage) || 0,
        vatAmount: parseFloat(expenseForm.vatAmount) || 0,
        amount: parseFloat(expenseForm.amount) || parseFloat(expenseForm.actualAmount),
        dateOfPayment: expenseForm.dateOfPayment
      };

      setExpenses(prev => [...prev, newExpense]);
      
      setExpenseForm({
        item: '',
        actualAmount: '',
        vatPercentage: 0,
        vatAmount: 0,
        amount: '',
        dateOfPayment: ''
      });

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      setError('Failed to add expense. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const removeExpense = (id) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  const getTotalAmount = () => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0).toFixed(2);
  };

  const handleSearch = () => {
    console.log('Searching with:', searchForm);
  };

  return (
    <div className="w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen p-0 m-0 font-sans">
      {/* Header */}
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
              <DollarSign size={28} className="text-blue-200" />
            </div>
            <div>
              <h1 className="m-0 text-white text-2xl font-bold tracking-wide">ASSIGN EXPENSES</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 max-w-7xl mx-auto">
        {/* Search Section */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 text-white px-8 py-6 flex items-center gap-4 shadow-xl">
            <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
              <Search className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold m-0">Search Operation</h2>
            </div>
          </div>
          
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-3">
                <label className="text-slate-700 text-sm font-bold flex items-center gap-3">
                  <FileText size={18} className="text-slate-500" />
                  Operation Number
                  <span className="text-red-500 font-bold">*</span>
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Enter Operation Number"
                    value={searchForm.operationNo}
                    onChange={(e) => handleSearchChange('operationNo', e.target.value)}
                    className="flex-1 h-12 border-2 border-slate-200 rounded-2xl px-4 text-base bg-white/90 backdrop-blur-sm transition-all duration-300 text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 placeholder-slate-400 shadow-lg font-medium"
                  />
                  <button 
                    onClick={handleSearch} 
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-none rounded-2xl cursor-pointer flex items-center justify-center transition-all duration-300 px-6 py-3 h-12 min-w-16 hover:from-blue-600 hover:to-blue-700 hover:shadow-lg hover:scale-105 active:scale-95 shadow-md"
                  >
                    <Search size={18} />
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col gap-3">
                <label className="text-slate-700 text-sm font-bold flex items-center gap-3">
                  <FileText size={18} className="text-slate-500" />
                  Client Name
                  <span className="text-red-500 font-bold">*</span>
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Enter Client Name"
                    value={searchForm.clientName}
                    onChange={(e) => handleSearchChange('clientName', e.target.value)}
                    className="flex-1 h-12 border-2 border-slate-200 rounded-2xl px-4 text-base bg-white/90 backdrop-blur-sm transition-all duration-300 text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 placeholder-slate-400 shadow-lg font-medium"
                  />
                  <button 
                    onClick={handleSearch} 
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-none rounded-2xl cursor-pointer flex items-center justify-center transition-all duration-300 px-6 py-3 h-12 min-w-16 hover:from-blue-600 hover:to-blue-700 hover:shadow-lg hover:scale-105 active:scale-95 shadow-md"
                  >
                    <Search size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Expense Form Section */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 text-white px-8 py-6 flex items-center gap-4 shadow-xl">
            <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
              <Calculator className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold m-0">Expense Details</h2>
            </div>
          </div>

          {/* Success/Error Messages */}
          {success && (
            <div className="mx-8 mt-6 bg-green-50 border border-green-200 rounded-2xl p-6 flex items-center gap-3">
              <CheckCircle className="text-green-600 flex-shrink-0" size={24} />
              <div>
                <h3 className="text-green-800 font-bold text-base">Success!</h3>
                <p className="text-green-700 text-sm">Expense has been added successfully.</p>
              </div>
            </div>
          )}

          {error && (
            <div className="mx-8 mt-6 bg-red-50 border border-red-200 rounded-2xl p-6 flex items-center gap-3">
              <AlertCircle className="text-red-600 flex-shrink-0" size={24} />
              <div>
                <h3 className="text-red-800 font-bold text-base">Error</h3>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          )}
          
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 mb-8">
              <div className="flex flex-col gap-3">
                <label className="text-slate-700 text-sm font-bold">Expense Item</label>
                <select
                  value={expenseForm.item}
                  onChange={(e) => handleExpenseChange('item', e.target.value)}
                  className="h-12 border-2 border-slate-200 rounded-2xl px-4 text-base bg-white/90 backdrop-blur-sm transition-all duration-300 text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 shadow-lg font-medium"
                >
                  <option value="">Select Item</option>
                  {expenseItems.map((item, index) => (
                    <option key={index} value={item}>{item}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex flex-col gap-3">
                <label className="text-slate-700 text-sm font-bold">Actual Amount</label>
                <input
                  type="number"
                  step="0.01"
                  value={expenseForm.actualAmount}
                  onChange={(e) => handleExpenseChange('actualAmount', e.target.value)}
                  className="h-12 border-2 border-slate-200 rounded-2xl px-4 text-base bg-white/90 backdrop-blur-sm transition-all duration-300 text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 placeholder-slate-400 shadow-lg font-medium"
                  placeholder="0.00"
                />
              </div>
              
              <div className="flex flex-col gap-3">
                <label className="text-slate-700 text-sm font-bold">VAT (%)</label>
                <input
                  type="number"
                  step="0.01"
                  value={expenseForm.vatPercentage}
                  onChange={(e) => handleExpenseChange('vatPercentage', e.target.value)}
                  className="h-12 border-2 border-slate-200 rounded-2xl px-4 text-base bg-white/90 backdrop-blur-sm transition-all duration-300 text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 placeholder-slate-400 shadow-lg font-medium"
                  placeholder="0"
                />
              </div>
              
              <div className="flex flex-col gap-3">
                <label className="text-slate-700 text-sm font-bold">VAT Amount</label>
                <input
                  type="number"
                  step="0.01"
                  value={expenseForm.vatAmount.toFixed(2)}
                  readOnly
                  className="h-12 border-2 border-slate-200 rounded-2xl px-4 text-base bg-slate-100 text-slate-600 cursor-not-allowed shadow-lg font-medium"
                  placeholder="0.00"
                />
              </div>
              
              <div className="flex flex-col gap-3">
                <label className="text-slate-700 text-sm font-bold">Total Amount</label>
                <input
                  type="number"
                  step="0.01"
                  value={expenseForm.amount}
                  readOnly
                  className="h-12 border-2 border-slate-200 rounded-2xl px-4 text-base bg-slate-100 text-slate-600 cursor-not-allowed shadow-lg font-medium"
                  placeholder="0.00"
                />
              </div>
              
              <div className="flex flex-col gap-3">
                <label className="text-slate-700 text-sm font-bold flex items-center gap-2">
                  <Calendar size={16} className="text-slate-500" />
                  Payment Date
                </label>
                <input
                  type="date"
                  value={expenseForm.dateOfPayment}
                  onChange={(e) => handleExpenseChange('dateOfPayment', e.target.value)}
                  className="h-12 border-2 border-slate-200 rounded-2xl px-4 text-base bg-white/90 backdrop-blur-sm transition-all duration-300 text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 shadow-lg font-medium"
                />
              </div>
            </div>

            <div className="flex justify-center pt-6 border-t border-slate-200">
              <button 
                onClick={addExpense} 
                className="bg-gradient-to-r from-emerald-500 via-green-600 to-emerald-600 text-white border-none rounded-2xl cursor-pointer flex items-center justify-center gap-3 text-base font-bold transition-all duration-300 px-10 py-4 h-14 min-w-32 hover:from-emerald-600 hover:via-green-700 hover:to-emerald-700 hover:shadow-xl hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed disabled:from-slate-400 disabled:to-slate-500 disabled:scale-100 active:scale-95 shadow-lg uppercase tracking-wide"
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
                    Add Expense
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Expense Items Table */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
          <div className="bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 text-white px-8 py-6 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                <FileText size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold m-0">Expense Items</h3>
              </div>
            </div>
            <div className="bg-white/20 px-6 py-3 rounded-xl backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <DollarSign size={18} />
                <span className="text-base font-bold">Total: ${getTotalAmount()}</span>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-gradient-to-r from-slate-50 to-slate-100">
                  <th className="border-b-2 border-slate-300 py-4 px-6 text-left font-bold text-slate-700 uppercase tracking-wide text-sm">Expense Item</th>
                  <th className="border-b-2 border-slate-300 py-4 px-6 text-left font-bold text-slate-700 uppercase tracking-wide text-sm">Actual Amount</th>
                  <th className="border-b-2 border-slate-300 py-4 px-6 text-left font-bold text-slate-700 uppercase tracking-wide text-sm">VAT (%)</th>
                  <th className="border-b-2 border-slate-300 py-4 px-6 text-left font-bold text-slate-700 uppercase tracking-wide text-sm">VAT Amount</th>
                  <th className="border-b-2 border-slate-300 py-4 px-6 text-left font-bold text-slate-700 uppercase tracking-wide text-sm">Total Amount</th>
                  <th className="border-b-2 border-slate-300 py-4 px-6 text-left font-bold text-slate-700 uppercase tracking-wide text-sm">Payment Date</th>
                  <th className="border-b-2 border-slate-300 py-4 px-6 text-center font-bold text-slate-700 uppercase tracking-wide text-sm">Action</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense, index) => (
                  <tr key={expense.id} className={`${index % 2 === 1 ? 'bg-slate-50/50' : 'bg-white'} hover:bg-blue-50 transition-all duration-200 border-b border-slate-200`}>
                    <td className="py-4 px-6 text-slate-800 font-medium">{expense.item}</td>
                    <td className="py-4 px-6 text-slate-800 font-medium">${expense.actualAmount.toFixed(2)}</td>
                    <td className="py-4 px-6 text-slate-800 font-medium">{expense.vatPercentage}%</td>
                    <td className="py-4 px-6 text-slate-800 font-medium">${expense.vatAmount.toFixed(2)}</td>
                    <td className="py-4 px-6 text-green-600 font-bold text-lg">${expense.amount.toFixed(2)}</td>
                    <td className="py-4 px-6 text-slate-800 font-medium">{expense.dateOfPayment || '-'}</td>
                    <td className="py-4 px-6 text-center">
                      <button 
                        onClick={() => removeExpense(expense.id)}
                        className="bg-gradient-to-r from-red-500 to-red-600 text-white border-none rounded-xl px-4 py-2 cursor-pointer text-sm font-bold transition-all duration-200 flex items-center gap-2 mx-auto hover:from-red-600 hover:to-red-700 hover:shadow-lg hover:scale-105 active:scale-95"
                        title="Remove expense"
                      >
                        <Trash2 size={16} />
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
                {expenses.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center py-20">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
                        <AlertCircle className="text-slate-400" size={24} />
                      </div>
                      <h3 className="text-slate-600 text-lg font-semibold mb-2">No Expenses Added</h3>
                      <p className="text-slate-500 text-sm">Add your first expense item using the form above.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignExpenses;
