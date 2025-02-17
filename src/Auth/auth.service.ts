import db from "../drizzle/db";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { registerUserSchema, Userschema } from "../validator";
import { authoritytable, UserTable } from "../drizzle/schema";
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;
const expiresIn = process.env.JWT_EXPIRES_IN;



export const registerUser = async (user: any) => {
    Userschema.parse(user);
    registerUserSchema.parse(user);
 
  
    const existingUser = await db.select().from(UserTable).where(eq(UserTable.password, user.email)).execute();
 
    if(existingUser.length > 0){
        throw new Error("User already exists");
    }
 
    const hashedPassword = await bcrypt.hash(user.password, 10);
 
  
    const newUser = await db.insert(UserTable)
    .values({
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        password: user.password,
        contact_phone: user.contact_phone,
        address: user.address,
        role: user.role
    })
    .returning({id: UserTable.id})
    .execute();
 

    const userId = newUser[0].id;
 
    try {
        await db.insert(authoritytable)
        .values({
            id: userId,
            email: user.email,
            username: user.username,
            userId:userId,
            password: hashedPassword
        })
        .execute();
        return 'User registered successfully';
    } catch (error) {
    
        await db.delete(UserTable).where(eq(UserTable.id, userId)).execute();
        throw new Error('Registration failed. Please try again.');
    }
}
        

export const authLoginService = async (email: string, password: string) => {
    try {

        const users = await db.select().from(UserTable).where(eq(UserTable.email, email)).execute();

        if (users.length === 0) {
            throw new Error('User not found! Try Again');
        }

        const user = users[0];

     
        const auths = await db.select().from(authoritytable).where(eq(authoritytable.id, user.id)).execute();

        if (auths.length === 0) {
            throw new Error('Invalid credentials! Try again');
        }

        const auth = auths[0];


        const isPasswordValid = bcrypt.compare(password, auth.password !);

        if (!isPasswordValid) {
            throw new Error('Invalid credentials! Try again');
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            secret!,
            { expiresIn: '1h' }
        );
    

        return { token, user };
    } catch (error) {
        throw error;  
    }
};