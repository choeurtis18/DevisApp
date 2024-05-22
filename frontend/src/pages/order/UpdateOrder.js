// src/page/order/UpdateOrder.js

import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from "react-router-dom";


//Components
import CustomerInfoTable from '../../components/order/CustomerInfoTable';
import OrderDetailsForm from '../../components/order/OrderDetailsForm';
import ServiceTable from '../../components/order/ServiceTable';
import MaterialTable from '../../components/order/MaterialTable';

//Hooks
import useGetOrder from '../../hooks/order/useGetOrder';
import useUpdateOrder from '../../hooks/order/useUpdateOrder';
import useUpdateCustomer from '../../hooks/customer/useUpdateCustomer';
import useGetCustomer from '../../hooks/customer/useGetCustomer';
import useUpdateMaterial from '../../hooks/material/useUpdateMaterial';
import useUpdateService from '../../hooks/service/useUpdateService';
import useAddService from '../../hooks/service/useAddService';
import useAddMaterial from '../../hooks/material/useAddMaterial';
import useGetOrderServices from '../../hooks/order/useGetOrderServices';
import useGetOrderMaterials from '../../hooks/order/useGetOrderMaterials';
import useDeleteMaterial from '../../hooks/material/useDeleteMaterial';
import useDeleteService from '../../hooks/service/useDeleteService';

import DropdownGetCustomers from '../../components/DropdownGetCustomers';
import Notification from '../../components/Notification';

const UpdateOrder = () => {
    const { orderId } = useParams();
    const [selectedCustomerId, setSelectedCustomerId] = useState('');
    const [startDate, setStartDate] = useState('');
    const [localServices, setLocalServices] = useState([]);
    const [localMaterials, setLocalMaterials] = useState([]);
    const [notificationMessage, setNotificationMessage] = useState("");
    const [showNotification, setShowNotification] = useState(false);

    const { order, isLoading: isLoadingOrder, error: errorOrder } = useGetOrder(orderId);
    const { updateOrder, isUpdatingOrder, errorUpdateOrder } = useUpdateOrder();
    const { customer, isLoading: isLoadingCustomer, error: errorCustomer } = useGetCustomer(selectedCustomerId);
    const { services, isLoading: isLoadingServices, error: errorServices } = useGetOrderServices(orderId);
    const { materials, isLoading: isLoadingMaterials, error: errorMaterials } = useGetOrderMaterials(orderId);
    const { updateMaterial, isUpdatingMaterial, errorUpdateMaterial } = useUpdateMaterial();
    const { updateService, isUpdatingService, errorUpdateService } = useUpdateService();
    const { addMaterial, isAddingMaterial, errorAddingMaterial } = useAddMaterial();
    const { addService, isAddingService, errorAddingService } = useAddService();
    const { deleteMaterial, isDeletingMaterial, errorDeletingMaterial } = useDeleteMaterial();
    const { deleteService, isDeletingService, errorDeletingService } = useDeleteService();
    
    //Initialiser le client à vide
    const [customerDetails, setCustomerDetails] = useState(
    {_id: '', name: '', name_socity: '', phone: '', adress: '', cp: '', city: '', country: '',
    });

    //Mettre à jours l'ID du client selon le dropdown
    const handleCustomerChange = (customerId) => {
        setSelectedCustomerId(customerId);
    };

    //Initialiser les données
    useEffect(() => {
console.log(order)
        if (order) {
            setSelectedCustomerId(order.customer_id);

            setStartDate(order.start_date.slice(0, 16));
            setOrderDetails({
                _id: order._id || '',
                devis_number: order.devis_number || '',
                start_date: order.start_date || '',
                creation_date: order.creation_date || '',
                update_date: order.update_date || '',
                days: order.days || '',
                tva: order.tva || 0, 
                statut: order.statut || '',
                cost: order.cost || '',
                type_of_work: order.type_of_work || '',
                description: order.description || '',
                user_id: order.user_id || '',
                customer_id: customerDetails._id || '',
            });  
        }
        if (customer) {
            setLocalServices(services || []);
            setLocalMaterials(materials || []);

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
    }, [order, customer, services, materials]);

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

        //Mise à jours de l'utilisateur
        const isSuccessOrder = await updateOrder(orderDetails._id, orderDetails, customerDetails); //Mise à jour de la commande

        try { //Ajout ou Mise à jours de materiaux en fonction du formulaire
            const results = await Promise.all(localMaterials.map(async element => {
                const existingMaterial = materials.find(material => material._id === element._id);
                if (existingMaterial) {
                    return await updateMaterial(element._id, element);
                } else {
                    return await addMaterial(element, order._id);
                }
            }));
        } catch (error) {
            setNotificationMessage("Erreur lors de la mise à jour des matériaux/services:");
            setShowNotification(true);
            console.error("Erreur lors de la mise à jour des matériaux/services:", error);
        }

        try { //Suppression de materiaux si ils ne sont pas dans la nouvelle liste
            await Promise.all(materials.map(async element => {
                const existingMaterial = localMaterials.find(material => material._id === element._id);
                if (!existingMaterial) {
                    return await deleteMaterial(element._id);
                }
            }));    
        } catch (error) {
            setNotificationMessage("Erreur lors de la mise à jour des matériaux/services:");
            setShowNotification(true);
            console.error("Erreur lors de la mise à jour des matériaux/services:", error);
        }

        try { //Ajout ou Mise à jours de services en fonction du formulaire
            const results = await Promise.all(localServices.map(async element => {
                const existingService = services.find(service => service._id === element._id);
                if (existingService) {
                    return await updateService(element._id, element);
                } else {
                    return await addService(element, order._id);
                }
            }));
    
        } catch (error) {
            setNotificationMessage("Erreur lors de la mise à jour des matériaux/services:");
            setShowNotification(true);
            console.error("Erreur lors de la mise à jour des matériaux/services:", error);
        }

        try { //Suppression de services si ils ne sont pas dans la nouvelle liste
            await Promise.all(services.map(async element => {
                const existingService = localServices.find(service => service._id === element._id);
                if (!existingService) {
                    return await deleteService(element._id);
                }
            }));    
        } catch (error) {
            setNotificationMessage("Erreur lors de la mise à jour des matériaux/services:");
            setShowNotification(true);
            console.error("Erreur lors de la mise à jour des matériaux/services:", error);
        }

        if (isSuccessOrder) {
            setNotificationMessage("La commande a bien été mise à jour.");
            setShowNotification(true);
        }
    };

    //Gestion des chargements et des erreurs
    if (isLoadingOrder || isLoadingCustomer || isLoadingServices || isLoadingMaterials || isUpdatingOrder || isUpdatingMaterial || isUpdatingService || isAddingMaterial || isAddingService || isDeletingMaterial || isDeletingService) {
        return <div>Loading...</div>;
    }
    if (errorOrder || errorCustomer || errorServices || errorMaterials || errorUpdateOrder || errorUpdateMaterial || errorUpdateService || errorAddingMaterial || errorAddingService || errorDeletingMaterial || errorDeletingService) {
        return <div>Error: Handle your error states here</div>;
    }

    return (
        <form onSubmit={handleUpdate}>
            <Notification show={showNotification} message={notificationMessage} onClose={() => setShowNotification(false)} />
            <div className="flex justify-between mb-4">
                <h1 className="text-lg lg:text-2xl md:text-2xl font-bold">
                    Commande DE{orderDetails.devis_number}
                </h1> 
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-xs px-5 py-2.5">
                Mise à jours
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

export default UpdateOrder;
