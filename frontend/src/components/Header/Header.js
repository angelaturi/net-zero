import "./Header.css";

const Header = () => (
  <nav className="d-flex">
    <h1>
      <a className="navbar-brand" href="#">
        Net Zero
      </a>
    </h1>
    <ul className="nav-links">
      <li className="nav-item">
        <a className="nav-link" href="#">
          Sign In
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">
          Sign Up
        </a>
      </li>
    </ul>
  </nav>
);

export default Header;
