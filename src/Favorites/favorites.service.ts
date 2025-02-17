import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { FavoritesTable, TILocationsTable, TSFavoritesTable } from "../drizzle/schema";

const FavoritesService = async (): Promise<TSFavoritesTable[] | null> => {
    const Favorites  = await db.query.FavoritesTable.findMany({
        where: (fields , {eq}) => eq(FavoritesTable.id, fields.id),
        columns: {
            id: true,   
            property_id: true, 
            user_id: true,
            created_at: true,
        },
        with:{
             property: true,
             user: true,

        }})

        return Favorites
}

const getFavoritesService = async (id: number): Promise<TSFavoritesTable | undefined> => {
    return await db.query.FavoritesTable.findFirst({
        where: eq(FavoritesTable.id, id),
        
    })
}

const createFavoritesService = async (Favorites: TILocationsTable) => {
    await db.insert(FavoritesTable).values(Favorites)
    return "Favorites created successfully";
}

const updateFavoritesService = async (id: number, Favorites: TILocationsTable) => {
    await db.update(FavoritesTable).set(Favorites).where(eq(FavoritesTable.id, id))
    return "Favorites updated successfully";
}

const deleteFavoritesService = async (id: number) => {
    await db.delete(FavoritesTable).where(eq(FavoritesTable.id, id))
    return "Favorites deleted successfully";
}

export{
    FavoritesService,
    getFavoritesService,
    createFavoritesService,
    updateFavoritesService,
    deleteFavoritesService
}