import { Hono } from "hono";
import { createTransactionsController, deleteTransactionsController, getTransactionsController, TransactionstateController, updateTransactionsController } from "./transaction.controller";



export const TransactionRouter = new Hono();

TransactionRouter.get("/Transaction", TransactionstateController);

// get all addresses
TransactionRouter
    .post("/Transaction", createTransactionsController)

    .delete("/Transaction", deleteTransactionsController)

// get address by id
TransactionRouter
    .get("/Transaction/:id", getTransactionsController)
    .put("/Transaction/:id", updateTransactionsController)
    .delete("/Transaction/:id", deleteTransactionsController)