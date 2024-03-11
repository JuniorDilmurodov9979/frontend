import { Link, NavLink } from "react-router-dom";
import { Dropdown } from "../Dropdown/Dropdown";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";

export function Header() {
  const { me, token } = useContext(UserContext);

  // console.log(token);
  // console.log(me);
  return (
    <header className="py-8">
      <div className="container__header">
        <nav>
          <ul className="flex items-center justify-end gap-[42px]  ">
            <li className="mr-auto">
              <Link to="/" className="header__bg"></Link>
            </li>
            <li className="">
              <NavLink className="text-base" to="/">
                <p className="main__active">Bosh sahifa</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                className="text-base"
                to="/books"
                // activeclassname="active-header"
              >
                <p className="main__active">Kitoblar</p>
              </NavLink>
            </li>
            <li>
              {token ? (
                <Dropdown />
              ) : (
                <Link to="login" className="text-yellow-100  ">
                  Sign in
                </Link>
              )}

              {/* <Dropdown /> */}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
