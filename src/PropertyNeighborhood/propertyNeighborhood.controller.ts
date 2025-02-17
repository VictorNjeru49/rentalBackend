import { Context } from "hono";
import { PropertyNeighborhoodService } from "./propertyNeighborhood.service";
import { createNeighborhoodsService, deleteNeighborhoodsService, getNeighborhoodsService, updateNeighborhoodsService } from "../Neighborhood/neighborhood.service";


const PropertyNeighborhoodstateController = async (c: Context) => {
    try {
        const address = await PropertyNeighborhoodService();
        if (address == null || address.length == 0) {
            return c.text("address not found", 404)
        }        
        return c.json(address, 200)

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }

}

const getPropertyNeighborhoodController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const address = await getNeighborhoodsService(id);
        if (address == null) {
            return c.text("Address not found", 404);
        }
        return c.json(address, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// create state
const createPropertyNeighborhoodController = async (c: Context) => {
    try {
        const address = await c.req.json();
        const newAddress = await createNeighborhoodsService(address);

        if (!newAddress) return c.text("Address not created", 400);
        return c.json({ message: "Address created successfully", newAddress }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

//  update address
const updatePropertyNeighborhoodController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const address = await c.req.json();

        // search for PropertyNeighborhood by id
        const updatedAddress = await getNeighborhoodsService(id);
        if (!updatedAddress === undefined) return c.text("Address not found", 404);

        // get data to update
        const res = await updateNeighborhoodsService(id, address);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// delete address

const deletePropertyNeighborhoodController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid id", 400);
    try {
        // search for address by id
        const address = await getNeighborhoodsService(id);
        if (!address) return c.text("Address not found", 404);

        // delete address
        const res = await deleteNeighborhoodsService(id);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};


export{
    PropertyNeighborhoodstateController,
    getPropertyNeighborhoodController,
    createPropertyNeighborhoodController,
    updatePropertyNeighborhoodController,
    deletePropertyNeighborhoodController
}