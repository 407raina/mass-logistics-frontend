import React, { useState } from 'react';
import { Search, FileText, ArrowLeft, Printer, Calendar, User, Download, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CustStat = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [clientName, setClientName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [statements, setStatements] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!fromDate || !toDate) return alert('Please select both From and To dates');
    if (!clientName.trim()) return alert('Please enter Client Name');

    setIsLoading(true);
    setShowResults(false);
    try {
      console.log('Searching customer statements:', { fromDate, toDate, clientName });
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockStatements = [
        {
          id: 1,
          date: '2024-01-15',
          invoiceNo: 'INV-001',
          description: 'Logistics Service - Container Handling',
          debit: 1500.00,
          credit: 0.00,
          balance: 1500.00
        },
        {
          id: 2,
          date: '2024-01-20',
          invoiceNo: 'PAY-001',
          description: 'Payment Received - Bank Transfer',
          debit: 0.00,
          credit: 1500.00,
          balance: 0.00
        },
        {
          id: 3,
          date: '2024-01-25',
          invoiceNo: 'INV-002',
          description: 'Customs Clearance Service',
          debit: 750.00,
          credit: 0.00,
          balance: 750.00
        },
        {
          id: 4,
          date: '2024-02-01',
          invoiceNo: 'INV-003',
          description: 'Freight Forwarding Service',
          debit: 2200.00,
          credit: 0.00,
          balance: 2950.00
        },
        {
          id: 5,
          date: '2024-02-10',
          invoiceNo: 'PAY-002',
          description: 'Partial Payment Received',
          debit: 0.00,
          credit: 1000.00,
          balance: 1950.00
        }
      ];
      
      setStatements(mockStatements);
      setShowResults(true);
    } catch (error) {
      console.error('Search failed:', error);
      setStatements([]);
      setShowResults(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrint = () => {
    console.log('Printing customer statement');
    window.print();
  };

  const handleExport = () => {
    console.log('Exporting customer statement');
  };

  const totalDebit = statements.reduce((sum, stmt) => sum + stmt.debit, 0);
  const totalCredit = statements.reduce((sum, stmt) => sum + stmt.credit, 0);
  const finalBalance = totalDebit - totalCredit;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-[1900px] mx-auto p-5">
        
        {/* Page Header */}
        <div className="mb-5">
          <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="px-8 py-4 bg-gradient-to-r from-black/10 to-transparent">
              <div className="flex items-center gap-3">
                <button 
                  className="bg-white/20 hover:bg-white/30 text-white border-0 p-2 rounded-lg cursor-pointer transition-all duration-200 backdrop-blur-sm"
                  onClick={() => navigate('/dashboard')}
                >
                  <ArrowLeft size={18} />
                </button>
                <div>
                  <h1 className="text-xl font-bold tracking-wide">Customer Statement Report</h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
          
          {/* Search Panel - 4 columns */}
          <div className="xl:col-span-4">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden sticky top-5">
              {/* Search Header */}
              <div className="bg-gradient-to-r from-slate-600 to-slate-700 px-5 py-3">
                <h2 className="text-white font-semibold tracking-wide flex items-center text-sm">
                  <div className="w-1.5 h-1.5 bg-white rounded-full mr-2"></div>
                  <Search size={14} className="mr-2" />
                  Search Parameters
                </h2>
              </div>
              
              {/* Search Content */}
              <div className="p-5 space-y-4">
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
                    <Calendar size={12} className="inline mr-1" />
                    From Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg text-sm bg-white text-gray-800 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
                    <Calendar size={12} className="inline mr-1" />
                    To Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg text-sm bg-white text-gray-800 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
                    <User size={12} className="inline mr-1" />
                    Client Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg text-sm bg-white text-gray-800 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all"
                    placeholder="Enter client name"
                  />
                </div>
                
                <button 
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                  onClick={handleSearch}
                  disabled={isLoading}
                >
                  <Search size={16} className={isLoading ? 'animate-spin' : ''} />
                  {isLoading ? 'Searching...' : 'Generate Statement'}
                </button>

                {/* Quick Stats */}
                {showResults && statements.length > 0 && (
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-3">Statement Summary</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-600">Total Records</span>
                        <span className="font-semibold text-gray-900">{statements.length}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-600">Total Debit</span>
                        <span className="font-semibold text-red-600">SAR {totalDebit.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-600">Total Credit</span>
                        <span className="font-semibold text-green-600">SAR {totalCredit.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                      </div>
                      <div className="pt-2 border-t border-gray-100 mt-3">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-600 font-medium">Final Balance</span>
                          <span className={`font-bold ${finalBalance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                            SAR {Math.abs(finalBalance).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            {finalBalance < 0 ? ' (CR)' : ' (DR)'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Results Panel - 8 columns */}
          <div className="xl:col-span-8">
            {showResults && (
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                {/* Results Header */}
                <div className="bg-gradient-to-r from-slate-600 to-slate-700 px-5 py-3 flex justify-between items-center">
                  <h2 className="text-white font-semibold tracking-wide flex items-center text-sm">
                    <div className="w-1.5 h-1.5 bg-white rounded-full mr-2"></div>
                    <FileText size={14} className="mr-2" />
                    Customer Statement ({statements.length} records)
                  </h2>
                  <div className="flex items-center gap-2">
                    <button 
                      className="bg-white/20 hover:bg-white/30 text-white border-0 p-2 rounded-lg cursor-pointer transition-all duration-200 backdrop-blur-sm"
                      onClick={handleExport}
                      title="Export Statement"
                    >
                      <Download size={14} />
                    </button>
                    <button 
                      className="bg-white/20 hover:bg-white/30 text-white border-0 p-2 rounded-lg cursor-pointer transition-all duration-200 backdrop-blur-sm"
                      onClick={handlePrint}
                      title="Print Statement"
                    >
                      <Printer size={14} />
                    </button>
                  </div>
                </div>
                
                {/* Client Info Bar */}
                {statements.length > 0 && (
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-5 py-3 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm">{clientName}</h3>
                        <p className="text-xs text-gray-600">
                          Period: {new Date(fromDate).toLocaleDateString('en-GB')} to {new Date(toDate).toLocaleDateString('en-GB')}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-600">Statement Balance</p>
                        <p className={`font-bold text-sm ${finalBalance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                          SAR {Math.abs(finalBalance).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          {finalBalance < 0 ? ' (Credit)' : ' (Debit)'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Table */}
                <div className="overflow-hidden">
                  {statements.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gradient-to-r from-blue-700 to-blue-800 text-white">
                            <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">
                              Date
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">
                              Reference
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">
                              Description
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-wider">
                              Debit (SAR)
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-wider">
                              Credit (SAR)
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-wider">
                              Balance (SAR)
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {statements.map((statement, index) => (
                            <tr 
                              key={statement.id}
                              className="hover:bg-gray-50 transition-colors"
                            >
                              <td className="px-4 py-4 text-sm text-gray-900">
                                {new Date(statement.date).toLocaleDateString('en-GB')}
                              </td>
                              <td className="px-4 py-4 text-sm">
                                <span className="font-semibold text-purple-600 bg-purple-50 px-2 py-1 rounded-md">
                                  {statement.invoiceNo}
                                </span>
                              </td>
                              <td className="px-4 py-4 text-sm text-gray-900">
                                {statement.description}
                              </td>
                              <td className="px-4 py-4 text-sm text-right">
                                {statement.debit > 0 ? (
                                  <span className="font-semibold text-red-600">
                                    {statement.debit.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                  </span>
                                ) : (
                                  <span className="text-gray-400">-</span>
                                )}
                              </td>
                              <td className="px-4 py-4 text-sm text-right">
                                {statement.credit > 0 ? (
                                  <span className="font-semibold text-green-600">
                                    {statement.credit.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                  </span>
                                ) : (
                                  <span className="text-gray-400">-</span>
                                )}
                              </td>
                              <td className="px-4 py-4 text-sm text-right">
                                <span className={`font-semibold ${statement.balance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                                  {Math.abs(statement.balance).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                </span>
                              </td>
                            </tr>
                          ))}
                          {/* Summary Row */}
                          <tr className="bg-gradient-to-r from-gray-100 to-gray-200 font-semibold">
                            <td className="px-4 py-3 text-sm text-gray-900" colSpan="3">
                              <strong>TOTAL</strong>
                            </td>
                            <td className="px-4 py-3 text-sm text-right text-red-600">
                              <strong>{totalDebit.toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong>
                            </td>
                            <td className="px-4 py-3 text-sm text-right text-green-600">
                              <strong>{totalCredit.toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong>
                            </td>
                            <td className="px-4 py-3 text-sm text-right">
                              <strong className={finalBalance >= 0 ? 'text-blue-600' : 'text-red-600'}>
                                {Math.abs(finalBalance).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                {finalBalance < 0 ? ' (CR)' : ' (DR)'}
                              </strong>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <FileText size={48} className="mx-auto text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No statements found</h3>
                      <p className="text-gray-500">
                        No customer statements found for the selected criteria
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* No Search Performed Yet */}
            {!showResults && (
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="text-center py-16">
                  <Search size={64} className="mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to Generate Statement</h3>
                  <p className="text-gray-500">
                    Enter search criteria and click "Generate Statement" to view customer account details
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustStat;
