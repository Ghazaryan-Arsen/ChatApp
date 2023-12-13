import { UserAuth } from "../context/AuthContext";

const Navbar = () => {
  const { currentUser, logout } = UserAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="navbar fixed z-10 bg-neutral text-neutral-content">
      <div className="containerWrap flex justify-between">
        <a className="btn btn-ghost text-xl">React JS Chat App</a>
        {currentUser ? <button onClick={handleLogout}>Logout</button> : ""}
      </div>
    </div>
  );
};

export default Navbar;
