import { UserRolesEnum } from "@/types/IUser";
import { DollarCircleFilled, DollarCircleOutlined, HeartOutlined, PieChartOutlined, TeamOutlined } from "@ant-design/icons";

export type SidebarLink = {
  id: string;
  label: string;
  route?: string;
  icon: JSX.Element;
  badge?: number;
  onClick?: () => void;
};

export type SidebarSection = {
  title: string;
  links: SidebarLink[];
};

export const getSidebarLinks = (role:UserRolesEnum): SidebarSection[] => {
  switch (role) {
    case UserRolesEnum.ADMIN:
      return [
        {
          title: "Administration",
          links: [
            { id: "dashboard", label: "Dashboard", route: "/dashboard", icon: <PieChartOutlined/> },
            { id: "beneficiaries", label: "Bénéficiaires", route: "/beneficiaries", icon: <TeamOutlined/> },
            { id: "donations", label: "Dons", route: "/donations", icon: <DollarCircleOutlined/> },
            { id: "donors", label: "Donnateurs", route: "/donors", icon: <HeartOutlined/> },
          ],
        },
      ];
      case UserRolesEnum.DONOR:
        return [
          {
            title: "Faire un don",
            links: [
              { id: "donations", label: "Dons", route: "/donations", icon: <DollarCircleFilled/> },
            ],
          }
          
        ];
      case UserRolesEnum.BENEFICIARY:
        return [

        ];
      case UserRolesEnum.USER:
        return [
        ];

    default:
      return [];
  }
};
