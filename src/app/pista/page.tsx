"use client";

import Button from "@/components/Button";
import PageTemplate from "@/components/PageTemplate";
import { useRouter } from "next/navigation";

import "./page.scss";

export default function CourtPage() {
  const router = useRouter();

  const courts = [
    { id: 1, name: "Pista 1" },
    { id: 2, name: "Pista 2" },
    { id: 3, name: "Pista 3" },
    { id: 4, name: "Pista 4" },
    { id: 5, name: "Pista 5" },
    { id: 6, name: "Pista 6" },
    { id: 7, name: "Pista Peques 1" },
    { id: 8, name: "Pista Peques 2" },
  ];

  const goToCourt = (id: number) => {
    router.push(`/pista/${id}`);
  };

  return (
    <PageTemplate title="Pistas">
      <div className="court-page">
        <ul className="court-list">
          {courts.map((court) => (
            <li key={court.id}>
              <Button
                className="court-button"
                onClick={() => goToCourt(court.id)}
              >
                {court.name}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </PageTemplate>
  );
}
