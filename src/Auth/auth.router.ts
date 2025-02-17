import { Hono } from 'hono'
import { registerauth, loginUser } from './auth.controller'

export const authRouter = new Hono();


authRouter.post('/register', registerauth)

authRouter.post('/login', loginUser)
