// src/page/order/OrderDetails.js

import React from 'react';
import {useParams} from "react-router-dom";

import useGetOrder from '../../hooks/order/useGetOrder';
import useGetCustomer from '../../hooks/customer/useGetCustomer';
import useGetOrderMaterials from '../../hooks/order/useGetOrderMaterials';
import useGetOrderServices from '../../hooks/order/useGetOrderServices';
import DateFormat from '../../components/DateFormat';

const Order = () => {
    const {orderId} = useParams();
    const { order, isLoadingOrder, errorOrder } = useGetOrder(orderId);
    const { customer, isLoadingCustomer, errorCustomer } = useGetCustomer(order?.customer_id);
    const { materials, isLoading: isLoadingMaterials, error: errorMaterials } = useGetOrderMaterials(orderId);
    const { services, isLoading: isLoadingServices, error: errorServices } = useGetOrderServices(orderId);

    if (isLoadingOrder || isLoadingCustomer || isLoadingMaterials || isLoadingServices) return <div>Loading...</div>;
    if (!order) return <div>Order not found</div>;
    if (!customer) return <div>Customer not found</div>;
    if (errorOrder) return <div>Error: {errorOrder}</div>;
    if (errorCustomer) return <div>Error: {errorCustomer}</div>;
    if (errorMaterials || errorServices) return <div>Error loading order details</div>;
  
    return (
        <>
        <div className="flex justify-between">
            <h1 className="text-lg lg:text-2xl md:text-2xl font-bold">
            Commande DE{order.devis_number}
            </h1> 
            <a href={"/order/update/"+order._id} className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-xs px-5 py-2.5">
            Modifier
            </a>
        </div>  
        
        <div className='customer-infos my-8 p-4 rounded overflow-hidden shadow-lg'>
            <h3 className="text-md lg:text-xl md:text-xl font-bold">
            Information du client
            </h3> 
            <div className='flex flex-col'>
                <p>Facture à l’attention de : {customer.name_socity}</p>
                <p className='font-bold'>Adresse du client</p>
                <p>{customer.adress}</p>
                <p>{customer.cp} {customer.city}, {customer.country}</p>
            </div>
        </div>

        <div className='customer-infos my-8 p-4 rounded overflow-hidden shadow-lg'>
            <h3 className="text-md lg:text-xl md:text-xl font-bold">
            Information sur la prestation
            </h3> 
            <div className='flex flex-col'>
                <p>Nature des travaux : {order.type_of_work}</p>
                <p>Debut des travaux : <DateFormat value={order.creation_date} /></p>
                <p>Durée des travaux : {order.days} jours</p>
                <p>Prix total : {order.cost} €</p>
                <p className='font-bold'>Description</p>
                <p>{order.description}</p>
            </div>
        </div>

        <div className='customer-infos my-8 p-4 rounded overflow-hidden shadow-lg'>
            <h3 className="text-md lg:text-xl md:text-xl font-bold">
            Service réalisé
            </h3> 
            <div className='flex flex-col'>
                {services.map(service => (
                <li key={service._id}>{service.name} - Quantity: {service.quantity} - Cout: {service.cost}€</li>
                ))}
            </div>
        </div>

        <div className='customer-infos my-8 p-4 rounded overflow-hidden shadow-lg'>
            <h3 className="text-md lg:text-xl md:text-xl font-bold">
            Matériel utilisé
            </h3> 
            <div className='flex flex-col'>
                {materials.map(material => (
                <li key={material._id}>{material.name} - Quantity: {material.quantity} - Cout: {material.cost}€</li>
                ))}
            </div>
        </div>
        </>
    )
}

export default Order;
