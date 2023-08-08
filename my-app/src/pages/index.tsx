import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LowerContent from "../components/LowerContent";
import MainContent from "../components/MainContent";
import NewestVoucher from "../components/NewestVoucher";
import { Body } from "@/components/SecondTitle";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <Header />
      <Body />
      <MainContent />
      <NewestVoucher />
      <LowerContent />
      <Footer />
    </div>
  );
}
