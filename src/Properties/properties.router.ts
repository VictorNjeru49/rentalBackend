import { Hono } from "hono";
import { createPropertiesController, deletePropertiesController, getPropertiesController, PropertiesstateController, updatePropertiesController } from "./properties.controller";



export const PropertiesRouter = new Hono();

PropertiesRouter.get("/Properties", PropertiesstateController);

// get all addresses
PropertiesRouter
    .post("/Properties", createPropertiesController)

    .delete("/Properties", deletePropertiesController)

// get address by id
PropertiesRouter
    .get("/Properties/:id", getPropertiesController)
    .put("/Properties/:id", updatePropertiesController)
    .delete("/Properties/:id", deletePropertiesController)