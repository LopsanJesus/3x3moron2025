"use client";

export default function PrivacyPolicyPage() {
  return (
    <main
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "2rem",
        lineHeight: "1.7",
        fontSize: "1.1rem",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
        Política de Privacidad
      </h1>

      <p>
        En cumplimiento con la normativa vigente sobre protección de datos, te
        informamos de que los datos personales proporcionados a través del
        formulario de inscripción se recogen con el único propósito de gestionar
        tu participación en el <strong>torneo 3x3 Morón 2025</strong>.
      </p>

      <h2 style={{ fontSize: "1.5rem", marginTop: "2rem" }}>
        Finalidad del tratamiento de los datos
      </h2>
      <p>
        La información que se solicita en el formulario —incluyendo nombre del
        equipo, nombres y apellidos de los jugadores, año de nacimiento,
        categoría, número de teléfono y condición de equipo local— será
        utilizada únicamente para:
      </p>
      <ul style={{ paddingLeft: "1.5rem" }}>
        <li>Gestionar la inscripción y participación en el torneo.</li>
        <li>
          Verificar que los jugadores cumplen con los requisitos de edad de cada
          categoría.
        </li>
        <li>
          Comunicarse con el representante del equipo exclusivamente en relación
          al desarrollo del torneo (avisos, pago, horarios, cambios,
          incidencias...).
        </li>
      </ul>

      <h2 style={{ fontSize: "1.5rem", marginTop: "2rem" }}>
        Confidencialidad y protección de datos
      </h2>
      <p>
        Toda la información recogida es confidencial. Los datos no serán
        compartidos, cedidos ni vendidos a terceros bajo ninguna circunstancia.
      </p>

      <p>
        En particular, el número de teléfono proporcionado será utilizado
        únicamente por los organizadores del torneo para temas relacionados con
        la participación del equipo. No será compartido ni incluido en listas de
        difusión, marketing u otros usos externos.
      </p>

      <h2 style={{ fontSize: "1.5rem", marginTop: "2rem" }}>
        Derecho a revocar el consentimiento
      </h2>
      <p>
        Puedes ejercer tu derecho a revocar el consentimiento para el uso de tus
        datos personales en cualquier momento. Para ello, simplemente ponte en
        contacto con la organización enviando un correo electrónico a:
      </p>
      <p>
        <strong>gallocbmoron@gmail.com</strong>
      </p>

      <p>
        Ten en cuenta que, al revocar el consentimiento, es posible que no se
        pueda completar la participación en el torneo, ya que ciertos datos son
        imprescindibles para la organización y cumplimiento de las normas del
        evento.
      </p>

      <p style={{ marginTop: "3rem", fontStyle: "italic" }}>
        Última actualización: 9 de junio de 2025
      </p>
    </main>
  );
}
