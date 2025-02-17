import { Context } from "hono";
import { createUtilityService, deleteUtilityService, getUtilityService, updateUtilityService, UtilityService } from "./utility.service";


const UtilitystateController = async (c: Context) => {
    try {
        const address = await UtilityService();
        if (address == null || address.length == 0) {
            return c.text("address not found", 404)
        }        
        return c.json(address, 200)

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }

}

const getUtilityController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const address = await getUtilityService(id);
        if (address == null) {
            return c.text("Address not found", 404);
        }
        return c.json(address, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// create state
const createUtilityController = async (c: Context) => {
    try {
        const address = await c.req.json();
        const newAddress = await createUtilityService(address);

        if (!newAddress) return c.text("Address not created", 400);
        return c.json({ message: "Address created successfully", newAddress }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

//  update address
const updateUtilityController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const address = await c.req.json();

        // search for Utility by id
        const updatedAddress = await getUtilityService(id);
        if (!updatedAddress === undefined) return c.text("Address not found", 404);

        // get data to update
        const res = await updateUtilityService(id, address);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// delete address

const deleteUtilityController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid id", 400);
    try {
        // search for address by id
        const address = await getUtilityService(id);
        if (!address) return c.text("Address not found", 404);

        // delete address
        const res = await deleteUtilityService(id);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};


export{
    UtilitystateController,
    getUtilityController,
    createUtilityController,
    updateUtilityController,
    deleteUtilityController
}