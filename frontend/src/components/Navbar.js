import { Link } from "react-router-dom";

export default function Navbar() {

  return (
    <nav className="bg-1 max-w-screen flex flex-wrap justify-between p-4 text-l md:text-xl lg:text-xl xl:text-xl font-medium">
      <div>
        <Link className="font-bold" to="/home">Food Shuffle</Link>
        <Link className="px-3" to="/home">Home</Link>        
        <Link className="" to="/newfood">Add Foods</Link>
      </div>
      <div className="">
        <Link to ="/logout">Logout</Link>
      </div>
    </nav>
  )
}
  