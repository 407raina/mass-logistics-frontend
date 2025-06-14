import React, { useState } from 'react';
import { Plus, X, Save, FileText } from 'lucide-react';

const ClearanceOperation = () => {
  const [formData, setFormData] = useState({
    // Basic Info
    operationType: 'Import',
    transportMode: 'Sea',
    client: '',
    jobNo: '',
    commodity: '',
    noOfPackages: '',
    pod: '',
    line: '',
    vessel: '',
    netWeight: '',
    grossWeight: '',
    shipper: '',
    
    // Client Details
    clientRefName: '',
    lineAgent: '',
    representative: '',
    receivingRep: '',
    pol: '',
    
    // Dates and Numbers
    bayanNo: '',
    bayanDate: '',
    paymentDate: '',
    group: '',
    eta: '',
    date: '',
    yardDate: '',
    hijriDate: '',
    endDate: '',
    releaseDate: '',
    
    // Status and Notes
    status: '',
    notes: '',
    bl: '',
    poNo: ''
  });

  const [containers, setContainers] = useState([
    { id: 1, qty: '', type: '' }
  ]);

  const [bills, setBills] = useState([
    { id: 1, clientRef: '', doDate: '', doNo: '', endorseNo: '', billNo: '' }
  ]);

  const vesselOptions = ['Select', 'MSC Maya', 'OOCL Hamburg', 'Maersk Madrid', 'CMA CGM Liberty'];
  const polOptions = ['Select', 'Jeddah', 'Dubai', 'Shanghai', 'Rotterdam'];
  const containerTypes = ['20GP', '40GP', '40HC', '45HC', '20RF', '40RF'];

  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addContainer = () => {
    setContainers(prev => [...prev, { id: Date.now(), qty: '', type: '' }]);
  };

  const removeContainer = (id) => {
    setContainers(prev => prev.filter(container => container.id !== id));
  };

  const updateContainer = (id, field, value) => {
    setContainers(prev => prev.map(container => 
      container.id === id ? { ...container, [field]: value } : container
    ));
  };

  const addBill = () => {
    setBills(prev => [...prev, { id: Date.now(), clientRef: '', doDate: '', doNo: '', endorseNo: '', billNo: '' }]);
  };

  const removeBill = (id) => {
    setBills(prev => prev.filter(bill => bill.id !== id));
  };

  const updateBill = (id, field, value) => {
    setBills(prev => prev.map(bill => 
      bill.id === id ? { ...bill, [field]: value } : bill
    ));
  };

  const handleAddFiles = () => {
    console.log('Add files functionality');
  };

  const handleSave = () => {
    console.log('Save functionality', { formData, containers, bills });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-[1900px] mx-auto p-5">
        {/* Page Header */}
        <div className="mb-5">
          <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="px-8 py-4 bg-gradient-to-r from-black/10 to-transparent">
              <h1 className="text-xl font-bold tracking-wide">Clearance Operation Management</h1>
            </div>
          </div>
        </div>

        {/* Main Content Grid - Optimized Distribution */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
          
          {/* Left Column - Main Form (7 columns) */}
          <div className="xl:col-span-7 space-y-4">
            
            {/* Basic Information Section */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-2.5">
                <h2 className="text-white font-semibold tracking-wide flex items-center text-xs">
                  <div className="w-1.5 h-1.5 bg-white rounded-full mr-2"></div>
                  Basic Information
                </h2>
              </div>
              <div className="p-4 space-y-4">
                {/* Operation Type & Transport Mode */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">Operation Type</label>
                    <div className="flex gap-2 p-2.5 bg-gray-50 rounded-lg border">
                      <label className="flex items-center gap-1.5 text-xs font-medium text-gray-700 cursor-pointer">
                        <input
                          type="radio"
                          name="operationType"
                          value="Export"
                          checked={formData.operationType === 'Export'}
                          onChange={(e) => handleFormChange('operationType', e.target.value)}
                          className="w-3 h-3 accent-blue-600"
                        />
                        Export
                      </label>
                      <label className="flex items-center gap-1.5 text-xs font-medium text-gray-700 cursor-pointer">
                        <input
                          type="radio"
                          name="operationType"
                          value="Import"
                          checked={formData.operationType === 'Import'}
                          onChange={(e) => handleFormChange('operationType', e.target.value)}
                          className="w-3 h-3 accent-blue-600"
                        />
                        Import
                      </label>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">Transport Mode</label>
                    <div className="flex gap-1.5 p-2.5 bg-gray-50 rounded-lg border">
                      <label className="flex items-center gap-1.5 text-xs font-medium text-gray-700 cursor-pointer">
                        <input
                          type="radio"
                          name="transportMode"
                          value="Land"
                          checked={formData.transportMode === 'Land'}
                          onChange={(e) => handleFormChange('transportMode', e.target.value)}
                          className="w-3 h-3 accent-blue-600"
                        />
                        Land
                      </label>
                      <label className="flex items-center gap-1.5 text-xs font-medium text-gray-700 cursor-pointer">
                        <input
                          type="radio"
                          name="transportMode"
                          value="Air"
                          checked={formData.transportMode === 'Air'}
                          onChange={(e) => handleFormChange('transportMode', e.target.value)}
                          className="w-3 h-3 accent-blue-600"
                        />
                        Air
                      </label>
                      <label className="flex items-center gap-1.5 text-xs font-medium text-gray-700 cursor-pointer">
                        <input
                          type="radio"
                          name="transportMode"
                          value="Sea"
                          checked={formData.transportMode === 'Sea'}
                          onChange={(e) => handleFormChange('transportMode', e.target.value)}
                          className="w-3 h-3 accent-blue-600"
                        />
                        Sea
                      </label>
                    </div>
                  </div>
                </div>

                {/* Primary Details - 5 columns for better space utilization */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
                      Client <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Client name"
                      value={formData.client}
                      onChange={(e) => handleFormChange('client', e.target.value)}
                      className="w-full px-2.5 py-2 border-2 border-gray-200 rounded-lg text-xs bg-white text-gray-800 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all placeholder-gray-400"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
                      Job Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.jobNo}
                      onChange={(e) => handleFormChange('jobNo', e.target.value)}
                      className="w-full px-2.5 py-2 border-2 border-gray-200 rounded-lg text-xs bg-white text-gray-800 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">Client Ref</label>
                    <input
                      type="text"
                      value={formData.clientRefName}
                      onChange={(e) => handleFormChange('clientRefName', e.target.value)}
                      className="w-full px-2.5 py-2 border-2 border-gray-200 rounded-lg text-xs bg-white text-gray-800 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">Bayan No</label>
                    <input
                      type="text"
                      value={formData.bayanNo}
                      onChange={(e) => handleFormChange('bayanNo', e.target.value)}
                      className="w-full px-2.5 py-2 border-2 border-gray-200 rounded-lg text-xs bg-white text-gray-800 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">Status</label>
                    <input
                      type="text"
                      value={formData.status}
                      onChange={(e) => handleFormChange('status', e.target.value)}
                      className="w-full px-2.5 py-2 border-2 border-gray-200 rounded-lg text-xs bg-white text-gray-800 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping & Logistics Section */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-green-700 px-5 py-2.5">
                <h2 className="text-white font-semibold tracking-wide flex items-center text-xs">
                  <div className="w-1.5 h-1.5 bg-white rounded-full mr-2"></div>
                  Shipping & Logistics Details
                </h2>
              </div>
              <div className="p-4 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">Shipping Line</label>
                    <input
                      type="text"
                      value={formData.line}
                      onChange={(e) => handleFormChange('line', e.target.value)}
                      className="w-full px-2.5 py-2 border-2 border-gray-200 rounded-lg text-xs bg-white text-gray-800 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">Vessel</label>
                    <select
                      value={formData.vessel}
                      onChange={(e) => handleFormChange('vessel', e.target.value)}
                      className="w-full px-2.5 py-2 border-2 border-gray-200 rounded-lg text-xs bg-white text-gray-800 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all"
                    >
                      {vesselOptions.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">Line Agent</label>
                    <input
                      type="text"
                      value={formData.lineAgent}
                      onChange={(e) => handleFormChange('lineAgent', e.target.value)}
                      className="w-full px-2.5 py-2 border-2 border-gray-200 rounded-lg text-xs bg-white text-gray-800 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">ETA</label>
                    <input
                      type="text"
                      value={formData.eta}
                      onChange={(e) => handleFormChange('eta', e.target.value)}
                      className="w-full px-2.5 py-2 border-2 border-gray-200 rounded-lg text-xs bg-white text-gray-800 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">POL</label>
                    <select
                      value={formData.pol}
                      onChange={(e) => handleFormChange('pol', e.target.value)}
                      className="w-full px-2.5 py-2 border-2 border-gray-200 rounded-lg text-xs bg-white text-gray-800 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all"
                    >
                      {polOptions.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">POD</label>
                    <input
                      type="text"
                      value={formData.pod}
                      onChange={(e) => handleFormChange('pod', e.target.value)}
                      className="w-full px-2.5 py-2 border-2 border-gray-200 rounded-lg text-xs bg-white text-gray-800 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">Representative</label>
                    <input
                      type="text"
                      value={formData.representative}
                      onChange={(e) => handleFormChange('representative', e.target.value)}
                      className="w-full px-2.5 py-2 border-2 border-gray-200 rounded-lg text-xs bg-white text-gray-800 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">Receiving Rep</label>
                    <input
                      type="text"
                      value={formData.receivingRep}
                      onChange={(e) => handleFormChange('receivingRep', e.target.value)}
                      className="w-full px-2.5 py-2 border-2 border-gray-200 rounded-lg text-xs bg-white text-gray-800 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">Group</label>
                    <input
                      type="text"
                      value={formData.group}
                      onChange={(e) => handleFormChange('group', e.target.value)}
                      className="w-full px-2.5 py-2 border-2 border-gray-200 rounded-lg text-xs bg-white text-gray-800 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">PO Number</label>
                    <input
                      type="text"
                      value={formData.poNo}
                      onChange={(e) => handleFormChange('poNo', e.target.value)}
                      className="w-full px-2.5 py-2 border-2 border-gray-200 rounded-lg text-xs bg-white text-gray-800 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Cargo Information Section */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-5 py-2.5">
                <h2 className="text-white font-semibold tracking-wide flex items-center text-xs">
                  <div className="w-1.5 h-1.5 bg-white rounded-full mr-2"></div>
                  Cargo Information
                </h2>
              </div>
              <div className="p-4 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">Commodity</label>
                    <input
                      type="text"
                      value={formData.commodity}
                      onChange={(e) => handleFormChange('commodity', e.target.value)}
                      className="w-full px-2.5 py-2 border-2 border-gray-200 rounded-lg text-xs bg-white text-gray-800 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">Packages</label>
                    <input
                      type="number"
                      value={formData.noOfPackages}
                      onChange={(e) => handleFormChange('noOfPackages', e.target.value)}
                      className="w-full px-2.5 py-2 border-2 border-gray-200 rounded-lg text-xs bg-white text-gray-800 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">Shipper</label>
                    <input
                      type="text"
                      value={formData.shipper}
                      onChange={(e) => handleFormChange('shipper', e.target.value)}
                      className="w-full px-2.5 py-2 border-2 border-gray-200 rounded-lg text-xs bg-white text-gray-800 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">Bill of Lading</label>
                    <input
                      type="text"
                      value={formData.bl}
                      onChange={(e) => handleFormChange('bl', e.target.value)}
                      className="w-full px-2.5 py-2 border-2 border-gray-200 rounded-lg text-xs bg-white text-gray-800 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">Net Weight (KG)</label>
                    <input
                      type="number"
                      value={formData.netWeight}
                      onChange={(e) => handleFormChange('netWeight', e.target.value)}
                      className="w-full px-2.5 py-2 border-2 border-gray-200 rounded-lg text-xs bg-white text-gray-800 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">Gross Weight (KG)</label>
                    <input
                      type="number"
                      value={formData.grossWeight}
                      onChange={(e) => handleFormChange('grossWeight', e.target.value)}
                      className="w-full px-2.5 py-2 border-2 border-gray-200 rounded-lg text-xs bg-white text-gray-800 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Documentation & Timeline Section */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-orange-600 to-orange-700 px-5 py-2.5">
                <h2 className="text-white font-semibold tracking-wide flex items-center text-xs">
                  <div className="w-1.5 h-1.5 bg-white rounded-full mr-2"></div>
                  Documentation & Timeline
                </h2>
              </div>
              <div className="p-4 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">Bayan Date</label>
                    <input
                      type="date"
                      value={formData.bayanDate}
                      onChange={(e) => handleFormChange('bayanDate', e.target.value)}
                      className="w-full px-2.5 py-2 border-2 border-gray-200 rounded-lg text-xs bg-white text-gray-800 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">Date</label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleFormChange('date', e.target.value)}
                      className="w-full px-2.5 py-2 border-2 border-gray-200 rounded-lg text-xs bg-white text-gray-800 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">Yard Date</label>
                    <input
                      type="date"
                      value={formData.yardDate}
                      onChange={(e) => handleFormChange('yardDate', e.target.value)}
                      className="w-full px-2.5 py-2 border-2 border-gray-200 rounded-lg text-xs bg-white text-gray-800 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">Payment Date</label>
                    <input
                      type="date"
                      value={formData.paymentDate}
                      onChange={(e) => handleFormChange('paymentDate', e.target.value)}
                      className="w-full px-2.5 py-2 border-2 border-gray-200 rounded-lg text-xs bg-white text-gray-800 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">End Date</label>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => handleFormChange('endDate', e.target.value)}
                      className="w-full px-2.5 py-2 border-2 border-gray-200 rounded-lg text-xs bg-white text-gray-800 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">Release Date</label>
                    <input
                      type="date"
                      value={formData.releaseDate}
                      onChange={(e) => handleFormChange('releaseDate', e.target.value)}
                      className="w-full px-2.5 py-2 border-2 border-gray-200 rounded-lg text-xs bg-white text-gray-800 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">Hijri Date</label>
                    <input
                      type="text"
                      placeholder="1446-12-5"
                      value={formData.hijriDate}
                      onChange={(e) => handleFormChange('hijriDate', e.target.value)}
                      className="w-full px-2.5 py-2 border-2 border-gray-200 rounded-lg text-xs bg-white text-gray-800 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all placeholder-gray-400"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Tables & Notes (5 columns) */}
          <div className="xl:col-span-5 space-y-4">
            
            {/* Container Information */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 px-5 py-2.5 flex justify-between items-center">
                <h3 className="text-white font-semibold tracking-wide flex items-center text-xs">
                  <div className="w-1.5 h-1.5 bg-white rounded-full mr-2"></div>
                  Container Information
                </h3>
                <button
                  onClick={addContainer}
                  className="bg-white/20 hover:bg-white/30 text-white border-0 p-1.5 rounded-lg cursor-pointer transition-all duration-200 w-7 h-7 flex items-center justify-center backdrop-blur-sm"
                >
                  <Plus size={12} />
                </button>
              </div>
              <div className="overflow-hidden max-h-64">
                <table className="w-full border-collapse text-xs bg-white">
                  <thead>
                    <tr className="bg-gray-50 sticky top-0">
                      <th className="px-2 py-2 text-left font-bold text-gray-700 text-xs uppercase tracking-wide border-b border-gray-200">Qty</th>
                      <th className="px-2 py-2 text-left font-bold text-gray-700 text-xs uppercase tracking-wide border-b border-gray-200">Type</th>
                      <th className="px-2 py-2 text-center font-bold text-gray-700 text-xs uppercase tracking-wide border-b border-gray-200">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {containers.map((container) => (
                      <tr key={container.id} className="hover:bg-gray-50 transition-colors border-b border-gray-100">
                        <td className="p-2">
                          <input
                            type="number"
                            value={container.qty}
                            onChange={(e) => updateContainer(container.id, 'qty', e.target.value)}
                            className="w-full px-2 py-1.5 border border-gray-300 rounded-md text-xs bg-white text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all"
                          />
                        </td>
                        <td className="p-2">
                          <select
                            value={container.type}
                            onChange={(e) => updateContainer(container.id, 'type', e.target.value)}
                            className="w-full px-2 py-1.5 border border-gray-300 rounded-md text-xs bg-white text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all"
                          >
                            <option value="">Select</option>
                            {containerTypes.map((type, index) => (
                              <option key={index} value={type}>{type}</option>
                            ))}
                          </select>
                        </td>
                        <td className="p-2 text-center">
                          <button 
                            onClick={() => removeContainer(container.id)}
                            disabled={containers.length === 1}
                            className="bg-red-500 hover:bg-red-600 text-white border-0 p-1 rounded-md cursor-pointer transition-all duration-200 w-6 h-6 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md mx-auto"
                          >
                            <X size={10} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bills & Documentation - Compact Layout */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-amber-600 to-amber-700 px-5 py-2.5 flex justify-between items-center">
                <h3 className="text-white font-semibold tracking-wide flex items-center text-xs">
                  <div className="w-1.5 h-1.5 bg-white rounded-full mr-2"></div>
                  Bills & Documentation
                </h3>
                <button
                  onClick={addBill}
                  className="bg-white/20 hover:bg-white/30 text-white border-0 p-1.5 rounded-lg cursor-pointer transition-all duration-200 w-7 h-7 flex items-center justify-center backdrop-blur-sm"
                >
                  <Plus size={12} />
                </button>
              </div>
              <div className="p-3 space-y-2 max-h-80 overflow-y-auto">
                {bills.map((bill, index) => (
                  <div key={bill.id} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-gray-600">Bill #{index + 1}</span>
                      <button 
                        onClick={() => removeBill(bill.id)}
                        disabled={bills.length === 1}
                        className="bg-red-500 hover:bg-red-600 text-white border-0 p-1 rounded-md cursor-pointer transition-all duration-200 w-5 h-5 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
                      >
                        <X size={8} />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      <input
                        type="text"
                        placeholder="Client Reference"
                        value={bill.clientRef}
                        onChange={(e) => updateBill(bill.id, 'clientRef', e.target.value)}
                        className="w-full px-2 py-1.5 border border-gray-300 rounded-md text-xs bg-white text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="date"
                          placeholder="DO Date"
                          value={bill.doDate}
                          onChange={(e) => updateBill(bill.id, 'doDate', e.target.value)}
                          className="w-full px-2 py-1.5 border border-gray-300 rounded-md text-xs bg-white text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all"
                        />
                        <input
                          type="text"
                          placeholder="DO Number"
                          value={bill.doNo}
                          onChange={(e) => updateBill(bill.id, 'doNo', e.target.value)}
                          className="w-full px-2 py-1.5 border border-gray-300 rounded-md text-xs bg-white text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="Endorse Number"
                          value={bill.endorseNo}
                          onChange={(e) => updateBill(bill.id, 'endorseNo', e.target.value)}
                          className="w-full px-2 py-1.5 border border-gray-300 rounded-md text-xs bg-white text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all"
                        />
                        <input
                          type="text"
                          placeholder="Bill Number"
                          value={bill.billNo}
                          onChange={(e) => updateBill(bill.id, 'billNo', e.target.value)}
                          className="w-full px-2 py-1.5 border border-gray-300 rounded-md text-xs bg-white text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes Section - Moved to Right Column */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-5 py-2.5">
                <h2 className="text-white font-semibold tracking-wide flex items-center text-xs">
                  <div className="w-1.5 h-1.5 bg-white rounded-full mr-2"></div>
                  Additional Notes
                </h2>
              </div>
              <div className="p-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">Notes</label>
                  <textarea
                    rows="6"
                    value={formData.notes}
                    onChange={(e) => handleFormChange('notes', e.target.value)}
                    className="w-full px-2.5 py-2 border-2 border-gray-200 rounded-lg text-xs bg-white text-gray-800 font-medium resize-y focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all"
                    placeholder="Enter any additional notes or comments..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-5 mt-6">
          <button
            onClick={handleAddFiles}
            className="px-6 py-2.5 border-0 rounded-xl text-xs font-bold cursor-pointer transition-all duration-300 flex items-center gap-2 uppercase tracking-wide bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 hover:scale-105 hover:shadow-xl shadow-md transform"
          >
            <FileText size={14} />
            Add Files
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2.5 border-0 rounded-xl text-xs font-bold cursor-pointer transition-all duration-300 flex items-center gap-2 uppercase tracking-wide bg-gradient-to-r from-emerald-600 to-emerald-700 text-white hover:from-emerald-700 hover:to-emerald-800 hover:scale-105 hover:shadow-xl shadow-md transform"
          >
            <Save size={14} />
            Save Operation
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClearanceOperation;
