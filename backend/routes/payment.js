// backend/routes/payment.js

const express = require('express');
const Razorpay = require('razorpay');
const Stripe = require('stripe');
const router = express.Router();

// Initialize Razorpay and Stripe
const razorpay = new Razorpay({
    key_id: 'YOUR_RAZORPAY_KEY_ID',
    key_secret: 'YOUR_RAZORPAY_KEY_SECRET'
});

const stripe = new Stripe('YOUR_STRIPE_SECRET_KEY');

// Razorpay payment route
router.post('/razorpay/payment', async (req, res) => {
    const {amount, currency} = req.body;
    const options = {
        amount: amount * 100, // amount in paise
        currency,
    };

    try {
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Stripe payment route
router.post('/stripe/payment', async (req, res) => {
    const {amount, currency, token} = req.body;

    try {
        const charge = await stripe.charges.create({
            amount,
            currency,
            source: token,
        });
        res.json(charge);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Subscription management route
router.post('/subscriptions', async (req, res) => {
    const {planId, customerId} = req.body;

    try {
        const subscription = await stripe.subscriptions.create({
            customer: customerId,
            items: [{plan: planId}],
        });
        res.json(subscription);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Coupon handling route
router.post('/coupons', async (req, res) => {
    const {couponId} = req.body;

    try {
        const couponDetails = await stripe.coupons.retrieve(couponId);
        res.json(couponDetails);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;