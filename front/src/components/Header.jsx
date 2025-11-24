import { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const { user } = useContext(AuthContext);

  const displayName = user?.displayName || user?.email || "Usuario";
  const avatarSrc = user?.photoURL || null; // 👈 clave
  const fallbackLetter =
    displayName && typeof displayName === "string"
      ? displayName.charAt(0).toUpperCase()
      : "U";

  return (
    <header className="flex flex-wrap justify-between items-center w-full bg-primary/80 p-4 rounded-t-md gap-4">
      {/* Logo + nombre */}
      <a href="/" className="flex items-center gap-4">
        <img
          src="/logo.png"
          alt="Eternal Game"
          className="w-[50px] h-[50px]"
        />
        <span className="font-primary text-4xl text-game-flame-oscuro">
          Eternal Game
        </span>
      </a>


      {/* Usuario logueado */}
      {user && (
        <div className="flex items-center gap-3 bg-secondary/90 px-2 py-1 rounded-lg shadow-md">
          <Avatar
            src={avatarSrc || undefined}
            alt={displayName}
            sx={{
              width: 30,
              height: 30,
              bgcolor: "#CC0000",
              fontFamily: "Poppins, sans-serif",
              fontWeight: 600,
            }}
          >
            {!avatarSrc && fallbackLetter}
          </Avatar>

          <div className="flex flex-col">
            <span className="text-[8px] font-secondary text-primary/60">
              Usuario
            </span>
            <span className="text-xs font-secondary text-primary">
              {user.email}
            </span>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
