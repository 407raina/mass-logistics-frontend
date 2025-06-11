import React, { useState } from 'react';
import { Search, ArrowLeft, Briefcase, User, Calendar, FileText, CheckCircle, AlertCircle, Loader2, Eye, Edit3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const JobSrch = () => {
  const [jobNo, setJobNo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [jobResults, setJobResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!jobNo.trim()) {
      setError('Please enter a Job Number');
      return;
    }

    setError('');
    setIsLoading(true);
    setShowResults(false);
    try {
      console.log('Searching job:', jobNo);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockJobResults = [
        {
          id: 1,
          jobNo: jobNo,
          clientName: 'ABC Trading Company',
          status: 'Active',
          startDate: '2024-01-15',
          endDate: '2024-02-15',
          description: 'Import clearance services',
          priority: 'High',
          assignedTo: 'John Smith',
          estimatedValue: '$12,500.00'
        },
        {
          id: 2,
          jobNo: jobNo + '-SUB',
          clientName: 'ABC Trading Company',
          status: 'Completed',
          startDate: '2024-01-10',
          endDate: '2024-01-25',
          description: 'Documentation processing',
          priority: 'Medium',
          assignedTo: 'Sarah Johnson',
          estimatedValue: '$8,750.00'
        }
      ];
      
      setJobResults(mockJobResults);
      setShowResults(true);
    } catch (error) {
      console.error('Search failed:', error);
      setJobResults([]);
      setShowResults(true);
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
    setJobNo('');
    setError('');
    setShowResults(false);
    setJobResults([]);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'On Hold':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

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
              <Briefcase size={28} className="text-blue-200" />
            </div>
            <div>
              <h1 className="m-0 text-white text-2xl font-bold tracking-wide">JOB SEARCH</h1>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Search Section */}
      <div className="p-8 flex justify-center">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/50 max-w-3xl w-full relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full -translate-y-20 translate-x-20 opacity-70"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-slate-100 to-blue-100 rounded-full translate-y-16 -translate-x-16 opacity-50"></div>
          
          {/* Card Header */}
          <div className="bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 text-white px-8 py-6 -mx-10 -mt-10 mb-10 rounded-t-3xl flex items-center gap-4 shadow-xl relative z-10">
            <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
              <Search className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-white text-xl font-bold m-0">Search by Job Number</h2>
            </div>
          </div>
          
          {/* Search Form */}
          <div className="flex flex-col gap-8 relative z-10">
            <div className="flex flex-col gap-4">
              <label htmlFor="jobNo" className="text-slate-700 text-sm font-bold flex items-center gap-3">
                <Briefcase size={18} className="text-slate-500" />
                Job Number
                <span className="text-red-500 font-bold">*</span>
              </label>
              <div className="flex gap-4 items-start">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    id="jobNo"
                    value={jobNo}
                    onChange={(e) => {
                      setJobNo(e.target.value);
                      if (error) setError('');
                    }}
                    onKeyPress={handleKeyPress}
                    className={`w-full h-14 border-2 rounded-2xl px-5 text-base bg-white/90 backdrop-blur-sm transition-all duration-300 text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 placeholder-slate-400 shadow-lg font-medium ${
                      error ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'border-slate-200'
                    }`}
                    placeholder="Enter job number (e.g., JOB-2024-001234)..."
                    disabled={isLoading}
                  />
                  {error && (
                    <div className="absolute -bottom-7 left-0 flex items-center gap-2 text-red-500 text-sm font-medium">
                      <AlertCircle size={14} />
                      <span>{error}</span>
                    </div>
                  )}
                </div>
                <button 
                  className="bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 text-white border-none rounded-2xl cursor-pointer flex items-center justify-center transition-all duration-300 px-8 py-4 h-14 min-w-20 hover:from-blue-600 hover:via-blue-700 hover:to-indigo-700 hover:shadow-xl hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed disabled:from-slate-400 disabled:to-slate-500 disabled:scale-100 active:scale-95 shadow-lg font-semibold"
                  onClick={handleSearch}
                  disabled={isLoading || !jobNo.trim()}
                >
                  {isLoading ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <Search size={20} />
                  )}
                </button>
              </div>
            </div>
            
            <div className="flex justify-center pt-4">
              <button 
                className="bg-slate-100 text-slate-600 border-2 border-slate-200 rounded-2xl cursor-pointer flex items-center justify-center text-sm font-bold transition-all duration-300 px-10 py-4 h-12 hover:bg-slate-200 hover:border-slate-300 hover:text-slate-700 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 uppercase tracking-wide"
                onClick={clearForm}
                disabled={isLoading}
              >
                Clear Form
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Results Section */}
      {showResults && (
        <div className="px-8 pb-8 max-w-7xl mx-auto">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
            {/* Results Header */}
            <div className="bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 text-white px-8 py-6 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                  <FileText size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold m-0">Job Search Results</h3>
                  <p className="text-slate-300 text-sm mt-1">Job records and related information</p>
                </div>
              </div>
              <div className="bg-white/20 px-6 py-3 rounded-xl backdrop-blur-sm">
                <span className="text-base font-bold">
                  {jobResults.length > 0 ? `${jobResults.length} record${jobResults.length > 1 ? 's' : ''} found` : 'No records found'}
                </span>
              </div>
            </div>
            
            {jobResults.length > 0 ? (
              <div className="p-8">
                <div className="grid gap-6">
                  {jobResults.map(job => (
                    <div key={job.id} className="bg-gradient-to-r from-white to-slate-50 rounded-2xl p-8 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300">
                      {/* Job Header */}
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h4 className="text-2xl font-bold text-slate-800 mb-2">{job.jobNo}</h4>
                          <div className="flex items-center gap-4">
                            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border ${getStatusColor(job.status)} shadow-sm`}>
                              <CheckCircle size={16} />
                              {job.status}
                            </span>
                            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border ${getPriorityColor(job.priority)} shadow-sm`}>
                              <AlertCircle size={16} />
                              {job.priority} Priority
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <button className="bg-blue-100 text-blue-600 border border-blue-200 rounded-xl px-4 py-2 text-sm font-bold transition-all duration-200 hover:bg-blue-600 hover:text-white hover:shadow-lg hover:scale-105 active:scale-95 flex items-center gap-2">
                            <Eye size={16} />
                            View Details
                          </button>
                          <button className="bg-green-100 text-green-600 border border-green-200 rounded-xl px-4 py-2 text-sm font-bold transition-all duration-200 hover:bg-green-600 hover:text-white hover:shadow-lg hover:scale-105 active:scale-95 flex items-center gap-2">
                            <Edit3 size={16} />
                            Edit Job
                          </button>
                        </div>
                      </div>

                      {/* Job Details Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white rounded-xl p-6 shadow-md border border-slate-100">
                          <div className="flex items-center gap-3 mb-3">
                            <User className="text-blue-500" size={20} />
                            <h5 className="font-bold text-slate-700 text-sm uppercase tracking-wide">Client</h5>
                          </div>
                          <p className="text-lg font-semibold text-slate-800">{job.clientName}</p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-md border border-slate-100">
                          <div className="flex items-center gap-3 mb-3">
                            <Calendar className="text-green-500" size={20} />
                            <h5 className="font-bold text-slate-700 text-sm uppercase tracking-wide">Start Date</h5>
                          </div>
                          <p className="text-lg font-semibold text-slate-800">{job.startDate}</p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-md border border-slate-100">
                          <div className="flex items-center gap-3 mb-3">
                            <User className="text-purple-500" size={20} />
                            <h5 className="font-bold text-slate-700 text-sm uppercase tracking-wide">Assigned To</h5>
                          </div>
                          <p className="text-lg font-semibold text-slate-800">{job.assignedTo}</p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-md border border-slate-100">
                          <div className="flex items-center gap-3 mb-3">
                            <FileText className="text-orange-500" size={20} />
                            <h5 className="font-bold text-slate-700 text-sm uppercase tracking-wide">Estimated Value</h5>
                          </div>
                          <p className="text-2xl font-bold text-green-600">{job.estimatedValue}</p>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="mt-6 bg-white rounded-xl p-6 shadow-md border border-slate-100">
                        <div className="flex items-center gap-3 mb-3">
                          <FileText className="text-slate-500" size={20} />
                          <h5 className="font-bold text-slate-700 text-sm uppercase tracking-wide">Description</h5>
                        </div>
                        <p className="text-slate-700 leading-relaxed">{job.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-100 rounded-full mb-6">
                  <AlertCircle className="text-slate-400" size={32} />
                </div>
                <h3 className="text-slate-600 text-xl font-bold mb-3">No Jobs Found</h3>
                <p className="text-slate-500 text-base max-w-md mx-auto leading-relaxed">
                  No job records found for the entered number. Please verify the job number format and try again, or contact support for assistance.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobSrch;
