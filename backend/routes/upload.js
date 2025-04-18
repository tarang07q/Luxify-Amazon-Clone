const express = require('express');
const { uploadProductImage } = require('../controllers/uploadController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.post('/', protect, authorize('admin'), upload.single('image'), uploadProductImage);

module.exports = router;
