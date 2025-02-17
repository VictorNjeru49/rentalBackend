import { Hono } from "hono";
import { AppointmentsstateController, createAppointmentsController, deleteAppointmentsController, getAppointmentsController, updateAppointmentsController } from "./appointment.controller";


export const AppointmentsRouter = new Hono();

AppointmentsRouter.get("/Appointments", AppointmentsstateController);

// get all addresses
AppointmentsRouter
    .post("/Appointments", createAppointmentsController)

    .delete("/Appointments", deleteAppointmentsController)

// get address by id
AppointmentsRouter
    .get("/Appointments/:id", getAppointmentsController)
    .put("/Appointments/:id", updateAppointmentsController)
    .delete("/Appointments/:id", deleteAppointmentsController)