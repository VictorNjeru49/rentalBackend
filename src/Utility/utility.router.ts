import { Hono } from "hono";
import { createUtilityController, deleteUtilityController, getUtilityController, updateUtilityController, UtilitystateController } from "./utility.controller";



export const utilityRouter = new Hono();

utilityRouter.get("/Utility", UtilitystateController);

// get all addresses
utilityRouter
    .post("/Utility", createUtilityController)

    .delete("/Utility", deleteUtilityController)

// get address by id
utilityRouter
    .get("/Utility/:id", getUtilityController)
    .put("/Utility/:id", updateUtilityController)
    .delete("/Utility/:id", deleteUtilityController)