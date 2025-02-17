import { Context } from "hono";
import { createImagesService, deleteImagesService, getImagesService, ImagesService, updateImagesService } from "./Image.service";


const ImagesstateController = async (c: Context) => {
    try {
        const address = await ImagesService();
        if (address == null || address.length == 0) {
            return c.text("address not found", 404)
        }        
        return c.json(address, 200)

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }

}

const getImagesController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const address = await getImagesService(id);
        if (address == null) {
            return c.text("Address not found", 404);
        }
        return c.json(address, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// create state
const createImagesController = async (c: Context) => {
    try {
        const address = await c.req.json();
        const newAddress = await createImagesService(address);

        if (!newAddress) return c.text("Address not created", 400);
        return c.json({ message: "Address created successfully", newAddress }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

//  update address
const updateImagesController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const address = await c.req.json();

        // search for Images by id
        const updatedAddress = await getImagesService(id);
        if (!updatedAddress === undefined) return c.text("Address not found", 404);

        // get data to update
        const res = await updateImagesService(id, address);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// delete address

const deleteImagesController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid id", 400);
    try {
        // search for address by id
        const address = await getImagesService(id);
        if (!address) return c.text("Address not found", 404);

        // delete address
        const res = await deleteImagesService(id);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};


export{
    ImagesstateController,
    getImagesController,
    createImagesController,
    updateImagesController,
    deleteImagesController
}