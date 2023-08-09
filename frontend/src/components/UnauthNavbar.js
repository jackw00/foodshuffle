import { Link } from "react-router-dom";

export default function UnauthNavbar() {
  return (
    <nav className="bg-1 max-w-screen flex flex-wrap justify-between p-4 text-xl font-medium">
        <Link className="font-bold" to="/">Food Shuffle</Link>

    </nav>
  )
}
  