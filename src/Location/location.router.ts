import { Hono } from "hono";
import { createLocationsController, deleteLocationsController, getLocationsController, LocationsstateController, updateLocationsController } from "./location.controller";



export const LocationRouter = new Hono();

LocationRouter.get("/Location", LocationsstateController);

// get all addresses
LocationRouter
    .post("/Location", createLocationsController)

    .delete("/Location", deleteLocationsController)

// get address by id
LocationRouter
    .get("/Location/:id", getLocationsController)
    .put("/Location/:id", updateLocationsController)
    .delete("/Location/:id", deleteLocationsController)