"use client";
import React, { useRef, useState } from "react";
import PageCanvas from "../../PageCanvas";
import { Button } from "antd";
import BeneficiaryTable from "@/components/ui/BeneficiaryTable";
import { useModal } from "@/app/store/modalStore";
import DonationForm, { DonationFormRef } from "@/components/form/DonationForm";
import DonationTable from "@/components/ui/DonationTable";

const Page = () => {
  const { openModal, closeModal } = useModal();
  const [refreshTable, setRefreshTable] = useState(false);
  
  // ✅ Correction du typage de la ref
  const formRef = useRef<DonationFormRef | null>(null);

  const addDonationModal = () => {
    openModal({
      title: "Ajouter une donation",
      component: <DonationForm ref={formRef} />, // ✅ Passe correctement la ref
      okText: "Ajouter",
      cancelText: "Annuler",
      onOk: async () => {
        if (formRef.current) {
          try {
            await formRef.current.validateFields(); // ✅ Valide les champs avant soumission
            await formRef.current.submit(); // ✅ Soumet le formulaire
            closeModal(); // ✅ Ferme la modale après soumission
            setRefreshTable((prev) => !prev); // ✅ Rafraîchit la table
          } catch (error) {
            console.error("Validation échouée", error);
          }
        }
      },
    });
  };

  return (
    <PageCanvas title="Donations">
      <PageCanvas.Actions>
        <Button type="primary" onClick={addDonationModal}>
          Ajouter une donation
        </Button>
      </PageCanvas.Actions>
      <PageCanvas.Content>
        <DonationTable refresh={refreshTable} />
      </PageCanvas.Content>
    </PageCanvas>
  );
};

export default Page;
