import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { AppointmentsRouter } from './Appointments/appointment.router'
import { FavoritesRouter } from './Favorites/favorites.router'
import { LocationRouter } from './Location/location.router'
import { MaintainanceRouter } from './Maintainance/maintainance.router'
import { NeighborhoodRouter } from './Neighborhood/neighborhood.router'
import { PaymentRouter } from './Payment/payment.router'
import { PropertiesRouter } from './Properties/properties.router'
import { PropertyNeighborhoodRouter } from './PropertyNeighborhood/propertyNeighborhood.router'
import { ReviewRouter } from './Review/review.router'
import { ImageRouter } from './PropetryImages/Image.router'
import { SpecificationRouter } from './Specification/specification.router'
import { TransactionRouter } from './Transaction/transaction.router'
import { userRouter } from './users/user.router'
import { utilityRouter } from './Utility/utility.router'
import { authRouter } from './Auth/auth.router'

const app = new Hono()

app.use('/*', cors())
app.get('/', (c) => {
  return c.text('Hello Hono!')
})
app.route('/', AppointmentsRouter)
app.route('/', FavoritesRouter) 
app.route('/', LocationRouter) 
app.route('/', MaintainanceRouter) 
app.route('/', NeighborhoodRouter) 
app.route('/', PaymentRouter) 
app.route('/', PropertiesRouter) 
app.route('/', PropertyNeighborhoodRouter) 
app.route('/', ImageRouter) 
app.route('/', ReviewRouter) 
app.route('/', SpecificationRouter) 
app.route('/', TransactionRouter) 
app.route('/', userRouter) 
app.route('/', utilityRouter) 
app.route('/', authRouter)

const port = process.env.PORT
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,

})
