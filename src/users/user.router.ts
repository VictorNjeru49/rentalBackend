import { Hono } from "hono";
import { getuserController, createuserController, updateuserController, deleteuserController, userstateController} from "./user.controller";



export const userRouter = new Hono();

userRouter.get("/users", userstateController);

// get all addresses
userRouter
    .post("/users", createuserController)

    .delete("/users", deleteuserController)

// get address by id
userRouter
    .get("/users/:id", getuserController)
    .put("/users/:id", updateuserController)
    .delete("/users/:id", deleteuserController)