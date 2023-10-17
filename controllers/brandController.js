const { BrandDetails } = require('../models');

// Create a new brand
exports.createBrand = async (req, res) => {
    try {
        const newBrand = await BrandDetails.create(req.body);
        res.status(201).json({
            status: 'success',
            message : "Brand Created Successfully",
            data: {
                brand: newBrand
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// Get all brands
exports.getBrand = async (req, res) => {
    try {
        const brands = await BrandDetails.find();
        res.status(200).json({
            status: 'success',
            results: brands.length,
            data: {
                brands : brands
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// Update a brand by ID
exports.updateBrand = async (req, res) => {
    try {
        const updatedBrand = await BrandDetails.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({ 
            status: 'success',
            message : "Brand updated Successfully",
            data: {
                brand: updatedBrand
            } 
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// Delete a brand by ID
exports.deleteBrand = async (req, res) => {
    try {
        await BrandDetails.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: 'success',
            message : "Brand Deleted Successfully"
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

