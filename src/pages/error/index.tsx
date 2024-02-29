import { Link } from "react-router-dom"

export const Error = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center text-white">
      <h1 className="text-5xl">ooops</h1>
      <h2 className="text-2xl">Algo deu errado!</h2>
      <h3 className="text-7xl mt-10">404</h3>
      <Link to={'/'}>Voltar para a principal</Link>
    </div>
  )
}
