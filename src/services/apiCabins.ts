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

export const createCabin = async (newCabin: createCabinType) => {
    let imagePath = "";
    let imageName = "";
    debugger
    if (typeof newCabin.image === "object") {
        imageName = `${Math.floor(Math.random()) * 10}-${newCabin.image.name}`.replaceAll("/", "");
        imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
    }
    const { data, error } = await supabase
        .from('Cabins')
        .insert([
            { ...newCabin, image: imagePath }
        ])
        .select();
    if (error) {
        throw new Error("Error happened during inserting cabin");
    }

    console.log("data", data)
    // upload file

    if (typeof newCabin.image === "object") {

        const { error: uploadError } = await supabase
            .storage
            .from('cabin-images')
            .upload(imageName, newCabin.image,
            )
        if (uploadError) {
            await supabase
                .from('Cabins')
                .delete()
                .eq('id', data[0].id);
        }
    }


    return data;

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