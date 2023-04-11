import { Link } from "react-router-dom";

import "./Navbar.css";

// Barra de links
const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>
        <Link to={`/posts`}>Blog</Link>
      </h2>
      <ul>
        <li>
          <Link to={`/posts`}>Home</Link>
        </li>
        <li>
          <Link to={`/users`}>Usuários</Link>
        </li>
        <li>
          <Link to={`/new`}>
            Novo Post
          </Link>
        </li>
        <li>
          <Link to={`/admin`}>Gerenciar</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
