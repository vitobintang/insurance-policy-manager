import React, { useState, useEffect } from 'react';
import { formatToRupiah, parseRupiahToNumber } from '../utils/currency';

function PolicyForm({ onSave, initialData }) {
  const [formData, setFormData] = useState({
    insured_name: '',
    policy_effective_date: '',
    policy_expiration_date: '',
    vehicle_brand: '',
    vehicle_type: '',
    vehicle_year: '',
    vehicle_price: '',
    premium_rate: '',
    premium_price: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'vehicle_price') {
      const numericValue = parseRupiahToNumber(value);
      setFormData(prev => ({
        ...prev,
        vehicle_price: numericValue,
        premium_price: calculatePremium(numericValue, prev.premium_rate)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        ...(name === 'premium_rate' ? {
          premium_price: calculatePremium(prev.vehicle_price, value)
        } : {})
      }));
    }
  };

  const calculatePremium = (price, rate) => {
    if (!price || !rate) return '';
    return (parseFloat(price) * (parseFloat(rate) / 100)).toFixed(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave({
      ...formData,
      vehicle_year: parseInt(formData.vehicle_year),
      vehicle_price: parseFloat(formData.vehicle_price),
      premium_rate: parseFloat(formData.premium_rate),
      premium_price: parseFloat(calculatePremium(formData.vehicle_price, formData.premium_rate))
    });
    
    // Reset form after successful save
    setFormData({
      insured_name: '',
      policy_effective_date: '',
      policy_expiration_date: '',
      vehicle_brand: '',
      vehicle_type: '',
      vehicle_year: '',
      vehicle_price: '',
      premium_rate: '',
      premium_price: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">Insured Name</label>
          <input
            type="text"
            name="insured_name"
            value={formData.insured_name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 text-gray-700 bg-white border-b-2 border-gray-200 focus:border-orange-400 focus:outline-none transition duration-300"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">Policy Effective Date</label>
          <input
            type="date"
            name="policy_effective_date"
            value={formData.policy_effective_date}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 text-gray-700 bg-white border-b-2 border-gray-200 focus:border-orange-400 focus:outline-none transition duration-300"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">Policy Expiration Date</label>
          <input
            type="date"
            name="policy_expiration_date"
            value={formData.policy_expiration_date}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 text-gray-700 bg-white border-b-2 border-gray-200 focus:border-orange-400 focus:outline-none transition duration-300"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">Vehicle Brand</label>
          <input
            type="text"
            name="vehicle_brand"
            value={formData.vehicle_brand}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 text-gray-700 bg-white border-b-2 border-gray-200 focus:border-orange-400 focus:outline-none transition duration-300"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">Vehicle Type</label>
          <input
            type="text"
            name="vehicle_type"
            value={formData.vehicle_type}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 text-gray-700 bg-white border-b-2 border-gray-200 focus:border-orange-400 focus:outline-none transition duration-300"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">Vehicle Year</label>
          <input
            type="number"
            name="vehicle_year"
            value={formData.vehicle_year}
            onChange={handleChange}
            required
            min="1900"
            max={new Date().getFullYear() + 1}
            className="w-full px-4 py-2 text-gray-700 bg-white border-b-2 border-gray-200 focus:border-orange-400 focus:outline-none transition duration-300"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">Vehicle Price</label>
          <input
            type="text"
            name="vehicle_price"
            value={formatToRupiah(formData.vehicle_price)}
            onChange={handleChange}
            required
            placeholder="Enter amount"
            className="w-full px-4 py-2 text-gray-700 bg-white border-b-2 border-gray-200 focus:border-orange-400 focus:outline-none transition duration-300"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">Premium Rate (%)</label>
          <input
            type="number"
            name="premium_rate"
            value={formData.premium_rate}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="w-full px-4 py-2 text-gray-700 bg-white border-b-2 border-gray-200 focus:border-orange-400 focus:outline-none transition duration-300"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">Premium Price</label>
          <input
            type="text"
            value={formatToRupiah(calculatePremium(formData.vehicle_price, formData.premium_rate))}
            readOnly
            className="w-full px-4 py-2 text-gray-500 bg-gray-50 border-b-2 border-gray-200"
          />
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <button
          type="submit"
          className="px-6 py-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 transition duration-300 shadow-md"
        >
          {initialData ? 'Update Policy' : 'Create Policy'}
        </button>
      </div>
    </form>
  );
}

export default PolicyForm;