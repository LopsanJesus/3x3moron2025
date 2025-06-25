import PageTemplate from "@/components/PageTemplate";
import Image from "next/image";

import "./styles.scss";

export default function Loader() {
  return (
    <PageTemplate>
      <div className="loader-container">
        <Image
          src="/loader.gif"
          alt="Cargando..."
          width={160}
          height={160}
          priority
        />
      </div>
    </PageTemplate>
  );
}
