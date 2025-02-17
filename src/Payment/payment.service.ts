import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { PaymentTable, TIPaymentTable, TSPaymentTable } from "../drizzle/schema";

const PaymentService = async (): Promise<TSPaymentTable[] | null> => {
    const Payment  = await db.query.PaymentTable.findMany({
        where: (fields , {eq}) => eq(PaymentTable.id, fields.id),
        columns: {
            id: true,
            transaction_Id: true,
            Amount: true,
            paymentStatus: true,
            paymentDate: true,
            paymentMethod: true,
            created_at: true,
            updated_at: true,
            
        },
        with:{
             transaction: true,

        }})

        return Payment
}

const getPaymentService = async (id: number): Promise<TSPaymentTable | undefined> => {
    return await db.query.PaymentTable.findFirst({
        where: eq(PaymentTable.id, id),
        
    })
}

const createPaymentService = async (Payment: TIPaymentTable) => {
    await db.insert(PaymentTable).values(Payment)
    return "Payment created successfully";
}

const updatePaymentService = async (id: number, Payment: TIPaymentTable) => {
    await db.update(PaymentTable).set(Payment).where(eq(PaymentTable.id, id))
    return "Payment updated successfully";
}

const deletePaymentService = async (id: number) => {
    await db.delete(PaymentTable).where(eq(PaymentTable.id, id))
    return "Payment deleted successfully";
}

export{
    PaymentService,
    getPaymentService,
    createPaymentService,
    updatePaymentService,
    deletePaymentService
}