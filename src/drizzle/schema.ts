import { pgTable, serial, text, varchar, integer, boolean, decimal,pgEnum } from "drizzle-orm/pg-core";
import { time,timestamp, numeric } from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";

export const roleEnum = pgEnum("role", ["admin", "user", "superAdmin", "disabled"])
export const maintainEnum = pgEnum("maintain", ["Pending", "Completed"]);
export const transactionEnum = pgEnum("transaction", ["Pending", "Completed", "Cancelled"]);
export const appointmentEnum = pgEnum("appoint", ["Pending", "Completed", "Cancelled"]);
export const utilityEnum = pgEnum("utility", ["Electricity", "Water", "Gas", "Internet"]);
export const statusEnum = pgEnum("status", ["Active", "Inactive"]);

export const UserTable = pgTable ("user",{
    id: serial("id").primaryKey().notNull(),
    fullname: varchar("fullname", {length: 255}).notNull(),
    username: varchar("username",{length: 255}).notNull(),
    password: varchar("password",{length:255}).notNull(),
    email: varchar("email",{length:255}).notNull(),
    contact_phone: integer("contact_phone").notNull(),
    role: roleEnum("role").default("user"),
    address: text("address").notNull(),
    created_at : time("created_at").notNull().default(sql `NOW()`),
    updated_at:  time("updated_at").notNull().default(sql `NOW()`),
});

export const PropertiesTable = pgTable("properties",{
    id: serial("id").primaryKey(),
    user_id: integer("user_id").references(()=>UserTable.id).notNull(),
    address: varchar("address",{length:255}).notNull(),
    city: varchar("city",{length:100}).notNull(),
    state: varchar("state",{length:100}).notNull(),
    zip_code: varchar("zip_code",{length:20}).notNull(),
    price: decimal("price").notNull(),
    description: text("description"),
    bedrooms: integer("bedrooms"),
    bathrooms: integer("bathrooms"),
    square_footage: numeric("square_footage"),
    availability_status: boolean("availability_status").notNull().default(true),
    created_at: time("created_at").notNull().default(sql `NOW()`),
    updated_at:  time("updated_at").notNull().default(sql `NOW()`),
});

export const ImagesTable = pgTable("Images",{
    id: serial("id").primaryKey(),
    property_id: integer("property_id").references(()=>PropertiesTable.id),
    image_url: varchar("image_url",{length:255}).notNull(),
    uploaded_at: time("uploaded_at").notNull().default(sql `NOW()`),
 
});

export const SpecificationsTable = pgTable("Specifications",{
    id: serial("id").primaryKey(),
    property_id: integer("property_id").references(()=>PropertiesTable.id),
    key_feature: varchar("key_feature",{length:255}).notNull(),
    value: varchar("value",{length:255}).notNull(),
 });

export const MaintenanceLogsTable = pgTable("MaintenanceLogs",{
    id: serial("id").primaryKey(),
    property_id: integer("property_id").references(()=>PropertiesTable.id),
    maintenance_date: timestamp("maintenance_date").notNull(),
    description: text("description"),
    maintain_status: maintainEnum("maintain_status").default("Pending"),
    created_at: time("created_at").notNull().default(sql `NOW()`),
 });
export const TransactionsTable = pgTable("Transactions",{
    id: serial("id").primaryKey(),
    user_id: integer("user_id").references(()=>UserTable.id),
    property_id: integer("property_id").references(()=>PropertiesTable.id),
    transaction_date: timestamp("transaction_date").notNull(),
    Amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
    transaction_status: transactionEnum("transaction_status").default("Pending"),
    created_at: time("created_at").notNull().default(sql `NOW()`),
 });

export const PaymentTable = pgTable("Payment", {
    id: serial("id").primaryKey().notNull(),
    transaction_Id: integer("transaction").references(()=>TransactionsTable.id).notNull(),
    Amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
    paymentStatus: varchar("payment_status").default("pending").notNull(),
    paymentDate: timestamp("paymentDate").notNull(),
    paymentMethod: varchar("paymentMethod", { length: 100 }).notNull(),
    created_at: timestamp("created").default(sql `NOW()`).notNull(),
    updated_at: timestamp("updated").default(sql `NOW()`).notNull()
});

export const ReviewsTable = pgTable("Reviews",{
    id: serial("id").primaryKey(),
    property_id: integer("property_id").references(()=>PropertiesTable.id),
    user_id: integer("user_id").references(()=>UserTable.id),
    rating: integer("rating").notNull(),
    comment: text("comment"),
    created_at: time("created_at").notNull().default(sql `NOW()`),
    updated_at: timestamp("updated").default(sql `NOW()`).notNull()
 });
