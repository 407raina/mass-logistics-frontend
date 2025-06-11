import React, { useState } from 'react';
import { Search, ArrowLeft, Printer, Calendar, FileText, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PayRepSrch = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [clientName, setClientName] = useState('');
  const [selectAllClients, setSelectAllClients] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentReports, setPaymentReports] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!fromDate || !toDate) return alert('Please select both From and To dates');
    if (!selectAllClients && !clientName.trim()) return alert('Please select a client or check "Select All Clients"');

    setIsLoading(true);
    setShowResults(false);
    try {
      console.log('Searching payment reports:', { fromDate, toDate, clientName, selectAllClients });
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockPaymentReports = [
        {
          id: 1,
          date: '2024-01-15',
          clientName: 'ABC Trading Company',
          invoiceNo: 'INV-001',
          paymentMethod: 'Bank Transfer',
          amount: '$1,500.00',
          status: 'Received'
        },
        {
          id: 2,
          date: '2024-01-20',
          clientName: 'XYZ Logistics',
          invoiceNo: 'INV-002',
          paymentMethod: 'Cash',
          amount: '$2,300.00',
          status: 'Pending'
        },
        {
          id: 3,
          date: '2024-01-22',
          clientName: 'Global Shipping Ltd',
          invoiceNo: 'INV-003',
          paymentMethod: 'Credit Card',
          amount: '$1,800.00',
          status: 'Received'
        }
      ];
      
      setPaymentReports(mockPaymentReports);
      setShowResults(true);
    } catch (error) {
      console.error('Search failed:', error);
      setPaymentReports([]);
      setShowResults(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrint = () => {
    console.log('Printing payment reports');
    window.print();
  };

  const getTotalAmount = () => {
    return paymentReports.reduce((total, payment) => {
      const amount = parseFloat(payment.amount.replace('$', '').replace(',', ''));
      return total + amount;
    }, 0).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Modern Header */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-800 shadow-xl">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center gap-4">
            <button 
              className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white p-3 rounded-xl hover:bg-white/20 transition-all duration-300 hover:scale-105"
              onClick={() => navigate('/dashboard')}
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
            </button>
            <div className="flex items-center gap-3">
              <div className="bg-white/10 p-2 rounded-lg">
                <FileText size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-wide">Payment Reports</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Search Header */}
          <div className="bg-gradient-to-r from-slate-50 to-gray-50 px-8 py-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Search size={20} className="text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Search Parameters</h2>
              </div>
            </div>
          </div>
          
          {/* Form Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Date Range Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar size={18} className="text-blue-600" />
                  <h3 className="text-lg font-medium text-gray-800">Date Range</h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="fromDate" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      From Date
                    </label>
                    <input
                      type="date"
                      id="fromDate"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      className="w-full h-12 border-2 border-gray-200 rounded-xl px-4 text-sm bg-white transition-all duration-200 text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 hover:border-gray-300"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="toDate" className="text-sm font-medium text-gray-700">
                      To Date
                    </label>
                    <input
                      type="date"
                      id="toDate"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                      className="w-full h-12 border-2 border-gray-200 rounded-xl px-4 text-sm bg-white transition-all duration-200 text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 hover:border-gray-300"
                    />
                  </div>
                </div>
              </div>

              {/* Client Selection Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <Users size={18} className="text-blue-600" />
                  <h3 className="text-lg font-medium text-gray-800">Client Selection</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="clientName" className="text-sm font-medium text-gray-700">
                      Client Name
                    </label>
                    <input
                      type="text"
                      id="clientName"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full h-12 border-2 border-gray-200 rounded-xl px-4 text-sm bg-white transition-all duration-200 text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 hover:border-gray-300 disabled:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-500"
                      placeholder="Enter client name"
                      disabled={selectAllClients}
                    />
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                    <input
                      type="checkbox"
                      id="selectAllClients"
                      checked={selectAllClients}
                      onChange={(e) => {
                        setSelectAllClients(e.target.checked);
                        if (e.target.checked) setClientName('');
                      }}
                      className="w-5 h-5 text-blue-600 bg-white border-2 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <label htmlFor="selectAllClients" className="text-sm font-medium text-gray-700 select-none cursor-pointer">
                      Select All Clients
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Search Button */}
            <div className="flex justify-center mt-8 pt-6 border-t border-gray-200">
              <button 
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white border-none rounded-xl cursor-pointer flex items-center justify-center gap-3 text-sm font-semibold transition-all duration-300 px-12 py-4 min-w-[180px] hover:from-blue-700 hover:to-blue-800 hover:shadow-lg hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:bg-gray-400"
                onClick={handleSearch}
                disabled={isLoading}
              >
                <Search size={18} className={isLoading ? 'animate-spin' : ''} />
                {isLoading ? 'Searching...' : 'Search Reports'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {showResults && (
        <div className="max-w-7xl mx-auto px-6 pb-8">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            {/* Results Header */}
            <div className="bg-gradient-to-r from-gray-50 to-slate-50 px-8 py-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Payment Report Results</h3>
                  <p className="text-sm text-gray-600">
                    {paymentReports.length > 0 ? `Found ${paymentReports.length} payment records` : 'No payment records found'}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  {paymentReports.length > 0 && (
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Total Amount: </span>
                      <span className="text-lg font-bold text-green-600">${getTotalAmount()}</span>
                    </div>
                  )}
                  <button 
                    className="bg-gradient-to-r from-green-600 to-green-700 text-white border-none rounded-xl cursor-pointer flex items-center justify-center gap-2 text-sm font-semibold transition-all duration-300 px-6 py-3 hover:from-green-700 hover:to-green-800 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                    onClick={handlePrint}
                    disabled={isLoading || !showResults || paymentReports.length === 0}
                  >
                    <Printer size={16} />
                    Print Report
                  </button>
                </div>
              </div>
            </div>
            
            {/* Table Container */}
            <div className="overflow-hidden">
              {paymentReports.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-blue-700 to-blue-800">
                        <th className="text-white p-4 text-left text-sm font-semibold tracking-wide">Date</th>
                        <th className="text-white p-4 text-left text-sm font-semibold tracking-wide">Client Name</th>
                        <th className="text-white p-4 text-left text-sm font-semibold tracking-wide">Invoice No</th>
                        <th className="text-white p-4 text-left text-sm font-semibold tracking-wide">Payment Method</th>
                        <th className="text-white p-4 text-left text-sm font-semibold tracking-wide">Amount</th>
                        <th className="text-white p-4 text-left text-sm font-semibold tracking-wide">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paymentReports.map((payment, index) => (
                        <tr key={payment.id} className={`hover:bg-blue-50 transition-colors duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                          <td className="p-4 border-b border-gray-100 text-sm text-gray-700 font-medium">{payment.date}</td>
                          <td className="p-4 border-b border-gray-100 text-sm text-gray-700">{payment.clientName}</td>
                          <td className="p-4 border-b border-gray-100 text-sm text-gray-700 font-mono">{payment.invoiceNo}</td>
                          <td className="p-4 border-b border-gray-100 text-sm text-gray-700">{payment.paymentMethod}</td>
                          <td className="p-4 border-b border-gray-100 text-sm text-gray-700 font-semibold text-green-600">{payment.amount}</td>
                          <td className="p-4 border-b border-gray-100 text-sm text-gray-700">
                            <span className={`px-4 py-2 rounded-full text-xs font-semibold ${
                              payment.status === 'Received' 
                                ? 'bg-green-100 text-green-800 border border-green-200' 
                                : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                            }`}>
                              {payment.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                    <FileText size={40} className="text-gray-400" />
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No Payment Records Found</h4>
                  <p className="text-gray-500">Try adjusting your search criteria and search again</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PayRepSrch;
