import React, { useState } from 'react';
import { Search, ChevronRight, FileText, Filter, Eye, Download } from 'lucide-react';

const Invoice = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [invoices] = useState([
    {
      id: 1,
      operationNo: 'OP001',
      clientName: 'ABC Trading Company',
      clientNameAr: 'شركة ABC للتجارة',
      date: '2024-06-10',
      amount: '15,250.00',
      status: 'paid'
    },
    {
      id: 2,
      operationNo: 'OP002',
      clientName: 'XYZ Logistics',
      clientNameAr: 'شركة XYZ للخدمات اللوجستية',
      date: '2024-06-08',
      amount: '8,750.00',
      status: 'pending'
    },
    {
      id: 3,
      operationNo: 'OP003',
      clientName: 'Global Shipping Ltd',
      clientNameAr: 'شركة الشحن العالمية المحدودة',
      date: '2024-06-05',
      amount: '22,100.00',
      status: 'paid'
    },
    {
      id: 4,
      operationNo: 'OP004',
      clientName: 'Emirates Freight',
      clientNameAr: 'شركة الإمارات للشحن',
      date: '2024-06-03',
      amount: '12,800.00',
      status: 'overdue'
    },
    {
      id: 5,
      operationNo: 'OP005',
      clientName: 'Dubai Cargo Services',
      clientNameAr: 'خدمات دبي للشحن',
      date: '2024-06-01',
      amount: '18,950.00',
      status: 'paid'
    }
  ]);

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    console.log('Searching for:', searchTerm);
  };

  const handleViewInvoice = (invoice) => {
    console.log('Viewing invoice:', invoice);
  };

  const handleDownloadInvoice = (invoice) => {
    console.log('Downloading invoice:', invoice);
  };

  const filteredInvoices = invoices.filter(invoice => 
    invoice.clientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.operationNo?.includes(searchTerm)
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'overdue':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'paid':
        return 'Paid';
      case 'pending':
        return 'Pending';
      case 'overdue':
        return 'Overdue';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-[1900px] mx-auto p-5">
        {/* Page Header */}
        <div className="mb-5">
          <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="px-8 py-4 bg-gradient-to-r from-black/10 to-transparent">
              <h1 className="text-xl font-bold tracking-wide">Invoice Management</h1>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
          {/* Search Panel - 3 columns */}
          <div className="xl:col-span-3">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden sticky top-5">
              {/* Search Header */}
              <div className="bg-gradient-to-r from-slate-600 to-slate-700 px-5 py-3">
                <h2 className="text-white font-semibold tracking-wide flex items-center text-sm">
                  <div className="w-1.5 h-1.5 bg-white rounded-full mr-2"></div>
                  <Search size={14} className="mr-2" />
                  Search Invoices
                </h2>
              </div>
              
              {/* Search Content */}
              <div className="p-5 space-y-4">
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
                    Client Name / Job No <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg text-sm bg-white text-gray-800 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all"
                    placeholder="Enter client name or job number"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                
                <button 
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                  onClick={handleSearch}
                >
                  <Search size={16} />
                  Search Invoices
                </button>

                {/* Quick Stats */}
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-3">Quick Stats</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-600">Total Invoices</span>
                      <span className="font-semibold text-gray-900">{invoices.length}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-600">Paid</span>
                      <span className="font-semibold text-green-600">{invoices.filter(i => i.status === 'paid').length}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-600">Pending</span>
                      <span className="font-semibold text-yellow-600">{invoices.filter(i => i.status === 'pending').length}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-600">Overdue</span>
                      <span className="font-semibold text-red-600">{invoices.filter(i => i.status === 'overdue').length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Invoice List Panel - 9 columns */}
          <div className="xl:col-span-9">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              {/* List Header */}
              <div className="bg-gradient-to-r from-slate-600 to-slate-700 px-5 py-3 flex justify-between items-center">
                <h2 className="text-white font-semibold tracking-wide flex items-center text-sm">
                  <div className="w-1.5 h-1.5 bg-white rounded-full mr-2"></div>
                  <FileText size={14} className="mr-2" />
                  Invoice List ({filteredInvoices.length})
                </h2>
                <div className="flex items-center gap-2">
                  <button className="bg-white/20 hover:bg-white/30 text-white border-0 p-2 rounded-lg cursor-pointer transition-all duration-200 backdrop-blur-sm">
                    <Filter size={14} />
                  </button>
                  <button className="bg-white/20 hover:bg-white/30 text-white border-0 p-2 rounded-lg cursor-pointer transition-all duration-200 backdrop-blur-sm">
                    <Download size={14} />
                  </button>
                </div>
              </div>
              
              {/* Table */}
              <div className="overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-700 to-blue-800 text-white">
                      <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider">
                        SL.NO
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider">
                        Operation No
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider">
                        Client Name
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider">
                        Amount (SAR)
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredInvoices.map((invoice, index) => (
                      <tr 
                        key={invoice.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-4 py-4 text-center text-sm text-gray-900 font-medium">
                          {index + 1}
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                            {invoice.operationNo}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm">
                          <div className="text-center">
                            <div className="font-semibold text-gray-900 mb-1">
                              {invoice.clientName}
                            </div>
                            <div className="text-xs text-gray-500" style={{ direction: 'rtl', fontFamily: 'Arial, sans-serif' }}>
                              {invoice.clientNameAr}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center text-sm text-gray-900">
                          {new Date(invoice.date).toLocaleDateString('en-GB')}
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span className="text-sm font-bold text-gray-900">
                            {invoice.amount}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(invoice.status)}`}>
                            {getStatusText(invoice.status)}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button 
                              className="inline-flex items-center justify-center w-8 h-8 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                              onClick={() => handleViewInvoice(invoice)}
                              title="View Invoice"
                            >
                              <Eye size={14} />
                            </button>
                            <button 
                              className="inline-flex items-center justify-center w-8 h-8 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                              onClick={() => handleDownloadInvoice(invoice)}
                              title="Download Invoice"
                            >
                              <Download size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Empty State */}
                {filteredInvoices.length === 0 && (
                  <div className="text-center py-12">
                    <FileText size={48} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No invoices found</h3>
                    <p className="text-gray-500">Try adjusting your search criteria</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
