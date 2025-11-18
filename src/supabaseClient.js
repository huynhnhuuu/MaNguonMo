import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://haluifewtugzyyvpeped.supabase.co";
const SUPABASE_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhhbHVpZmV3dHVnenl5dnBlcGVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0NDg3ODMsImV4cCI6MjA3OTAyNDc4M30.mjhFcvt57uAh2CyljH8xlcDOw506dvWb9CIrwm9V2qU";

export const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);
