// src/components/order/MaterialInfoTable.js
import React from 'react';

const MaterialInfoTable = ({ localMaterials }) => {
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
                    </tr>
                </thead>
                <tbody>
                    {localMaterials.map((material, index) => (
                        <tr key={material._id || index}>
                            <td className="px-6 py-3">
                                {material.quantity}
                            </td>
                            <td className="px-6 py-3">
                                {material.name} 
                            </td>
                            <td className="px-6 py-3">
                                {material.cost}
                            </td>
                            <td className="px-6 py-3">
                            </td>
                            <td className="px-6 py-3">
                                {material.quantity * material.cost}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MaterialInfoTable;
