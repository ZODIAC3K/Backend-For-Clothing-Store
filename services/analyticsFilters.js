const { ReturnDetails, Product, OrderDetails } = require("../models");

/**
 * Get the total amount of money spent on returns by summing the 'total_amount' from related orders.
 * @returns {Promise<number>} The total amount spent on returns.
 */
async function getTotalAmountSpentOnReturns() {
	const result = await ReturnDetails.aggregate([
		{
			$lookup: {
				from: "orderdetails", // Adjust the collection name if it's different
				localField: "order_details_id",
				foreignField: "_id",
				as: "order",
			},
		},
		{
			$unwind: "$order",
		},
		{
			$group: {
				_id: null,
				totalAmount: { $sum: "$order.total_amount" },
			},
		},
	]);

	// If there are no returns, return 0, otherwise return the total amount spent on returns.
	return result.length > 0 ? result[0].totalAmount : 0;
}

/**
 * Get the total number of products.
 * @returns {Promise<number>} The total number of products.
 */
async function getTotalProductCount() {
	const count = await Product.countDocuments();
	return count;
}

/**
 * Get the products with the highest quantity ordered.
 * @returns {Promise<Array<Object>|null>} An array of 10 products with their total sold quantities.
 */
async function getHighestSoldProducts() {
	const products = await OrderDetails.aggregate([
		{ $unwind: "$product_ordered" },
		{
			$group: {
				_id: "$product_ordered",
				totalSold: { $sum: "$quantity_ordered" },
			},
		},
		{ $sort: { totalSold: -1 } },
		{ $limit: 10 },
	]);
	return products;
}

/**
 * Get the product with the highest average rating.
 * @returns {Promise<Array<Object>|null>} The product with the highest average rating or null if no products are found.
 */
async function getHighestRatedProducts() {
	const product = await Product.aggregate([
		{ $unwind: "$stock_details" },
		{
			$lookup: {
				from: "productreviews",
				localField: "stock_details._id",
				foreignField: "product_id",
				as: "reviews",
			},
		},
		{
			$addFields: {
				avgRating: { $avg: "$reviews.rating" },
			},
		},
		{ $sort: { avgRating: -1 } },
		{ $limit: 10 },
	]);
	return product || null;
}

/**
 * Get the category with the most products sold.
 * @returns {Promise<Object|null>} The category with the most products sold or null if no categories are found.
 */
async function getMostSoldCategory() {
	const category = await Product.aggregate([
		{ $unwind: "$category" },
		{
			$group: {
				_id: "$category",
				totalSold: { $sum: 1 },
			},
		},
		{ $sort: { totalSold: -1 } },
		{ $limit: 1 },
	]);
	return category[0] || null;
}

/**
 * Get the brand with the most products sold.
 * @returns {Promise<Object|null>} The brand with the most products sold or null if no brands are found.
 */
async function getMostSoldBrand() {
	const brand = await Product.aggregate([
		{ $unwind: "$brand" },
		{
			$group: {
				_id: "$brand",
				totalSold: { $sum: 1 },
			},
		},
		{ $sort: { totalSold: -1 } },
		{ $limit: 1 },
	]);
	return brand[0] || null;
}

/**
 * Get the total number of orders.
 * @returns {Promise<number>} The total number of orders.
 */
async function getTotalOrderCount() {
	const count = await OrderDetails.countDocuments();
	return count;
}

/**
 * Get orders based on the 'req_type'.
 * @param {string} reqType - The request type ('Pending', 'Accepted', or 'Rejected').
 * @returns {Promise<Array>} An array of orders matching the request type.
 */
async function getOrdersByReqType(reqType) {
	const orders = await OrderDetails.find({ req_type: reqType });
	return orders;
}

/**
 * Get the total number of returned orders.
 * @returns {Promise<number>} The total number of returned orders.
 */
async function getTotalReturnedOrderCount() {
	const count = await ReturnDetails.countDocuments();
	return count;
}

/**
 * Get the total amount of money gained on orders by summing 'total_amount' of delivered orders.
 * @returns {Promise<number>} The total amount gained on orders.
 */
async function getTotalAmountGainedOnOrders() {
	const result = await OrderDetails.aggregate([
		{ $match: { status: "Delivered" } },
		{
			$group: {
				_id: null,
				totalAmount: { $sum: "$total_amount" },
			},
		},
	]);
	return result.length > 0 ? result[0].totalAmount : 0;
}

module.exports = {
	totalProducts: getTotalProductCount,
	totalOrders: getTotalOrderCount,
	totalReturns: getTotalReturnedOrderCount,
	highestSold: getHighestSoldProducts,
	highestRate: getHighestRatedProducts,
	mostBrand: getMostSoldBrand,
	mostCategory: getMostSoldCategory,
	ordersByReq: getOrdersByReqType,
	totalAmountGained: getTotalAmountGainedOnOrders,
	totalAmountSpent: getTotalAmountSpentOnReturns,
};
