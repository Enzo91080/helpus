"use client";
import { Form, Input, InputNumber, message, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { forwardRef, useImperativeHandle } from "react";

// ✅ Définition du type pour la ref du formulaire
export interface DonationFormRef {
  submit: () => void;
  validateFields: () => Promise<void>;
}

// ✅ Ajoutez forwardRef et le bon typage
const DonationForm = forwardRef<DonationFormRef>((_, ref) => {
  const [form] = Form.useForm();

  useImperativeHandle(ref, () => ({
    submit: () => form.submit(),
    validateFields: () => form.validateFields(),
  }));

  const handleSubmit = async (values: any) => {
    try {
      const response = await fetch("/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la création");
      }

      message.success("Donation ajoutée avec succès");
      form.resetFields();
    } catch (error) {
      message.error("Échec de la création");
      console.error(error);
    }
  };

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <Form.Item label="Nom" name="amount" rules={[{ required: true, message: "Nom requis" }]}>
        <InputNumber addonAfter={"€"} placeholder="Entrez le montant" />
      </Form.Item>

      <Form.Item label="Email" name="type" rules={[{ required: true, message: "Email requis" }]}>
        <Input placeholder="Entrez le type de montant" />
      </Form.Item>

      <Form.Item label="Date" name="date" rules={[{ required: true, message: "Date requise" }]}>
        <Input placeholder="Date" />
      </Form.Item>

      <Form.Item label="Notes" name="notes" rules={[{ message: "Notes requises" }]}>
        <Input placeholder="Entrez des notes" />
      </Form.Item>

    </Form>
  );
});

// ✅ Ajout du displayName pour éviter l'erreur ESLint
DonationForm.displayName = "DonationForm";

export default DonationForm;
