// Import any necessary models or modules
const e = require('express');
const { OrderDetails, Address } = require('../models');


  // Function to get all orders
  async function getAllOrders(req, res, next) {
    try {
      const orders = await OrderDetails.find();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
      next(error);
    }
  }

    // Function to create a new order
    async function createOrder (req, res, next) {
    const {
        user_id,
        req_type,
        status,
        product_ordered,
        color,
        size_ordered,
        quantity_ordered,
        coupon_used,
        offer_used,
        total_amount,
    } = req.body;

    try {
        // Find the user's active address
        let address;
        const activeAddress = Address.find(user_id).then((address) =>{ if(address.Default === true){
            return address._id;
        }else{
            return null;
        }
        });

        if (activeAddress != null) {
            address = activeAddress;
        } else {
            address = "Not Provided";
            res.status(400).json({ message: "Please add an address to your account" });
        }

        const order = new OrderDetails({
            user_id: user_id,
            req_type: req_type,
            status: status,
            product_ordered: product_ordered,
            color: color,
            size_ordered: size_ordered,
            quantity_ordered: quantity_ordered,
            coupon_used: coupon_used,
            offer_used: offer_used,
            total_amount: total_amount,
            address: address,
        });

        const newOrder = await order.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
        next(error);
    }
}

  // Function to get a single order by ID
  async function getOrderById(req, res, next) {
    try {
      const order = await OrderDetails.findById(req.params.id);
      res.status(200).json(order);
    } catch (error) {
      res.status(404).json({ message: error.message });
      next(error);
    }
  }

  // Function to update an existing order
    async function updateOrder (req, res){
    try {
      const updatedOrder = await OrderDetails.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json(updatedOrder);
    } catch (error) {
      res.status(400).json({ message: error.message });
      next(error);
    }
  }

  // Function to delete an existing order
    async function deleteOrder(req, res) {
    try {
      await OrderDetails.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
      next(error);
    }
  }

// Export the controller functions
module.exports = {
	deleteOrder,
	updateOrder,
	getOrderById,
    getAllOrders,
	createOrder,
};
