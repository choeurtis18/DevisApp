// src/components/order/CustomerInfoTable.js
const CustomerInfoTable = ({ customerDetails }) => {
    return (
        <div className="my-8 overflow-x-auto shadow-md sm:rounded-lg my-8">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                    <tr>
                        <th className="px-6 py-3">NAME</th>
                        <th className="px-6 py-3">SOCITY</th>
                        <th className="px-6 py-3">PHONE</th>
                        <th className="px-6 py-3">ADRESSE</th>
                        <th className="px-6 py-3">CODE POSTALE</th>
                        <th className="px-6 py-3">VILLE</th>
                        <th className="px-6 py-3">PAYS</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-white border-b">
                        <td className="px-6 py-4">
                        {customerDetails.name}
                        </td>
                        <td className="px-6 py-4">
                        {customerDetails.name_socity}
                        </td>
                        <td className="px-6 py-4">
                        {customerDetails.phone}
                        </td>
                        <td className="px-6 py-4">
                        {customerDetails.adress}
                        </td>
                        <td className="px-6 py-4">
                        {customerDetails.cp}
                        </td>
                        <td className="px-6 py-4">
                        {customerDetails.city}
                        </td>
                        <td className="px-6 py-4">
                        {customerDetails.country}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default CustomerInfoTable;
