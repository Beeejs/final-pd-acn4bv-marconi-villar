import { useLocation } from "react-router-dom";

const ErrorPage = () => {
  const location = useLocation();

  // Recuperamos el error enviado desde el navigate()
  const { code, message } = location.state || {};

  return (
    <section className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center gap-6 text-center px-4">
      
      <h1 className="font-primary text-3xl text-game-flame-oscuro">
        Ocurrió un error
      </h1>

      {/* Mensaje descriptivo */}
      <p className="font-secondary text-sm text-primary/80">
        Volvé al inicio e intentá nuevamente.
      </p>

      {/* Si hay información extra, la mostramos */}
      {(code || message) && (
        <div className="bg-secondary/80 border border-game-flame-oscuro rounded-md px-4 py-3 text-left shadow-md w-full max-w-sm">
          {code && (
            <p className="font-secondary text-sm text-primary/90">
              <strong>Código:</strong> {code}
            </p>
          )}
          {message && (
            <p className="font-secondary text-sm text-primary/90 mt-1">
              <strong>Detalle:</strong> {message}
            </p>
          )}
        </div>
      )}

      {/* Link al Home */}
      <a
        href="/"
        className="mt-4 px-4 py-2 rounded-md bg-game-flame-oscuro text-white font-secondary text-sm hover:bg-game-flame-sombra transition"
      >
        Ir al inicio
      </a>
    </section>
  );
};

export default ErrorPage;
