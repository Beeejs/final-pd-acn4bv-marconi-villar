import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
/* Services */
import { loginWithEmail, loginWithGoogle, registerWithEmail, logout } from "../services/auth.js";
/* Components */
import { TextField, FormControl, InputLabel, OutlinedInput, Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import Swal from 'sweetalert2'
/* Utils */
import { errorHanlerFirebase } from "../utils/helper.js";

const Auth = () => {
  const [mode, setMode] = useState("login"); // login | register
  const isLogin = mode === "login";

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Cuando ingresa al login borramos session
    logout();
  }, [])

  // Redireccionamiento
  const from = location.state?.from?.pathname || "/";

  // Datos de formulario
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  // Estados de carga
  const [loadingCredentials, setLoadingCredentials] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);


  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAuthWithCredentials = async (e) => {
    e.preventDefault();

    const { email, password, confirmPassword } = formData;

    if(!email || !password){
      Swal.fire({
        title: 'Campos',
        text: 'Todos los campos son obligatorios.',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      })
      return;
    }

    try {
      setLoadingCredentials(true);

      // Login
      if(isLogin){
        const user = await loginWithEmail(email, password);
        
        if (user) navigate(from, { replace: true });

        return;
      }

      if(password !== confirmPassword){
        Swal.fire({
          title: 'Contraseñas',
          text: 'Las contraseñas no coinciden.',
          icon: 'warning',
          confirmButtonText: 'Aceptar'
        })
        return;
      }

      // Registro
      const user = await registerWithEmail(email, password);
      if (user) navigate(from, { replace: true });
    }
    catch (error) {
      Swal.fire({
        title: 'Error',
        text: errorHanlerFirebase(error.code),
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
    }
    finally {
      setLoadingCredentials(false);
    }
  };

  const handleAuthGoogle = async () => {
    try {
      setLoadingGoogle(true);
      const user = await loginWithGoogle();
      if (user) navigate(from, { replace: true });
    }
    catch (error) {
      // Si el usuario cerró el popup o se canceló, no lo tratamos como error grave
      if (
        error.code === "auth/popup-closed-by-user" ||
        error.code === "auth/cancelled-popup-request"
      ) return;

      Swal.fire({
        title: 'Error',
        text: errorHanlerFirebase(error.code),
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
    }
    finally {
      setLoadingGoogle(false);
    }
  };

  const toggleMode = () => {
    setMode(isLogin ? "register" : "login");
  };

  return (
    <section className="min-h-[calc(100vh-4rem)] w-full flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-secondary/95 border-2 border-game-flame-oscuro shadow-xl rounded-xl p-8 flex flex-col gap-6">
        
        {/* HEADER */}
        <div className="text-center flex flex-col gap-2">
          <h1 className="font-primary text-3xl text-game-flame-oscuro tracking-wide">
            Eternal Games
          </h1>
          <p className="font-secondary text-sm text-primary/80">
            {isLogin
              ? "Iniciá sesión para seguir jugando."
              : "Creá tu cuenta y empezá a acumular victorias."}
          </p>
        </div>

        {/* FORM */}
        <form className="flex flex-col gap-4" onSubmit={handleAuthWithCredentials}>

          {/* Email */}
          <TextField
            label="Correo electrónico"
            type="email"
            fullWidth
            size="small"
            className="font-secondary"
            name="email"
            onChange={handleOnChange}
          />

          {/* Password */}
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel className="font-secondary">Contraseña</InputLabel>
            <OutlinedInput type="password" label="Contraseña" name="password" onChange={handleOnChange}/>
          </FormControl>

          {/* Confirm Password - solo registro */}
          {!isLogin && (
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel className="font-secondary">
                Confirmar contraseña
              </InputLabel>
              <OutlinedInput type="password" label="Confirmar contraseña" name="confirmPassword" onChange={handleOnChange}/>
            </FormControl>
          )}

          {/* Remember + forgot password NO IMPLEMENTADO*/}
         {/*  {isLogin && (
            <div className="flex items-center justify-between text-xs font-secondary text-primary/80">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="accent-game-flame-medio" />
                <span>Recordarme</span>
              </label>
              <button
                type="button"
                className="cursor-pointer text-game-flame-medio hover:text-game-flame-oscuro transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          )} */}

          {/* Submit */}
          <Button
            loading={loadingCredentials}
            type="submit"
            variant="outlined"
            loadingPosition="end"
            fullWidth
            classes={{
              root: `
                !border-game-flame-medio 
                !text-game-flame-medio 
                hover:!bg-game-flame-medio 
                hover:!text-secondary 
                !rounded-md 
                !font-secondary 
                !font-semibold 
                !py-2.5
              `
            }}
          >
            {isLogin ? "Iniciar sesión" : "Crear cuenta"}
          </Button>

          {/* Google */}
          <Button
            onClick={handleAuthGoogle}
            loading={loadingGoogle}
            loadingPosition="end"
            variant="outlined"
            fullWidth
            startIcon={<GoogleIcon />}
            classes={{
              root: `
                !border-game-flame-medio
                !text-game-flame-medio
                hover:!bg-game-flame-medio
                hover:!text-secondary
                !rounded-md
                !font-secondary
                !font-semibold
                !py-2.5
              `,
              startIcon: "!mr-2",
            }}
          >
            Continuar con Google
          </Button>
        </form>

        {/* TOGGLE LOGIN / REGISTER */}
        <div className="text-center font-secondary text-xs text-primary/80">
          {isLogin ? (
            <>
              ¿No tenés una cuenta?{" "}
              <button
                type="button"
                onClick={toggleMode}
                className="cursor-pointer text-game-flame-medio font-semibold hover:text-game-flame-oscuro transition-colors"
              >
                Registrate
              </button>
            </>
          ) : (
            <>
              ¿Ya tenés una cuenta?{" "}
              <button
                type="button"
                onClick={toggleMode}
                className="cursor-pointer text-game-flame-medio font-semibold hover:text-game-flame-oscuro transition-colors"
              >
                Iniciá sesión
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Auth;
