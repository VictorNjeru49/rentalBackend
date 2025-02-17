import { Hono } from "hono";
import { createNeighborhoodsController, deleteNeighborhoodsController, getNeighborhoodsController, NeighborhoodsstateController, updateNeighborhoodsController } from "./neighborhood.controller";



export const NeighborhoodRouter = new Hono();

NeighborhoodRouter.get("/Neighborhood", NeighborhoodsstateController);

// get all addresses
NeighborhoodRouter
    .post("/Neighborhood", createNeighborhoodsController)

    .delete("/Neighborhood", deleteNeighborhoodsController)

// get address by id
NeighborhoodRouter
    .get("/Neighborhood/:id", getNeighborhoodsController)
    .put("/Neighborhood/:id", updateNeighborhoodsController)
    .delete("/Neighborhood/:id", deleteNeighborhoodsController)