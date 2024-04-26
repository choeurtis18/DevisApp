// src/components/order/OrderDetailsForm.js
const OrderDetailsForm = ({ orderDetails, handleOrderDetailsChange, startDate, setStartDate }) => {
    
    
    return (
        <>
        {/* Global Info */}
        <div className="overflow-x-auto shadow-md sm:rounded-lg my-8">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                    <tr>
                        <th className="px-6 py-3">INTERVENANT</th>
                        <th className="px-6 py-3">NATURE DES TRAVAUX</th>
                        <th className="px-6 py-3">DATE DE VISITE</th>
                        <th className="px-6 py-3">REMARQUE</th>
                        <th className="px-6 py-3">DELAI INTERVENTION (jours)</th>
                        <th className="px-6 py-3">CONDITIONS</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-white border-b">
                        <td className="px-6 py-4">
                        TCHOUNGA
                        </td>
                        <td className="px-6 py-4">
                            <input className="border border-gray-100 rounded-md"type='text' required="required" value={orderDetails.type_of_work} onChange={(e) => handleOrderDetailsChange('type_of_work', e.target.value)} />
                        </td>
                        <td className="px-6 py-4">
                            <input className="border border-gray-100 rounded-md"type='datetime-local' required="required" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        </td>
                        <td className="px-6 py-4">
                        </td>
                        <td className="px-6 py-4">
                            <input className="border border-gray-100 rounded-md"type='number' required="required" value={orderDetails.days} onChange={(e) => handleOrderDetailsChange('days', e.target.value)} />
                        </td>
                        <td className="px-6 py-4">
                        PAYABLE A RECEPTION
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        

        {/* Infos Gobal */}
        <div className="overflow-x-auto shadow-md sm:rounded-lg my-8">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                    <tr>
                        <th className="px-6 py-3">DESCRIPTION</th>
                        <th className="px-6 py-3">TVA</th>
                        <th className="px-6 py-3">TOTAL</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-white border-b">
                        <td className="px-6 py-4">
                            <textarea required="required" name='order_description' className="py-10 px-4" onChange={(e) => handleOrderDetailsChange('description', e.target.value)}></textarea>
                        </td>
                        <td className="px-6 py-4">
                            <input className="border border-gray-100 rounded-md"required="required" type='number' name="order_tva" onChange={(e) => handleOrderDetailsChange('tva', e.target.value)} />
                        </td>
                        <td className="px-6 py-4">
                            {orderDetails.cost}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        </>
    );
};

export default OrderDetailsForm;
