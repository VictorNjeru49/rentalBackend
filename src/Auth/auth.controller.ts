import { Context } from "hono";
import {registerUser,authLoginService} from './auth.service'

import "dotenv/config" 

export const registerauth = async (c:Context) =>{
    try {
        const user  = await c.req.json();
        const message = await registerUser(user);
        return c.json({msg:message}, 201);
    } catch (error: any) {
        return c.json({error:error.message}, 400);
    }
}
 
export const loginUser = async (c:Context) =>{
    try {
        const {email,password} = await c.req.json();
        const {token,user} = await authLoginService(email,password);
        return c.json({token,user}, 200);
    } catch (error:any) {
        return c.json({error:error.message}, 400);
    }
}