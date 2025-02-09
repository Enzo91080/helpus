"use client";
import { Button, Flex, Form, Input, message, Select } from "antd";
import React, { forwardRef, useImperativeHandle, useEffect } from "react";
import { DonationType, DonorStatus } from "@/types/IDonor";
import { useModal } from "@/app/store/modalStore";

// ✅ Définition du type pour la ref du formulaire
export interface DonorFormRef {
  submit: () => void;
  validateFields: () => Promise<void>;
}

interface DonorFormProps {
  donorId?: string; // ID du bénéficiaire pour la mise à jour
  initialValues?: {
    name: string;
    email: string;
    phone: string;
    donationType: DonationType | string;
    status: DonorStatus;
  };
}


const DonorForm = forwardRef<DonorFormRef, DonorFormProps>(({ donorId, initialValues }, ref) => {
  const [form] = Form.useForm();
  const { openModal, closeModal } = useModal();

  if(!donorId) {
    console.warn("no donor id", donorId)
    //donorId = '67a8d529f139633cc60bcec2'
    console.log(donorId)
  }

   

  // ✅ Remplir le formulaire en mode mise à jour
  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  useImperativeHandle(ref, () => ({
    submit: () => form.submit(),
    validateFields: () => form.validateFields(),
  }));

  const handleCancel = () => {
    closeModal();
    form.resetFields();
  };

  const handleSubmit = async (values: any) => {
    console.log(values)
    try {
      const response = await fetch(`/api/donors${donorId ? `/${donorId}` : ""}`, {
        method: donorId ? "PUT" : "POST", // 🔥 PUT si mise à jour, POST sinon
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(`Erreur lors de la ${donorId ? "mise à jour" : "création"}`);
      }

      message.success(`Donateur ${donorId ? "mis à jour" : "ajouté"} avec succès`);
      form.resetFields();
    } catch (error) {
      message.error(`Échec de la ${donorId ? "mise à jour" : "création"}`);
      console.error(error);
    }
  };

   const handleModify = (values: any) => {
        console.log("on finish", donorId);

        if(!donorId) {
          message.error('Il manque un id à cet utilisateur en base')
        }

        fetch(`/api/donors/${donorId}`, {
        method: 'PUT', 
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
        })
        .then((response) => response.json())
        .then((data) => {
        console.log('Success:', data);
        })
        .catch((error) => {
    console.error('Error:', error);
    });
    };

  return (
    <Form form={form} onFinish={donorId ? handleModify : handleSubmit} layout="vertical">
      <Form.Item label="Nom" name="name" rules={[{ required: true, message: "Nom requis" }]}>
        <Input placeholder="Entrez le nom" />
      </Form.Item>

      <Form.Item label="Email" name="email" rules={[{ type: "email", required: true, message: "Email requis" }]}>
        <Input placeholder="Entrez l’email" />
      </Form.Item>

      <Form.Item label="Téléphone" name="phone" rules={[{ required: false, message: "Numero de téléphone optionnel" }]}>
        <Input placeholder="Renseignez un numéro de téléphone " />
      </Form.Item>

      <Form.Item label="Type de donation" name="donationType" rules={[{ required: true, message: "Type de donation requis" }]}>
        <Select placeholder="Statut" style={{ width: "100%" }}>
          <Select.Option value="financial">Financier</Select.Option>
          <Select.Option value="material">Matérielle</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="Statut" name="status" rules={[{ required: true, message: "Statut requis" }]}>
        <Select placeholder="Statut" style={{ width: "100%" }}>
          <Select.Option value="active">Actif</Select.Option>
          <Select.Option value="inactive">Inactif</Select.Option>
        </Select>
      </Form.Item>

      <Flex gap={"middle"}  justify="flex-end">
           <Form.Item>
            <Button type="default"   onClick={handleCancel} >
                Annuler
            </Button>
          </Form.Item>   
          <Button type="primary" htmlType="submit">
              Modifier
          </Button>
      </Flex>
    </Form>
  );
});

// ✅ Ajout du displayName pour éviter l'erreur ESLint
DonorForm.displayName = "DonorForm";

export default DonorForm;
