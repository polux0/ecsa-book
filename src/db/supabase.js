import { createClient } from '@supabase/supabase-js';
function initiateSupabase(){

const SUPABASE_URL = process.env.SUPABASE_URL; // e.g. https://xyzcompany.supabase.co
const SUPABASE_API_KEY = process.env.SUPABASE_API_KEY;

return createClient(SUPABASE_URL, SUPABASE_API_KEY);

}
export {initiateSupabase}