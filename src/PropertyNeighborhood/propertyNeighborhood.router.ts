import { Hono } from "hono";
import { createPropertyNeighborhoodController, deletePropertyNeighborhoodController, getPropertyNeighborhoodController, PropertyNeighborhoodstateController, updatePropertyNeighborhoodController } from "./propertyNeighborhood.controller";



export const PropertyNeighborhoodRouter = new Hono();

PropertyNeighborhoodRouter.get("/PropertyNeighborhood", PropertyNeighborhoodstateController);

// get all addresses
PropertyNeighborhoodRouter
    .post("/PropertyNeighborhood", createPropertyNeighborhoodController)

    .delete("/PropertyNeighborhood", deletePropertyNeighborhoodController)

// get address by id
PropertyNeighborhoodRouter
    .get("/PropertyNeighborhood/:id", getPropertyNeighborhoodController)
    .put("/PropertyNeighborhood/:id", updatePropertyNeighborhoodController)
    .delete("/PropertyNeighborhood/:id", deletePropertyNeighborhoodController) //