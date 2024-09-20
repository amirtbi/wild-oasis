import supabase from "./supabase"

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