import Customer from '../models/customer.model.js';

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
        if (error.code === '23505') {
            return res.status(400).json({ message: "Ya existe un cliente con esa cédula" });
        }
        res.status(500).json({ error: error.message });
    }
};

// ACTUALIZAR DATOS DEL CLIENTE
export const updateCustomer = async (req, res) => {
    const { id } = req.params;
    try {
        // Ejecutamos la actualización directamente con los campos de texto del cliente
        const updatedCustomer = await Customer.update(id, req.body);
        
        if (!updatedCustomer) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }

        res.json({ 
            message: "Cliente actualizado con éxito", 
            customer: updatedCustomer 
        });
    } catch (error) {
        console.error("Error al actualizar cliente:", error.message);
        res.status(500).json({ message: "Error al actualizar cliente", error: error.message });
    }
};