import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://kdeqisrsxelioactjqmb.supabase.co";

export const supabaseKey = "sb_publishable_3btyagjAbHVkbVdKs8jHrQ_TZTCzjs5";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
