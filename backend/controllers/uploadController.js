const ErrorResponse = require('../utils/errorResponse');
const path = require('path');

// @desc    Upload product image
// @route   POST /api/upload
// @access  Private/Admin
exports.uploadProductImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(new ErrorResponse('Please upload a file', 400));
    }

    // Log file information for debugging
    console.log('File uploaded:', req.file);

    res.status(200).json({
      success: true,
      data: {
        fileName: req.file.filename,
        filePath: `/uploads/${req.file.filename}`
      },
      image: `/uploads/${req.file.filename}`
    });
  } catch (err) {
    next(err);
  }
};
