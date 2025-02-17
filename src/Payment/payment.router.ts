import { Hono } from "hono";
import { createPaymentController, deletePaymentController, getPaymentController, PaymentstateController, updatePaymentController } from "./payment.controller";



export const PaymentRouter = new Hono();

PaymentRouter.get("/Payment", PaymentstateController);

// get all addresses
PaymentRouter
    .post("/Payment", createPaymentController)

    .delete("/Payment", deletePaymentController)

// get address by id
PaymentRouter
    .get("/Payment/:id", getPaymentController)
    .put("/Payment/:id", updatePaymentController)
    .delete("/Payment/:id", deletePaymentController)