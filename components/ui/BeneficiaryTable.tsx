"use client";

import { useEffect, useState } from "react";
import { TableColumnsType, Input, message, Button } from "antd";
import { IBeneficiary } from "@/types/IBeneficiary";
import { getBeneficiaries } from "@/lib/actions/beneficiaries.actions";
import TableComponent from "./table";
import { useModal } from "@/app/store/modalStore";
import BeneficiaryForm from "../form/BeneficiaryForm";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const { Search } = Input;

const BeneficiaryTable: React.FC<{ refresh: boolean }> = ({ refresh }) => {
  const [data, setData] = useState<IBeneficiary[]>([]);
  const [filteredData, setFilteredData] = useState<IBeneficiary[]>([]);
  const [searchText, setSearchText] = useState("");
  const {openModal} = useModal();
  const [refreshTable, setRefreshTable] = useState(false);
  

  const editBeneficiaryModal = (id: string) => {
    openModal({
      title: "Modifier un bénéficiaire",
      component: <BeneficiaryForm />,
      okText: "Modifier",
      cancelText: "Annuler",
      onOk: async () => {
        setRefreshTable((prev) => !prev);
      },
    });
  };

  const deleteBeneficiary = async (_id: string) => {
    try {
      const response = await fetch(`/api/beneficiaries/${_id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error("Erreur lors de la suppression");
      }
  
      message.success("Bénéficiaire supprimé avec succès");
  
      // 🔥 Mise à jour immédiate de la liste après suppression
      setData((prevData) => prevData.filter((b) => b._id.toString() !== _id));
      setFilteredData((prevData) => prevData.filter((b) => b._id.toString() !== _id));
  
    } catch (error) {
      message.error("Échec de la suppression");
      console.error(error);
    }
  };
  

  const columns: TableColumnsType<IBeneficiary> = [
    {
      title: "Nom",
      dataIndex: "name",
      render: (name: string, record: IBeneficiary) => (
        <Button type="link" onClick={() => editBeneficiaryModal(record._id.toString())}>
          {name}
        </Button>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Besoins",
      dataIndex: "needs",
    },
    {
      title: "Statut",
      dataIndex: "status",
    },
    {
      title: "Actions",
      render: (_, record: IBeneficiary) => (
        <div className="flex space-x-3">
          <Button
            type="primary"
            onClick={() => {
              editBeneficiaryModal(record._id.toString()); 
            }}
            icon={<EditOutlined />}
          />
          <Button
            danger
            onClick={() => {
              if (window.confirm("Voulez-vous vraiment supprimer ce bénéficiaire ?")) {
                deleteBeneficiary(record._id.toString());
              }
            }}
            icon={<DeleteOutlined />}
          />
        </div>
        
      ),
    }
  ];

  const fetchData = async () => {
    try {
      const beneficiaries = await getBeneficiaries();
      const formattedData = beneficiaries.map((b: IBeneficiary) => ({
        ...b,
        key: b._id, // Ajoute `key` requis par Ant Design
      }));
      setData(formattedData);
      setFilteredData(formattedData);
    } catch (error) {
      message.error("Erreur lors du chargement des bénéficiaires");
    }
  };

  useEffect(() => {
    fetchData(); // Charger les données initialement
  }, []);

  useEffect(() => {
    fetchData(); // 🔥 Rafraîchir lorsque `refresh` change
  }, [refresh]);

  const handleSearch = (value: string) => {
    setSearchText(value);
    const filtered = data.filter((beneficiary) =>
      Object.values(beneficiary).some((field) =>
        field?.toString().toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  return (
    <div>
      <div className="flex justify-center">
        <Search
          placeholder="Rechercher un bénéficiaire..."
          allowClear
          size="middle"
          onChange={(e) => handleSearch(e.target.value)}
          style={{ maxWidth: 600, marginBottom: 5 }}
        />
      </div>
      <TableComponent columns={columns} data={filteredData} />
    </div>
  );
};

export default BeneficiaryTable;
