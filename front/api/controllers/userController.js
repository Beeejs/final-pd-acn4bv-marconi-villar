const syncUser = async (req, res) => {
  try{
    const { authorization } = req.headers;
    const response = await fetch(`${process.env.API_URL}/api/users/sync-user`, {
      method: 'POST',
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

const getUsers = async (req, res) => {
  try{
    const { authorization } = req.headers;
    const response = await fetch(`${process.env.API_URL}/api/users/all`, {
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

const updateUserRole = async (req, res) => {
  try{
    const { authorization } = req.headers;
    const { id } = req.params;
    const response = await fetch(`${process.env.API_URL}/api/users/role/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authorization.split(" ")[1]}`
      },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();

    res.status(response.status || 999).json(data);
  }
  catch(error){
    res.status(500).json({ status: false, message: 'Error interno del servidor' });
  }
}

export default {
  syncUser,
  getUsers,
  updateUserRole,
}
