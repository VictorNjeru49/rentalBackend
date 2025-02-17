import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { AppointmentsTable, TIAppointmentsTable, TSAppointmentsTable } from "../drizzle/schema";

const AppointmentsService = async (): Promise<TSAppointmentsTable[] | null> => {
    const Appointments  = await db.query.AppointmentsTable.findMany({
        where: (fields , {eq}) => eq(AppointmentsTable.id, fields.id),
        columns: {
            id: true,   
            property_id: true, 
            user_id: true,
            appointment_date: true,
            appointmentStatus: true,
            created_at: true,
        },
        with:{
             property: true,
             user: true,

        }})

        return Appointments
}

const getAppointmentsService = async (id: number): Promise<TSAppointmentsTable | undefined> => {
    return await db.query.AppointmentsTable.findFirst({
        where: eq(AppointmentsTable.id, id),
        
    })
}

const createAppointmentsService = async (Appointments: TIAppointmentsTable) => {
    await db.insert(AppointmentsTable).values(Appointments)
    return "Appointments created successfully";
}

const updateAppointmentsService = async (id: number, Appointments: TIAppointmentsTable) => {
    await db.update(AppointmentsTable).set(Appointments).where(eq(AppointmentsTable.id, id))
    return "Appointments updated successfully";
}

const deleteAppointmentsService = async (id: number) => {
    await db.delete(AppointmentsTable).where(eq(AppointmentsTable.id, id))
    return "Appointments deleted successfully";
}

export{
    AppointmentsService,
    getAppointmentsService,
    createAppointmentsService,
    updateAppointmentsService,
    deleteAppointmentsService
}