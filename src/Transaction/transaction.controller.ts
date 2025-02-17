import { Context } from "hono";
import { createTransactionsService, deleteTransactionsService, getTransactionsService, TransactionsService, updateTransactionsService } from "./transaction.service";


const TransactionstateController = async (c: Context) => {
    try {
        const address = await TransactionsService();
        if (address == null || address.length == 0) {
            return c.text("address not found", 404)
        }        
        return c.json(address, 200)

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }

}

const getTransactionsController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const address = await getTransactionsService(id);
        if (address == null) {
            return c.text("Address not found", 404);
        }
        return c.json(address, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// create state
const createTransactionsController = async (c: Context) => {
    try {
        const address = await c.req.json();
        const newAddress = await createTransactionsService(address);

        if (!newAddress) return c.text("Address not created", 400);
        return c.json({ message: "Address created successfully", newAddress }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

//  update address
const updateTransactionsController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const address = await c.req.json();

        // search for Transactions by id
        const updatedAddress = await getTransactionsService(id);
        if (!updatedAddress === undefined) return c.text("Address not found", 404);

        // get data to update
        const res = await updateTransactionsService(id, address);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// delete address

const deleteTransactionsController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid id", 400);
    try {
        // search for address by id
        const address = await getTransactionsService(id);
        if (!address) return c.text("Address not found", 404);

        // delete address
        const res = await deleteTransactionsService(id);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};


export{
    TransactionstateController,
    getTransactionsController,
    createTransactionsController,
    updateTransactionsController,
    deleteTransactionsController
}