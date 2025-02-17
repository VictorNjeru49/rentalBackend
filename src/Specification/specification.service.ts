import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { SpecificationsTable, TISspecificationsTable, TSSpecificationsTable } from "../drizzle/schema";

const SpecificationsService = async (): Promise<TSSpecificationsTable[] | null> => {
    const Specifications  = await db.query.SpecificationsTable.findMany({
        where: (fields , {eq}) => eq(SpecificationsTable.id, fields.id),
        columns:{
            id: true,
            property_id:true,
            key_feature:true,    
            value:true
        },
        with:{
            property:true,
        }

    })
    return Specifications;
}

const getSpecificationsService = async (id: number): Promise<TSSpecificationsTable | undefined> => {
    return await db.query.SpecificationsTable.findFirst({
        where: eq(SpecificationsTable.id, id),
        
    })
}

const createSpecificationsService = async (Specifications: TISspecificationsTable) => {
    await db.insert(SpecificationsTable).values(Specifications)
    return "specifications created successfully";
}

const updateSpecificationsService = async (id: number, Specifications: TISspecificationsTable) => {
    await db.update(SpecificationsTable).set(Specifications).where(eq(SpecificationsTable.id, id))
    return "specifications updated successfully";
}

const deleteSpecificationsService = async (id: number) => {
    await db.delete(SpecificationsTable).where(eq(SpecificationsTable.id, id))
    return "specifications deleted successfully";
}

export{
    SpecificationsService,
    getSpecificationsService,
    createSpecificationsService,
    updateSpecificationsService,
    deleteSpecificationsService
}