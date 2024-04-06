import { useState } from 'react';
import useGetOrders from '../../hooks/order/useGetOrders';
import useDeleteOrder from '../../hooks/order/useDeleteOrder';

import Notification from '../../components/Notification';

const Orders = () => {
    const { orders, isLoading, errorGetAllOrder } = useGetOrders();
    const { deleteOrder, isDeleting, errorDeleteOrder } = useDeleteOrder();
    const [searchTerm, setSearchTerm] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    var notification_message = "ccc";

    if (isLoading) return <div>Loading...</div>;
    if (errorGetAllOrder) return <div>Error: {errorGetAllOrder}</div>;

    if (isDeleting) return <div>Loading...</div>;
    if (errorDeleteOrder) return <div>Error: {errorDeleteOrder}</div>;

    const formatDate = (isoDateString) => {
        const date = new Date(isoDateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const sortedAndFilteredOrders = orders.filter(order =>
        order.devis_number.toString().includes(searchTerm) ||
        (order.customer && order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()))
    )

    const handleDelete = async (orderId) => {
        const isSuccess = await deleteOrder(orderId);
        if (isSuccess) {
            triggerNotification();
            notification_message="la commande a bien été supprimé"
        }
    };

    const triggerNotification = () => {
        notification_message="la commande a bien été supprimé"

        setShowNotification(true);
    
        setTimeout(() => {
          setShowNotification(false);
        }, 3000);
    };

    return (
        <>
            <Notification show={showNotification} message={notification_message} onClose={() => setShowNotification(false)} />

            <div className="flex justify-between">
                <h1 className="text-lg lg:text-2xl md:text-2xl font-bold underline">Mes devis</h1> 
                <a href="/orders/add" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-xs px-5 py-2.5">Ajouter un devis</a>
            </div>       

            <div className="pt-2 relative mx-auto text-gray-600">
                <input
                    className="border-2 border-gray-300 bg-white h-10 w-full px-5 rounded-lg text-sm focus:outline-none"
                    type="search"
                    placeholder="Rechercher par numéro de devis ou client"
                    onChange={handleSearchChange}
                />
            </div>

            <div className="overflow-x-auto shadow-md sm:rounded-lg my-8">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                        <tr>
                            <th className="px-6 py-3">Numero de devis</th>
                            <th className="px-6 py-3">Date de création</th>
                            <th className="px-6 py-3">Statut</th>
                            <th className="px-6 py-3">Tarif</th>
                            <th className="px-3 py-3"><span className="sr-only">Modifier</span></th>
                            <th className="px-3 py-3"><span className="sr-only">Supprimer</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedAndFilteredOrders.map((order, index) => (
                            <tr key={index} className="bg-white border-b">
                                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">DE{order.devis_number}</th>
                                <td className="px-6 py-4">{formatDate(order.creation_date)}</td>
                                <td className="px-6 py-4">{order.statut}</td>
                                <td className="px-6 py-4">{order.cost}</td>
                                <td className="px-2 py-4">
                                    <button onClick={() => triggerNotification()}
                                        className="font-medium text-blue-600 hover:underline">Modifier
                                    </button>
                                </td>
                                <td className="px-3 py-4 text-right">
                                    <button onClick={() => handleDelete(order._id)} 
                                        className="font-medium text-blue-600 hover:underline">Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Orders;
