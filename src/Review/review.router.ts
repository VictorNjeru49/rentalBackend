import { Hono } from "hono";
import { createReviewsController, deleteReviewsController, getReviewsController, ReviewsstateController, updateReviewsController } from "./review.controller";


export const ReviewRouter = new Hono();

ReviewRouter.get("/Review", ReviewsstateController);

// get all addresses
ReviewRouter
    .post("/Review", createReviewsController)

    .delete("/Review", deleteReviewsController)

// get address by id
ReviewRouter
    .get("/Review/:id", getReviewsController)
    .put("/Review/:id", updateReviewsController)
    .delete("/Review/:id", deleteReviewsController); 