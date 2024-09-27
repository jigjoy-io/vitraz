import React from "react"
import { usePage } from "../util/store"
import { PageFactory } from "../factories/PageFactory"

function Page() {

  const page = usePage()

  return <div className="grow flex flex-col justify-center items-center">{page != null && PageFactory.get(page)}</div>

}


export default Page