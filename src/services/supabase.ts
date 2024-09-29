import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://hcygrmqtrmizstmaeddc.supabase.co'
const supabaseKey = import.meta.env.VITE_API_KEY
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;