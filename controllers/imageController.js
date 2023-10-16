const { ImageDetails } = require("../models");
const fs = require("fs");

// Make sure to use error handling where ever this is used.
async function insertImage(image) {

	const file = image;

	const imageDocument = new ImageDetails({
		data: fs.readFileSync(file.path),
		content_type: file.mimetype,
	})
	const savedImage = await imageDocument.save()
	fs.unlinkSync(file.path);

	return savedImage._id;

}

async function insertMultipleImages() {
	
	const imageIds = [];

	// Loop through the uploaded files and save each one
	for (const file of req.images) {
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

const imageController = {
	insertImage,
	insertMultipleImages
}

module.exports = imageController