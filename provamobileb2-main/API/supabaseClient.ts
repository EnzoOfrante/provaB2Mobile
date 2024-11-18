import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "URL DA API";
const supabaseKey = "CHAVE API";

export const supabase = createClient(supabaseUrl, supabaseKey);
