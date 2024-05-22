// src/components/DropdownGetCustomers.js

import React, { useState, useEffect } from 'react';
import useGetCustomers from '../hooks/customer/useGetCustomers';

const DropdownGetCustomers = ({ initialCustomerId, onCustomerChange }) => {
    const { customers, isLoadingCustomers, errorCustomers } = useGetCustomers();
    const [selectedCustomerId, setSelectedCustomerId] = useState(initialCustomerId || "");

    useEffect(() => {
        setSelectedCustomerId(initialCustomerId);
    }, [initialCustomerId]);

    if (isLoadingCustomers) return <div>Loading...</div>;
    if (!customers) return <div>Customers not found</div>;
    if (errorCustomers) return <div>Error: {errorCustomers}</div>;

    const handleChange = (event) => {
        setSelectedCustomerId(event.target.value);
        onCustomerChange(event.target.value); 
    };

    return (
        <div className="relative">
            <select 
                value={selectedCustomerId}
                onChange={handleChange}
                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            >
                {customers.map((customer) => (
                    <option key={customer._id} value={customer._id} className="text-gray-700 block px-4 py-2 text-sm">
                        {customer.name_socity}
                    </option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M5.5 6a.7.7 0 00-.5.2.7.7 0 000 1l4 4 4-4a.7.7 0 000-1 .7.7 0 00-1 0L10 10.3 6 6.2A.7.7 0 005.5 6z"/>
                </svg>
            </div>
        </div>
    );
};

export default DropdownGetCustomers;