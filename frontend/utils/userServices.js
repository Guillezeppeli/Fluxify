export const registerUser = async (userData) => {
  try {
    const response = await fetch('http://localhost:5000/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to register.');
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export const loginUser = async (credentials) => {
  try {
    const response = await fetch('http://localhost:5000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });

  const data = await response.json();

  console.log('Received data from login:', data);

  if (!response.ok) {
    throw new Error(data.message || 'Failed to login.');
  }

  const token = data.token;  // adjust the path based on your API response structure
  localStorage.setItem('token', token);

    return data;
  } catch (error) {
    throw error;
  }
}