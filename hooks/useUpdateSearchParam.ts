"use client";

import { useEffect, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

/**
 * Custom hook: useUpdateSearchParam
 *
 * This hook updates a spesific URL query parameters (e.g., ?topic=value)
 * with optional debouncing. It is useful for search inputs, filters,
 * and any UI element where URL state should reflect user inout
 *
 * The gaol:
 * - Prevent unnecessary router updates (perfromnace optimization)
 * - Avoid lnfinite loops by comparing current vs new values
 * - Apply debouncing se URL updates only after user stops typing
 * */
export const useUpdateSearchParam = ({
    key = "topic", // The query parameter name to update (default: `topic`)
    value, // The new value to set in the URL when updated
    delay = 300, // Debouncing delay in milliseconds
}: {
    key?: string;
    value: string;
    delay?: number;
}) => {
    // Extract navigation utilities from Next.js App Router
    const pathname = usePathname(); // Current route path
    const router = useRouter(); // Used to update the URL programmatically
    const searchParams = useSearchParams(); // Reads current URL search parameters

    /**
     * updateQuery()
     *
     * Memoized function that:
     * 1. Comparses current URL value with the incoming `value`
     * 2. Updates the URL only if the value actually changed
     * 3. Uses rotuer.replace() to avoid pushing new history entries
     *
     * useCallback ensures this function is stable between renders,
     * preventing unnecessary re-runs inside useEffect
     */
    const updateQuery = useCallback(() => {
        const current = searchParams.get(key) || "";

        // If user typed the same value that already exists in URL -> do nothing
        if (value === current) return;

        // Clone current search params so we can modify them safely
        const params = new URLSearchParams(searchParams.toString());

        if (value) {
            // If there is non-empty value, update the query parameter
            params.set(key, value);
        } else {
            // If the value is empty, remove the parameter from the URL
            params.delete(key);
        }

        // update the URL without refreshing the page or adding history entries
        router.replace(`${pathname}?${params.toString()}`);
    }, [value, key, pathname, router, searchParams]);

    /**
     * Debouncing mechanism:
     *
     * - Ensures that updateQuery() only runs after the user stops typing for `delay` ms
     * - Prevents excessive router updates and unnenessary server component re-renders
     *
     * useEffect triggers whenever `value` or `updateQuery` changes
     */
    useEffect(() => {
        // Set a timer to call updateQuery only after delay
        const handler = setTimeout(() => {
            updateQuery();
        }, delay);

        // Cleanupp functions:
        // Clears the timeout if the user types agian before delay completes
        return () => clearTimeout(handler);
    }, [value, updateQuery, delay]);
};
