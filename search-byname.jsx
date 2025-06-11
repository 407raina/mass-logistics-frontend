import React, { useState } from 'react';
import { Search, ArrowLeft, User, FileText, Phone, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ByName = () => {
  const [clientName, setClientName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!clientName.trim()) return alert('Please enter a client name');

    setIsLoading(true);
    setShowResults(false);
    try {
      console.log('Searching client:', clientName);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockResults = [
        {
          id: 1,
          clientName: clientName,
          jobNo: 'JOB-001',
          status: 'Active',
          phone: '+971-50-123-4567',
          email: 'client@example.com'
        },
        {
          id: 2,
          clientName: clientName + ' LLC',
          jobNo: 'JOB-002',
          status: 'Completed',
          phone: '+971-50-765-4321',
          email: 'info@clientllc.com'
        },
        {
          id: 3,
          clientName: clientName + ' Trading',
          jobNo: 'JOB-003',
          status: 'Active',
          phone: '+971-50-999-8888',
          email: 'trading@client.com'
        }
      ];
      
      setSearchResults(mockResults);
      setShowResults(true);
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults([]);
      setShowResults(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
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
                <User size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-wide">Search by Name</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Search Section */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Search Header */}
          <div className="bg-gradient-to-r from-slate-600 to-slate-700 text-white px-8 py-6">
            <div className="flex items-center gap-3">
              <div className="bg-white/10 p-2 rounded-lg">
                <Search size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Client Search</h2>
              </div>
            </div>
          </div>
          
          {/* Search Content */}
          <div className="p-8">
            <div className="space-y-6">
              <div className="space-y-3">
                <label htmlFor="clientName" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <User size={16} className="text-blue-600" />
                  Client Name
                </label>
                <div className="flex gap-4">
                  <input
                    type="text"
                    id="clientName"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 h-12 border-2 border-gray-200 rounded-xl px-4 text-sm bg-white transition-all duration-200 text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 hover:border-gray-300"
                    placeholder="Enter client name to search..."
                  />
                  <button 
                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white border-none rounded-xl cursor-pointer flex items-center justify-center gap-2 text-sm font-semibold transition-all duration-300 px-8 py-3 min-w-[140px] hover:from-blue-700 hover:to-blue-800 hover:shadow-lg hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:bg-gray-400"
                    onClick={handleSearch}
                    disabled={isLoading}
                  >
                    <Search size={16} className={isLoading ? 'animate-spin' : ''} />
                    {isLoading ? 'Searching...' : 'Search'}
                  </button>
                </div>
              </div>
             
             
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
                  <h3 className="text-xl font-semibold text-gray-800">Search Results</h3>
                  <p className="text-sm text-gray-600">
                    {searchResults.length > 0 ? `Found ${searchResults.length} matching clients` : 'No clients found'}
                  </p>
                </div>
                {searchResults.length > 0 && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FileText size={16} />
                    <span>Showing all matches for "{clientName}"</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Results Table */}
            <div className="overflow-hidden">
              {searchResults.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-blue-700 to-blue-800">
                        <th className="text-white p-4 text-left text-sm font-semibold tracking-wide">Client Name</th>
                        <th className="text-white p-4 text-left text-sm font-semibold tracking-wide">Job No</th>
                        <th className="text-white p-4 text-left text-sm font-semibold tracking-wide">Status</th>
                        <th className="text-white p-4 text-left text-sm font-semibold tracking-wide">Phone</th>
                        <th className="text-white p-4 text-left text-sm font-semibold tracking-wide">Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      {searchResults.map((result, index) => (
                        <tr key={result.id} className={`hover:bg-blue-50 transition-colors duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                          <td className="p-4 border-b border-gray-100 text-sm text-gray-700 font-medium">
                            <div className="flex items-center gap-2">
                              <User size={16} className="text-blue-600" />
                              {result.clientName}
                            </div>
                          </td>
                          <td className="p-4 border-b border-gray-100 text-sm text-gray-700 font-mono">{result.jobNo}</td>
                          <td className="p-4 border-b border-gray-100 text-sm text-gray-700">
                            <span className={`px-4 py-2 rounded-full text-xs font-semibold ${
                              result.status === 'Active' 
                                ? 'bg-green-100 text-green-800 border border-green-200' 
                                : 'bg-blue-100 text-blue-800 border border-blue-200'
                            }`}>
                              {result.status}
                            </span>
                          </td>
                          <td className="p-4 border-b border-gray-100 text-sm text-gray-700">
                            <div className="flex items-center gap-2">
                              <Phone size={14} className="text-gray-400" />
                              {result.phone}
                            </div>
                          </td>
                          <td className="p-4 border-b border-gray-100 text-sm text-gray-700">
                            <div className="flex items-center gap-2">
                              <Mail size={14} className="text-gray-400" />
                              <a href={`mailto:${result.email}`} className="text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200">
                                {result.email}
                              </a>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                    <User size={40} className="text-gray-400" />
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No Clients Found</h4>
                  <p className="text-gray-500">No clients match the search term "{clientName}". Try a different name.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ByName;
