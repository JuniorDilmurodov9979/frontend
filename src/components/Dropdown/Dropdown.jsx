import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import axios from "axios";

export function Dropdown() {
  const [open, setOpen] = useState(false);
  const { getMe, token, setGetMe } = useContext(UserContext);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/user/me", {
          headers: { Authorization: token },
        });
        setGetMe(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    getData();
  }, [token, setGetMe]);
  // console.log(getMe);

  let menuRef = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
        // console.log(menuRef.current);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  function DropdownItem(props) {
    return (
      <li className="dropdownItem">
        <Link to={props.to}> {props.text} </Link>
      </li>
    );
  }
  const LogOut = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <>
      <div className="menu-container" ref={menuRef}>
        <div
          className="menu-trigger"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <img src={`http://localhost:5000/${getMe.image}`}></img>
        </div>

        <div className={`dropdown-menu ${open ? "active z-[99]" : "inactive"}`}>
          <ul className="">
            <DropdownItem to="/profile/profile" img="" text={"Profile"} />
            <DropdownItem to="/addauthor" img="" text={"Add author"} />
            <DropdownItem to="/addbook" img="" text={"Add book"} />
            <li className="flex">
              <button
                onClick={LogOut}
                className="text-base font-medium text-[#C9AC8C] text-center "
              >
                Log out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
