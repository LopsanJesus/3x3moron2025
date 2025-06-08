"use client";

import { useState } from "react";
import "./page.scss";

const categories = ["Senior", "Femenino", "Mini", "Peques"] as const;

export default function Signup() {
  const [selectedCategory, setSelectedCategory] = useState<
    "Senior" | "Femenino" | "Mini" | "Peques" | ""
  >("");
  const [isLocal, setIsLocal] = useState(false);

  const [teamName, setTeamName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleCategoryClick = (cat: (typeof categories)[number]) => {
    setSelectedCategory(cat);
    setErrors((prev) => ({ ...prev, category: "" }));
  };

  const validateTeamName = (name: string) => {
    // Solo letras, números, guiones y +, sin espacios al inicio o final
    const regex = /^[a-zA-Z0-9\-+ ]*$/;
    return regex.test(name);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!teamName.trim()) {
      newErrors.teamName = "El nombre del equipo es obligatorio";
    } else if (!validateTeamName(teamName)) {
      newErrors.teamName =
        "El nombre solo puede contener letras, números, guiones (-), signos más (+) y espacios";
    }

    if (!selectedCategory) newErrors.category = "Selecciona una categoría";

    if (!whatsapp.trim()) newErrors.whatsapp = "El Whatsapp es obligatorio";
    else if (!/^\d{9}$/.test(whatsapp.replace(/\D/g, "")))
      newErrors.whatsapp = "Número de Whatsapp no válido";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // Reset error antes de submit
    setSubmitError("");

    try {
      const res = await fetch("/api/equipos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: teamName,
          categoria: selectedCategory,
          whatsapp,
          local: isLocal,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const errorData = await res.json();
        setSubmitError(
          errorData.error || "Error desconocido al enviar el formulario"
        );
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setSubmitError("Error de conexión. Intenta nuevamente.");
    }
  };

  if (submitted) {
    return (
      <section
        className="formulario"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
          padding: "2rem",
          textAlign: "center",
          gap: "1.5rem",
        }}
      >
        <h2 className="titulo" style={{ fontSize: "2.5rem" }}>
          ¡Gracias por inscribir a tu equipo!
        </h2>
        <p
          className="info-text"
          style={{ fontSize: "1.2rem", maxWidth: "400px" }}
        >
          La organización se pondrá en contacto contigo para completar el
          proceso de pago y asegurar la plaza.
        </p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-check-circle"
          viewBox="0 0 24 24"
        >
          <path d="M9 12l2 2 4-4" />
          <circle cx="12" cy="12" r="10" />
        </svg>
      </section>
    );
  }

  return (
    <div>
      <section id="formulario" className="formulario">
        <h2 className="titulo">Inscribe a tu equipo</h2>
        <form onSubmit={handleSubmit} noValidate>
          <label>
            Nombre del equipo
            <input
              type="text"
              maxLength={30}
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              required
              placeholder="Escribe el nombre de tu equipo"
            />
            {errors.teamName && <p className="error">{errors.teamName}</p>}
          </label>

          <label className="category-label">
            Categoría
            <div className="category-buttons">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`category-btn ${
                    selectedCategory === cat ? "selected" : ""
                  }`}
                  onClick={() => handleCategoryClick(cat)}
                  aria-pressed={selectedCategory === cat}
                >
                  {cat}
                </button>
              ))}
            </div>
            {errors.category && <p className="error">{errors.category}</p>}
          </label>

          <label className="toggle-label">
            Equipo local
            <div className="toggle-container">
              <input
                type="checkbox"
                id="local-toggle"
                checked={isLocal}
                onChange={() => setIsLocal(!isLocal)}
              />
              <span className="slider"></span>
            </div>
          </label>
          <p className="info-text">
            Un equipo se considera local cuando tiene al menos 2 jugadores de
            Morón.
          </p>

          <label>
            Whatsapp de contacto
            <input
              type="tel"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              required
              placeholder="Número de Whatsapp"
            />
            {errors.whatsapp && <p className="error">{errors.whatsapp}</p>}
          </label>

          {submitError && <p className="error submit-error">{submitError}</p>}

          <p className="info-warning">
            La organización no reservará plaza hasta que no realices el envío
            del justificante de pago.
          </p>

          <button type="submit" className="submit-btn">
            Enviar inscripción
          </button>
        </form>
      </section>
    </div>
  );
}
