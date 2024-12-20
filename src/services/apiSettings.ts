import { ISettings, updateSettingType } from "../features/settings/settings.model";
import supabase from "./supabase";

export async function getSettings(): Promise<ISettings> {
    const { data, error } = await supabase
        .from('settings')
        .select('*').single();

    if (error) {
        throw new Error("Settings could not be loaded");

    }
    return data;
}

export async function updateSetting(newSettings: updateSettingType) {
    const { data, error } = await supabase
        .from('settings')
        .update(newSettings)
        .eq('id', 1)
        .single();

    if (error) {
        throw new Error("Update could not be workder correctly")
    }

    return data;
}