const { Product, productDetailsSchema } = require("../models");
const { populateAllAttributes } = require("../services");

// GET all products sort by highest rating.
async function fetchProducts(req, res, next) {
	try {
		var { options } = req.body;

		options = options ? options : {};
		options.sortby = options.sortby ? options.sortby : { rating: -1 }; // If not sorting option provided sort by descending rating
		options.limit = options.limit ? parseInt(options.limit) : 10; // If no limit specified then take limit as 10.
		options.skip = options.skip
			? parseInt(options.skip) * parseInt(options.limit)
			: 0; // If no skip / page specified take 0 (start from the first document).

		Product.find()
			.sort(options.sortby)
			.skip(options.skip)
			.limit(options.limit)
			.then(async (products) => {
				products.map(async (product) => {
					product = await populateAllAttributes(
						product,
						productDetailsSchema
					);
				});

				Promise.all(products).then((products) => {
					res.status(200).json({
						message: "success",
						products,
					});
				});
			})
			.catch((error) => {
				next(error);
				return;
			});
	} catch (error) {
		next(error);
		return;
	}
}

// GET products based of filter.
function filterProducts(req, res, next) {
	try {
		const { categories, brands, minRating, maxRating } = req.query;

		const filter = {
			rating: {
				$lte: maxRating ? parseFloat(maxRating) : 5,
				$gte: minRating ? parseFloat(minRating) : 0,
			},
		};

		if (categories) {
			filter.categories = {
				$in: categories,
			};
		}

		if (brands) {
			filter.brand = {
				$in: brands,
			};
		}

		Product.find(filter)
			.then(async (products) => {
				products.map(async (product) => {
					product = await populateAllAttributes(
						product,
						productDetailsSchema
					);
				});

				Promise.all(products).then((products) => {
					res.status(200).json({
						message: "success",
						products,
					});
				});
			})
			.catch((error) => {
				next(error);
				return;
			});
	} catch (error) {
		next(error);
		return;
	}
}

// GET product by id.
function productById(req, res, next) {
	try {
		const { id } = req.params;

		Product.findById(id)
			.then(async (product) => {
				product = await populateAllAttributes(
					product,
					productDetailsSchema
				);

				res.status(200).json({
					message: "success",
					product,
				});
			})
			.catch((error) => {
				next(error);
				return;
			});
	} catch (error) {
		next(error);
		return;
	}
}

// GET product by category and custom search.
function filterCategoryProducts(req, res, next) {
	const { categories, brands, minRating, maxRating } = req.query;

	const filter = {
		rating: {
			$lte: maxRating ? parseFloat(maxRating) : 5,
			$gte: minRating ? parseFloat(minRating) : 0,
		},
	};

	if (categories) {
		filter.categories = {
			$in: categories,
		};
	}

	if (brands) {
		filter.brand = {
			$in: brands,
		};
	}
}



module.exports = {
	fetchProducts,
	filterProducts,
	productById,
	filterCategoryProducts,
};
