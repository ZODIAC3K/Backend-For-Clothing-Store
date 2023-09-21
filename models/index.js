const {
	Product,
	ProductVarient,
	StockDetail,
} = require("./ProductDetailsSchema");
const BrandDetails = require("./BrandDetailsSchema");
const CategoryDetails = require("./CategoryDetailsSchema");
const ImageDetails = require("./ImageDetailsSchema");
const CouponDetails = require("./CouponDetailsSchema");
const OfferDetails = require("./OfferDetailsSchema");
const ProductReviewDetails = require("./ProductReviewDetails");
const BannerDetails = require("./BannerDetailsSchema");
const OrderDetails = require("./OrderDetailsSchema");
const ReturnDetails = require("./ReturnDetailsSchema");
const ModificationTrackingDetails = require("./ModificationTrackingDetails");
const Admin = require("./AdminSchema");
const User = require("./UserDetailSchema");

module.exports = {
	Product,
	ProductVarient,
	StockDetail,
	BrandDetails,
	CategoryDetails,
	ImageDetails,
	CouponDetails,
	OfferDetails,
	ProductReviewDetails,
	BannerDetails,
	OrderDetails,
	ReturnDetails,
	ModificationTrackingDetails,
	Admin,
	User,
};
