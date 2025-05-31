const express = require('express');
const router = express.Router();
const indianStatesAndCities = require('../data/indianStatesAndCities');

// @desc    Get all Indian states
// @route   GET /api/address/states
// @access  Public
router.get('/states', (req, res) => {
  try {
    const states = Object.keys(indianStatesAndCities).sort();
    res.json({
      success: true,
      count: states.length,
      data: states
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// @desc    Get cities by state
// @route   GET /api/address/cities/:state
// @access  Public
router.get('/cities/:state', (req, res) => {
  try {
    const { state } = req.params;
    const cities = indianStatesAndCities[state];
    
    if (!cities) {
      return res.status(404).json({
        success: false,
        message: 'State not found'
      });
    }

    res.json({
      success: true,
      state: state,
      count: cities.length,
      data: cities.sort()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// @desc    Get all states and cities
// @route   GET /api/address/all
// @access  Public
router.get('/all', (req, res) => {
  try {
    res.json({
      success: true,
      data: indianStatesAndCities
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

module.exports = router;
