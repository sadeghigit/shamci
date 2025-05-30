import { ArrowRight, ArrowRightIcon, PlusIcon } from "lucide-react"
import { Document } from "mongodb"
import Link from "next/link"

type Context = {
  params: Promise<{ name: string }>
}

export default async function Page(ctx: Context) {
  const { name } = await ctx.params

  const res1 = await fetch(process.env.URL + "/api/collections/first?name=" + name)
  const info: { document: Document } = await res1.json()

  const res2 = await fetch(process.env.URL + "/api/" + name)
  const data: { count: number, documents: Document[] } = await res2.json()

  const fields: any[] = info.document.fields || []

  return (
    <div className="container mx-auto p-4">

      <div className="flex justify-between">
        <div className="flex gap-4 h-10  items-center">
          <Link href={"/admin"}
            className="bg-white border rounded flex items-center justify-center h-10 w-10">
            <ArrowRightIcon />
          </Link>
          <div className="text-2xl">{info.document.title}</div>
        </div>
        <Link href={"/admin/" + name + "/form"}
          className="bg-white border rounded flex items-center justify-center h-10 w-10">
          <PlusIcon />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {data.documents.map((document, i) => (
          <Link href={"/admin/" + name + "/form/" + document._id} key={i}
            className="bg-white border rounded p-4">
            <div className="flex justify-between gap-4">
              <div>شناسه</div>
              <div className="truncate min-w-0">{document._id}</div>
            </div>
            {fields.filter(fields => fields.type == "text").map((field, i) => (
              <div className="flex justify-between gap-4">
                <div>{field.label}</div>
                <div className="truncate min-w-0" dir="ltr" >{document[field.name]}</div>
              </div>
            ))}
          </Link>
        ))}
      </div>
    </div>
  )
}
