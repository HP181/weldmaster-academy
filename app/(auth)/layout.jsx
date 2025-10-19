import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata = {
  title: "Meet Platform",
  description: "A Welding Institution Platform",
  icons:{
    icon: '/icons/logo.svg'
  }
};



const AuthLayout = ({ children }) => {
  return <div className="flex justify-center items-center relative min-h-screen mt-14">{children}</div>;
};

export default AuthLayout;
