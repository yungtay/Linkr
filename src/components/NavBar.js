import { useState, useContext } from "react";
import Arrow from "../images/Vector.png";
import { Link } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../context/UserContext";
import ClickAwayListener from "react-click-away-listener";

export default function NavBar() {
    const menuOptions = [
        { route: "/my-posts", name: "My posts" },
        { route: "/my-likes", name: "My likes" },
        { route: "/", name: "Logout" },
    ];
    const [isOpened, setIsOpened] = useState(false);
    const { accountInformation } = useContext(UserContext);
    function Logout() {
        localStorage.removeItem("user");
        alert("clicou pra deslogar");
    }

    return (
        <>
            <Topbar isOpened={isOpened}>
                <Link to={"/timeline"} style={{ textDecoration: "none" }}>
                    <div className="title">linkr</div>
                </Link>
                <ClickAwayListener onClickAway={() => setIsOpened(false)}>
                    <div className="options">
                        <img
                            className="menu"
                            src={Arrow}
                            alt="Arrow to menu"
                            onClick={() => setIsOpened(!isOpened)}
                        />
                        <img
                            className="profile-picture"
                            src={accountInformation.user.avatar}
                            alt="Profile"
                            onClick={() => setIsOpened(!isOpened)}
                        />
                    </div>
                </ClickAwayListener>
            </Topbar>

            <OptionsMenu isOpened={isOpened}>
                {menuOptions.map((option, i) => {
                    return (
                        <div key={i}>
                            {option.name === "Logout" ? (
                                <Link
                                    to={option.route}
                                    style={{ textDecoration: "none" }}
                                >
                                    <li key={i} onClick={() => Logout()}>
                                        {option.name}
                                    </li>
                                </Link>
                            ) : (
                                <Link
                                    to={option.route}
                                    style={{ textDecoration: "none" }}
                                >
                                    <li key={i}>{option.name}</li>
                                </Link>
                            )}
                        </div>
                    );
                })}
            </OptionsMenu>
        </>
    );
}

const Topbar = styled.div`
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    height: 72px;
    background-color: #151515;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 28px;

    .title {
        font-family: "Passion One";
        font-size: 49px;
        font-weight: 400;
        color: #fff;
        letter-spacing: 0.05em;
        line-height: 54px;
    }
    .options {
        display: flex;
        align-items: center;
    }
    .menu {
        width: 18.37px;
        height: 12.37px;
        transform: ${(props) =>
            props.isOpened ? `rotate(180deg)` : `rotate(0deg)`};
        transition: transform 500ms;
    }
    .profile-picture {
        width: 53px;
        height: 53px;
        border-radius: 26.5px;
        margin-left: 18px;
    }
`;
const OptionsMenu = styled.ul`
    background-color: #171717;
    height: ${(props) => (props.isOpened ? "109px" : "0px")};
    width: ${(props) => (props.isOpened ? "150px" : "0px")};
    position: fixed;
    top: 72px;
    right: 0px;
    border-bottom-left-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    font-size: 17px;
    font-weight: 700;
    padding: 10px 0px;
    transition-timing-function: ease-in-out;
    transition: height 0.3s;

    li {
        display: ${(props) => (props.isOpened ? "block" : "none")};
        color: #fff;
    }
`;
