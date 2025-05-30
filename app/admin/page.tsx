import { Document } from "mongodb"
import Link from "next/link"

export default async function Page() {
  const res = await fetch(process.env.URL + "/api/collections")
  const data: { count: number, documents: Document[] } = await res.json()

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.documents.map((document, i) => (
          <Link href={"/admin/" + document.name} key={i}
            className="bg-white border rounded p-4">
            {document.title}
          </Link>
        ))}
      </div>
    </div>
  )
}
