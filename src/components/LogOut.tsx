import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const LogOut: React.FC = () => {
    const { user, setUser } = useUser();
    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.removeItem('user');
        setUser({ id: null });
        navigate('/');
    }
    
    if (user.id === null) return null;
    return (
      <>
        <button onClick={handleLogOut}>LOGGA UT!</button>
      </>
    );
  };

  export default LogOut;