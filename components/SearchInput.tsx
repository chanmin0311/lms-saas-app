"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import searchIcon from "@/public/icons/search.svg";
import { useUpdateSearchParam } from "@/hooks/useUpdateSearchParam";

const SearchInput = () => {
    const searchParams = useSearchParams();
    const currentTopic = searchParams.get("topic") || "";
    const [searchQuery, setSearchQuery] = useState(currentTopic);

    useUpdateSearchParam({
        key: "topic",
        value: searchQuery,
        delay: 500,
    });

    return (
        <div className="relative border border-black rounded-lg items-center flex gap px-2 py-1 h-fit">
            <Image
                src={searchIcon}
                alt="search"
                width={15}
                height={15}
                className="mr-2"
            />
            <input
                placeholder="Search Companions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
    );
};

export default SearchInput;
