import ProductCategory from '../models/categoryModel.js';

export const getAllCategories = async (req, res) => {
    try {
        const categories = await ProductCategory.findAll();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createCategory = async (req, res) => {
    try {
        const newCategory = await ProductCategory.create(req.body.name);
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        await ProductCategory.delete(req.params.id);
        res.json({ message: "Categoría eliminada con éxito" });
    } catch (error) {
        // Manejo de integridad referencial: No borrar categorías con productos activos
        if (error.code === '23503') {
            return res.status(400).json({ 
                message: "No se puede eliminar: hay productos registrados en esta categoría" 
            });
        }
        res.status(500).json({ error: error.message });
    }
};
