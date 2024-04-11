import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { IData, serviceCommands, serviceCommandsProps } from '@/services/commands'
import { CornerDownRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface HandleProps {
  id: string | null
}

interface HandleState {
  data: IData[] | null
  folders: React.ReactNode
}

export default class Handle extends React.Component<HandleProps, HandleState> {
  constructor(props: HandleProps) {
    super(props)
    this.state = {
      data: null,
      folders: []
    }
  }

  async componentDidMount() {
    await this.fetchComponent()
  }

  async fetchComponent() {
    const commandsServices = new serviceCommands()
    const response: serviceCommandsProps = await commandsServices.show(this.props.id)

    if (response.data) {
      this.setState({
        data: response.data
      }, () => this.setFoldersInPage())
    }
  }

  setFoldersInPage() {
    const { data } = this.state
    if (data) {
      let folders = data
        .map((items) => {
          return (
            <div>
              {items.name}
            </div>
          )
        })

      this.setState({
        folders: folders
      })
    }
  }

  render(): React.ReactNode {
    return (
      <div>
        {this.state.folders}
      </div>
    )
  }
}

// export default function Handle({ id }: HandleProps) {
//   const pathname = usePathname()
//   const [data, setData] = React.useState<IData[] | undefined>([])

//   const commandsServices = new serviceCommands()
//   const response: serviceCommandsProps = commandsServices.show(id)

//   return (
//     <div className='h-full flex gap-4'>
//       <Card className='w-2/4 border-0'>
//         <CardHeader>
//           <CardTitle>Pastas</CardTitle>
//           <CardDescription>
//             <Link href={'/dashboard/databases?question=commands_folders'}>
//               Informações sobre
//             </Link>
//           </CardDescription>
//         </CardHeader>
//         <CardContent className='h-4/5 overflow-y-auto'>
//           <section>
//             <div className='cursor-pointer font-bold'>
//               <Link href={`${pathname}?action=handle&id=${id}&select=`}>
//                 {response.data?.map((item) => (
//                   <h1>{item.id}</h1>
//                 ))}
//               </Link>
//             </div>
//             <ul>
//               <li className='flex items-start gap-1'>
//                 <CornerDownRight size={18} />
//                 <Link href={``} className='cursor-pointer'>
//                   Name
//                 </Link>
//               </li>
//             </ul>
//           </section>
//         </CardContent>
//       </Card>
//       <Card className='w-full'>
//         <CardContent className='w-full h-full flex justify-center items-center'>
//           <h1>FORMS</h1>
//         </CardContent>
//       </Card>
//     </div>
//   )
// setData(response.data)

// React.useEffect(() => {
//   fetchCommands()
// }, [])

// console.log(data)

// return (
//   <div className='h-full flex gap-4'>
//     <Card className='w-2/4 border-0'>
//       <CardHeader>
//         <CardTitle>Pastas</CardTitle>
//         <CardDescription>
//           <Link href={'/dashboard/databases?question=commands_folders'}>
//             Informações sobre
//           </Link>
//         </CardDescription>
//       </CardHeader>
//       <CardContent className='h-4/5 overflow-y-auto'>
//           <section>
//             <div className='cursor-pointer font-bold'>
//               <Link href={`${pathname}?action=handle&id=${id}&select=`}>

//               </Link>
//             </div>
//             <ul>
//               <li className='flex items-start gap-1'>
//                 <CornerDownRight size={18} />
//                 <Link href={``} className='cursor-pointer'>
//                   Name
//                 </Link>
//               </li>
//             </ul>
//           </section>
//       </CardContent>
//     </Card>
//     <Card className='w-full'>
//       <CardContent className='w-full h-full flex justify-center items-center'>
//         <h1>FORMS</h1>
//       </CardContent>
//     </Card>
//   </div>
// )
// }
