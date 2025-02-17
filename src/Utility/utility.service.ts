import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIUtilitiesTable, TSUtilitiesTable, UtilitiesTable } from "../drizzle/schema";

const UtilityService = async (): Promise<TSUtilitiesTable[] | null> => {
    const Utility  = await db.query.UtilitiesTable.findMany({
        where: (fields , {eq}) => eq(UtilitiesTable.id, fields.id),
        columns: {
            id: true,   
            property_id: true, 
            status: true, 
            utilityStatus: true,
            provider: true, 
            monthly_cost: true, 
        },
        with:{
             property: true,

        }})

        return Utility
}

const getUtilityService = async (id: number): Promise<TSUtilitiesTable | undefined> => {
    return await db.query.UtilitiesTable.findFirst({
        where: eq(UtilitiesTable.id, id),
        
    })
}

const createUtilityService = async (Utility: TIUtilitiesTable) => {
    await db.insert(UtilitiesTable).values(Utility)
    return "Utility created successfully";
}

const updateUtilityService = async (id: number, Utility: TIUtilitiesTable) => {
    await db.update(UtilitiesTable).set(Utility).where(eq(UtilitiesTable.id, id))
    return "Utility updated successfully";
}

const deleteUtilityService = async (id: number) => {
    await db.delete(UtilitiesTable).where(eq(UtilitiesTable.id, id))
    return "Utility deleted successfully";
}

export{
    UtilityService,
    getUtilityService,
    createUtilityService,
    updateUtilityService,
    deleteUtilityService
}