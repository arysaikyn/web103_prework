import { createClient } from "@supabase/supabase-js";

const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdic3F3eXBvYnNmdmNud2Vrb3l2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAzNjQ2NzgsImV4cCI6MjAzNTk0MDY3OH0.3knxp1wFIJ0-fb-W70a3jj9OzDc_VJHns7hrWvC6hG8";
const URL = "https://gbsqwypobsfvcnwekoyv.supabase.co";

export const supabase = createClient(URL, API_KEY);


