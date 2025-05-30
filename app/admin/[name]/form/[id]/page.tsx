import DeleteDocument from "@/components/delete-document"
import DocumentForm from "@/components/document-form"
import { ArrowRightIcon } from "lucide-react"
import { Document } from "mongodb"
import Link from "next/link"

type Context = {
  params: Promise<{ name: string, id: string }>
  searchParams: Promise<{ name: string }>
}

export default async function Page(ctx: Context) {
  const { name, id } = await ctx.params

  const res1 = await fetch(process.env.URL + "/api/collections/first?name=" + name)
  const info: { document: Document } = await res1.json()

  const res = await fetch(process.env.URL + "/api/" + name + "/" + id)
  const data: { document: Document } = await res.json()

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between">
        <div className="flex gap-4 h-10  items-center">
          <Link href={"/admin/" + info.document.name}
            className="bg-white border rounded flex items-center justify-center h-10 w-10">
            <ArrowRightIcon />
          </Link>
          <div className="text-2xl">{info.document.title}</div>
        </div>
        <DeleteDocument info={info.document} data={data.document} />
      </div>
      <div className="bg-white border rounded p-4 mt-4">
        <DocumentForm info={info.document} data={data.document} />
      </div>
    </div>
  )
}
