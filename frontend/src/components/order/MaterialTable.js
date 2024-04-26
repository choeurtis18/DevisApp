// src/components/order/MaterialTable.js
import React from 'react';

const MaterialTable = ({ localMaterials, handleMaterialChange, setLocalMaterials, handleAddNewMaterial }) => {
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
                    {localMaterials.map((material, index) => (
                        <tr key={material._id || index}>
                            <td className="px-6 py-3">
                                <input className="border border-gray-100 rounded-md"required type="number" value={material.quantity} onChange={e => handleMaterialChange(index, 'quantity', e.target.value)} />
                            </td>
                            <td className="px-6 py-3">
                                <input className="border border-gray-100 rounded-md"required type="text" value={material.name} onChange={e => handleMaterialChange(index, 'name', e.target.value)} />
                            </td>
                            <td className="px-6 py-3">
                                <input className="border border-gray-100 rounded-md"required type="number" value={material.cost} onChange={e => handleMaterialChange(index, 'cost', parseFloat(e.target.value))} />
                            </td>
                            <td className="px-6 py-3">
                            </td>
                            <td className="px-6 py-3">
                                {material.quantity * material.cost}
                            </td>
                            <td className="px-6 py-3">
                                <button onClick={() => setLocalMaterials(localMaterials.filter((_, i) => i !== index))}>Remove</button>
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td className="px-6 py-3" colSpan="6">
                            <button type="button" onClick={handleAddNewMaterial}>Add New Material</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default MaterialTable;
