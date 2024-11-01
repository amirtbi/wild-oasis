import { createCabinType } from "../features/cabins/cabins.model";
import supabase, { supabaseUrl } from "./supabase"

export const getCabins = async () => {

    const { data, error } = await supabase
        .from('Cabins')
        .select('*');

    if (error) {
        console.error("cabins could not loaded");
        throw new Error("cabins could not loaded");

    }

    return data;
}

export const createEditCabin = async (newCabin: createCabinType, id?: number) => {
    let imagePath = "";
    let imageName = "";
    if (typeof newCabin.image === "object") {
        imageName = `${Math.floor(Math.random()) * 10}-${newCabin.image[0] ? newCabin.image[0].name : newCabin.image.name}`.replaceAll("/", "");
        imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
    } else {
        imagePath = newCabin.image
    }

    async function uploadImage(data: any) {
        if (typeof newCabin.image === "object") {

            const { error: uploadError } = await supabase
                .storage
                .from('cabin-images')
                .upload(imageName, newCabin.image[0] ? newCabin.image[0] : newCabin.image,
                )
            if (uploadError) {
                await supabase
                    .from('Cabins')
                    .delete()
                    .eq('id', data.id);
            }
        }
    }


    // Create 
    if (!id) {
        const { data, error } = await supabase.from("Cabins").insert([
            { ...newCabin, image: imagePath }
        ]).select().single();

        if (error) {
            throw new Error("Error happened during inserting cabin")
        }
        if (data) uploadImage(data);
        return data;
    }
    // Edit
    if (id) {
        const { data, error } = await supabase.from("Cabins")
            .update({ ...newCabin, image: imagePath })
            .eq('id', id).select().single();
        if (error) {
            throw new Error("Error happened during editing cabin")
        }
        if (data) uploadImage(data);
        return data
    }



}

export const deleteCabin = async (id: number) => {
    const data = await supabase
        .from('Cabins')
        .delete()
        .eq('id', id);

    if (data.error) {
        throw new Error("Something happened!")
    }
    return data;

}