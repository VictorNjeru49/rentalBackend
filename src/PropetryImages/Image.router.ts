import { Hono } from "hono";
import { createImagesController, deleteImagesController, getImagesController, ImagesstateController, updateImagesController } from "./image.contoller";



export const ImageRouter = new Hono();

ImageRouter.get("/PropetryImages", ImagesstateController);

// get all addresses
ImageRouter
    .post("/PropetryImages", createImagesController)

    .delete("/PropetryImages", deleteImagesController)

// get address by id
ImageRouter
    .get("/PropetryImages/:id", getImagesController)
    .put("/PropetryImages/:id", updateImagesController)
    .delete("/PropetryImages/:id", deleteImagesController)