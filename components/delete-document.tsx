"use client"

import { TrashIcon } from "lucide-react";
import { Document } from "mongodb";
import { useRouter } from "next/navigation";

type Props = {
    info: Document,
    data: Document
}

export default function DeleteDocument({ info, data }: Props) {
    const router = useRouter()

    async function onClick() {
        const url = "/api/" + info.name + "/" + data._id
        const res = await fetch(url, { method: "DELETE" })
        const result = await res.json()
        router.back()
    }

    return (
        <button type="button" onClick={() => onClick()}
            className="flex h-10 w-10 items-center justify-center bg-red-500 hover:bg-red-600 rounded text-white ">
            <TrashIcon />
        </button>
    );
}
