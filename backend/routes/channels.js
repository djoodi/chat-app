const Channel = require('../schemas/channel');
const Server = require('../schemas/server');
const {isLoggedIn, isAuthor} = require('../middleware');
const express = require('express');
const router = express.Router();

router.post('/create', isLoggedIn, isAuthor, async (req, res) => {
    
})