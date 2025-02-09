"use client";
import { LogoutOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, MenuProps, Space, Typography } from "antd";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const { Text } = Typography;

const getInitials = (name: string) => {
  if (!name) return "";
  const names = name.split(" ");
  let initials = names[0].substring(0, 1).toUpperCase();
  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
};

// Fonction pour générer une couleur basée sur le nom de l'utilisateur
const getAvatarColor = (name: string) => {
  if (!name) return "#ccc"; // Couleur par défaut
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return `hsl(${hash % 360}, 70%, 50%)`; // Générer une couleur HSL unique
};

const UserBar: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const avatarColor = session?.user?.name ? getAvatarColor(session.user.name) : "#ccc"; // Fixer une couleur déterministe

  const signout = () => {
    signOut({
      redirect: true,
      callbackUrl: `${window.location.origin}/signin`,
    });
  };

  const items: MenuProps["items"] = [
    {
      key: "profile",
      onClick: () => router.push("/profile"),
      label: (
        <Space>
          <Avatar style={{ backgroundColor: avatarColor }} size="small">
            {getInitials(session?.user?.name!)}
          </Avatar>
          <Text strong>{session?.user?.name}</Text>
        </Space>
      ),
    },
    { type: "divider" },
    {
      key: "email",
      label: <Text type="secondary">{session?.user?.email}</Text>,
      disabled: true,
    },
    {
      key: "logout",
      label: (
        <div onClick={signout} style={{ display: "flex", alignItems: "center" }}>
          <LogoutOutlined />
          <span style={{ marginLeft: "8px" }}>Déconnexion</span>
        </div>
      ),
    },
  ];

  return (
    <div className="flex space-x-2">
      <Dropdown menu={{ items }} placement="bottomRight" trigger={['hover']}>
        {session?.user && (
          <Avatar
            style={{ backgroundColor: avatarColor }}
            size="large"
          >

            {session.user.firstName && session.user.lastName ?
              session.user.firstName[0] + session.user.lastName[0] :
              session.user.name[0] + session.user.name[1]}
          </Avatar>
        )}
      </Dropdown>
    </div>
  );
};

export default UserBar;
