"use client";

import Navbar from "@/components/Navbar";
import Topbar from "@/components/Topbar";

import "./styles.scss";

type PageTemplateProps = {
  children: React.ReactNode;
  title?: string;
};

export default function PageTemplate({ children, title }: PageTemplateProps) {
  return (
    <div className="page-template">
      <Topbar />

      <div className="content-area">
        {title && <div className="titulo">{title}</div>}
        {children}
      </div>

      <Navbar />
    </div>
  );
}
