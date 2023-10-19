const { BannerDetails, bannerSchema } = require("../models");
const { populateAllAttributes, CustomErrorHandler } = require("../services");
const { insertImage, updateImage } = require("./imageController");

function getBanners(req, res, next) {
	try {
		BannerDetails.find()
			.then((banners) => {
				banners.map(async (banner) => {
					banner = await populateAllAttributes(banner, bannerSchema);
				});

				Promise.all(banners).then((banners) => {
					res.status(200).json({
						status: "success",
						data: {
							banners,
						},
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

function getBannerByType(req, res, next) {
	try {
		const { type } = req.params.type;

		BannerDetails.find({ type })
			.then(async (banners) => {
				banners.map(async (banner) => {
					banner = await populateAllAttributes(banner, bannerSchema);
				});

				Promise.all(banners).then((banners) => {
					res.status(200).json({
						status: "success",
						data: {
							banners,
						},
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

async function createBanner(req, res, next) {
	try {
		if (!req.file) {
			next(CustomErrorHandler.badRequest("Banner image not provided."));
		}
		req.body.image = await insertImage(req.file);
		const bannerDetails = req.body;

		BannerDetails.create(bannerDetails)
			.then((banner) => {
				res.status(200).json({
					status: "sucess",
					data: {
						banner,
					},
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

async function updateBanner(req, res, next) {
	try {
		const bannerId = req.params.id;

		if (req.file) {
			const banner = await BannerDetails.findById(bannerId);
			req.body.image = await updateImage(banner.image, req.file);
		}

		const bannerDetails = req.body;

		BannerDetails.findByIdAndUpdate(bannerId, bannerDetails, {
			new: true,
			runValidators: true,
		})
			.then((banner) => {
				res.status(200).json({
					status: "sucess",
					data: {
						banner,
					},
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

function bannerDelete(req, res, next) {
	try {
		const bannerId = req.params.id;

		BannerDetails.findByIdAndDelete(bannerId)
			.then((banner) => {})
			.catch((error) => {
				next(error);
				return;
			});
	} catch (error) {
		next(error);
		return;
	}
}

module.exports = {
	getBannerByType,
	getBanners,
	createBanner,
	updateBanner,
	bannerDelete,
};
