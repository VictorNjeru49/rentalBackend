import { Context } from "hono";
import { createLocationsService, deleteLocationsService, getLocationsService, LocationsService, updateLocationsService } from "./location.service";


const LocationsstateController = async (c: Context) => {
    try {
        const address = await LocationsService();
        if (address == null || address.length == 0) {
            return c.text("address not found", 404)
        }        
        return c.json(address, 200)

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }

}

const getLocationsController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const address = await getLocationsService(id);
        if (address == null) {
            return c.text("Address not found", 404);
        }
        return c.json(address, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// create state
const createLocationsController = async (c: Context) => {
    try {
        const address = await c.req.json();
        const newAddress = await createLocationsService(address);

        if (!newAddress) return c.text("Address not created", 400);
        return c.json({ message: "Address created successfully", newAddress }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

//  update address
const updateLocationsController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const address = await c.req.json();

        // search for Locations by id
        const updatedAddress = await getLocationsService(id);
        if (!updatedAddress === undefined) return c.text("Address not found", 404);

        // get data to update
        const res = await updateLocationsService(id, address);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// delete address

const deleteLocationsController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid id", 400);
    try {
        // search for address by id
        const address = await getLocationsService(id);
        if (!address) return c.text("Address not found", 404);

        // delete address
        const res = await deleteLocationsService(id);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};


export{
    LocationsstateController,
    getLocationsController,
    createLocationsController,
    updateLocationsController,
    deleteLocationsController
}