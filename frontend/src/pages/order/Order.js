// src/page/order/OrderDetails.js

import React from 'react';
import {useParams} from "react-router-dom";

import useGetOrder from '../../hooks/order/useGetOrder';
import useGetCustomer from '../../hooks/customer/useGetCustomer';
import useGetOrderMaterials from '../../hooks/order/useGetOrderMaterials';
import useGetOrderServices from '../../hooks/order/useGetOrderServices';
import DateFormat from '../../components/DateFormat';
import CustomerInfoTable from '../../components/order/CustomerInfoTable';
import OrderInfoTable from '../../components/order/OrderInfoTable';
import ServiceInfoTable from '../../components/order/ServiceInfoTable';
import MaterialInfoTable from '../../components/order/MaterialInfoTable';

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
        
        <CustomerInfoTable customerDetails={customer} />
        <OrderInfoTable orderDetails={order} startDate={order.start_date.slice(0, 16)}/>
        <ServiceInfoTable localServices={services} />
        <MaterialInfoTable localMaterials={materials} />
        </>
    )
}

export default Order;
