"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { subjects } from "@/constants";
import { useState } from "react";
import { useUpdateSearchParam } from "@/hooks/useUpdateSearchParam";
import { useSearchParams } from "next/navigation";

const SubjectFilter = () => {
    const searchParams = useSearchParams();
    const currentSubject = searchParams.get("subject") || "";
    const [subject, setSubject] = useState(currentSubject);

    useUpdateSearchParam({
        key: "subject",
        value: subject,
        delay: 500,
    });

    return (
        <Select onValueChange={setSubject} value={subject}>
            <SelectTrigger>
                <SelectValue placeholder="Subject" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {subjects.map((subject) => (
                    <SelectItem
                        key={subject}
                        value={subject}
                        className="capitalize"
                    >
                        {subject}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default SubjectFilter;
