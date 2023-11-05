// Import any necessary models or modules
const {
	OrderDetails,
	Address,
	stockDetail,
	CouponDetails,
	OfferDetails,
} = require("../models");
const { CustomErrorHandler } = require("../services");

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

// Function to create a new order and update the stock of the product ordered
// using aggrigation pipeline. (lookup etc...) ==============================
async function createOrder(req, res, next) {
	let {
		user_id,
		req_type,
		status,
		product_ordered, // array of product id's
		color,
		size_ordered,
		quantity_ordered,
		coupon_used,
		offer_used,
		total_amount,
		address,
	} = req.body;

	var product_ordered_amount = 0;
	var each_product_amount = 0;
	var final_amount = 0;

	// console.log(offer_used);

	try {
		// if address field is empty check if the user has a default address or not and if not return error
		if (!address) {
			return res.status(400).json({ message: "Address is required" });
		}

		// traverse through the product_ordered array and check if the product is in stock
		// if not in stock then return error message
		// if in stock then update the stock of the product
		// if the product is in stock then create the order

		product_ordered = product_ordered.split(",");
		size_ordered = size_ordered.split(",");
		color = color.split(",");
		quantity_ordered = quantity_ordered.split(",");
		coupon_used = coupon_used.split(",");
		offer_used = offer_used.split(",");

		const Errors = [];

		product_ordered.forEach((product_id, idx) => {
			// forOf loop
			// console.log(size_ordered[idx].toUpperCase(), color[idx].toUpperCase());
			// console.log(product_id);
			stockDetail
				.findOne({
					product_id: product_id,
					size: size_ordered[idx].toUpperCase(),
					color: color[idx].toUpperCase(),
				})
				.then(async (stock_details) => {
					// console.log(stock_details);
					if (stock_details.length == 0) {
						Errors.push({
							product: product_id,
							message: "Invalid Product",
						});
					}
					if (stock_details.quantity < quantity_ordered[idx]) {
						Errors.push({
							product: product_id,
							message: "Product is out of stock",
						});
					}
					if (
						offer_used[idx] !== "null" &&
						offer_used[idx] !== undefined
					) {
						// console.log(offer_used[idx]);
						OfferDetails.find(offer_used[idx]).then((offer) => {
							if (!offer) {
								Errors.push({
									offer_used: offer_used[idx],
									message: "Offer not found",
								});
							} else {
								if (offer.applicable_on.includes(product_id)) {
									if (offer.end_at < Date.now()) {
										Errors.push({
											offer_used: offer_used[idx],
											message: "Offer is expired",
										});
									} else {
										each_product_amount =
											stock_details.amount -
											stock_details.amount *
												(offer.offer_discount / 100); // amount - (amount * offer_discount/100)
										product_ordered_amount =
											each_product_amount *
											quantity_ordered[idx]; //  (quantity * amount)
										final_amount += product_ordered_amount; // total amount after applying offer on each product
									}
								} else {
									Errors.push({
										offer_used: offer_used[idx],
										message:
											"Offer is not applicable on this product",
									});
								}
							}
						});
					} else {
						each_product_amount = stock_details.amount;
						product_ordered_amount =
							each_product_amount * quantity_ordered[idx];
						final_amount += product_ordered_amount; // total amount after applying offer on each product
					}
				});
		});

		CouponDetails.findById(coupon_used).then(async (coupon_used) => {
			if (coupon_used) {
				if (coupon_used.end_at < Date.now()) {
					Errors.push({
						coupon_used: coupon_used,
						message: "Coupon is expired",
					});
				} else {
					final_amount =
						final_amount -
						(final_amount * coupon_used.discount) / 100; // final_amount - (final_amount * coupon_discount/100)
				}
			}
		});

		total_amount = final_amount;

		const createOrder = new OrderDetails({
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

		const userOrder = await createOrder.save(); // save the order in the database

		// update the stock of the product 
		// just redirect to payment page
		// create webhook for payment gateway and update the stock after payment is done
		product_ordered.forEach((product_id, idx) => {
			stockDetail
				.findOne({
					product_id: product_id,
					size: size_ordered[idx].toUpperCase(),
					color: color[idx].toUpperCase(),
				})
				.then(async (stock_details) => {
					stock_details.quantity =
						stock_details.quantity - quantity_ordered[idx];
					stock_details.save();
				});
		});
		if (Errors.length > 0) {
			return res.status(400).json({ message: Errors });
		} else {
			return res
				.status(201)
				.json({
					message:
						"Order is in Processed And Stock Updated successfully",
					userOrder,
				});
		}
	} catch (error) {
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
async function updateOrder(req, res) {
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
		res.status(200).json({ message: "Order deleted successfully" });
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
