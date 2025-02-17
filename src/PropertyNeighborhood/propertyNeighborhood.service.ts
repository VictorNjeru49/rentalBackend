import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { Property_Neighborhood, TIPropertyNeighborhood, TSPropertyNeighborhood } from "../drizzle/schema";

const PropertyNeighborhoodService = async (): Promise<TSPropertyNeighborhood[] | null> => {
    const PropertyNeighborhood  = await db.query.Property_Neighborhood.findMany({
        where: (fields , {eq}) => eq(Property_Neighborhood.id, fields.id),
        columns: {
            id: true,
            neighborhood_id: true,
            created_at: true,
            updated_at: true
        },
        with:{
            neighborhood:true,
     
        }})

        return PropertyNeighborhood
}

const getPropertyNeighborhoodService = async (id: number): Promise<TSPropertyNeighborhood | undefined> => {
    return await db.query.Property_Neighborhood.findFirst({
        where: eq(Property_Neighborhood.id, id),
        
    })
}

const createPropertyNeighborhoodService = async (PropertyNeighborhood: TIPropertyNeighborhood) => {
    await db.insert(Property_Neighborhood).values(PropertyNeighborhood)
    return "Property Neighborhood created successfully";
}

const updatePropertyNeighborhoodService = async (id: number, PropertyNeighborhood: TIPropertyNeighborhood) => {
    await db.update(Property_Neighborhood).set(PropertyNeighborhood).where(eq(Property_Neighborhood.id, id))
    return "Property Neighborhood updated successfully";
}

const deletePropertyNeighborhoodService = async (id: number) => {
    await db.delete(Property_Neighborhood).where(eq(Property_Neighborhood.id, id))
    return "Property Neighborhood deleted successfully";
}

export{
    PropertyNeighborhoodService,
    getPropertyNeighborhoodService,
    createPropertyNeighborhoodService,
    updatePropertyNeighborhoodService,
    deletePropertyNeighborhoodService
}