export const AppointmentsTable = pgTable("Appointments", {
    id: serial("id").primaryKey(),
    property_id: integer("property_id").references(() => PropertiesTable.id),
    user_id: integer("user_id").references(() => UserTable.id).notNull(),
    appointStatus: appointmentEnum("appoint").default("Pending"),
    appointment_date: timestamp("appointment_date").notNull(),
    created_at: time("created_at").notNull().default(sql `NOW()`),
});
export const FavoritesTable = pgTable("Favorites",{
    id: serial("id").primaryKey(),
    user_id: integer("user_id").references(()=>UserTable.id),
    property_id: integer("property_id").references(()=>PropertiesTable.id),
    created_at: time("created_at").notNull().default(sql `NOW()`),
 });
export const NeighborhoodsTable = pgTable("Neighborhoods",{
    id: serial("id").primaryKey(),
    name: varchar("name",{length:255}).notNull(),
    description: text("description"),
    city: varchar("city",{length:100}).notNull(),
    state: varchar("state",{length:100}).notNull(),
 });
export const Property_Neighborhood = pgTable("Property_Neighborhood",{
    id: integer("property_id").references(()=>PropertiesTable.id).notNull(),
    neighborhood_id: integer("neighborhood_id").references(()=>NeighborhoodsTable.id).notNull(),
    created_at: time("created_at").notNull().default(sql `NOW()`),
    updated_at:  time("updated_at").notNull().default(sql `NOW()`),
 });
export const LocationsTable = pgTable("Locations",{
    id: serial("id").primaryKey().notNull(),
    property_id: integer("property_id").references(()=>PropertiesTable.id).notNull(),
    street: varchar("street",{length:255}).notNull(),
    city: varchar("city",{length:100}).notNull(),
    state: varchar("state",{length:100}).notNull(),
    zip_code: varchar("zip_code",{length:20}).notNull(),
    created_at: time("created_at").notNull().default(sql `NOW()`),
    updated_at:  time("updated_at").notNull().default(sql `NOW()`),
 });
export const UtilitiesTable = pgTable("Utilities",{
    id: serial("id").primaryKey().notNull(),
    property_id: integer("property_id").references(()=>PropertiesTable.id).notNull(),
    utilityStatus: utilityEnum("utility").default("Electricity"),
    provider: varchar("provider",{length:255}).notNull(),
    monthly_cost: decimal("monthly_cost").notNull(),
    status: statusEnum("status").default("Active"),
 });

export const authoritytable = pgTable("authorityusers", {
    id: serial("id").primaryKey().notNull(),
    userId: integer("user_id").notNull().references(() => UserTable.id),
    email: varchar("email",{length: 255} ).notNull(),
    password: varchar("password", { length: 100 }).notNull(),
    username: varchar("username", { length: 100 }).notNull(),
});








export const userRelations = relations(UserTable,({one, many})=>({
    properties: many(PropertiesTable),
    transactions: many(TransactionsTable),
    reviews: many(ReviewsTable),
    appointments: many(AppointmentsTable),
    favorites: many(FavoritesTable),
    auth: one(authoritytable,{
        fields: [UserTable.id],
        references: [authoritytable.userId]
    })
}))

export const propertiesRelations = relations(PropertiesTable,({one, many})=>({
    user: one(UserTable,{
        fields: [PropertiesTable.user_id],
        references: [UserTable.id]
    }),
    images: many(ImagesTable),
    specifications: many(SpecificationsTable),
    maintenancelogs: many(MaintenanceLogsTable),
    transactions: many(TransactionsTable),
    favorites: many(FavoritesTable),
    neighborhoods: many(Property_Neighborhood),
    location: many(LocationsTable),
    utility: many(UtilitiesTable),
    reviews: many(ReviewsTable),
    appointments: many(AppointmentsTable),
}))

export const imagesRelations = relations(ImagesTable,({one})=>({
    property: one(PropertiesTable,{
        fields: [ImagesTable.property_id],
        references: [PropertiesTable.id]
    })
}))

export const specificationsRelations = relations(SpecificationsTable,({one})=>({
    property: one(PropertiesTable,{
        fields: [SpecificationsTable.property_id],
        references: [PropertiesTable.id]
    })
}))

export const maintenancelogsRelations = relations(MaintenanceLogsTable,({one})=>({
    property: one(PropertiesTable,{
        fields: [MaintenanceLogsTable.property_id],
        references: [PropertiesTable.id]
    })
}))

export const transactionsRelations = relations(TransactionsTable,({one, many})=>({
    property: one(PropertiesTable,{
        fields: [TransactionsTable.property_id],
        references: [PropertiesTable.id]
    }),
    payment: many(PaymentTable),
    user: many(UserTable)
}))

export const paymentRelations = relations(PaymentTable,({one})=>({
    transaction: one(TransactionsTable,{
        fields: [PaymentTable.transaction_Id],
        references: [TransactionsTable.id]
    })
}))

