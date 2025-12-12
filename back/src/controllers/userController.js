import { db } from "../database/firebase.js";
import admin from "firebase-admin";

const NAME_COLLECTION = "users";

export const getUsers = async (req, res) => {
  try {
    const snapshot = await db.collection(NAME_COLLECTION).get();

    const users = snapshot.docs.map(doc => ({
      uid: doc.id,
      ...doc.data()
    }));

    return res.json({
      status: true,
      message: "Usuarios obtenidos correctamente",
      data: users
    });
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ status: false, message: "Error interno del servidor" });
  }
};

export const syncUser = async (req, res) => {
  try {
    const { uid, email } = req.user; // viene del token

    const userRef = db.collection(NAME_COLLECTION).doc(uid);
    const snapshot = await userRef.get();

    // Creamos el usuario si no existe, sino actualizamos la fecha de actualización
    if (!snapshot.exists) {
      await userRef.set({
        rol: "cliente", // rol x default
        email,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      // Crear custom claim
      await admin.auth().setCustomUserClaims(uid, { rol: "cliente" });
    } else {
      await userRef.update({
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    }

    return res.json({
      status: true,
      message: "Usuario sincronizado correctamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Error interno del servidor" });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { rol } = req.body;

    if (!rol) {
      return res.status(400).json({
        status: false,
        message: "Debes enviar un rol válido"
      });
    }

    // Actualizar en Firestore
    await db.collection(NAME_COLLECTION).doc(id).set(
      {
        rol,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    // Actualizar los custom claims en Firebase Auth
    await admin.auth().setCustomUserClaims(id, { rol: rol });

    return res.json({
      status: true,
      message: "Rol actualizado correctamente",
      data: { id, rol }
    });
  } catch (error) {
    console.error("Error al actualizar rol:", error);
    res.status(500).json({ status: false, message: "Error interno del servidor" });
  }
};