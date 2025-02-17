import { Context } from "hono";
import { createPropertiesService, deletePropertiesService, getPropertiesService, PropertiesService, updatePropertiesService } from "./properties.service";


const PropertiesstateController = async (c: Context) => {
    try {
        const address = await PropertiesService();
        if (address == null || address.length == 0) {
            return c.text("address not found", 404)
        }        
        return c.json(address, 200)

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }

}

const getPropertiesController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const address = await getPropertiesService(id);
        if (address == null) {
            return c.text("Address not found", 404);
        }
        return c.json(address, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// create state
const createPropertiesController = async (c: Context) => {
    try {
        const address = await c.req.json();
        const newAddress = await createPropertiesService(address);

        if (!newAddress) return c.text("Address not created", 400);
        return c.json({ message: "Address created successfully", newAddress }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

//  update address
const updatePropertiesController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const address = await c.req.json();

        // search for Properties by id
        const updatedAddress = await getPropertiesService(id);
        if (!updatedAddress === undefined) return c.text("Address not found", 404);

        // get data to update
        const res = await updatePropertiesService(id, address);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// delete address

const deletePropertiesController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid id", 400);
    try {
        // search for address by id
        const address = await getPropertiesService(id);
        if (!address) return c.text("Address not found", 404);

        // delete address
        const res = await deletePropertiesService(id);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};


export{
    PropertiesstateController,
    getPropertiesController,
    createPropertiesController,
    updatePropertiesController,
    deletePropertiesController
}