export const reviewsRelations = relations(ReviewsTable,({one})=>({
    user: one(UserTable,{
        fields: [ReviewsTable.user_id],
        references: [UserTable.id]
    }),
    property: one(PropertiesTable,{
        fields: [ReviewsTable.property_id],
        references: [PropertiesTable.id]
    })
}))

export const appointmentsRelations = relations(AppointmentsTable,({one})=>({
    user: one(UserTable,{
        fields: [AppointmentsTable.user_id],
        references: [UserTable.id]
    }),
    property: one(PropertiesTable,{
        fields: [AppointmentsTable.property_id],
        references: [PropertiesTable.id]
    })
}))

export const favoritesRelations = relations(FavoritesTable,({one})=>({
    user: one(UserTable,{
        fields: [FavoritesTable.user_id],
        references: [UserTable.id]
    }),
    property: one(PropertiesTable,{
        fields: [FavoritesTable.property_id],
        references: [PropertiesTable.id]
    })
}))

export const neighborhoodsRelations = relations(NeighborhoodsTable,({many})=>({
    PropertyNeighborhood: many(Property_Neighborhood)
}))

export const property_neighborhoodRelations = relations(Property_Neighborhood,({one})=>({
    neighborhood: one(NeighborhoodsTable,{
        fields: [Property_Neighborhood.neighborhood_id],
        references: [NeighborhoodsTable.id]
    })
}))

export const locationsRelations = relations(LocationsTable,({one})=>({
    property: one(PropertiesTable,{
        fields: [LocationsTable.property_id],
        references: [PropertiesTable.id]
    })
}))

export const utilitiesRelations = relations(UtilitiesTable,({one})=>({
    property: one(PropertiesTable,{
        fields: [UtilitiesTable.property_id],
        references: [PropertiesTable.id]
    })
}))

type TSUserTable = typeof UserTable.$inferSelect
type TIUsertable = typeof UserTable.$inferInsert

type TSPropertiesTable = typeof PropertiesTable.$inferSelect
type TIPropertiesTable = typeof PropertiesTable.$inferInsert

type TSImagesTable = typeof ImagesTable.$inferSelect
type TIImagesTable = typeof ImagesTable.$inferInsert

type TSSpecificationsTable = typeof SpecificationsTable.$inferSelect
type TISspecificationsTable = typeof SpecificationsTable.$inferInsert

type TSMaintenanceLogsTable = typeof MaintenanceLogsTable.$inferSelect
type TIMaintenanceLogsTable = typeof MaintenanceLogsTable.$inferInsert

type TSTransactionsTable = typeof TransactionsTable.$inferSelect
type TITransactionsTable = typeof TransactionsTable.$inferInsert

type TSPaymentTable = typeof PaymentTable.$inferSelect
type TIPaymentTable = typeof PaymentTable.$inferInsert  

type TSReviewsTable = typeof ReviewsTable.$inferSelect
type TISReviewsTable = typeof ReviewsTable.$inferInsert

type TSAppointmentsTable = typeof AppointmentsTable.$inferSelect
type TIAppointmentsTable = typeof AppointmentsTable.$inferInsert

type TSFavoritesTable = typeof FavoritesTable.$inferSelect
type TIFTabavorteTable = typeof FavoritesTable.$inferInsert

type TSNeighborhoodsTable = typeof NeighborhoodsTable.$inferSelect
type TINeighborhoodsTable = typeof NeighborhoodsTable.$inferInsert

type TSPropertyNeighborhood = typeof Property_Neighborhood.$inferSelect
type TIPropertyNeighborhood = typeof Property_Neighborhood.$inferInsert

type TSLocationsTable = typeof LocationsTable.$inferSelect
type TILocationsTable = typeof LocationsTable.$inferInsert

type TSUtilitiesTable = typeof UtilitiesTable.$inferSelect
type TIUtilitiesTable = typeof UtilitiesTable.$inferInsert

type TSauthoritytable = typeof authoritytable.$inferSelect
type TIauthoritytable = typeof authoritytable.$inferInsert

export{
    TSUserTable,
    TIUsertable,
    TSPropertiesTable,
    TIPropertiesTable,
    TSImagesTable,
    TIImagesTable,
    TSSpecificationsTable,
    TISspecificationsTable,
    TSMaintenanceLogsTable,
    TIMaintenanceLogsTable,
    TSTransactionsTable,
    TITransactionsTable,
    TSPaymentTable,
    TIPaymentTable,
    TSReviewsTable,
    TISReviewsTable,
    TSAppointmentsTable,
    TIAppointmentsTable,
    TSFavoritesTable,
    TIFTabavorteTable,
    TSNeighborhoodsTable,
    TINeighborhoodsTable,
    TSPropertyNeighborhood,
    TIPropertyNeighborhood,
    TSLocationsTable,
    TILocationsTable,
    TSUtilitiesTable,
    TIUtilitiesTable,
    TSauthoritytable,
    TIauthoritytable,
}
