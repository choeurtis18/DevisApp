// src/page/order/AddOrder.js
import React, { useState, useEffect, useCallback } from 'react';

//Components
import CustomerInfoTable from '../../components/order/CustomerInfoTable';
import OrderDetailsForm from '../../components/order/OrderDetailsForm';
import ServiceTable from '../../components/order/ServiceTable';
import MaterialTable from '../../components/order/MaterialTable';

//Hooks
import useGetCustomer from '../../hooks/customer/useGetCustomer';
import useAddOrder from '../../hooks/order/useAddOrder';
import useAddService from '../../hooks/service/useAddService';
import useAddMaterial from '../../hooks/material/useAddMaterial';

import DropdownGetCustomers from '../../components/DropdownGetCustomers';
import Notification from '../../components/Notification';

const AddOrder = () => {
    const [selectedCustomerId, setSelectedCustomerId] = useState(''); //Id du client qui va évoluer selon le dropdown
    const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 16)); //Initialiser la date de début des travaux au bon format
    const [localServices, setLocalServices] = useState([]);
    const [localMaterials, setLocalMaterials] = useState([]);

    //Systeme de Notification
    const [notificationMessage, setNotificationMessage] = useState("");
    const [showNotification, setShowNotification] = useState(false);

    const { customer, isLoading: isLoadingCustomer } = useGetCustomer(selectedCustomerId); //Récuperer les infos du client
    const { addOrder, isLoading: isAddingOrder, error: errorAddOrder } = useAddOrder();
    const { addMaterial, isLoading: isAddingMaterial, error: errorAddMaterial } = useAddMaterial();
    const { addService, isLoading: isAddingService, error: errorAddService } = useAddService();

    //Initialiser le client à vide
    const [customerDetails, setCustomerDetails] = useState(
    {_id: '', name: '', name_socity: '', phone: '', adress: '', cp: '', city: '', country: '',
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

    //Mettre à jours l'ID du client selon le dropdown
    const handleCustomerChange = (customerId) => {
        setSelectedCustomerId(customerId);
    };

    //Initialiser une commande
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
    //Mise à jours des champs lié à une commandes
    const handleOrderDetailsChange = useCallback((field, value) => {
        setOrderDetails(prev => ({
            ...prev,
            [field]: field === 'tva' ? parseFloat(value) || 0 : value
        }));
    }, []);

    //Gestion des services, mise à jours des champs & ajout d'une nouvelle ligne
    const handleServiceChange = useCallback((index, field, value) => {
        setLocalServices(prev => prev.map((item, idx) => idx === index ? { ...item, [field]: value } : item));
    }, []);
    const handleAddNewService = useCallback(() => {
        setLocalServices(prevServices => [
            ...prevServices,
            { _id: Date.now(), name: "", quantity: 1, cost: 0 }
        ]);
    }, [setLocalServices]);


    //Gestion des matériaux, mise à jours des champs & ajout d'une nouvelle ligne
    const handleMaterialChange = useCallback((index, field, value) => {
        setLocalMaterials(prev => prev.map((item, idx) => idx === index ? { ...item, [field]: value } : item));
    }, []);
    const handleAddNewMaterial = useCallback(() => {
        setLocalMaterials(prevMaterials => [
            ...prevMaterials,
            { _id: Date.now(), name: "", quantity: 1, cost: 0 }
        ]);
    }, [setLocalMaterials]);

    
    function updatePrice() { //Mettre à jours le prix
        let order_cost = 0;

        localMaterials.forEach(material => {
            order_cost += parseFloat(material.cost) * parseInt(material.quantity);
        });

        localServices.forEach(service => {
            order_cost += parseFloat(service.cost) * parseInt(service.quantity)
        })
        
        order_cost += (order_cost*orderDetails.tva);
        orderDetails.cost = order_cost;
    }

    const handleUpdate = async (event) => {
        event.preventDefault();

        //Mettre à jours les éléments de la commande
        orderDetails.customer_id = customerDetails._id;
        orderDetails.start_date = startDate;
        updatePrice();//Mettre à jours le prix

        const isSuccessOrder = await addOrder(orderDetails); //Ajout de la commande

        //Ajout des matériaux
        try {
            await Promise.all(localMaterials.map(async element => {
                return await addMaterial(element, isSuccessOrder.orderId);
            }));
        } catch (error) {
            setNotificationMessage("Erreur lors de l'ajout de matériaux");
            setShowNotification(true);
            console.error("Erreur lors de l'ajout de materiel", error);
        }

        //Ajout des services
        try {
            await Promise.all(localServices.map(async element => {
                return await addService(element, isSuccessOrder.orderId);
            }));
        } catch (error) {
            setNotificationMessage("Erreur lors de l'ajout de services");
            setShowNotification(true);
            console.error("Erreur lors de l'ajout de service", error);
        }
       
        //Valider l'ajout de la commande
        if (isSuccessOrder.response) {
            setNotificationMessage("La commande a bien été ajouté.");
            setShowNotification(true);
        }
    };

    if (isLoadingCustomer || isAddingOrder || isAddingMaterial || isAddingService)  return <div>Loading...</div>;
    if (errorAddOrder || errorAddMaterial || errorAddService) return <div>Error: {errorAddOrder || errorAddMaterial || errorAddService}</div>;

    return (
        <form onSubmit={handleUpdate}>
            <Notification show={showNotification} message={notificationMessage} onClose={() => setShowNotification(false)} />
            <div className="flex justify-between">
                <h1 className="text-lg lg:text-2xl md:text-2xl font-bold">Ajouter une commande</h1> 
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-xs px-5 py-2.5">
                    Ajouter
                </button>
            </div>
            <DropdownGetCustomers initialCustomerId={selectedCustomerId} onCustomerChange={handleCustomerChange} />
            <CustomerInfoTable customerDetails={customerDetails} />
            <OrderDetailsForm orderDetails={orderDetails} handleOrderDetailsChange={handleOrderDetailsChange} startDate={startDate} setStartDate={setStartDate} />
            <ServiceTable localServices={localServices} handleServiceChange={handleServiceChange} setLocalServices={setLocalServices} handleAddNewService={handleAddNewService} />
            <MaterialTable localMaterials={localMaterials} handleMaterialChange={handleMaterialChange} setLocalMaterials={setLocalMaterials} handleAddNewMaterial={handleAddNewMaterial} />
        </form>
    );
};

export default AddOrder;