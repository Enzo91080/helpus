"use client";

import { useEffect, useState } from "react";
import { TableColumnsType, Input, message, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import TableComponent from "./table";
import { IDonation } from "@/types/IDonnation";
import { getDonations } from "@/lib/actions/donations.actions";
import { useModal } from "@/app/store/modalStore";
import DonationForm from "../form/DonationForm";
import React from "react";
import { MessageCircle } from "lucide-react";
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const { Search } = Input;

const DonationTable: React.FC<{ refresh: boolean }> = ({ refresh }) => {
  const [data, setData] = useState<IDonation[]>([]);
  const [filteredData, setFilteredData] = useState<IDonation[]>([]);
  const [searchText, setSearchText] = useState("");
  const { openModal, closeModal } = useModal();
  const [refreshTable, setRefreshTable] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const donations = await getDonations();
        const formattedData = donations.map((d: IDonation) => ({
          ...d,
          key: d._id.toString(),
        }));
        setData(formattedData);
        setFilteredData(formattedData);
      } catch (error) {
        message.error("Erreur lors du chargement des donations");
      }
    };
    fetchData();
  }, [refresh]);

  // Fonction de recherche améliorée pour chercher dans les données liées
  const handleSearch = (value: string) => {
    setSearchText(value);
    const filtered = data.filter((donation) =>
      Object.values(donation).some((field) =>
        field?.toString().toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  const handleSelection = (selectedRowKeys: React.Key[], selectedRows: IDonation[]) => {
    console.log("Selected donations:", selectedRows);
  };

  const handleRowClick = (record: IDonation) => {
    message.info(`Détails de la donation: ${record.amount}€`);
  };

  const editDonationModal = async (id: string) => {
    try {
      const response = await fetch(`/api/donations/${id}`);
      if (!response.ok) throw new Error('Failed to fetch donation');
      const donation = await response.json();

      const editFormRef = React.createRef<DonationFormRef>();

      openModal({
        title: "Modifier une donation",
        component: <DonationForm 
          ref={editFormRef}
          donationId={id} 
          initialValues={{
            amount: donation.amount,
            type: donation.type,
            date: donation.date,
            notes: donation.notes,
            beneficiaryId: donation.beneficiaryId._id,
            donorId: donation.donorId._id
          }}
        />,
        okText: "Modifier",
        cancelText: "Annuler",
        onOk: async () => {
          if (editFormRef.current) {
            try {
              await editFormRef.current.validateFields();
              await editFormRef.current.submit();
              setFilteredData(prevData => {
                const updatedData = [...prevData];
                const index = updatedData.findIndex(item => item._id.toString() === id);
                if (index !== -1) {
                  // Refresh the data
                  const fetchData = async () => {
                    const donations = await getDonations();
                    const formattedData = donations.map((d: IDonation) => ({
                      ...d,
                      key: d._id.toString(),
                    }));
                    setData(formattedData);
                    setFilteredData(formattedData);
                  };
                  fetchData();
                }
                return updatedData;
              });
              closeModal();
            } catch (error) {
              console.error("Validation failed:", error);
              return false;
            }
          }
        },
      });
    } catch (error) {
      message.error("Erreur lors du chargement des données de la donation");
      console.error(error);
    }
  };

  const handleChatClick = async (donation: IDonation) => {
    try {
      // Check if user is either donor, beneficiary, or admin
      const userId = session?.user?._id;
      const isDonor = donation.donorId._id === userId;
      const isBeneficiary = donation.beneficiaryId._id === userId;
      const isAdmin = session?.user?.role === 'admin';

      if (!isDonor && !isBeneficiary && !isAdmin) {
        message.error("Vous n'avez pas accès à cette conversation");
        return;
      }

      // Navigate to chat page with donation ID
      router.push(`/chat/${donation._id}`);
    } catch (error) {
      message.error("Erreur lors de l'accès au chat");
      console.error(error);
    }
  };

  const columns: TableColumnsType<IDonation & { key: string }> = [
    {
      title: "Montant",
      dataIndex: "amount",
      render: (amount: number) => `${amount}€`,
    },
    {
      title: "Bénéficiaire",
      dataIndex: "beneficiaryId",
      render: (beneficiary: { name: string }) => beneficiary?.name || "Non assigné",
    },
    {
      title: "Donateur",
      dataIndex: "donorId",
      render: (donor: { name: string }) => donor?.name || "Non assigné",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Notes",
      dataIndex: "notes",
    },
    {
      title: "Date et heure",
      dataIndex: "date",
      render: (date: string) => new Date(date).toLocaleString("fr-FR"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex gap-2">
          <Button
            icon={<EditOutlined />}
            onClick={() => editDonationModal(record._id.toString())}
          />
          <Button
            icon={<MessageCircle className="h-4 w-4" />}
            onClick={() => handleChatClick(record)}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-center">
        <Search
          placeholder="Rechercher une donation..."
          allowClear
          size="middle"
          onChange={(e) => handleSearch(e.target.value)}
          style={{ maxWidth: 600, marginBottom: 5 }}
        />
      </div>
      <TableComponent 
        columns={columns} 
        data={filteredData}
      />
    </div>
  );
};

export default DonationTable;
