import { useUser } from "@/context"
import { Database, LogOut, MessageCircleMore, PieChart, UserRound } from "lucide-react"
import { Link } from "react-router-dom"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export const Navbar = () => {
  const { user, logoutUser } = useUser()
  return (
    <nav className="w-full h-16 flex justify-around items-center shadow shadow-black mb-5">
      <div className="flex items-center gap-1">
        <UserRound size={32} />
        <div>
          <h1 className="text-sm">{user?.name}</h1>
          <h2 className="text-sm">{user?.email}</h2>
        </div>
      </div>

      <ul className="flex items-center gap-3">
        <li>
          <Link className="flex items-center gap-1" to={'/'}>
            <MessageCircleMore className="mb-1" size={19} /> <span>Menssagens</span>
          </Link>
        </li>
        <li>
          <DropdownMenu>
            <DropdownMenuTrigger className='flex items-center gap-1'>
              <PieChart className="mb-1" size={19} /> <span>Gráficos</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link className='hover:font-bold w-full' to={'/charts/sectors'}>
                  Setores
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link className='hover:font-bold w-full' to={'/charts/questions'}>
                  Duvidas
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </li>
        <li>
          <Link className="flex items-center gap-1" to={'/database'}>
            <Database className="mb-1" size={19} /> <span>Banco de Dados</span>
          </Link>
        </li>
        <li>
          <button className="flex items-center gap-1" onClick={logoutUser}>
            <LogOut className="mb-1" size={19} /> <span>Deslogar</span>
          </button>
        </li>
      </ul>
    </nav>
  )
}
