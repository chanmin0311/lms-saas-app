"use server";

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "@/lib/supabase";

/**
 * Creates a new companion entry belonging to the authenticated user.
 */
export const createCompanion = async (formData: CreateCompanion) => {
    // Get the current Clerk authenticated user
    const { userId: author } = await auth();

    const supabase = createSupabaseClient();

    /**
     * Insert the companion into the database
     * Spread incoming form data and attach the author (Clerk user ID)
     * `.select() returns the inserted row(s) after insert
     */
    const { data, error } = await supabase
        .from("companions")
        .insert({ ...formData, author })
        .select();

    // Handle DB-level errors or missing response
    if (error || !data)
        throw new Error(error?.message || "Failed to create a companion");

    // Return the inserted row (usually only one)
    return data[0];
};

/**
 * Fetches a paginated list of conpanions with optional filters (subject/topic)
 */
export const getAllCompanions = async ({
    limit = 10,
    page = 1,
    subject,
    topic,
}: GetAllCompanions) => {
    const supabase = createSupabaseClient();

    // Start building a query for companions table
    let query = supabase.from("companions").select();

    /**
     * Apply search filters
     * - `ilike` is case-insensitive LIKE
     * - `or()` allows multiple OR conditions
     */
    if (subject || topic) {
        query = query
            .ilike("subject", `%${subject}%`)
            .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
    } else if (subject) {
        query = query.ilike("subject", `%${subject}%`);
    } else if (topic) {
        query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
    }

    /**
     * Pagination logic:
     *
     * - Supabase `.range(from, to)` is inclusive
     *   Example: range(0, 9) returns 10 items
     *
     * - Page number is converted to an index range:
     *     Page = 1 -> rows 0 to 9
     *     Page = 2 -> rows 10 to 19
     *
     *   From = (page - 1) * limit
     *   To   = page * limit - 1
     */

    const from = (page - 1) * limit;
    const to = page * limit - 1;

    query = query.range(from, to);

    // Excute query
    const { data: companions, error } = await query;

    // Throw if Supabase returns an error
    if (error) throw new Error(error.message);

    return companions;
};
