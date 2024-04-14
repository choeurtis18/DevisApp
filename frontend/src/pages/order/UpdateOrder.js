// src/page/order/UpdateOrder.js

import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import useGetOrder from '../../hooks/order/useGetOrder';
import useUpdateOrder from '../../hooks/order/useUpdateOrder';
import useGetCustomer from '../../hooks/customer/useGetCustomer';
import DropdownGetCustomers from '../../components/DropdownGetCustomers';
import useGetOrderServices from '../../hooks/order/useGetOrderServices';
import useGetOrderMaterials from '../../hooks/order/useGetOrderMaterials';

import Notification from '../../components/Notification';

const UpdateOrder = () => {
    const { orderId } = useParams();
    const { order, isLoadingOrder, errorOrder } = useGetOrder(orderId);
    const { updateOrder, isUpdating, errorUpdateOrder } = useUpdateOrder();
    const [selectedCustomerId, setSelectedCustomerId] = useState('');
    const [startDate, setStartDate] = useState("");

    const { customer, isLoadingCustomer, errorCustomer } = useGetCustomer(selectedCustomerId);
    const { services, isLoadingServices, errorGetAllServices } = useGetOrderServices(orderId);
    const { materials, isLoadingMaterials, errorGetAllMaterials } = useGetOrderMaterials(orderId);

    const [localServices, setLocalServices] = useState([]);
    const [localMaterials, setLocalMaterials] = useState([]);

    const [orderDetails, setOrderDetails] = useState({
        intervenant: 'TCHOUNGA',
        typeOfWork: '',
        remark: '',
        interventionDelay: '',
        conditions: 'PAYABLE A RECEPTION',
        tva: '',
        description: '',
    });

    const [customerDetails, setCustomerDetails] = useState({
        name: '',
        name_socity: '',
        phone: '',
        adress: '',
        cp: '',
        city: '',
        country: '',
    });
    useEffect(() => {
        if (services) setLocalServices(services);
        if (materials) setLocalMaterials(materials);
        if (order) {
            setSelectedCustomerId(order.customer_id);
            setStartDate(formatDateForInput(order.start_date));

            setOrderDetails({
                intervenant: 'TCHOUNGA',
                typeOfWork: order.type_of_work || '',
                remark: '',
                interventionDelay: order.days || '',
                conditions: 'PAYABLE A RECEPTION',
                tva: order.tva || 0, 
                description: order.description || '',
            });
        }
        if (customer) {
            setSelectedCustomerId(selectedCustomerId);

            setCustomerDetails({
                name: customer.name || '',
                name_socity: customer.name_socity || '',
                phone: customer.phone || '',
                adress: customer.adress || '',
                cp: customer.cp || '',
                city: customer.city || '',
                country: customer.country || '',
            });
        }
    }, [services, materials, order, customer]);

    const formatDateForInput = (isoDate) => {
        const date = new Date(isoDate);
        return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0, 16);
    };

    const handleCustomerChange = (customerId) => {
        setSelectedCustomerId(customerId);
    };

    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");

    if (isLoadingOrder || isLoadingCustomer || isUpdating || isLoadingServices || isLoadingMaterials)
        return <div>Loading...</div>;
    if (errorOrder || errorCustomer || errorUpdateOrder || errorGetAllServices || errorGetAllMaterials) {
        const errorMsg = errorOrder || errorCustomer || errorUpdateOrder || errorGetAllServices || errorGetAllMaterials;
        return <div>Error: {errorMsg}</div>;
    }
    if (!order || !customer || !services || !materials)
        return <div>Order or Customer or Service or Materials not found</div>;

    const handleUpdate = async () => {
        const isSuccess = await updateOrder(orderId);
        if (isSuccess) {
            setNotificationMessage("La commande a bien été mise à jour.");
            triggerNotification();
        }
    };

    const triggerNotification = () => {
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
    };

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const handleCustomerDetailsChange = (field, value) => {
        setCustomerDetails(prev => ({ ...prev, [field]: value }));
    };
    const handleOrderDetailsChange = (field, value) => {
        const newValue = field === 'tva' ? parseFloat(value) || 0 : value;
        setOrderDetails(prev => ({ ...prev, [field]: newValue }));
    };
    
    
    const handleAddNewService = () => {
        setLocalServices([...localServices, { _id: Date.now(), name: "", quantity: 1, cost: 0 }]);
    };

    const handleServiceChange = (index, field, value) => {
        const updatedServices = [...localServices];
        updatedServices[index][field] = value;
        setLocalServices(updatedServices);
    };

    const handleAddNewMaterial = () => {
        setLocalMaterials([...localMaterials, { _id: Date.now(), name: "", quantity: 1, cost: 0 }]);
    };

    const handleMaterialChange = (index, field, value) => {
        const updatedMaterials = [...localMaterials];
        updatedMaterials[index][field] = value;
        setLocalMaterials(updatedMaterials);
    };

    return (
        <>
            <Notification show={showNotification} message={notificationMessage} onClose={() => setShowNotification(false)} />

            <div className="flex justify-between">
                <h1 className="text-lg lg:text-2xl md:text-2xl font-bold">
                    Commande DE{order.devis_number}
                </h1> 
                <button onClick={handleUpdate} 
                        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-xs px-5 py-2.5">Update
                </button>
            </div>

            {/* Infos Clients */}
            <div className='customer-infos my-8 p-4 rounded overflow-hidden shadow-lg'>
                <h3 className="text-md lg:text-xl md:text-xl">Devis à l’attention de :</h3> 
                <DropdownGetCustomers initialCustomerId={selectedCustomerId} onCustomerChange={handleCustomerChange} />
            </div>

            {/* Customer Info */}
            <div className="overflow-x-auto shadow-md sm:rounded-lg my-8">
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
                                <input type='text' value={customerDetails.name} onChange={(e) => handleCustomerDetailsChange('name', e.target.value)} />
                            </td>
                            <td className="px-6 py-4">
                                <input type='text' value={customerDetails.name_socity} onChange={(e) => handleCustomerDetailsChange('name_socity', e.target.value)} />
                            </td>
                            <td className="px-6 py-4">
                                <input type='text' value={customerDetails.phone} onChange={(e) => handleCustomerDetailsChange('phone', e.target.value)} />
                            </td>
                            <td className="px-6 py-4">
                                <input type='text' value={customerDetails.adress} onChange={(e) => handleCustomerDetailsChange('adress', e.target.value)} />
                            </td>
                            <td className="px-6 py-4">
                                <input type='number' value={customerDetails.cp} onChange={(e) => handleCustomerDetailsChange('cp', e.target.value)} />
                            </td>
                            <td className="px-6 py-4">
                                <input type='text' value={customerDetails.city} onChange={(e) => handleCustomerDetailsChange('city', e.target.value)} />
                            </td>
                            <td className="px-6 py-4">
                                <input type='text' value={customerDetails.country} onChange={(e) => handleCustomerDetailsChange('country', e.target.value)} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>


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
                                {orderDetails.intervenant}
                            </td>
                            <td className="px-6 py-4">
                                <input type='text' value={orderDetails.typeOfWork} onChange={(e) => handleOrderDetailsChange('typeOfWork', e.target.value)} />
                            </td>
                            <td className="px-6 py-4">
                                <input type='datetime-local' value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                            </td>
                            <td className="px-6 py-4">
                                {orderDetails.remark}
                            </td>
                            <td className="px-6 py-4">
                                <input type='number' value={orderDetails.interventionDelay} onChange={(e) => handleOrderDetailsChange('interventionDelay', e.target.value)} />
                            </td>
                            <td className="px-6 py-4">
                                {orderDetails.conditions}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Infos Services */}
            <div className="overflow-x-auto shadow-md sm:rounded-lg my-8">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                        <tr>
                            <th className="px-6 py-3">QUANTITE</th>
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
                                <td className="px-6 py-3"><input type="number" value={service.quantity} onChange={e => handleServiceChange(index, 'quantity', e.target.value)} /></td>
                                <td className="px-6 py-3"><input type="text" value={service.name} onChange={e => handleServiceChange(index, 'name', e.target.value)} /></td>
                                <td className="px-6 py-3"><input type="number" value={service.cost} onChange={e => handleServiceChange(index, 'cost', parseFloat(e.target.value))} /></td>
                                <td className="px-6 py-3"></td>
                                <td className="px-6 py-3">{service.quantity * service.cost}</td>
                                <td className="px-6 py-3"><button onClick={() => setLocalServices(localServices.filter((_, i) => i !== index))}>Remove</button></td>
                            </tr>
                        ))}
                        <tr>
                            <td className="px-6 py-3" colSpan="6"><button onClick={handleAddNewService}>Add New Service</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Infos Materials */}
            <div className="overflow-x-auto shadow-md sm:rounded-lg my-8">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                        <tr>
                            <th className="px-6 py-3">QUANTITE</th>
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
                                <td className="px-6 py-3"><input type="number" value={material.quantity} onChange={e => handleMaterialChange(index, 'quantity', e.target.value)} /></td>
                                <td className="px-6 py-3"><input type="text" value={material.name} onChange={e => handleMaterialChange(index, 'name', e.target.value)} /></td>
                                <td className="px-6 py-3"><input type="number" value={material.cost} onChange={e => handleMaterialChange(index, 'cost', parseFloat(e.target.value))} /></td>
                                <td className="px-6 py-3"></td>
                                <td className="px-6 py-3">{material.quantity * material.cost}</td>
                                <td className="px-6 py-3"><button onClick={() => setLocalMaterials(localMaterials.filter((_, i) => i !== index))}>Remove</button></td>
                            </tr>
                        ))}
                        <tr>
                            <td className="px-6 py-3" colSpan="6"><button onClick={handleAddNewMaterial}>Add New Material</button></td>
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
                                <textarea name='order_description' className="py-10 px-4" onChange={(e) => handleOrderDetailsChange('order_description', e.target.value)}>{orderDetails.description}</textarea>
                            </td>
                            <td className="px-6 py-4">
                                <input type='number' value={orderDetails.tva} name="order_tva" onChange={(e) => handleOrderDetailsChange('tva', e.target.value)} />
                            </td>
                            <td className="px-6 py-4">
                                {order.cost}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default UpdateOrder;
