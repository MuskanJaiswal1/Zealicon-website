import { useState, useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { LOGIN_STARTED, LOGOUT } from "../../actions/actionType/actionType";

import { toast } from "react-toastify";
import Hamburger from "hamburger-react";
import { Link } from "react-router-dom";

import styles from "./Header.module.css";
import Button from "../Button/Button";
import UserAvatar from "../UserAvatar/UserAvatar";

const Header = ({ setIsModalOpen, windowSize }) => {
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  }, [isOpen]);

  const dispatch = useDispatch();
  const { zealId, isAuthenticated, userData } = useSelector(
    (state) => state.allReducers
  );

  function PhoneNavMenu() {
    return (
      <>
        <div
          aria-hidden
          className={styles.hideOverlay}
          onClick={() => setOpen(false)}
        ></div>
        <nav className={styles.mobileNav} onClick={() => setOpen(false)}>
          <ul className={styles.mobileNavLinksCont}>
            <li>
              {userData.name && <UserAvatar user={userData} />} 
            </li>
            <li>
              <a href="/#about">About</a>
            </li>
            <li>
              <Link to="/events">Events</Link>
            </li>
            <li>
              <Link to="/team">Team</Link>
            </li>
            <li>
              <a
                href="https://play.google.com/store/apps/details?id=com.zealicon_2024"
                target="blank"
              >
                Download App
              </a>
            </li>
          </ul>
          {isAuthenticated ? (
            <Button
              type={"small"}
              text={"LOGOUT"}
              action={() => {
                toast.success("Logout Successfully!");
                setOpen(false);
                return dispatch({ type: LOGOUT });
              }}
            />
          ) : (
            <Button
              type={"small"}
              text={"LOGIN"}
              action={() => {
                dispatch({ type: LOGIN_STARTED, payload: { step: 1 } });
                return setIsModalOpen(true);
              }}
            />
          )}
        </nav>
      </>
    );
  }

  return (
    <header className={`${styles.header}`}>
      <Link to="/">
        <img
          className="logo"
          src="./images/zealicon_logo.svg"
          alt="zealicon logo"
        ></img>
      </Link>
      {windowSize?.width && windowSize.width > 900 ? (
        /* Desktop Navigation -------------------------------------------- */
        <>
          <nav className={styles.desktopNav}>
            <ul>
              <li>
                <a href="/#about">About</a>
              </li>
              <li>
                <Link to="/events">Events</Link>
              </li>
              <li>
                <Link to="/team">Team</Link>
              </li>
              <li>
                <a
                  href="https://play.google.com/store/apps/details?id=com.zealicon_2024"
                  target="blank"
                >
                  Download App
                </a>
              </li>
              {isAuthenticated ? (
                <Button
                  type={"small"}
                  text={"LOGOUT"}
                  action={() => {
                    toast.success("Logout Successfully!");
                    return dispatch({ type: LOGOUT });
                  }}
                  size={3}
                />
              ) : (
                <Button
                  type={"small"}
                  text={"LOGIN"}
                  action={() => setIsModalOpen(true)}
                  size={3}
                />
              )}
            </ul>
          </nav>
          {userData.name && <UserAvatar user={userData} />}
        </>
      ) : (
        <>
          {/* Phone Navigation -------------------------------------------- */}

          <div className={styles.hamIcon}>
            <Hamburger rounded toggled={isOpen} toggle={setOpen} />
          </div>
          {isOpen && <PhoneNavMenu />}
        </>
      )}
    </header>
  );
};

export default Header;
