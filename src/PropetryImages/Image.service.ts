import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { ImagesTable, TIImagesTable, TSImagesTable } from "../drizzle/schema";

const ImagesService = async (): Promise<TSImagesTable[] | null> => {
    const Images  = await db.query.ImagesTable.findMany({
        where: (fields , {eq}) => eq(ImagesTable.id, fields.id),
        columns: {
            id: true,   
            image_url: true,
            property_id: true,
            uploaded_at: true,
        },
        with:{
              property: true,

        }})

        return Images
}

const getImagesService = async (id: number): Promise<TSImagesTable | undefined> => {
    return await db.query.ImagesTable.findFirst({
        where: eq(ImagesTable.id, id),
        
    })
}

const createImagesService = async (Images: TIImagesTable) => {
    await db.insert(ImagesTable).values(Images)
    return "Images created successfully";
}

const updateImagesService = async (id: number, Images: TIImagesTable) => {
    await db.update(ImagesTable).set(Images).where(eq(ImagesTable.id, id))
    return "Images updated successfully";
}

const deleteImagesService = async (id: number) => {
    await db.delete(ImagesTable).where(eq(ImagesTable.id, id))
    return "Images deleted successfully";
}

export{
    ImagesService,
    getImagesService,
    createImagesService,
    updateImagesService,
    deleteImagesService
}