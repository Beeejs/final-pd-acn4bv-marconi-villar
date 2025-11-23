// Formatear el precio para una mejor visualización
export const formattedPrice = (price) => {
  return new Intl.NumberFormat('es-AR', { 
    style: 'currency', 
    currency: 'ARS',
    minimumFractionDigits: 2 
  }).format(price);
}

export const errorHanlerFirebase = (code) => {
  switch (code) {
    case "auth/invalid-email":
    case "auth/invalid-credential":
    case "auth/wrong-password":
      return "Las credenciales son incorrectas.";
    case "auth/missing-email":
      return "Ingresá un correo.";
    case "auth/email-already-in-use":
      return "El correo ya está registrado.";
    case "auth/weak-password":
      return "La contraseña debe tener al menos 6 caracteres.";
    case "auth/user-not-found":
      return "No existe una cuenta con ese correo.";
    case "auth/too-many-requests":
      return "Demasiados intentos, probá más tarde.";
    case "auth/popup-blocked":
      return "El navegador bloqueó la ventana.";
    case "auth/popup-closed-by-user":
      return "Cerraste la ventana de inicio de sesión.";
    case "auth/cancelled-popup-request":
      return "Se canceló la ventana de inicio de sesión.";
    case "auth/popup-closed-by-user":
      return "Cerraste la ventana de Google antes de completar el inicio de sesión.";
    default:
      return "Ocurrió un error inesperado. Intentá de nuevo.";
  }
};
