import { createClient } from "@supabase/supabase-js";
import { auth } from "@clerk/nextjs/server";

// Creates a Supabase client instance that automatically uses the
// Clerk user's JWT acccess token for authentication when making Supabase requests
export const createSupabaseClient = () => {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
        {
            // Configure how Supabase fetches an access token
            async accessToken() {
                // - Runs auth() to get the current Clerk session
                // - Calls getToken() to get the user's JWT
                // - Supplies that JWT to supabase client for authentication
                return (await auth()).getToken();
            },
        }
    );
};
