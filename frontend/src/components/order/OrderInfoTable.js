// src/components/order/OrderInfoTable.js
const OrderInfoTable = ({ orderDetails, startDate }) => { 
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
                            {orderDetails.type_of_work}
                        </td>
                        <td className="px-6 py-4">
                            {startDate}
                        </td>
                        <td className="px-6 py-4">
                        </td>
                        <td className="px-6 py-4">
                            {orderDetails.days}
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
                            {orderDetails.description}
                        </td>
                        <td className="px-6 py-4">
                            {orderDetails.tva}
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

export default OrderInfoTable;
