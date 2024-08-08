const express = require('express');
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/product-model");

// POST route for product creation
router.post("/create", upload.single("image"), async function (req, res) {
    console.log('POST /products/create called');
    try {
        let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;

        let product = await productModel.create({
            name,
            image: req.file.buffer,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor,
        });

        req.flash("success", "Product created successfully!");
        res.redirect("/admin"); // Redirect to the admin page or any other desired page
    } catch (error) {
        console.error('Error in POST /products/create:', error);
        req.flash("error", "Failed to create product.");
        res.redirect("/admin"); // Redirect to the admin page with error
    }
});

module.exports = router;
