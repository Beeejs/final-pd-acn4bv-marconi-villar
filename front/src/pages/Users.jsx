// src/pages/UserRolesTable.jsx
import { useState, useMemo, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
/* Hooks */
import { useGetData } from "../hooks/useGetData";
import { usePostData } from "../hooks/usePostData";
/* MUI */
import {
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  TablePagination,
  Button,
  Select,
  MenuItem,
  Chip,
  Box,
} from "@mui/material";
/* Components */
import Loader from "../components/Loader";
import Swal from "sweetalert2";
/* Context */
import { AuthContext } from "../context/AuthContext";

const Users = () => {
  const { user, loading } = useContext(AuthContext);
  const { action, responseData } = useGetData();
  const { action: actionPostUpdate, responseData: responseDataPostUpdate } =
    usePostData();

  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [roleDraft, setRoleDraft] = useState({}); // { userId: "admin" | "client" }

  const navigate = useNavigate();
  const location = useLocation();

  // Si no está logueado → auth
  useEffect(() => {
    if (loading) return;
    
    if (!user && location.pathname !== "/auth") {
      navigate("/auth", { replace: true });
    }

    if(user?.reloadUserInfo?.customAttributes && JSON.parse(user.reloadUserInfo?.customAttributes).rol !== "admin"){
      navigate("/", { replace: true });
    }

  }, [user, loading, location.pathname, navigate]);

  // Traer usuarios
  useEffect(() => {
    if(!user && (user?.reloadUserInfo?.customAttributes && JSON.parse(user.reloadUserInfo?.customAttributes).rol !== "admin")) return;
    
    action("/users/getAll");
  }, [user]);

  // Toast cuando se actualiza rol
  useEffect(() => {
    if (responseDataPostUpdate && responseDataPostUpdate.status === true) {
      Swal.fire({
        title: "Rol actualizado",
        text: "El rol del usuario se actualizó correctamente.",
        icon: "success",
        confirmButtonText: "Aceptar",
      });

      // Refrescamos la lista
      action("/users/getAll");
    }
  }, [responseDataPostUpdate]);

  // Normalizamos lista de usuarios
  const users = responseData?.data || [];

  // Filtro
  const filteredUsers = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return users;

    return users.filter((u) => {
      const email = (u.email || "").toLowerCase();
      const uid = (u.uid || "").toLowerCase();
      const role = (u.rol || "cliente").toLowerCase();

      return (
        email.includes(term) || uid.includes(term) || role.includes(term)
      );
    });
  }, [users, search]);

  const handleChangePage = (_, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(0);
  };

  const handleRoleSelectChange = (userId) => (e) => {
    const newRole = e.target.value;
    setRoleDraft((prev) => ({
      ...prev,
      [userId]: newRole,
    }));
  };

  const handleApplyRole = (userRow) => {
    const userId = userRow.uid;
    if (!userId) return;

    const currentRole = userRow.rol || "cliente";
    const newRole = roleDraft[userId] || currentRole;

    if (newRole === currentRole) {
      Swal.fire({
        title: "Sin cambios",
        text: "El rol seleccionado es igual al actual.",
        icon: "info",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    // POST al backend para cambiar rol
    actionPostUpdate(`/users/rol/${userId}`, { rol: newRole });
  };

  return (
    <section className="flex flex-col justify-center items-center gap-12 h-full my-12">
      <aside className="flex flex-col justify-center items-center bg-secondary/60 w-full rounded-md px-8 pt-8 pb-2">
        {/* Header */}
        <div className="flex justify-between items-center md:flex-row flex-col gap-4 w-full mb-6">
          <div className="flex flex-col justify-center items-start gap-2 w-full">
            <h5 className="font-primary text-2xl text-game-flame-oscuro">
              Gestión de Usuarios
            </h5>
            <p className="font-secondary text-primary text-base">
              Visualizá los usuarios registrados y administrá sus roles.
            </p>
          </div>

          <div className="flex justify-start md:justify-end items-center gap-4 w-full">
            {/* Buscador */}
            <TextField
              size="small"
              label="Buscar usuario"
              variant="outlined"
              value={search}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {/* Tabla */}
        <TableContainer sx={{ maxHeight: 450 }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Rol actual</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>
                  Cambiar rol
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {responseData ? (
                filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      <p className="text-base text-primary font-secondary font-medium">
                        No se encontraron usuarios.
                      </p>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers
                    .slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    .map((userRow) => {
                      const userId = userRow.uid;
                      const currentRole = userRow.rol || "client";
                      const draftRole = roleDraft[userId] || currentRole;

                      return (
                        <TableRow key={userId} hover>
                          <TableCell>{userId}</TableCell>
                          <TableCell>{userRow.email || "-"}</TableCell>
                          <TableCell>
                            <Chip
                              label={
                                currentRole === "admin" ? "Admin" : "Cliente"
                              }
                              size="small"
                              sx={{
                                bgcolor:
                                  currentRole === "admin"
                                    ? "rgba(59,130,246,0.15)" // azul
                                    : "rgba(16,185,129,0.15)", // verde
                                color:
                                  currentRole === "admin"
                                    ? "#1D4ED8"
                                    : "#059669",
                                fontFamily: "Poppins, sans-serif",
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Box
                              sx={{
                                display: "flex",
                                gap: 1,
                                alignItems: "center",
                              }}
                            >
                              <Select
                                size="small"
                                value={draftRole}
                                onChange={handleRoleSelectChange(userId)}
                                sx={{ minWidth: 120 }}
                              >
                                <MenuItem value="cliente">Cliente</MenuItem>
                                <MenuItem value="admin">Admin</MenuItem>
                              </Select>

                              <Button
                                variant="contained"
                                onClick={() => handleApplyRole(userRow)}
                                disabled={draftRole === currentRole}
                                classes={{
                                  root: `
                                    !text-secondary
                                    !bg-game-flame-oscuro
                                    hover:!bg-game-flame-sombra
                                    !rounded-md 
                                    !font-secondary 
                                    !font-semibold 
                                    !py-1
                                    !px-3
                                  `,
                                }}
                              >
                                Aplicar
                              </Button>
                            </Box>
                          </TableCell>
                        </TableRow>
                      );
                    })
                )
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <div className="flex flex-col justify-center items-center gap-6 py-12">
                      <Loader
                        width={"60px"}
                        height={"60px"}
                        borderWidth={"4px"}
                        color={"#CC0000"}
                      />
                      <p className="text-base text-primary font-secondary font-medium">
                        Cargando usuarios
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Paginación */}
        <TablePagination
          component="div"
          count={filteredUsers?.length || 0}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Filas por página"
        />
      </aside>
    </section>
  );
};

export default Users;
