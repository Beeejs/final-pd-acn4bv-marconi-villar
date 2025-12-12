import { db } from "../database/firebase.js";

const USERS_COLLECTION = "users";
const CART_SUBCOLLECTION = "cart";

// getOne
export const getCart = async (req, res) => {
  try {
    const uid = req.user.uid;

    const cartRef = db
      .collection(USERS_COLLECTION)
      .doc(uid)
      .collection(CART_SUBCOLLECTION);

    const snapshot = await cartRef.get();

    const items = snapshot.docs.map((doc) => ({
      cartItemId: doc.id,
      ...doc.data(),
    }));

    return res.json({
      status: true,
      message: "Carrito obtenido correctamente",
      data: items,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: false, message: "Error interno del servidor" });
  }
};

// create
export const addToCart = async (req, res) => {
  try {
    const uid = req.user.uid;
    const {
      idProducto,
      cantidad = 1,
      fechaAgregado,
    } = req.body;

    if (!idProducto) {
      return res
        .status(400)
        .json({ status: false, message: "Falta el id del producto." });
    }

    const cartRef = db
      .collection(USERS_COLLECTION)
      .doc(uid)
      .collection(CART_SUBCOLLECTION);

    // Buscamos si ya existe ese producto en el carrito
    const existingSnap = await cartRef
      .where("idProducto", "==", idProducto)
      .limit(1)
      .get();

    if (!existingSnap.empty) {
      // ya existe → sumamos cantidad
      const docRef = existingSnap.docs[0].ref;
      const currentData = existingSnap.docs[0].data();

      await docRef.update({
        cantidad: (currentData.cantidad || 1) + cantidad,
      });

      return res.json({
        status: true,
        message: "Cantidad actualizada en el carrito",
      });
    }

    // no existe → lo creamos
    const newItem = {
      idProducto,
      cantidad,
      fechaAgregado
    };

    const docRef = await cartRef.add(newItem);

    return res.json({
      status: true,
      message: "Producto agregado al carrito",
      data: { docId: docRef.id, ...newItem },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: false, message: "Error interno del servidor" });
  }
};

// update
export const updateCartItem = async (req, res) => {
  try {
    const uid = req.user.uid;
    const { itemId } = req.params;
    const { cantidad } = req.body;

    if (cantidad == null) {
      return res
        .status(400)
        .json({ status: false, message: "Cantidad inválida" });
    }

    const itemRef = db
      .collection(USERS_COLLECTION)
      .doc(uid)
      .collection(CART_SUBCOLLECTION)
      .doc(itemId);

    await itemRef.update({ cantidad });

    return res.json({
      status: true,
      message: "Item del carrito actualizado",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: false, message: "Error interno del servidor" });
  }
};

// delete
export const deleteCartItem = async (req, res) => {
  try {
    const uid = req.user.uid;
    const { itemId } = req.params;

    const itemRef = db
      .collection(USERS_COLLECTION)
      .doc(uid)
      .collection(CART_SUBCOLLECTION)
      .doc(itemId);

    await itemRef.delete();

    return res.json({
      status: true,
      message: "Item eliminado del carrito",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: false, message: "Error interno del servidor" });
  }
};

// delete
export const clearCart = async (req, res) => {
  try {
    const uid = req.user.uid;

    const cartRef = db
      .collection(USERS_COLLECTION)
      .doc(uid)
      .collection(CART_SUBCOLLECTION);

    const snapshot = await cartRef.get();
    const batch = db.batch();

    snapshot.docs.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();

    return res.json({
      status: true,
      message: "Carrito vaciado correctamente",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: false, message: "Error interno del servidor" });
  }
};
