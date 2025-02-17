import { Hono } from "hono";
import { createSpecificationsController, deleteSpecificationsController, getSpecificationsController, SpecificationsstateController, updateSpecificationsController } from "./specification.controller";



export const SpecificationRouter = new Hono();

SpecificationRouter.get("/Specification", SpecificationsstateController);

// get all addresses
SpecificationRouter
    .post("/Specification", createSpecificationsController)

    .delete("/Specification", deleteSpecificationsController)

// get address by id
SpecificationRouter
    .get("/Specification/:id", getSpecificationsController)
    .put("/Specification/:id", updateSpecificationsController)
    .delete("/Specification/:id", deleteSpecificationsController)