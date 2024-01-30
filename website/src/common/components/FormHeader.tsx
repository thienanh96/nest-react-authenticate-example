import React from "react"
import { ReactSVG } from "react-svg"
import Logo from "../../../public/logo.svg"

interface FormHeaderProps {
  headline: string
  secondaryHeadline: string
}

export default function FormHeader({
  headline,
  secondaryHeadline,
}: FormHeaderProps) {
  return (
    <>
      <div className="flex justify-center">
        <ReactSVG src={Logo} />
        <div className="mt-[24px]">
          <p className="text-left text-rose-500">Automate</p>
          <p className="text-left text-rose-500">Construction</p>
          <p className="text-left text-rose-500">Monitoring</p>
        </div>
      </div>

      <p className="text-base">{headline}</p>
      <p className="text-rose-500 font-semibold text-xl">{secondaryHeadline}</p>
    </>
  )
}
