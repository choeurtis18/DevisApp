// src/page/order/addOrder.js

import React, { useState, useEffect } from 'react';

import useGetCustomer from '../../hooks/customer/useGetCustomer';
import useAddOrder from '../../hooks/order/useAddOrder';
import useAddService from '../../hooks/service/useAddService';
import useAddMaterial from '../../hooks/material/useAddMaterial';
import DropdownGetCustomers from '../../components/DropdownGetCustomers';

import Notification from '../../components/Notification';

const AddOrder = () => {

    const [selectedCustomerId, setSelectedCustomerId] = useState('');
    const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 16));

    const { customer, isLoading: isLoadingCustomer } = useGetCustomer(selectedCustomerId);
    const { addOrder, isLoading: isAddingOrder, error: errorAddOrder } = useAddOrder();
    const { addMaterial, isLoading: isAddingMaterial, error: errorAddMaterial } = useAddMaterial();
    const { addService, isLoading: isAddingService, error: errorAddService } = useAddService();

    const [localServices, setLocalServices] = useState([]);
    const [localMaterials, setLocalMaterials] = useState([]);

    const [notificationMessage, setNotificationMessage] = useState("");
    const [showNotification, setShowNotification] = useState(false);
    const [notification, setNotification] = useState({ show: false, message: '' });


    const triggerNotification = () => {
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
    };

    const handleCustomerChange = (customerId) => {
        setSelectedCustomerId(customerId);
    };

    const [orderDetails, setOrderDetails] = useState({
        devis_number: Date.now(),
        start_date: '',
        creation_date: Date.now(),
        update_date: Date.now(),
        days: '',
        tva: '',
        statut: "en cours",
        cost: '',
        type_of_work: '',
        description: '',
        user_id: localStorage.getItem('userId'),
        customer_id: ''
    });

    const [customerDetails, setCustomerDetails] = useState({
        _id: '',
        name: '',
        name_socity: '',
        phone: '',
        adress: '',
        cp: '',
        city: '',
        country: '',
    });

    useEffect(() => {
        if (customer) {
            setCustomerDetails({
                _id: customer._id || '',
                name: customer.name || '',
                name_socity: customer.name_socity || '',
                phone: customer.phone || '',
                adress: customer.adress || '',
                cp: customer.cp || '',
                city: customer.city || '',
                country: customer.country || '',
            });
        }
    }, [customer]); 

    const handleUpdate = async (event) => {
        event.preventDefault(); 

        orderDetails.customer_id = customerDetails._id;
        orderDetails.start_date = startDate;

        let order_cost = 0;
        localMaterials.map(material => {
            order_cost += parseFloat(material.cost) * parseInt(material.quantity)
        })
        localServices.map(service => {
            order_cost += parseFloat(service.cost) * parseInt(service.quantity)
        })
        orderDetails.cost = order_cost;

        const isSuccessOrder = await addOrder(orderDetails);

        try {
            await Promise.all(localMaterials.map(async element => {
                return await addMaterial(element, isSuccessOrder.orderId);
            }));
        } catch (error) {
            setNotificationMessage("Erreur lors de l'ajout de materiel");
            triggerNotification();
            console.error("Erreur lors de l'ajout de materiel", error);
        }

        try {
            await Promise.all(localServices.map(async element => {
                return await addService(element, isSuccessOrder.orderId);
            }));
        } catch (error) {
            setNotificationMessage("Erreur lors de l'ajout de services");
            triggerNotification();
            console.error("Erreur lors de l'ajout de service", error);
        }
       
        if (isSuccessOrder.response) {
            setNotificationMessage("La commande a bien été ajouté.");
            triggerNotification();
        }
    };

    if (isLoadingCustomer || isAddingOrder || isAddingMaterial || isAddingService) {
        return <div>Loading...</div>;
    }

    if (errorAddOrder || errorAddMaterial || errorAddService) {
        return <div>Error: {errorAddOrder || errorAddMaterial || errorAddService}</div>;
    }

    const handleNotificationClose = () => {
        setNotification({ show: false, message: '' });
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
        <form onSubmit={handleUpdate}>
            <Notification show={showNotification} message={notificationMessage} onClose={() => setShowNotification(false)} />

            {notification.show && (
                <Notification message={notification.message} onClose={handleNotificationClose} />
            )}

            <div className="flex justify-between">
                <h1 className="text-lg lg:text-2xl md:text-2xl font-bold">
                    Commande DE
                </h1> 
                <button type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-xs px-5 py-2.5">Ajouter
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
                                <input type='text' required="required" value={orderDetails.type_of_work} onChange={(e) => handleOrderDetailsChange('type_of_work', e.target.value)} />
                            </td>
                            <td className="px-6 py-4">
                                <input type='datetime-local' required="required" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                            </td>
                            <td className="px-6 py-4">
                            </td>
                            <td className="px-6 py-4">
                                <input type='number' required="required" value={orderDetails.days} onChange={(e) => handleOrderDetailsChange('days', e.target.value)} />
                            </td>
                            <td className="px-6 py-4">
                            PAYABLE A RECEPTION
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
                                <td className="px-6 py-3"><input required="required" type="number" onChange={e => handleServiceChange(index, 'quantity', e.target.value)} /></td>
                                <td className="px-6 py-3"><input required="required" type="text" onChange={e => handleServiceChange(index, 'name', e.target.value)} /></td>
                                <td className="px-6 py-3"><input required="required" type="number" onChange={e => handleServiceChange(index, 'cost', parseFloat(e.target.value))} /></td>
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
                                <td className="px-6 py-3"><input required="required" type="number" onChange={e => handleMaterialChange(index, 'quantity', e.target.value)} /></td>
                                <td className="px-6 py-3"><input required="required" type="text" onChange={e => handleMaterialChange(index, 'name', e.target.value)} /></td>
                                <td className="px-6 py-3"><input required="required" type="number" onChange={e => handleMaterialChange(index, 'cost', parseFloat(e.target.value))} /></td>
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
                                <textarea required="required" name='order_description' className="py-10 px-4" onChange={(e) => handleOrderDetailsChange('description', e.target.value)}></textarea>
                            </td>
                            <td className="px-6 py-4">
                                <input required="required" type='number' name="order_tva" onChange={(e) => handleOrderDetailsChange('tva', e.target.value)} />
                            </td>
                            <td className="px-6 py-4">
                                {orderDetails.cost}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </form>
    );
}

export default AddOrder;
