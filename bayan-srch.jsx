import React, { useState } from 'react';
import { Search, FileText, ArrowLeft, Printer, AlertCircle, Loader2, Ship, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BayanSearch = () => {
  const [bayanNo, setBayanNo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [bayanResults, setBayanResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!bayanNo.trim()) {
      setError('Please enter a Bayan Number');
      return;
    }

    setError('');
    setIsLoading(true);
    setShowResults(false);
    try {
      console.log('Searching for Bayan No:', bayanNo);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockBayanData = [
        { 
          id: bayanNo, 
          date: '2024-01-15', 
          consignee: 'ABC Trading Company', 
          origin: 'Dubai Port',
          destination: 'Mumbai Port',
          status: 'Cleared',
          weight: '2500 KG',
          value: '$15,000.00'
        }
      ];
      
      setBayanResults(mockBayanData);
      setShowResults(true);
    } catch (error) {
      console.error('Search failed:', error);
      setBayanResults([]);
      setShowResults(true);
      setError('Search failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrintBayan = (bayanId) => {
    console.log('Printing Bayan:', bayanId);
    window.print();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSearch();
    }
  };

  const clearForm = () => {
    setBayanNo('');
    setError('');
    setShowResults(false);
  };

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-0 m-0 font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white px-5 py-4 shadow-xl border-b-4 border-blue-600">
        <div className="flex items-center gap-3 max-w-6xl mx-auto">
          <button 
            className="bg-white bg-opacity-15 backdrop-blur-sm border border-white border-opacity-25 text-white p-2 rounded-lg cursor-pointer flex items-center justify-center transition-all duration-300 w-10 h-10 hover:bg-white hover:bg-opacity-25 hover:scale-105 active:scale-95"
            onClick={() => navigate('/')}
          >
            <ArrowLeft size={18} />
          </button>
          <div className="flex items-center gap-3">
            <Ship size={24} className="text-blue-200" />
            <h1 className="m-0 text-white text-xl font-bold tracking-wide">BAYAN SEARCH</h1>
          </div>
        </div>
      </div>
      
      {/* Search Section */}
      <div className="p-6 flex justify-center">
        <div className="bg-white rounded-2xl p-8 shadow-2xl border border-gray-100 max-w-2xl w-full backdrop-blur-sm relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -translate-y-16 translate-x-16 opacity-60"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gray-50 rounded-full translate-y-12 -translate-x-12 opacity-40"></div>
          
          {/* Card Header */}
          <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-6 py-4 -mx-8 -mt-8 mb-8 rounded-t-2xl flex items-center gap-3 shadow-lg relative z-10">
            <div className="bg-white bg-opacity-20 p-2 rounded-lg">
              <FileText className="text-white" size={20} />
            </div>
            <h2 className="text-white text-lg font-bold m-0">Search by Bayan Number</h2>
          </div>
          
          {/* Search Form */}
          <div className="flex flex-col gap-6 relative z-10">
            <div className="flex flex-col gap-3">
              <label htmlFor="bayanNo" className="text-gray-700 text-sm font-semibold flex items-center gap-2">
                <Ship size={16} className="text-gray-500" />
                Bayan Number
                <span className="text-red-500 font-bold">*</span>
              </label>
              <div className="flex gap-3 items-center">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    id="bayanNo"
                    value={bayanNo}
                    onChange={(e) => {
                      setBayanNo(e.target.value);
                      if (error) setError('');
                    }}
                    onKeyPress={handleKeyPress}
                    className={`w-full h-12 border-2 rounded-xl px-4 text-sm bg-white transition-all duration-300 text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 placeholder-gray-400 shadow-sm ${
                      error ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'border-gray-200'
                    }`}
                    placeholder="Enter Bayan number..."
                    disabled={isLoading}
                  />
                  {error && (
                    <div className="absolute -bottom-6 left-0 flex items-center gap-1 text-red-500 text-xs">
                      <AlertCircle size={12} />
                      <span>{error}</span>
                    </div>
                  )}
                </div>
                <button 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-none rounded-xl cursor-pointer flex items-center justify-center transition-all duration-300 px-6 py-3 h-12 min-w-16 hover:from-blue-600 hover:to-blue-700 hover:shadow-lg hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed disabled:from-gray-400 disabled:to-gray-500 disabled:scale-100 active:scale-95 shadow-md"
                  onClick={handleSearch}
                  disabled={isLoading || !bayanNo.trim()}
                >
                  {isLoading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Search size={18} />
                  )}
                </button>
              </div>
            </div>
            
            <div className="flex justify-center pt-2">
              <button 
                className="bg-gray-100 text-gray-600 border-2 border-gray-200 rounded-xl cursor-pointer flex items-center justify-center text-sm font-semibold transition-all duration-300 px-8 py-3 h-12 hover:bg-gray-200 hover:border-gray-300 hover:text-gray-700 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                onClick={clearForm}
                disabled={isLoading}
              >
                Clear Form
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Results Section */}
      {showResults && (
        <div className="px-6 pb-6 max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
            {/* Results Header */}
            <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-6 py-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                  <FileText size={20} />
                </div>
                <h3 className="text-lg font-bold m-0">Search Results</h3>
              </div>
              <div className="bg-white bg-opacity-20 px-4 py-2 rounded-lg">
                <span className="text-sm font-semibold">
                  {bayanResults.length > 0 ? `${bayanResults.length} record found` : 'No records found'}
                </span>
              </div>
            </div>
            
            {bayanResults.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse min-w-[900px]">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                      <th className="px-4 py-4 text-left text-sm font-bold text-gray-700 border-b-2 border-gray-200">Bayan No</th>
                      <th className="px-4 py-4 text-left text-sm font-bold text-gray-700 border-b-2 border-gray-200">Date</th>
                      <th className="px-4 py-4 text-left text-sm font-bold text-gray-700 border-b-2 border-gray-200">Consignee</th>
                      <th className="px-4 py-4 text-left text-sm font-bold text-gray-700 border-b-2 border-gray-200">Origin</th>
                      <th className="px-4 py-4 text-left text-sm font-bold text-gray-700 border-b-2 border-gray-200">Destination</th>
                      <th className="px-4 py-4 text-left text-sm font-bold text-gray-700 border-b-2 border-gray-200">Weight</th>
                      <th className="px-4 py-4 text-left text-sm font-bold text-gray-700 border-b-2 border-gray-200">Value</th>
                      <th className="px-4 py-4 text-left text-sm font-bold text-gray-700 border-b-2 border-gray-200">Status</th>
                      <th className="px-4 py-4 text-center text-sm font-bold text-gray-700 border-b-2 border-gray-200">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bayanResults.map(bayan => (
                      <tr key={bayan.id} className="hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100">
                        <td className="px-4 py-4 text-sm font-semibold text-blue-600">{bayan.id}</td>
                        <td className="px-4 py-4 text-sm text-gray-700">{bayan.date}</td>
                        <td className="px-4 py-4 text-sm text-gray-700 font-medium">{bayan.consignee}</td>
                        <td className="px-4 py-4 text-sm text-gray-700">{bayan.origin}</td>
                        <td className="px-4 py-4 text-sm text-gray-700">{bayan.destination}</td>
                        <td className="px-4 py-4 text-sm text-gray-700 font-medium">{bayan.weight}</td>
                        <td className="px-4 py-4 text-sm text-green-600 font-bold">{bayan.value}</td>
                        <td className="px-4 py-4 text-sm">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                            <CheckCircle size={12} />
                            {bayan.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <button 
                            className="bg-gradient-to-r from-green-500 to-green-600 text-white border-none rounded-lg cursor-pointer px-4 py-2 text-xs font-semibold transition-all duration-300 flex items-center gap-2 mx-auto hover:from-green-600 hover:to-green-700 hover:shadow-lg hover:scale-105 active:scale-95"
                            onClick={() => handlePrintBayan(bayan.id)}
                          >
                            <Printer size={14} />
                            Print
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                  <AlertCircle className="text-gray-400" size={24} />
                </div>
                <h3 className="text-gray-600 text-lg font-semibold mb-2">No Bayan Found</h3>
                <p className="text-gray-500 text-sm">
                  No Bayan records found for the entered number. Please check the number and try again.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BayanSearch;
