const urlAuth = 'http://localhost:5000/auth';
const urlAccount = 'http://localhost:6000/account';

export const createFirst = async (obj) => {
  return await fetch(urlAuth + '/first', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  })
    .then((response) => {
      if (response.ok) return response.json();
      else throw new Error('Something went wrong');
    })
    .catch((error) => {
      console.error(error);
      return { error: error };
    });
};

export const login = async (obj) => {
  try {
    const res = await fetch(`${urlAuth}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    });
    if (res.ok) {
      return res.json();
    } else {
      const j = await res.json();
      throw new Error(j.message);
    }
  } catch (error) {
    console.error(error);
    return { error: error };
  }
};

export const createAuth = async (obj, token) => {
  return await fetch(urlAuth, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Something went wrong');
      }
    })
    .catch((error) => {
      console.error(error);
      return { error: error };
    });
};

export const findAuths = async (token) => {
  return await fetch(urlAuth, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Something went wrong');
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const findAuth = async (id, token) => {
  return await fetch(`${urlAuth}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Something went wrong');
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const updateAuth = async (id, obj, token) => {
  return await fetch(`${urlAuth}/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstName: obj.firstName,
      lastName: obj.lastName,
      email: obj.email,
      password: obj.password,
    }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Something went wrong');
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const deleteAuth = async (id, token) => {
  return await fetch(`${urlAuth}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Something went wrong');
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const createAccount = async (obj, token) => {
  return await fetch(urlAccount, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Something went wrong');
      }
    })
    .catch((error) => {
      console.error(error);
      return { error: error };
    });
};

export const findAccounts = async (token) => {
  return await fetch(urlAccount, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Something went wrong');
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const findAccount = async (id, token) => {
  return await fetch(`${urlAccount}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Something went wrong');
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const updateAccount = async (id, obj, token) => {
  return await fetch(`${urlAccount}/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Something went wrong');
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const deleteAccount = async (id, token) => {
  return await fetch(`${urlAccount}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Something went wrong');
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
