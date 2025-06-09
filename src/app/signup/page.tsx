"use client";

import { useEffect, useState } from "react";
import "./page.scss";

interface Player {
  nombre: string;
  apellido: string;
  nacimiento: string; // usamos string para evitar problemas con inputs numéricos
}

interface SignupData {
  teamName: string;
  selectedCategory: (typeof categories)[number] | "";
  isLocal: boolean;
  whatsapp: string;
  players: Player[];
  privacyAccepted: boolean;
}

const categories = ["Senior", "Femenino", "Mini", "Peques"] as const;

const normalizeSpaces = (str: string): string => {
  return str
    .replace(/\s+/g, " ") // Elimina espacios extra
    .trim() // Quita espacios al inicio y final
    .split(" ") // Separa por palabras
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitaliza cada palabra
    .join(" "); // Une las palabras nuevamente
};

export default function Signup() {
  const [selectedCategory, setSelectedCategory] = useState<
    "Senior" | "Femenino" | "Mini" | "Peques" | ""
  >("");
  const [isLocal, setIsLocal] = useState(false);

  const [teamName, setTeamName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  const [players, setPlayers] = useState([
    { nombre: "", apellido: "", nacimiento: "" },
    { nombre: "", apellido: "", nacimiento: "" },
    { nombre: "", apellido: "", nacimiento: "" },
    { nombre: "", apellido: "", nacimiento: "" }, // Opcional
  ]);

  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [sendingForm, setSendingForm] = useState(false);
  const [submitTried, setSubmitTried] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("signupData");

    if (saved) {
      setSubmitted(true);
    }
  }, []);

  const handleCategoryClick = (cat: (typeof categories)[number]) => {
    setSelectedCategory(cat);
    setErrors((prev) => ({ ...prev, category: "" }));
  };

  const handlePlayerChange = (
    index: number,
    field: keyof Player,
    value: string
  ) => {
    const updatedPlayers = [...players];
    updatedPlayers[index] = { ...updatedPlayers[index], [field]: value };
    setPlayers(updatedPlayers);
  };

  const validateTeamName = (name: string) => {
    const regex = /^[a-zA-Z0-9\-+ ]*$/;
    return regex.test(name);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSubmitTried(true);

    if (sendingForm) return;

    const newErrors: typeof errors = {};

    // Validación nombre equipo (sin cambios)
    if (!teamName.trim()) {
      newErrors.teamName = "El nombre del equipo es obligatorio";
    } else if (!validateTeamName(teamName)) {
      newErrors.teamName =
        "El nombre solo puede contener letras, números, guiones (-), signos más (+) y espacios";
    } else if (teamName.length < 3) {
      newErrors.teamName = "El nombre es demasiado corto";
    } else if (teamName.length > 30) {
      newErrors.teamName = "El nombre es demasiado largo";
    }

    if (!selectedCategory) newErrors.category = "Selecciona una categoría";

    // Determinar si el jugador 4 está "activo"
    const isJugador4Activo =
      players[3].nombre.trim() !== "" ||
      players[3].apellido.trim() !== "" ||
      players[3].nacimiento.trim() !== "";

    // Validar los jugadores obligatorios: Jugadores 1,2,3 siempre
    for (let i = 0; i < 3; i++) {
      const { nombre, apellido, nacimiento } = players[i];
      if (!nombre.trim() || !apellido.trim() || !nacimiento.trim()) {
        newErrors[`jugador${i + 1}`] = `Completa los datos del Jugador ${
          i + 1
        }`;
      }
    }

    // Si jugador 4 está activo, validar sus campos también
    if (isJugador4Activo) {
      const { nombre, apellido, nacimiento } = players[3];
      if (!nombre.trim() || !apellido.trim() || !nacimiento.trim()) {
        newErrors[`jugador4`] = `Completa los datos del Jugador 4`;
      }
    }

    const currentYear = new Date().getFullYear();

    // Validaciones específicas para año de nacimiento para jugadores obligatorios
    for (let i = 0; i < 3; i++) {
      const { nombre, apellido, nacimiento } = players[i];
      if (!nombre.trim() || !apellido.trim() || !nacimiento.trim()) {
        // Ya capturado arriba
        continue;
      } else if (
        !/^\d{4}$/.test(nacimiento) ||
        +nacimiento < 1950 ||
        +nacimiento > currentYear
      ) {
        newErrors[
          `jugador${i + 1}`
        ] = `Año de nacimiento no válido para Jugador ${i + 1}`;
      }
    }

    // Validar jugador 4 si activo, para año nacimiento
    if (isJugador4Activo) {
      const nacimientoStr = players[3].nacimiento.trim();
      if (
        !/^\d{4}$/.test(nacimientoStr) ||
        +nacimientoStr < 1950 ||
        +nacimientoStr > currentYear
      ) {
        newErrors[`jugador4`] = `Año de nacimiento no válido para Jugador 4`;
      }
    }

    // Validaciones para categoría Peques y Mini

    if (selectedCategory === "Peques") {
      // Validar para jugadores 1,2,3 + 4 si activo
      const limite = isJugador4Activo ? 4 : 3;
      for (let i = 0; i < limite; i++) {
        const nacimientoStr = players[i].nacimiento.trim();
        const nacimientoNum = /^\d{4}$/.test(nacimientoStr)
          ? parseInt(nacimientoStr, 10)
          : null;

        if (nacimientoNum === null) {
          newErrors[
            `jugador${i + 1}`
          ] = `Año de nacimiento no válido para Jugador ${i + 1}`;
        } else if (nacimientoNum < 2013) {
          newErrors[`jugador${i + 1}`] = `Jugador ${
            i + 1
          } debe haber nacido en 2013 o después para la categoría Peques.`;
        }
      }
    } else if (selectedCategory === "Mini") {
      // Validar para jugadores 1,2,3 + 4 si activo
      const limite = isJugador4Activo ? 4 : 3;
      for (let i = 0; i < limite; i++) {
        const nacimientoStr = players[i].nacimiento.trim();
        const nacimientoNum = /^\d{4}$/.test(nacimientoStr)
          ? parseInt(nacimientoStr, 10)
          : null;

        if (nacimientoNum === null) {
          newErrors[
            `jugador${i + 1}`
          ] = `Año de nacimiento no válido para Jugador ${i + 1}`;
        } else if (nacimientoNum < 2009 || nacimientoNum > 2012) {
          newErrors[`jugador${i + 1}`] = `Jugador ${
            i + 1
          } debe haber nacido entre 2009 y 2012 para la categoría Mini.`;
        }
      }
    }

    if (!whatsapp.trim()) newErrors.whatsapp = "El Whatsapp es obligatorio";
    else if (!/^\d{9}$/.test(whatsapp.replace(/\D/g, "")))
      newErrors.whatsapp = "Número de Whatsapp no válido";

    if (!privacyAccepted)
      newErrors.privacy = "Debes aceptar la política de privacidad";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setSubmitError("");

    // En el envío incluimos solo los jugadores activos (los primeros 3 siempre, y el 4 solo si activo)
    const jugadoresTexto = players
      .filter((p, idx) => {
        if (idx < 3) return true; // primeros 3 siempre
        // jugador 4 solo si está activo
        if (idx === 3) {
          return (
            p.nombre.trim() !== "" ||
            p.apellido.trim() !== "" ||
            p.nacimiento.trim() !== ""
          );
        }
        return false;
      })
      .map(
        (p) =>
          `${normalizeSpaces(p.nombre)} ${normalizeSpaces(
            p.apellido
          )} ${normalizeSpaces(p.nacimiento)}`
      )
      .join("\n");

    try {
      setSendingForm(true);

      const res = await fetch("/api/equipos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: normalizeSpaces(teamName),
          categoria: selectedCategory,
          whatsapp,
          local: isLocal,
          jugadores: jugadoresTexto,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        setSendingForm(false);

        const data: SignupData = {
          teamName,
          selectedCategory,
          isLocal,
          whatsapp,
          players,
          privacyAccepted,
        };
        localStorage.setItem("signupData", JSON.stringify(data));
      } else {
        const errorData = await res.json();
        setSubmitError(
          errorData.error || "Error desconocido al enviar el formulario"
        );
        setSendingForm(false);
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setSubmitError("Error de conexión. Intenta nuevamente.");
      setSendingForm(false);
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
          gap: "2rem",
        }}
      >
        <h2 className="titulo" style={{ fontSize: "2rem" }}>
          ¡Has completado el primer paso!
        </h2>

        {/* ADVERTENCIA DE INSCRIPCIÓN INCOMPLETA */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            backgroundColor: "#fff3cd",
            border: "1px solid #ffeeba",
            borderRadius: "0.75rem",
            padding: "1rem 1.5rem",
            maxWidth: "600px",
            width: "100%",
            color: "#856404",
          }}
        >
          <p style={{ margin: 0, fontWeight: 600 }}>
            La inscripción de {teamName} aún <u>no está completada</u>.
            Necesitas realizar el pago y enviar el justificante por Whatsapp a
            uno de los organizadores.
          </p>
        </div>

        {/* INSTRUCCIONES */}
        <div style={{ fontSize: "1.1rem", maxWidth: "600px" }}>
          <ul style={{ listStyle: "none", padding: 0, margin: "1rem 0" }}>
            <li>
              <strong>Dani:</strong> 609 46 80 17
            </li>
            <li>
              <strong>Aitor:</strong> 619 33 44 18
            </li>
          </ul>
        </div>

        {/* OPCIONES DE PAGO */}
        <div
          className="payment-options"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            maxWidth: "600px",
            width: "100%",
          }}
        >
          {/* Bizum Option */}
          <div
            className="payment-card"
            style={{
              border: "1px solid #ddd",
              borderRadius: "1rem",
              padding: "1.5rem",
              backgroundColor: "#f9f9f9",
              textAlign: "left",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-smartphone"
              >
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                <line x1="12" y1="18" x2="12.01" y2="18" />
              </svg>
              <h3 style={{ fontSize: "1.2rem", margin: 0 }}>Opción 1: Bizum</h3>
            </div>
            <p style={{ margin: 0 }}>
              Realiza un Bizum a uno de los números de teléfono indicados
              arriba.
            </p>
          </div>

          {/* Transfer Option */}
          <div
            className="payment-card"
            style={{
              border: "1px solid #ddd",
              borderRadius: "1rem",
              padding: "1.5rem",
              backgroundColor: "#f9f9f9",
              textAlign: "left",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-credit-card"
              >
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                <line x1="1" y1="10" x2="23" y2="10" />
              </svg>
              <h3 style={{ fontSize: "1.2rem", margin: 0 }}>
                Opción 2: Transferencia
              </h3>
            </div>
            <p style={{ margin: 0 }}>
              <strong>IBAN:</strong> ES18 1583 0001 1290 9345 5264
            </p>
          </div>
        </div>

        {/* Icono de check final */}
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
        <div className="titulo">Inscribe a tu equipo</div>
        <form onSubmit={handleSubmit} noValidate>
          <label>
            <p>Nombre del equipo</p>
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
            <p>Categoría</p>
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

          <label className="players-label">
            <div className="players-container">
              {players.map((player, index) => {
                console.log(player);

                return (
                  <div key={index} className="player-group">
                    <h4>
                      {index === 0
                        ? "Capitán del equipo"
                        : `Jugador ${index + 1}${
                            index === 3 ? " (opcional)" : ""
                          }`}
                    </h4>
                    <div className="input-group">
                      <input
                        type="text"
                        placeholder="Nombre"
                        value={player.nombre}
                        onChange={(e) =>
                          handlePlayerChange(index, "nombre", e.target.value)
                        }
                      />
                      <input
                        type="text"
                        placeholder="Primer apellido"
                        value={player.apellido}
                        onChange={(e) =>
                          handlePlayerChange(index, "apellido", e.target.value)
                        }
                      />
                      <input
                        type="text" // <-- usa texto, no "number"
                        inputMode="numeric"
                        placeholder="Año de nacimiento"
                        pattern="\d*"
                        value={player.nacimiento}
                        onChange={(e) =>
                          handlePlayerChange(
                            index,
                            "nacimiento",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    {errors[`jugador${index + 1}`] && (
                      <p className="error">{errors[`jugador${index + 1}`]}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </label>

          <label className="toggle-label">
            <p>Equipo local</p>
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
            <p>Whatsapp de contacto</p>
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

          <label className="privacy-label">
            <div className="privacy-checkbox">
              <input
                type="checkbox"
                id="privacy"
                checked={privacyAccepted}
                onChange={() => setPrivacyAccepted(!privacyAccepted)}
              />
              <span>
                Acepto la{" "}
                <a href="/privacy" target="_blank" rel="noopener noreferrer">
                  política de privacidad
                </a>
              </span>
            </div>
            {errors.privacy && <p className="error">{errors.privacy}</p>}
          </label>

          <div>
            {Object.keys(errors).length > 0 && submitTried && (
              <p className="error submit-error">
                Solicitud no enviada, hay algún campo incorrecto o incompleto.
              </p>
            )}

            <button type="submit" className="submit-btn">
              {sendingForm ? "Enviando..." : "Enviar inscripción"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
