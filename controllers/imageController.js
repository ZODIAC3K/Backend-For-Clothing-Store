const { MulterError } = require("multer");
const { ImageDetails } = require("../models");
const { upload, CustomErrorHandler } = require("../services");
const fs = require("fs");
const path = require("path");

// Make sure to use error handling where ever this is used.
async function insertImage() {
	try {
		// Use multer to handle the file upload
		const singleUpload = upload.single("image"); // Assuming your input field is named "image"

		return new Promise((resolve, reject) => {
			singleUpload(req, {}, async (error) => {
				if (error) {
					reject(CustomErrorHandler.badRequest(error.message));
				} else {
					// Save file information to MongoDB
					const file = req.file;

					const imageDocument = new ImageDetails({
						data: fs.readFileSync(file.path),
						content_type: file.mimetype,
					});

					const savedImage = await imageDocument.save();
					resolve(savedImage._id);
				}
			}).catch((error) => {
				if (error instanceof MulterError) {
					throw CustomErrorHandler.badRequest(err.message);
				}

				throw error;
			});
		});
	} catch (error) {
		throw error;
	}
}

async function insertMultipleImages() {
	try {
		return new Promise((resolve, reject) => {
			// Use the configured Multer middleware for multiple file uploads
			upload.array("images", 5)(req, {}, async (error) => {
				if (error) {
					reject(CustomErrorHandler.badRequest(error.message));
				} else {
					const imageIds = [];

					// Loop through the uploaded files and save each one
					for (const file of req.files) {
						const imageData = fs.readFileSync(file.path);

						const imageDocument = new ImageDetails({
							data: imageData,
							content_type: file.mimetype,
						});

						const savedImage = await imageDocument.save();
						imageIds.push(savedImage._id);
					}

					resolve(imageIds);
				}
			});
		});
	} catch (error) {
		// Handle unexpected errors
		throw new Error("Error during image insertion: " + error.message);
	}
}
