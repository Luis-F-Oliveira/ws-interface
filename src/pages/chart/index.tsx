import { Body } from "@/components"
import { useParams } from "react-router-dom"
import { Sectors } from "./sectors"
import { ComponentType } from "react"
import { Questions } from "./questions"

interface PageComponents {
  [key: string]: ComponentType<any>
}

const pages: PageComponents = {
  sectors: Sectors,
  questions: Questions
}

export const ChartsPage = () => {
  const { chart } = useParams()

  if (chart) {
    const Page = pages[chart]

    return (
      <Body>
        <div className='w-2/3 mx-auto'>
          <Page />
        </div>
      </Body>
    )
  }
}
