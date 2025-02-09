"use client";

import { create } from "zustand";
import { ReactNode } from "react";

// Interface pour la gestion des modales
interface ModalState {
  isOpen: boolean;
  component: ReactNode | null;
  title?: string;
  okText?: string;
  cancelText?: string;
  onOk?: () => void;
  onCancel?: () => void;
  width?: number;
  openModal: (options: Omit<ModalState, "isOpen" | "openModal" | "closeModal">) => void;
  closeModal: () => void;
}

// Création du store global avec Zustand
export const useModal = create<ModalState>((set) => ({
  isOpen: false,
  component: null,
  title: "Modal",
  okText: "Confirmer",
  cancelText: "Annuler",
  onOk: () => set({ isOpen: false }),
  onCancel: () => set({ isOpen: false }),
  width: 600,
  openModal: (options) => set({ ...options, isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
