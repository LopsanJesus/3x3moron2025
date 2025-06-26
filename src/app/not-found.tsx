import PageTemplate from "@/components/PageTemplate";

import Button from "@/components/Button";

import "./page.scss";

export default function NotFound() {
  return (
    <PageTemplate title="Página no encontrada">
      <div className="not-found-page">
        <span>Lo sentimos</span>

        <Button href="/">Volver a inicio</Button>
      </div>
    </PageTemplate>
  );
}
