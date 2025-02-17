import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { MaintenanceLogsTable, TIMaintenanceLogsTable, TSMaintenanceLogsTable } from "../drizzle/schema";

const MaintenanceService = async (): Promise<TSMaintenanceLogsTable[] | null> => {
    const Maintenance  = await db.query.MaintenanceLogsTable.findMany({
        where: (fields , {eq}) => eq(MaintenanceLogsTable.id, fields.id),
        columns: {
            id: true,   
            property_id: true, 
            maintenance_date: true,
            description: true,
            maintainStatus: true,
            created_at : true,
        },
        with:{
             property: true,

        }})

        return Maintenance
}

const getMaintenanceService = async (id: number): Promise<TSMaintenanceLogsTable | undefined> => {
    return await db.query.MaintenanceLogsTable.findFirst({
        where: eq(MaintenanceLogsTable.id, id),
        
    })
}

const createMaintenanceService = async (Maintenance: TIMaintenanceLogsTable) => {
    await db.insert(MaintenanceLogsTable).values(Maintenance)
    return "Maintenance created successfully";
}

const updateMaintenanceService = async (id: number, Maintenance: TIMaintenanceLogsTable) => {
    await db.update(MaintenanceLogsTable).set(Maintenance).where(eq(MaintenanceLogsTable.id, id))
    return "Maintenance updated successfully";
}

const deleteMaintenanceService = async (id: number) => {
    await db.delete(MaintenanceLogsTable).where(eq(MaintenanceLogsTable.id, id))
    return "Maintenance deleted successfully";
}

export{
    MaintenanceService,
    getMaintenanceService,
    createMaintenanceService,
    updateMaintenanceService,
    deleteMaintenanceService
}