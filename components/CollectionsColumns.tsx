"use client"
 
import { ColumnDef } from "@tanstack/react-table"
import Delete from "./custom ui/Delete"
import Link from "next/link"
import { Edit } from "lucide-react"
 

 

export const columns: ColumnDef<CollectionType>[] = [
    {
      accessorKey: "title",
      header: "Title",
      cell:({row}) => <Link href={`/collections/${row.original.id}`} className="hover:text-blue-700">{row.original.title}</Link>
    },
    {
      id: "actions",
        cell: ({row}) => <Delete id={row.original.id} />
    },
    {
      accessorKey: "edit",
      header: "Edit",
      cell:({row}) => <Link href={`/blog/${row.original.id}`} className="hover:text-blue-700"><Edit /></Link>
    },
   
  ]