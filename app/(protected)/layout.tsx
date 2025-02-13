import LayoutWrapper from "../layoutWrapper";
import GlobalModal from "@/components/ui/GlobalModal";
import {Toaster} from "@/components/ui/toaster";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LayoutWrapper>{children}</LayoutWrapper>
      <GlobalModal />
      <Toaster />
    </>
  );
}