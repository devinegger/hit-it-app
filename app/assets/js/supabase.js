// supabase setup
// Create a single supabase client for interacting with your database
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://toksbbqhzdievgvnjlyg.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)