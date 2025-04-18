const ErrorResponse = require('../utils/errorResponse');

// @desc    Upload product image
// @route   POST /api/upload
// @access  Private/Admin
exports.uploadProductImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(new ErrorResponse('Please upload a file', 400));
    }

    res.status(200).json({
      success: true,
      data: {
        fileName: req.file.filename,
        filePath: `/uploads/${req.file.filename}`
      }
    });
  } catch (err) {
    next(err);
  }
};
