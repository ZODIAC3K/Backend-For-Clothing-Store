const { BannerDetails, bannerSchema } = require("../models");
const { populateAllAttributes } = require("../services");

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


module.exports = {
	getBannerByType,
	getBanners,
};
