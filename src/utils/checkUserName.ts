import { supabase } from "./supabase";

// traer el name del cliente de la tabla users en supabase recibiendo como para parámetro de búsqueda el teléfono del cliente.
export const checkUserName = async (phoneNumber: string): Promise<string | null> => {
    console.log("Checking user name for phone number:", phoneNumber);
    try {
        const { data, error } = await supabase
        .from("users")
        .select("name")
        .eq("phone", phoneNumber)
        .single();
    
        if (error) {
            console.error("Error fetching user name:", error);
            return null;
        }
    
        return data?.name || null;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}
