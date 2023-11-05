const { analyticFilters } = require("../services");

async function getAnalysis(req, res, next) {
	try {
		Promise.all([
			// GET total no. of products
			analyticFilters.totalProducts(),
			// GET highest sold products ( on hold )
			analyticFilters.highestSold(),
			// GET highest rated product
			analyticFilters.highestRate(),
			// GET most sold category
			analyticFilters.mostCategory(),
			// GET most sold brand
			analyticFilters.mostBrand(),
			// GET total no. of orders
			analyticFilters.totalOrders(),
			// GET orders that are pending / accepted / rejected
			analyticFilters.ordersByReq("Pending"),
			analyticFilters.ordersByReq("Accepted"),
			analyticFilters.ordersByReq("Rejected"),
			// GET total no. of returned orders
			analyticFilters.totalReturns(),
			// GET total amount of money gain on orders
			analyticFilters.totalAmountGained(),
			// GET total amount of money spent on returns
			analyticFilters.totalAmountSpent(),
		])
			.then((results) => {
				const response = {
					totalProducts: results[0],
					highestSoldProducts: results[1],
					highestRatedProduct: results[2],
					mostSoldCategory: results[3],
					mostSoldBrand: results[4],
					totalOrders: results[5],
					ordersPending: results[6],
					ordersAccepted: results[7],
					ordersRejected: results[8],
					totalReturnedOrders: results[9],
					totalAmountGainedOnOrders: results[10],
					totalAmountSpentOnReturns: results[11],
				};

				// Send the response as JSON
				res.status(200).json(response);
			})
			.catch((error) => {
				next(error);
			});
	} catch (error) {
		next(error);
	}
}

function getAnalysisByField(req, res, next) {
	try {
		const fieldname = req.params.field;
	} catch (error) {
		next(error);
	}
}

module.exports = {
	getAnalysis,
	getAnalysisByField,
};
