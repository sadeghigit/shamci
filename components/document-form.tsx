"use client"

import { Document } from "mongodb";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type Props = {
    info: Document,
    data?: Document
}

export default function DocumentForm({ info, data }: Props) {
    const router = useRouter()
    const form = useForm({ defaultValues: data || {} })

    const onSubmit = form.handleSubmit(async (body) => {
        const { _id, ...value } = body
        const url = data ? "/api/" + info.name + "/" + data._id : "/api/" + info.name
        const method = data ? "PUT" : "POST"
        const res = await fetch(url, { method, body: JSON.stringify(value) })
        const result = await res.json()
        if (!data) form.reset({})
        if (data) router.back()
    })

    return (
        <form onSubmit={onSubmit}>

            {((info.fields || []) as any[]).map((field, i) => (
                <div key={i}>

                    {field.type == "text" &&
                        <div className="mb-4">
                            <label className="block p-1" htmlFor={field._id}>{field.label}</label>
                            <input {...form.register(field.name)} id={field._id} className="border py-2 px-3 rounded w-full" />
                        </div>}

                    {field.type == "object-list" && <div>
                        <div className="flex justify-between items-center">
                            <div className="">{field.label}</div>
                            <button type="button" onClick={() => {
                                const values = form.getValues(field.name)
                                if (values) form.setValue(field.name, [...values, {}])
                                if (!values) form.setValue(field.name, [{}])
                            }}>Add</button>
                        </div>
                        {((form.watch(field.name) || []) as any[]).map((value, i3) => (
                            <div key={i3} className="bg-slate-50 border rounded p-4 mb-4">
                                {((field.fields || []) as any[]).map((field2, i2) => (
                                    <div key={i2}>
                                        {field2.type == "text" &&
                                            <div className="mb-4">
                                                <label className="block p-1" htmlFor={field.name + "." + i3 + '.' + field2.name}>{field2.label}</label>
                                                <input {...form.register(field.name + "." + i3 + '.' + field2.name)} id={field.name + "." + i3 + '.' + field2.name} className="border py-2 px-3 rounded w-full" />
                                            </div>}
                                    </div>))}
                            </div>
                        ))}

                    </div>}
                </div>
            ))}

            <div className="flex justify-end">
                <button className="flex h-10 items-center px-4 bg-blue-500 hover:bg-blue-600 rounded text-white ">
                    ثبت اطلاعات
                </button>
            </div>

        </form>
    );
}
