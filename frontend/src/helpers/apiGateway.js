const urlAuth = "http://localhost:4000/auth";
const urlAccount = "http://localhost:5000/account";

export const createOne = async (obj) => {
  return await fetch(urlAuth, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something went wrong");
      }
    })
    .catch((error) => {
      console.error(error);
      return { error: error };
    });
};

export const findAll = async () => {
  return await fetch(urlAuth)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something went wrong");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const findOne = async (id) => {
  return await fetch(`${urlAuth}/${id}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something went wrong");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const updateOne = async (id, obj) => {
  return await fetch(`${urlAuth}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
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
        throw new Error("Something went wrong");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const deleteOne = async (id) => {
  return await fetch(`${urlAuth}/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something went wrong");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const login = async (obj) => {
  try {
    const res = await fetch(`${urlAuth}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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

export const createAccount = async (obj) => {
  console.log("createAccount - obj: ", obj);
  return await fetch(urlAccount, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something went wrong");
      }
    })
    .catch((error) => {
      console.error(error);
      return { error: error };
    });
};

export const findAccounts = async () => {
  return await fetch(urlAccount)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something went wrong");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const findAccount = async (id) => {
  return await fetch(`${urlAccount}/${id}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something went wrong");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
