const { ImageDetails } = require("../models");
const fs = require("fs");

// Make sure to use error handling where ever this is used.
async function insertImage(image) {
	const file = image;

	const imageDocument = new ImageDetails({
		data: fs.readFileSync(file.path),
		content_type: file.mimetype,
	});
	const savedImage = await imageDocument.save();
	fs.unlinkSync(file.path);

	return savedImage._id;
}

async function insertMultipleImages(images) {
	const imageIds = [];

	// Loop through the uploaded files and save each one
	for (const file of images) {
		const imageData = fs.readFileSync(file.path);

		const imageDocument = new ImageDetails({
			data: imageData,
			content_type: file.mimetype,
		});

		const savedImage = await imageDocument.save();
		fs.unlinkSync(file.path);
		imageIds.push(savedImage._id);
	}

	return imageIds;
}

async function updateImage(id, image) {
	const file = image;

	await ImageDetails.findOneAndUpdate(
		{
			_id: id,
		},
		{
			data: fs.readFileSync(file.path),
			content_type: file.mimetype,
		}
	);
	fs.unlinkSync(file.path);
}

async function deleteImage(id) {
	await ImageDetails.deleteOne({
		_id: id,
	});
}

const imageController = {
	insertImage,
	insertMultipleImages,
	updateImage,
	deleteImage,
};

module.exports = imageController;
