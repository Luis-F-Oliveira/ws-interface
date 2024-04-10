import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CornerDownRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface HandleProps {
  id: string | null
}

interface HandleState {

}

export default class Handle extends React.Component<HandleProps, HandleState> {
  constructor(props: HandleProps) {
    super(props)
    this.state = {}
  }

  render() {
    let folders: React.ReactNode
    folders = (
      <section>
        <div className='cursor-pointer'>
          <span>Name</span>
        </div>
        <ul>
          <li className='flex items-start gap-1'>
            <CornerDownRight size={18} />
            <span className='cursor-pointer'>Index</span>
          </li>
        </ul>
      </section>
    )

    return (
      <div className='h-full flex gap-4'>
        <Card className='w-2/4 '>
          <CardHeader>
            <CardTitle>Pastas</CardTitle>
            <CardDescription>
              <Link href={'/dashboard/databases'}>
                Informações sobre
              </Link>
            </CardDescription>
          </CardHeader>
          <CardContent className='h-4/5 overflow-y-auto'>
            {folders}
          </CardContent>
        </Card>
        <Card className='w-full'>
          <CardContent className='w-full h-full flex justify-center items-center'>
            <h1>FORMS</h1>
          </CardContent>
        </Card>
      </div >
    )
  }
}

// export default function Handle({ id }: HandleProps) {
//   return (
//     <div className='h-full flex gap-4'>
//       <Card className='w-2/4 '>
//         <CardHeader>
//           <CardTitle>Pastas</CardTitle>
//           <CardDescription>
//             <Link href={'/dashboard/databases'}>
//               Informações sobre
//             </Link>
//           </CardDescription>
//         </CardHeader>
//         <CardContent className='h-4/5 overflow-y-auto'>
//           <section>
//             <div className='flex items-center gap-2 cursor-pointer'>
//               <FolderOpen size={20} />
//               <span>Name</span>
//             </div>
//             <ul>
//               <li className='flex items-start gap-1'>
//                 <CornerDownRight size={18} />
//                 Name
//               </li>
//               <li className='flex items-start gap-1'>
//                 <CornerDownRight size={18} />
//                 <section>
//                   <div className='flex items-center gap-2 cursor-pointer'>
//                     <FolderOpen size={20} />
//                     <span>Name</span>
//                   </div>
//                   <ul>
//                     <li className='flex items-center gap-1'>
//                       <CornerDownRight size={18} />
//                       Name
//                     </li>
//                   </ul>
//                 </section>
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
// }
