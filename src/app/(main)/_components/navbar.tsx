'use client'

interface NavbarProps {
  isCollapsed:boolean
  onResetWidth:() => void
}

import { useParams } from "next/navigation"
import { useQuery } from "convex/react"
import { MenuIcon } from "lucide-react"
import { Menu } from "./menu"

import { api } from "../../../../convex/_generated/api"
import { Id } from "../../../../convex/_generated/dataModel"
import { Title } from "./title"
import { Banner } from "./banner"


export function Navbar({ isCollapsed,onResetWidth }:NavbarProps) {

  const params = useParams();
  const document = useQuery(api.documents.getById,{
    documentId : params.documentId as Id<'documents'>
  })

  if (document === undefined) {
    return  (
        <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center justify-between">
            <Title.Skeleton />
            <div className="flex items-center gap-x-2">
                <Menu.Skeleton />
            </div>
        </nav>
    )
  }

  if (document === null) {
    return null
  }

return (
    <>
    <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full
      flex gap-x-4 items-center">
        {isCollapsed && (
          <MenuIcon 
          role="button"
          className="w-6 h-6 text-muted-foreground"
          onClick={onResetWidth}
        />
        )}
        <div className="flex justify-between items-center w-full">
            <Title initialData={document}/>
            <div className="flex items-center gap-x-2">
              <Menu documentId={document._id}/>
            </div>
        </div>
      </nav>
      {document.isArchived && (
        <Banner documentId={document._id}/>
      )}
    </>
)
}