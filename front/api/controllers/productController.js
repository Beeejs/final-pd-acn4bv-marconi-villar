const getProducts = async (req, res) => {
  try{
    const { authorization } = req.headers;
    // query
    const filters = { ...req.query };
    const queryString = new URLSearchParams(filters).toString();
    
    const response = await fetch(`${process.env.API_URL}/api/products/getAll?${queryString}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authorization.split(" ")[1]}`
      },
    });
    const data = await response.json();

    res.status(response.status || 999).json(data);
  }
  catch(error){
    res.status(500).json({ status: false, message: 'Error interno del servidor' });
  }
}

export default {
  getProducts,
}