// src/components/order/ServiceTable.js
import React from 'react';

const ServiceTable = ({ localServices, handleServiceChange, setLocalServices, handleAddNewService }) => {
    return (
        <div className="overflow-x-auto shadow-md sm:rounded-lg my-8">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                    <tr>
                        <th className="px-6 py-3">QUANTITÉ</th>
                        <th className="px-6 py-3">DESCRIPTION</th>
                        <th className="px-6 py-3">PRIX UNITAIRE</th>
                        <th className="px-6 py-3">TVA</th>
                        <th className="px-6 py-3">MONTANT</th>
                        <th className="px-6 py-3">ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {localServices.map((service, index) => (
                        <tr key={service._id || index}>
                            <td className="px-6 py-3">
                                <input className="border-2 border-gray-100 rounded-md" required type="number" value={service.quantity} onChange={e => handleServiceChange(index, 'quantity', e.target.value)} />
                            </td>
                            <td className="px-6 py-3">
                                <input className="border-2 border-gray-100 rounded-md" required type="text" value={service.name} onChange={e => handleServiceChange(index, 'name', e.target.value)} />
                            </td>
                            <td className="px-6 py-3">
                                <input className="border-2 border-gray-100 rounded-md" required type="number" value={service.cost} onChange={e => handleServiceChange(index, 'cost', parseFloat(e.target.value))} />
                            </td>
                            <td className="px-6 py-3">
                            </td>
                            <td className="px-6 py-3">
                                {service.quantity * service.cost}
                            </td>
                            <td className="px-6 py-3">
                                <button onClick={() => setLocalServices(localServices.filter((_, i) => i !== index))}>Remove</button>
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td className="px-6 py-3" colSpan="6">
                            <button type="button" onClick={handleAddNewService}>Add New Service</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ServiceTable;
