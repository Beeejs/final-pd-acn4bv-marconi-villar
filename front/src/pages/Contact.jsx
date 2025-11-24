import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import RoomIcon from "@mui/icons-material/Room";
import Swal from "sweetalert2";

const CONTACT_INFO = {
  email: "ventasweb@eternalgame.com.ar",
  phone: "011-4861-4816 (Lunes a Viernes de 10 a 18 hs)",
  address: "Tu dirección / sucursal acá",
  mapUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.016885627258!2d-58.3815592!3d-34.6036844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccac4742a0a25%3A0x2f97c83f21b7a2d4!2sObelisco!5e0!3m2!1ses!2sar!4v1700755200000!5m2!1ses!2sar",
};

const ContactPage = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    prefijo: "",
    telefono: "",
    comentarios: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!formData.email || !formData.telefono || !formData.comentarios || !formData.prefijo || !formData.apellido || !formData.nombre){
      Swal.fire({
        icon: "warning",
        title: "Campos obligatorios",
        text: "Todos los campos son obligatorios.",
        confirmButtonText: "Aceptar"
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "¡Consulta enviada!",
      html: `
        Gracias, <strong>${formData.nombre || "Anonimo"}</strong>.<br/>
        Te responderemos al correo:<br/>
        <strong>${formData.email || "Anonimo"}</strong>
      `,
      confirmButtonText: "Aceptar",
    });

    setFormData({
      nombre: "",
      apellido: "",
      email: "",
      prefijo: "",
      telefono: "",
      comentarios: "",
    });
  };

  return (
    <section className="min-h-[calc(100vh-4rem)] flex justify-center px-4 py-10">
      <div className="w-full max-w-6xl bg-white/95 rounded-xl shadow-xl border-4 border-game-flame-oscuro p-6 md:p-10">

        {/* HEADER */}
        <h1 className="text-3xl font-primary text-center text-game-flame-oscuro">
          Contacto Eternal Games
        </h1>
        <p className="text-center text-primary/80 font-secondary mt-1">
          Consultas sobre compras, envíos y soporte post venta web.
        </p>

        {/* CONTENT */}
        <div className="flex flex-col md:flex-row gap-10 mt-8">

          {/* FORMULARIO */}
          <div className="flex flex-col justify-center items-start w-full gap-4 md:w-1/2 bg-gray-50 rounded-lg p-5 border border-primary/20">
            <h2 className="text-xl font-secondary text-game-flame-oscuro mb-3">
              Enviá tu consulta
            </h2>

            {/* Info de contacto */}
            <div className="text-sm text-primary/90 space-y-1 mb-4 font-secondary">
              <p className="flex items-center gap-2 text-wrap">
                <EmailIcon className="text-game-flame-medio" /> 
                <strong>Email:</strong> {CONTACT_INFO.email}
              </p>
              <p className="flex items-center gap-2 text-wrap">
                <PhoneIcon className="text-game-flame-medio" /> 
                <strong>Teléfono:</strong> {CONTACT_INFO.phone}
              </p>
              <p className="text-xs italic mt-2 text-wrap">
                * Consultas del funcionamiento del sitio y soporte web.
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-6 w-full">
              <div className="flex justify-center items-center gap-3 w-full">
                <TextField
                  fullWidth
                  label="Nombre"
                  name="nombre"
                  size="small"
                  className="font-secondary!"
                  value={formData.nombre}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Apellido"
                  name="apellido"
                  size="small"
                  className="font-secondary!"
                  value={formData.apellido}
                  onChange={handleChange}
                />
              </div>

              <div className="w-full">
                <TextField
                  fullWidth
                  type="email"
                  size="small"
                  label="Correo electrónico"
                  name="email"
                  value={formData.email}
                  className="font-secondary!"
                  onChange={handleChange}
                />
              </div>

              <div className="flex justify-center items-center gap-3 w-full">
                <TextField
                  fullWidth
                  label="Prefijo"
                  name="prefijo"
                  size="small"
                  placeholder="+54"
                  className="font-secondary!"
                  value={formData.prefijo}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Teléfono"
                  name="telefono"
                  size="small"
                  className="font-secondary!"
                  value={formData.telefono}
                  onChange={handleChange}
                />
              </div>

              <div className="w-full">
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Comentarios"
                  name="comentarios"
                  className="font-secondary!"
                  value={formData.comentarios}
                  onChange={handleChange}
                />
              </div>

              <Button
                fullWidth
                type="submit"
                variant="contained"
                className="font-secondary! font-medium!"
                sx={{
                  bgcolor: "#555",
                  color: "#fff",
                  "&:hover": {
                    bgcolor: "#333",
                  },
                  borderRadius: "6px",
                  padding: "6px 16px",
                }}
              >
                Enviar consulta
              </Button>
            </form>
          </div>

          {/* MAPA */}
          <div className="w-full md:w-1/2 flex flex-col gap-3">
            <h2 className="text-xl font-secondary text-game-flame-oscuro">
              Nuestra ubicación
            </h2>

            <p className="flex items-center gap-2 text-primary/90 text-sm font-secondary">
              <RoomIcon className="text-game-flame-medio" /> {CONTACT_INFO.address}
            </p>

            <iframe
              src={CONTACT_INFO.mapUrl}
              className="w-full h-full min-h-[300px] rounded-lg shadow-lg border-2 border-game-flame-medio"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
