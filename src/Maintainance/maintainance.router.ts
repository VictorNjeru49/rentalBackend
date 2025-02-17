import { Hono } from "hono";
import { createMaintenanceController, deleteMaintenanceController, getMaintenanceController, MaintenancestateController, updateMaintenanceController } from "./maintainance.controller";



export const MaintainanceRouter = new Hono();

MaintainanceRouter.get("/Maintainance", MaintenancestateController);

// get all addresses
MaintainanceRouter
    .post("/Maintainance", createMaintenanceController)

    .delete("/Maintainance", deleteMaintenanceController)

// get address by id
MaintainanceRouter
    .get("/Maintainance/:id", getMaintenanceController)
    .put("/Maintainance/:id", updateMaintenanceController)
    .delete("/Maintainance/:id", deleteMaintenanceController)