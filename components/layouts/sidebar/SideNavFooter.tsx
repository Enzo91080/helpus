import { PoweroffOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { useSession } from "next-auth/react";


const SideNavFooter = () => {
  const { data: session } = useSession()

  return (
    <div
      className={`flex border-t p-3  justify-between items-center"
        : "flex-col items-center"
        } overflow-hidden transition-all`}
    >
      {/* Badge visible lorsque la barre latérale est fermée */}
      <div className={`flex justify-between items-center overflow-hidden`}>
        
        <div className="leading-4">
          <h4 className="font-semibold">
            {session?.user?.firstName} {session?.user?.lastName}            
          </h4>
          <span className="text-xs text-gray-600">enzo.aime91@gmail.com</span>
        </div>
      
      </div>

      {/* Bouton de déconnexion, placé en dessous si la barre latérale est fermée */}
      <div className={`mt-0 : "2"}`}>
        <Tooltip title="Déconnexion" placement="right">
          <Button
            icon={<PoweroffOutlined />}
            shape="circle"
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default SideNavFooter;
