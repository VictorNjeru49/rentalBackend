import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { LocationsTable, TILocationsTable, TSLocationsTable } from "../drizzle/schema";

const LocationsService = async (): Promise<TSLocationsTable[] | null> => {
    const Locations  = await db.query.LocationsTable.findMany({
        where: (fields , {eq}) => eq(LocationsTable.id, fields.id),
        columns: {
            id: true,   
            property_id: true, 
            street: true,
            city: true,
            state: true,
            zip_code: true,
            created_at: true,
            updated_at: true,
        },
        with:{
             property: true,

        }})

        return Locations
}

const getLocationsService = async (id: number): Promise<TSLocationsTable | undefined> => {
    return await db.query.LocationsTable.findFirst({
        where: eq(LocationsTable.id, id),
        
    })
}

const createLocationsService = async (Locations: TILocationsTable) => {
    await db.insert(LocationsTable).values(Locations)
    return "Locations created successfully";
}

const updateLocationsService = async (id: number, Locations: TILocationsTable) => {
    await db.update(LocationsTable).set(Locations).where(eq(LocationsTable.id, id))
    return "Locations updated successfully";
}

const deleteLocationsService = async (id: number) => {
    await db.delete(LocationsTable).where(eq(LocationsTable.id, id))
    return "Locations deleted successfully";
}

export{
    LocationsService,
    getLocationsService,
    createLocationsService,
    updateLocationsService,
    deleteLocationsService
}