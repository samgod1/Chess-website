import { useNavigate } from "react-router";
import { useContext, useEffect, useRef } from "react";
import { UserContext } from "../../../../contexts";

import "./Dropdown.css";

const Dropdown = ({ isDropdownOpen, setIsDropdownOpen }) => {
    const navigate = useNavigate();

    const dropdownRef = useRef(null);

    const { user, setUser, loading } = useContext(UserContext);

    function logout() {
        setIsDropdownOpen(false);
        localStorage.removeItem("token");
        setUser(null);
        navigate("/");
    }

    function handleClick(e) {
        if (!dropdownRef.current.contains(e.target)) {
            setIsDropdownOpen(false);
        }
    }

    useEffect(() => {
        if (isDropdownOpen) {
            document.addEventListener("click", handleClick);
        }

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, [isDropdownOpen]);

    if (loading) {
        return <div>Loading</div>;
    }

    return (
        <div className="hidden">
            <div className="dropdown" ref={dropdownRef}>
                <div className="wrapper">
                    <div className="username">{user?.username}</div>
                    <div className="line"></div>
                    <div className="buttons-container">
                        <button onClick={logout}>
                            <img
                                src="/images/logout.svg"
                                alt="logout-icon"
                                width={20}
                                height={20}
                            />
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dropdown;
