
import ResponsiveNav from "@/components/Landing/NavBar/ResponsiveNav";
import { ReactNode } from "react";
import Footer from "@/components/Landing/Footer/Footer";

export default function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <ResponsiveNav />
      {children}
      <Footer/>
    </div>
  );
}
