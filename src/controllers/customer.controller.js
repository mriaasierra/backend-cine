import Customer from '../models/customerModel.js';

export const getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.findAll();
        res.json(customers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getCustomerByCedula = async (req, res) => {
    try {
        const customer = await Customer.findByCedula(req.params.cedula);
        if (!customer) return res.status(404).json({ message: "Cliente no encontrado" });
        res.json(customer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createCustomer = async (req, res) => {
    try {
        const newCustomer = await Customer.create(req.body);
        res.status(201).json(newCustomer);
    } catch (error) {
        // Manejo de error si la cédula ya existe 
        if (error.code === '23505') {
            return res.status(400).json({ message: "Ya existe un cliente con esa cédula" });
        }
        res.status(500).json({ error: error.message });
    }
};
