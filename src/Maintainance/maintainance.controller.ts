import { Context } from "hono";
import { createMaintenanceService, deleteMaintenanceService, getMaintenanceService, MaintenanceService, updateMaintenanceService } from "./maintainance.service";


const MaintenancestateController = async (c: Context) => {
    try {
        const address = await MaintenanceService();
        if (address == null || address.length == 0) {
            return c.text("address not found", 404)
        }        
        return c.json(address, 200)

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }

}

const getMaintenanceController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const address = await getMaintenanceService(id);
        if (address == null) {
            return c.text("Address not found", 404);
        }
        return c.json(address, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// create state
const createMaintenanceController = async (c: Context) => {
    try {
        const address = await c.req.json();
        const newAddress = await createMaintenanceService(address);

        if (!newAddress) return c.text("Address not created", 400);
        return c.json({ message: "Address created successfully", newAddress }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

//  update address
const updateMaintenanceController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const address = await c.req.json();

        // search for Maintenance by id
        const updatedAddress = await getMaintenanceService(id);
        if (!updatedAddress === undefined) return c.text("Address not found", 404);

        // get data to update
        const res = await updateMaintenanceService(id, address);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// delete address

const deleteMaintenanceController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid id", 400);
    try {
        // search for address by id
        const address = await getMaintenanceService(id);
        if (!address) return c.text("Address not found", 404);

        // delete address
        const res = await deleteMaintenanceService(id);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};


export{
    MaintenancestateController,
    getMaintenanceController,
    createMaintenanceController,
    updateMaintenanceController,
    deleteMaintenanceController
}