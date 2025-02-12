import { MenuOutlined } from "@ant-design/icons";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import React from "react";
import UserBar from "../layouts/UserBar";

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ setSidebarOpen }) => {
  // const user = useAppSelector(selectUser);

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow">
      {/* Bouton hamburger visible uniquement en mobile */}
      <button onClick={() => setSidebarOpen(true)} className="p-2 md:hidden">
        <MenuOutlined className="text-2xl" />
      </button>

      {/* Titre de l'application centré sur les écrans larges */}
      {/* <h1 className="text-lg text-jb-primary font-semibold flex-1 text-center md:text-left">
        Bienvenue {user?.firstName} {user?.lastName} !
      </h1> */}
      <div className="flex items-center justify-end w-full max-w-screen-xl px-4 mx-auto gap-4">
        <Link 
          href="/chat" 
          className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md text-gray-700"
        >
          <span>Chat</span>
          <MessageCircle className="h-5 w-5" />
        </Link>
        <UserBar />
      </div>
    </header>
  );
};

export default Header;
