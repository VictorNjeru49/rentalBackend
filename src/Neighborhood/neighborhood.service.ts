import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { NeighborhoodsTable, TINeighborhoodsTable, TSNeighborhoodsTable } from "../drizzle/schema";

const NeighborhoodsService = async (): Promise<TSNeighborhoodsTable[] | null> => {
    const Neighborhoods  = await db.query.NeighborhoodsTable.findMany({
        where: (fields , {eq}) => eq(NeighborhoodsTable.id, fields.id),
        columns: {
            id: true,   
            name: true,
            description: true,
            city: true,
            state: true,
        },
        with:{
             PropertyNeighborhood: true,

        }})

        return Neighborhoods
}

const getNeighborhoodsService = async (id: number): Promise<TSNeighborhoodsTable | undefined> => {
    return await db.query.NeighborhoodsTable.findFirst({
        where: eq(NeighborhoodsTable.id, id),
        
    })
}

const createNeighborhoodsService = async (Neighborhoods: TINeighborhoodsTable) => {
    await db.insert(NeighborhoodsTable).values(Neighborhoods)
    return "Neighborhoods created successfully";
}

const updateNeighborhoodsService = async (id: number, Neighborhoods: TINeighborhoodsTable) => {
    await db.update(NeighborhoodsTable).set(Neighborhoods).where(eq(NeighborhoodsTable.id, id))
    return "Neighborhoods updated successfully";
}

const deleteNeighborhoodsService = async (id: number) => {
    await db.delete(NeighborhoodsTable).where(eq(NeighborhoodsTable.id, id))
    return "Neighborhoods deleted successfully";
}

export{
    NeighborhoodsService,
    getNeighborhoodsService,
    createNeighborhoodsService,
    updateNeighborhoodsService,
    deleteNeighborhoodsService
}