const express = require("express");
const router = express.Router();
const isloggedin = require("../middleware/isloggedin");
const productModel = require("../models/product-model"); // Import your product model
const userModel = require("../models/user-model");

// Route for rendering the index page
router.get("/", function(req, res) {
    let error = req.flash("error");
    res.render("index", { error });
});

// Route for rendering the shop page
router.get("/shop", isloggedin, async function(req, res) {
    try {
        // Fetch products from the database
        const products = await productModel.find();
         let success = req.flash("success")

        // Render the shop page with the fetched products
        res.render("shop", { products, success});
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Internal Server Error');
    }
});



router.get("/cart", isloggedin, async function (req ,res){
    let user = await userModel.findOne({ email: req.user.email})
    .populate("cart");
    res.render("cart" , {user});
    console.log(user.cart)
});
router.get("/addtocart/:productid", isloggedin, async function (req, res) {
    console.log('Add to cart route hit');
    try {
        // Find the user by email
        let user = await userModel.findOne({ email: req.user.email });
        console.log("User retrieved:", user);

        // Check if user exists
        if (!user) {
            req.flash("error", "User not found");
            return res.redirect("/shop");
        }

        // Add the product to the user's cart
        user.cart.push(req.params.id);
        await user.save();
        console.log("Product added to cart");

        // Flash success message and redirect
        req.flash("success", "Added to cart");
        res.redirect("/shop");
    } catch (error) {
        console.error("Error in adding to cart:", error);
        req.flash("error", "Failed to add to cart");
        res.redirect("/shop");
    }
});

module.exports = router;
