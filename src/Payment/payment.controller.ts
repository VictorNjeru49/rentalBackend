import 'dotenv/config';
import { Context } from "hono";
import { createPaymentService, deletePaymentService, getPaymentService, PaymentService, updatePaymentService } from "./payment.service";
import Stripe from 'stripe';
import axios from 'axios';



const stripe = new Stripe('your_stripe_secret_key', {
    apiVersion: '2025-01-27.acacia',
});
const mpesaBaseUrl = 'https://sandbox.safaricom.co.ke'; // Use the appropriate base URL for M-Pesa API
const mpesaConsumerKey = 'your_mpesa_consumer_key';
const mpesaConsumerSecret = 'your_mpesa_consumer_secret';





const PaymentstateController = async (c: Context) => {
    try {
        const address = await PaymentService();
        if (address == null || address.length == 0) {
            return c.text("address not found", 404)
        }        
        return c.json(address, 200)

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }

}

const getPaymentController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const address = await getPaymentService(id);
        if (address == null) {
            return c.text("Address not found", 404);
        }
        return c.json(address, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};


const getMpesaAccessToken = async () => {
    const response = await axios.get(`${mpesaBaseUrl}/oauth/v1/generate?grant_type=client_credentials`, {
        auth: {
            username: mpesaConsumerKey,
            password: mpesaConsumerSecret,
        },
    });
    return response.data.access_token;
};

// create state

const createPaymentController = async (c: Context) => {
    try {
        const payment = await c.req.json();

        // Create a payment intent with Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount: payment.amount, // amount in cents
            currency: 'usd',
            payment_method_types: ['card'],
        });

        
        // Save payment details to your database
        const newPayment = await createPaymentService({
            ...payment,
            stripePaymentIntentId: paymentIntent.id,
        });

        if (!newPayment) return c.text("Payment not created", 400);

        // M-Pesa payment processing
        const accessToken = await getMpesaAccessToken();
        const mpesaResponse = await axios.post(`${mpesaBaseUrl}/mpesa/stkpush/v1/processrequest`, {
            BusinessShortCode: 'your_business_shortcode',
            Password: 'your_password',
            Timestamp: 'your_timestamp',
            TransactionType: 'CustomerPayBillOnline',
            Amount: payment.amount,
            PartyA: payment.phoneNumber,
            PartyB: 'your_business_shortcode',
            PhoneNumber: payment.phoneNumber,
            CallBackURL: 'your_callback_url',
            AccountReference: 'your_account_reference',
            TransactionDesc: 'Payment description',
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return c.json({ message: "Payment created successfully", newPayment, clientSecret: paymentIntent.client_secret, mpesaResponse: mpesaResponse.data }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

//  update address
const updatePaymentController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const address = await c.req.json();

        // search for user by id
        const updatedAddress = await getPaymentService(id);
        if (!updatedAddress === undefined) return c.text("Address not found", 404);

        // get data to update
        const res = await updatePaymentService(id, address);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// delete address

const deletePaymentController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid id", 400);
    try {
        // search for address by id
        const address = await getPaymentService(id);
        if (!address) return c.text("Address not found", 404);

        // delete address
        const res = await deletePaymentService(id);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};


export{
    PaymentstateController,
    getPaymentController,
    createPaymentController,
    updatePaymentController,
    deletePaymentController
}