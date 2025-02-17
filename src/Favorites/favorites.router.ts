import { Hono } from "hono";
import { createFavoritesController, deleteFavoritesController, FavoritesstateController, getFavoritesController, updateFavoritesController } from "./favorites.controller";



export const FavoritesRouter = new Hono();

FavoritesRouter.get("/Favorites", FavoritesstateController);

// get all addresses
FavoritesRouter
    .post("/Favorites", createFavoritesController)

    .delete("/Favorites", deleteFavoritesController)

// get address by id
FavoritesRouter
    .get("/Favorites/:id", getFavoritesController)
    .put("/Favorites/:id", updateFavoritesController)
    .delete("/Favorites/:id", deleteFavoritesController)