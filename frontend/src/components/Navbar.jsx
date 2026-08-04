import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-8 py-4 flex justify-between items-center">

      <h1 className="text-2xl font-bold text-green-400">
        ComicVerse AI
      </h1>

      <div className="flex gap-8">

        <Link to="/">Home</Link>

        <Link to="/explore">Explore</Link>

        <Link to="/profile">Profile</Link>

      </div>

      <Link
        to="/login"
        className="bg-green-500 px-4 py-2 rounded-lg"
      >
        Login
      </Link>

    </nav>
  );
}

export default Navbar;