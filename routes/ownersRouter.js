const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owner-model');
const config = require('../config/development.json'); // Load the configuration

// GET route for rendering the createproducts page
router.get('/admin', function (req, res) {
    console.log('GET /owners called');
    const success = req.flash("success") || [];
    res.render('createproducts', { success });
});

if (config.NODE_ENV === 'development') {
    router.post('/crone', async function (req, res) {
        console.log('POST /owners/create called');
        try {
            let owners = await ownerModel.find();
            console.log('Owners found:', owners);
            if (owners.length > 0) {
                return res.status(503).send('You don\'t have permission to create a new owner');
            }
            let { fullname, email, password } = req.body;

            let createdOwner = await ownerModel.create({
                fullname,
                email,
                password,
            });
            res.status(201).send(createdOwner);
        } catch (error) {
            console.error('Error in POST /owners/create:', error);
            res.status(500).send('Internal server error');
        }
    });
}

module.exports = router;
