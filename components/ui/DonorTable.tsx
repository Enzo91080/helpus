"use client";

import { useEffect, useState } from "react";
import { TableColumnsType, Input, message, Button } from "antd";
import { IDonor } from "@/types/IDonor";
import TableComponent from "./table";
import { getDonors } from "@/lib/actions/donors.actions";
import { useModal } from "@/app/store/modalStore";
import DonorForm from "../form/DonorForm";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const { Search } = Input;

interface IDonorWithKey extends IDonor {
  key: React.Key 
}

const DonorTable: React.FC<{ refresh: boolean }> = ({ refresh }) => {
  const [data, setData] = useState<IDonor[]>([]);
  const [filteredData, setFilteredData] = useState<IDonor[]>([]);
  const [searchText, setSearchText] = useState("");
  const {openModal} = useModal();
  const [refreshTable, setRefreshTable] = useState(false);
  

  const editDonorModal = (id: string) => {
    openModal({
      title: "Modifier un Donateur",
      component: <DonorForm />,
      okText: "Modifier",
      cancelText: "Annuler",
      onOk: async () => {
        setRefreshTable((prev) => !prev);
      },
    });
  };

  const deleteDonor = async (_id: string) => {
    try {
      const response = await fetch(`/api/donors/${_id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error("Erreur lors de la suppression du donateur");
      }
  
      message.success("Donateur supprimé avec succès");
  
      // 🔥 Mise à jour immédiate de la liste après suppression
      setData((prevData) => prevData.filter((b) => b._id.toString() !== _id));
      setFilteredData((prevData) => prevData.filter((b) => b._id.toString() !== _id));
  
    } catch (error) {
      message.error("Échec de la suppression");
      console.error(error);
    }
  };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const donors = await getDonors();
        const formattedData = donors.map((b: IDonor) => ({
          ...b,
          key: b._id, // Ajoute `key` requis par Ant Design
        }));
        setData(formattedData);
        setFilteredData(formattedData); // Initialise `filteredData` avec toutes les données
      } catch (error) {
        message.error("Erreur lors du chargement des donateurs");
      }
    };
    fetchData();
  }, []);

  // Fonction de recherche
  const handleSearch = (value: string) => {
    setSearchText(value);
    const filtered = data.filter((donor) =>
      Object.values(donor).some((field) =>
        field?.toString().toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };


  const columns: TableColumnsType<IDonor> = [
    {
      title: "Nom",
      dataIndex: "name",
      render: (name: string, record: IDonor) => (
        <Button type="link" onClick={() => editDonorModal(record._id.toString())}>
          {name}
        </Button>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Téléphone",
      dataIndex: "phone",
    },
    {
      title: "Type de don",
      dataIndex: "donationType",
    },
    {
      title: "Statut",
      dataIndex: "status",
    },
    {
      title: "Actions",
      render: (_, record: IDonor) => (
        <div className="flex space-x-3">
          <Button
            type="primary"
            onClick={() => {
              editDonorModal(record._id.toString()); 
            }}
            icon={<EditOutlined />}
          />
          <Button
            danger
            onClick={() => {
              if (window.confirm("Voulez-vous vraiment supprimer ce donateur ?")) {
                deleteDonor(record._id.toString());
              }
            }}
            icon={<DeleteOutlined />}
          />
        </div>
        
      ),
    }
  ];

  return (
    <div>
      {/* Barre de recherche */}
      <div className="flex justify-center">
        <Search
          placeholder="Rechercher un donateur..."
          allowClear
          size="middle"
          onChange={(e) => handleSearch(e.target.value)}
          style={{ maxWidth: 600, marginBottom: 5 }}
        />
      </div>
      <TableComponent<IDonor>
        columns={columns}
        data={filteredData}
      />
    </div>
  );
};

export default DonorTable;
