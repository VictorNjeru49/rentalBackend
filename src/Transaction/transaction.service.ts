import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TITransactionsTable, TransactionsTable, TSTransactionsTable } from "../drizzle/schema";

const TransactionsService = async (): Promise<TSTransactionsTable[] | null> => {
    const Transactions  = await db.query.TransactionsTable.findMany({
        where: (fields , {eq}) => eq(TransactionsTable.id, fields.id),
        columns:{
            id: true,
            user_id:true,
            property_id:true,
            Amount:true,
            transactionStatus:true,
            transaction_date:true,
            created_at:true,
        },
        with:{
            payment:true,
            user:true,
            property:true,
        }

    })
    return Transactions;
}

const getTransactionsService = async (id: number): Promise<TSTransactionsTable | undefined> => {
    return await db.query.TransactionsTable.findFirst({
        where: eq(TransactionsTable.id, id),
        
    })
}

const createTransactionsService = async (Transactions: TITransactionsTable) => {
    await db.insert(TransactionsTable).values(Transactions)
    return "Transactions created successfully";
}

const updateTransactionsService = async (id: number, Transactions: TITransactionsTable) => {
    await db.update(TransactionsTable).set(Transactions).where(eq(TransactionsTable.id, id))
    return "Transactions updated successfully";
}

const deleteTransactionsService = async (id: number) => {
    await db.delete(TransactionsTable).where(eq(TransactionsTable.id, id))
    return "Transactions deleted successfully";
}

export{
    TransactionsService,
    getTransactionsService,
    createTransactionsService,
    updateTransactionsService,
    deleteTransactionsService
}