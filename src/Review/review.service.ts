import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { ReviewsTable, TISReviewsTable, TSReviewsTable } from "../drizzle/schema";

const ReviewsService = async (): Promise<TSReviewsTable[] | null> => {
    const Reviews  = await db.query.ReviewsTable.findMany({
        where: (fields , {eq}) => eq(ReviewsTable.id, fields.id),
        columns: {
            id: true,
            user_id: true,
            comment: true,
            property_id: true,
            rating: true,
            created_at: true,
            updated_at: true,
        },
        with:{
            user: true,
            property:true,
     
        }})

        return Reviews
}

const getReviewsService = async (id: number): Promise<TSReviewsTable | undefined> => {
    return await db.query.ReviewsTable.findFirst({
        where: eq(ReviewsTable.id, id),
        
    })
}

const createReviewsService = async (Reviews: TISReviewsTable) => {
    await db.insert(ReviewsTable).values(Reviews)
    return "Reviews created successfully";
}

const updateReviewsService = async (id: number, Reviews: TISReviewsTable) => {
    await db.update(ReviewsTable).set(Reviews).where(eq(ReviewsTable.id, id))
    return "Reviews updated successfully";
}

const deleteReviewsService = async (id: number) => {
    await db.delete(ReviewsTable).where(eq(ReviewsTable.id, id))
    return "Reviews deleted successfully";
}

export{
    ReviewsService,
    getReviewsService,
    createReviewsService,
    updateReviewsService,
    deleteReviewsService
}