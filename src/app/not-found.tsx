import PageTemplate from "@/components/PageTemplate";

import Button from "@/components/Button";

import "./not-found.scss";

export default function NotFound() {
  return (
    <PageTemplate title="Hiciste un AIR BALL!">
      <div className="not-found-page">
        <span>Página no encontrada.</span>

        <Button href="/?noRedirect=true">Volver a inicio</Button>
      </div>
    </PageTemplate>
  );
}
