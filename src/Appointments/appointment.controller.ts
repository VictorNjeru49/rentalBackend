import { Context } from "hono";
import { AppointmentsService, createAppointmentsService, deleteAppointmentsService, getAppointmentsService, updateAppointmentsService } from "./appointment.service";


const AppointmentsstateController = async (c: Context) => {
    try {
        const address = await AppointmentsService();
        if (address == null || address.length == 0) {
            return c.text("address not found", 404)
        }        
        return c.json(address, 200)

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }

}

const getAppointmentsController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const address = await getAppointmentsService(id);
        if (address == null) {
            return c.text("Address not found", 404);
        }
        return c.json(address, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// create state
const createAppointmentsController = async (c: Context) => {
    try {
        const address = await c.req.json();
        const newAddress = await createAppointmentsService(address);

        if (!newAddress) return c.text("Address not created", 400);
        return c.json({ message: "Address created successfully", newAddress }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

//  update address
const updateAppointmentsController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const address = await c.req.json();

        // search for Appointments by id
        const updatedAddress = await getAppointmentsService(id);
        if (!updatedAddress === undefined) return c.text("Address not found", 404);

        // get data to update
        const res = await updateAppointmentsService(id, address);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// delete address

const deleteAppointmentsController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid id", 400);
    try {
        // search for address by id
        const address = await getAppointmentsService(id);
        if (!address) return c.text("Address not found", 404);

        // delete address
        const res = await deleteAppointmentsService(id);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};


export{
    AppointmentsstateController,
    getAppointmentsController,
    createAppointmentsController,
    updateAppointmentsController,
    deleteAppointmentsController
}