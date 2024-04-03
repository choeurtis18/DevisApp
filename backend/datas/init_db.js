const Chance = require('chance');
const { readFileSync, writeFileSync } = require('fs');

const chance = new Chance();

// Génération des utilisateurs
const userController = require('../controllers/UserController');
const generateUsers = async (count) => {
    for (let i = 1; i <= count; i++) {
        const userData = {
            email: chance.email(),
            password: "password+",

            name: chance.last(), 
            name_socity: chance.company(),
            phone: chance.phone(),

            adress: chance.address(),
            cp: 92241,
            city: chance.city(),
            country: chance.country(),
        };
        try {
            const response = await userController.signup(userData);
        } catch (error) {
            console.error("Erreur lors de la création de l'utilisateur :", error);
        }
    }
};

// Génération des clients
const customerController = require('../controllers/CustomerController');
const generateCustomers = async (count) => {
    for (let i = 1; i <= count; i++) {
        const customerData = {
            name: chance.last(), 
            name_socity: chance.company(),
            phone: chance.phone(),

            adress: chance.address(),
            cp: 92241,
            city: chance.city(),
            country: chance.country(),
        };
        try {
            const response = await customerController.createCustomer(customerData);
        } catch (error) {
            console.error("Erreur lors de la création du client :", error);
        }
    }
};

// Génération des commandes
const orderController = require('../controllers/OrderController');
const generateOrders = async (count, customerIds, userIds) => {
    for (let i = 1; i <= count; i++) {
        const orderData = {
            devis_number: chance.integer({ min: 1000, max: 999999 }),
            start_date: chance.date(),
            creation_date: chance.date(),
            update_date: chance.date(),
            days: chance.integer({ min: 1, max: 30 }),
            tva: 10,

            statut: chance.pickone(['signe', 'en cours']),

            type_of_work: chance.word(),
            description: chance.sentence(),

            customer_id: chance.pickone(customerIds),
            user_id: chance.pickone(userIds)
        };
        try {
            await orderController.createOrder(orderData);
        } catch (error) {
            console.error("Erreur lors de la création de la commande :", error);
        }
    }
};

// Génération des matériaux
const materialController = require('../controllers/MaterialController');
const generateMaterials = async (count) => {
    for (let i = 1; i <= count; i++) {
        const materialData = {
            name: "M - " + chance.name(),
            cost: chance.integer({ min: 100, max: 10000 }),
        };
        try {
            await materialController.createMaterial(materialData);
        } catch (error) {
            console.error("Erreur lors de la création du matériau :", error);
        }
    }
};

// Génération des services
const serviceController = require('../controllers/ServiceController');
const generateServices = async (count) => {
    for (let i = 1; i <= count; i++) {
        const serviceData = {
            name: "S - " + chance.name(),
            cost: chance.integer({ min: 100, max: 10000 }),
        };
        try {
            await serviceController.createService(serviceData);
        } catch (error) {
            console.error("Erreur lors de la création du service :", error);
        }
    }
};

// Génération des liens entre les commandes et les matériaux
const materialOrdersController = require('../controllers/MaterialOrdersController');
const generateMaterialOrders = async (count, orderIds, materialIds) => {
    for (let i = 1; i <= count; i++) {
        const materialOrderData = {
            order_id: chance.pickone(orderIds),
            material_id: chance.pickone(materialIds),
            quantity: chance.integer({ min: 1, max: 10 }),
        };
        try {
            await materialOrdersController.createMaterialOrders(materialOrderData);
        } catch (error) {
            console.error("Erreur lors de la création du lien entre commande et matériau :", error);
        }
    }
};

// Génération des liens entre les commandes et les services
const serviceOrdersController = require('../controllers/ServiceOrdersController');
const generateServiceOrders = async (count, orderIds, serviceIds) => {
    for (let i = 1; i <= count; i++) {
        const serviceOrderData = {
            order_id: chance.pickone(orderIds),
            service_id: chance.pickone(serviceIds),
            quantity: chance.integer({ min: 1, max: 10 }),
        };
        try {
            await serviceOrdersController.createServiceOrders(serviceOrderData);
        } catch (error) {
            console.error("Erreur lors de la création du lien entre commande et service :", error);
        }
    }
};

const UserController = require('../controllers/UserController');
const CustomerController = require('../controllers/CustomerController');

const OrderController = require('../controllers/OrderController');
const ServiceController = require('../controllers/ServiceController');
const MaterialController = require('../controllers/MaterialController');

exports.initDatabase = async function() {
    try {
        await generateUsers(2); 

        await generateCustomers(5);


        const customerData = await CustomerController.getAllCustomers();    
        const customerIds = customerData.customers.map(element => element._id);
        const userData = await UserController.getAllUsers();    
        const userIds = userData.users.map(element => element._id);
        await generateOrders(10, customerIds, userIds);
        
        await generateMaterials(30);
        await generateServices(30);

        const orderData = await OrderController.getAllOrder();    
        const orderIds = orderData.orders.map(element => element._id);
        const serviceData = await ServiceController.getAllServices();    
        const serviceIds = serviceData.services.map(element => element._id);
        const materialData = await MaterialController.getAllMaterials();  
        const materielIds = materialData.materials.map(element => element._id);

        await generateMaterialOrders(10, orderIds, materielIds);
        await generateServiceOrders(10, orderIds, serviceIds);

        console.log('Database initialization complete');
    } catch (error) {
        console.error('An error occurred during database initialization:', error);
    }
}
