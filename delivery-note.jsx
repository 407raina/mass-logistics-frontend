import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { FileText, Truck, User, MapPin, Package, Users, Save, Printer, RotateCcw, Plus, X } from 'lucide-react';

function DeliveryNote() {
  const [formData, setFormData] = useState({
    deliveryNoteNo: '',
    blNo: '',
    date: '',
    refNo: '',
    shipperDetails: '',
    truckType: '',
    truckPlate: '',
    truckCountry: '',
    personInCharge: '',
    notifyConsignee: '',
    freight: '',
    loadingPoint: '',
    dischargePoint: '',
    books: '',
    line: '',
    country: '',
    goods: [{
      marksNos: '',
      description: '',
      packages: '',
      volumeWeight: ''
    }],
    partyName: '',
    mobileNo: '',
    signature: '',
    arrivalTime: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGoodsChange = (index, e) => {
    const { name, value } = e.target;
    const updatedGoods = [...formData.goods];
    updatedGoods[index] = {
      ...updatedGoods[index],
      [name]: value
    };
    setFormData(prev => ({
      ...prev,
      goods: updatedGoods
    }));
  };

  const addGoodsRow = () => {
    setFormData(prev => ({
      ...prev,
      goods: [...prev.goods, {
        marksNos: '',
        description: '',
        packages: '',
        volumeWeight: ''
      }]
    }));
  };

  const removeGoodsRow = (index) => {
    const updatedGoods = formData.goods.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      goods: updatedGoods
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleReset = () => {
    setFormData({
      deliveryNoteNo: '',
      blNo: '',
      date: '',
      refNo: '',
      shipperDetails: '',
      truckType: '',
      truckPlate: '',
      truckCountry: '',
      personInCharge: '',
      notifyConsignee: '',
      freight: '',
      loadingPoint: '',
      dischargePoint: '',
      books: '',
      line: '',
      country: '',
      goods: [{
        marksNos: '',
        description: '',
        packages: '',
        volumeWeight: ''
      }],
      partyName: '',
      mobileNo: '',
      signature: '',
      arrivalTime: ''
    });
  };

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Delivery_Note_${formData.deliveryNoteNo || 'New'}`,
    onBeforeGetContent: () => {
      return Promise.resolve();
    },
    onAfterPrint: () => {
      console.log('Print completed');
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-[1900px] mx-auto p-5">
        {/* Page Header */}
        <div className="mb-5">
          <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="px-8 py-4 bg-gradient-to-r from-black/10 to-transparent">
              <h1 className="text-xl font-bold tracking-wide">Delivery Note Management</h1>
            </div>
          </div>
        </div>

        <div ref={componentRef} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Basic Information Section */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-3">
                <h2 className="text-white font-semibold tracking-wide flex items-center text-sm">
                  <div className="w-1.5 h-1.5 bg-white rounded-full mr-2"></div>
                  <FileText size={14} className="mr-2" />
                  Basic Information
                </h2>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
                      Delivery Note No. <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="deliveryNoteNo"
                      value={formData.deliveryNoteNo}
                      onChange={handleChange}
                      placeholder="Enter delivery note number"
                      className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg text-sm bg-white text-gray-800 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
                      B/L Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="blNo"
                      value={formData.blNo}
                      onChange={handleChange}
                      placeholder="Enter B/L number"
                      className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg text-sm bg-white text-gray-800 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
                      Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg text-sm bg-white text-gray-800 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
                      Reference No.
                    </label>
                    <input
                      type="text"
                      name="refNo"
                      value={formData.refNo}
                      onChange={handleChange}
                      placeholder="Enter reference number"
                      className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg text-sm bg-white text-gray-800 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Shipper Information Section */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-green-700 px-5 py-3">
                <h2 className="text-white font-semibold tracking-wide flex items-center text-sm">
                  <div className="w-1.5 h-1.5 bg-white rounded-full mr-2"></div>
                  <User size={14} className="mr-2" />
                  Shipper / Loading Party
                </h2>
              </div>
              <div className="p-5 space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
                    Shipper Details
                  </label>
                  <textarea
                    name="shipperDetails"
                    value={formData.shipperDetails}
                    onChange={handleChange}
                    placeholder="Enter shipper details and address"
                    rows="3"
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg text-sm bg-white text-gray-800 font-medium resize-y focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
                      Truck Type
                    </label>
                    <input
                      type="text"
                      name="truckType"
                      value={formData.truckType}
                      onChange={handleChange}
                      placeholder="Enter truck type"
                      className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg text-sm bg-white text-gray-800 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
                      Truck Plate
                    </label>
                    <input
                      type="text"
                      name="truckPlate"
                      value={formData.truckPlate}
                      onChange={handleChange}
                      placeholder="Enter truck plate number"
                      className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg text-sm bg-white text-gray-800 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
                      Truck Country
                    </label>
                    <input
                      type="text"
                      name="truckCountry"
                      value={formData.truckCountry}
                      onChange={handleChange}
                      placeholder="Enter country"
                      className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg text-sm bg-white text-gray-800 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Contact & Freight Information */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-5 py-3">
                <h2 className="text-white font-semibold tracking-wide flex items-center text-sm">
                  <div className="w-1.5 h-1.5 bg-white rounded-full mr-2"></div>
                  <Users size={14} className="mr-2" />
                  Contact & Freight Information
                </h2>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
                      Person In Charge
                    </label>
                    <input
                      type="text"
                      name="personInCharge"
                      value={formData.personInCharge}
                      onChange={handleChange}
                      placeholder="Enter person in charge"
                      className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg text-sm bg-white text-gray-800 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
                      Notify/Consignee
                    </label>
                    <input
                      type="text"
                      name="notifyConsignee"
                      value={formData.notifyConsignee}
                      onChange={handleChange}
                      placeholder="Enter consignee"
                      className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg text-sm bg-white text-gray-800 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
                      Freight
                    </label>
                    <input
                      type="text"
                      name="freight"
                      value={formData.freight}
                      onChange={handleChange}
                      placeholder="Enter freight details"
                      className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg text-sm bg-white text-gray-800 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Location Information */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-orange-600 to-orange-700 px-5 py-3">
                <h2 className="text-white font-semibold tracking-wide flex items-center text-sm">
                  <div className="w-1.5 h-1.5 bg-white rounded-full mr-2"></div>
                  <MapPin size={14} className="mr-2" />
                  Location & Additional Details
                </h2>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
                      Loading Point
                    </label>
                    <input
                      type="text"
                      name="loadingPoint"
                      value={formData.loadingPoint}
                      onChange={handleChange}
                      placeholder="Enter loading point"
                      className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg text-sm bg-white text-gray-800 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
                      Discharge Point
                    </label>
                    <input
                      type="text"
                      name="dischargePoint"
                      value={formData.dischargePoint}
                      onChange={handleChange}
                      placeholder="Enter discharge point"
                      className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg text-sm bg-white text-gray-800 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
                      Books
                    </label>
                    <input
                      type="text"
                      name="books"
                      value={formData.books}
                      onChange={handleChange}
                      placeholder="Enter books"
                      className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg text-sm bg-white text-gray-800 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
                      Line
                    </label>
                    <input
                      type="text"
                      name="line"
                      value={formData.line}
                      onChange={handleChange}
                      placeholder="Enter shipping line"
                      className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg text-sm bg-white text-gray-800 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="Enter country"
                      className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg text-sm bg-white text-gray-800 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Goods Details Section */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 px-5 py-3 flex justify-between items-center">
                <h2 className="text-white font-semibold tracking-wide flex items-center text-sm">
                  <div className="w-1.5 h-1.5 bg-white rounded-full mr-2"></div>
                  <Package size={14} className="mr-2" />
                  Goods Details
                </h2>
                <button
                  type="button"
                  onClick={addGoodsRow}
                  className="bg-white/20 hover:bg-white/30 text-white border-0 p-2 rounded-lg cursor-pointer transition-all duration-200 backdrop-blur-sm flex items-center gap-1 text-xs"
                >
                  <Plus size={12} />
                  Add Item
                </button>
              </div>
              <div className="p-5">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gradient-to-r from-blue-700 to-blue-800 text-white">
                        <th className="px-3 py-3 text-center text-xs font-bold uppercase tracking-wider">
                          Marks & Nos
                        </th>
                        <th className="px-3 py-3 text-center text-xs font-bold uppercase tracking-wider">
                          Description of Goods
                        </th>
                        <th className="px-3 py-3 text-center text-xs font-bold uppercase tracking-wider">
                          Packages
                        </th>
                        <th className="px-3 py-3 text-center text-xs font-bold uppercase tracking-wider">
                          Volume/Weight
                        </th>
                        <th className="px-3 py-3 text-center text-xs font-bold uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {formData.goods.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                          <td className="px-3 py-3 text-center">
                            <input
                              type="text"
                              name="marksNos"
                              value={item.marksNos}
                              onChange={(e) => handleGoodsChange(index, e)}
                              placeholder="Enter marks & nos"
                              className="w-full px-2 py-2 border border-gray-300 rounded-md text-xs bg-white text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all"
                            />
                          </td>
                          <td className="px-3 py-3 text-center">
                            <input
                              type="text"
                              name="description"
                              value={item.description}
                              onChange={(e) => handleGoodsChange(index, e)}
                              placeholder="Enter description"
                              className="w-full px-2 py-2 border border-gray-300 rounded-md text-xs bg-white text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all"
                            />
                          </td>
                          <td className="px-3 py-3 text-center">
                            <input
                              type="text"
                              name="packages"
                              value={item.packages}
                              onChange={(e) => handleGoodsChange(index, e)}
                              placeholder="Enter packages"
                              className="w-full px-2 py-2 border border-gray-300 rounded-md text-xs bg-white text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all"
                            />
                          </td>
                          <td className="px-3 py-3 text-center">
                            <input
                              type="text"
                              name="volumeWeight"
                              value={item.volumeWeight}
                              onChange={(e) => handleGoodsChange(index, e)}
                              placeholder="Enter volume/weight"
                              className="w-full px-2 py-2 border border-gray-300 rounded-md text-xs bg-white text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all"
                            />
                          </td>
                          <td className="px-3 py-3 text-center">
                            {formData.goods.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeGoodsRow(index)}
                                className="inline-flex items-center justify-center w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                                title="Remove Item"
                              >
                                <X size={14} />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Party Information Section */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-5 py-3">
                <h2 className="text-white font-semibold tracking-wide flex items-center text-sm">
                  <div className="w-1.5 h-1.5 bg-white rounded-full mr-2"></div>
                  <User size={14} className="mr-2" />
                  Party Information
                </h2>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
                      Party Name
                    </label>
                    <input
                      type="text"
                      name="partyName"
                      value={formData.partyName}
                      onChange={handleChange}
                      placeholder="Enter party name"
                      className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg text-sm bg-white text-gray-800 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      name="mobileNo"
                      value={formData.mobileNo}
                      onChange={handleChange}
                      placeholder="Enter mobile number"
                      className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg text-sm bg-white text-gray-800 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
                      Signature
                    </label>
                    <input
                      type="text"
                      name="signature"
                      value={formData.signature}
                      onChange={handleChange}
                      placeholder="Enter signature"
                      className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg text-sm bg-white text-gray-800 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
                      Arrival Time
                    </label>
                    <input
                      type="time"
                      name="arrivalTime"
                      value={formData.arrivalTime}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg text-sm bg-white text-gray-800 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 mt-6 print:hidden">
              <button 
                type="button" 
                onClick={handlePrint}
                className="px-6 py-2.5 border-0 rounded-xl text-sm font-bold cursor-pointer transition-all duration-300 flex items-center gap-2 uppercase tracking-wide bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 hover:scale-105 hover:shadow-xl shadow-md transform"
              >
                <Printer size={14} />
                Print Delivery Note
              </button>
              <button 
                type="submit" 
                className="px-6 py-2.5 border-0 rounded-xl text-sm font-bold cursor-pointer transition-all duration-300 flex items-center gap-2 uppercase tracking-wide bg-gradient-to-r from-emerald-600 to-emerald-700 text-white hover:from-emerald-700 hover:to-emerald-800 hover:scale-105 hover:shadow-xl shadow-md transform"
              >
                <Save size={14} />
                Save Delivery Note
              </button>
              <button 
                type="button" 
                onClick={handleReset}
                className="px-6 py-2.5 border-0 rounded-xl text-sm font-bold cursor-pointer transition-all duration-300 flex items-center gap-2 uppercase tracking-wide bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800 hover:scale-105 hover:shadow-xl shadow-md transform"
              >
                <RotateCcw size={14} />
                Reset Form
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DeliveryNote;
