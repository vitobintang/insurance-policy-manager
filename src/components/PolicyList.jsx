import React from 'react';
import { format } from 'date-fns';
import { formatToRupiah } from '../utils/currency';

function PolicyList({ policies, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-100">
        <thead>
          <tr>
            <th className="px-6 py-4 text-left text-xs font-medium text-blue-900 uppercase tracking-wider">
              Policy Number
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-blue-900 uppercase tracking-wider">
              Insured Name
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-blue-900 uppercase tracking-wider">
              Period
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-blue-900 uppercase tracking-wider">
              Item Name
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-blue-900 uppercase tracking-wider">
              Sum Insured
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-blue-900 uppercase tracking-wider">
              Premium Price
            </th>
            <th className="px-6 py-4 text-center text-xs font-medium text-blue-900 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {policies.map((policy) => (
            <tr key={policy.policy_number} className="hover:bg-orange-50 transition-colors">
              <td className="px-6 py-4 text-sm text-slate-600">
                {policy.policy_number}
              </td>
              <td className="px-6 py-4 text-sm text-slate-600">
                {policy.insured_name}
              </td>
              <td className="px-6 py-4 text-sm text-slate-600">
                {format(new Date(policy.policy_effective_date), 'MM/dd/yyyy')} - 
                {format(new Date(policy.policy_expiration_date), 'MM/dd/yyyy')}
              </td>
              <td className="px-6 py-4 text-sm text-slate-600">
                {`${policy.vehicle_brand} - ${policy.vehicle_type}`}
              </td>
              <td className="px-6 py-4 text-sm text-slate-600">
                {formatToRupiah(policy.vehicle_price)}
              </td>
              <td className="px-6 py-4 text-sm text-slate-600">
                {formatToRupiah(policy.premium_price)}
              </td>
              <td className="px-6 py-4 text-sm font-medium flex flex-col items-center space-y-2">
                <button
                  onClick={() => onEdit(policy)}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(policy.policy_number)}
                  className="text-orange-600 hover:text-orange-800 transition-colors"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PolicyList;