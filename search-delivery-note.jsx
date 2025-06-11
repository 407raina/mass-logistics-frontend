import React, { useState } from 'react';
import { Search, Truck, ArrowLeft, FileText, AlertCircle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DNSearch = () => {
  const [deliveryNoteNo, setDeliveryNoteNo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!deliveryNoteNo.trim()) {
      setError('Please enter delivery note number');
      return;
    }

    setError('');
    setIsLoading(true);
    try {
      console.log('Searching delivery note:', deliveryNoteNo);
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Search failed:', error);
      setError('Search failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSearch();
    }
  };

  const clearForm = () => {
    setDeliveryNoteNo('');
    setError('');
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
            <FileText size={24} className="text-blue-200" />
            <h1 className="m-0 text-white text-xl font-bold tracking-wide">DELIVERY NOTE SEARCH</h1>
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
              <Truck className="text-white" size={20} />
            </div>
            <h2 className="text-white text-lg font-bold m-0">Search Delivery Note</h2>
          </div>
          
          {/* Search Form */}
          <div className="flex flex-col gap-6 relative z-10">
            <div className="flex flex-col gap-3">
              <label htmlFor="deliveryNoteNo" className="text-gray-700 text-sm font-semibold flex items-center gap-2">
                <FileText size={16} className="text-gray-500" />
                Delivery Note Number 
                <span className="text-red-500 font-bold">*</span>
              </label>
              <div className="flex gap-3 items-center">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    id="deliveryNoteNo"
                    value={deliveryNoteNo}
                    onChange={(e) => {
                      setDeliveryNoteNo(e.target.value);
                      if (error) setError('');
                    }}
                    onKeyPress={handleKeyPress}
                    className={`w-full h-12 border-2 rounded-xl px-4 text-sm bg-white transition-all duration-300 text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 placeholder-gray-400 shadow-sm ${
                      error ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'border-gray-200'
                    }`}
                    placeholder="Enter delivery note number..."
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
                  disabled={isLoading || !deliveryNoteNo.trim()}
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
    </div>
  );
};

export default DNSearch;
