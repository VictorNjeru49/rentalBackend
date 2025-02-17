import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { PropertiesTable, TIPropertiesTable, TSPropertiesTable, } from "../drizzle/schema";

const PropertiesService = async (): Promise<TSPropertiesTable[] | null> => {
    const Properties  = await db.query.PropertiesTable.findMany({
        where: (fields , {eq}) => eq(PropertiesTable.id, fields.id),
        columns: {
            id: true,
            user_id: true,
            address: true,
            city: true,
            state: true,
            zip_code: true,
            price: true,
            description: true,
            bedrooms: true,
            bathrooms: true,
            square_footage: true,
            availability_status: true,
            created_at: true,
            updated_at: true,
        },
        with:{
           appointments:true,
           favorites:true,
           images:true,
           location:true,
           maintenancelogs:true,
           reviews:true,
           transactions:true,
           user:true,
           neighborhoods:true,
           specifications:true,
           utility:true,     

        }})

        return Properties
}

const getPropertiesService = async (id: number): Promise<TSPropertiesTable | undefined> => {
    return await db.query.PropertiesTable.findFirst({
        where: eq(PropertiesTable.id, id),
        
    })
}

const createPropertiesService = async (Properties: TIPropertiesTable) => {
    await db.insert(PropertiesTable).values(Properties)
    return "Properties created successfully";
}

const updatePropertiesService = async (id: number, Properties: TIPropertiesTable) => {
    await db.update(PropertiesTable).set(Properties).where(eq(PropertiesTable.id, id))
    return "Properties updated successfully";
}

const deletePropertiesService = async (id: number) => {
    await db.delete(PropertiesTable).where(eq(PropertiesTable.id, id))
    return "Properties deleted successfully";
}

export{
    PropertiesService,
    getPropertiesService,
    createPropertiesService,
    updatePropertiesService,
    deletePropertiesService
}