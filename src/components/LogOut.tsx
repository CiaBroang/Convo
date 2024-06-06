import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { CiLogout } from "react-icons/ci";

const LogOut: React.FC = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("user");
    setUser({ id: null });
    navigate("/");
  };

  if (user.id === null) return null;
  return (
    <>
      <CiLogout
        onClick={handleLogOut}
        style={{ margin: "10px", cursor: "pointer", fontSize: "24px" }}
      />
    </>
  );
};

export default LogOut;