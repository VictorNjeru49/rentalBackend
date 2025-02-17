import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIUsertable, TSUserTable, UserTable } from "../drizzle/schema";

const userService = async (): Promise<TSUserTable[] | null> => {
    const user  = await db.query.UserTable.findMany({
        where: (fields , {eq}) => eq(UserTable.id, fields.id),
        columns: {
            id: true,
            fullname: true,
            username: true,
            email: true,
            contact_phone: true,
            password: true,
            role: true,
            address: true,
            created_at: true,
            updated_at: true,
        },
        with:{
            auth:{
                columns:{
                    userId: true,
                    email: true,
                    password: true,
                }
            },
           appointments:true,
           favorites:true,
           properties:true,
           reviews:true,
           transactions:true,      
        }})

        return user
}

const getUserService = async (id: number): Promise<TSUserTable | undefined> => {
    return await db.query.UserTable.findFirst({
        where: eq(UserTable.id, id),
        
    })
}

const createUserService = async (user: TIUsertable) => {
    await db.insert(UserTable).values(user)
    return "User created successfully";
}

const updateUserService = async (id: number, user: TIUsertable) => {
    await db.update(UserTable).set(user).where(eq(UserTable.id, id))
    return "User updated successfully";
}

const deleteUserService = async (id: number) => {
    await db.delete(UserTable).where(eq(UserTable.id, id))
    return "User deleted successfully";
}

export{
    updateUserService,
    deleteUserService,
    userService,
    createUserService,
    getUserService
}