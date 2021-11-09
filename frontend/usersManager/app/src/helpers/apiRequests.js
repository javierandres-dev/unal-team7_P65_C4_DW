const url = "http://localhost:4000/api/users";

export const createOne = async (obj) => {
  console.log(obj)
  return await fetch(url, {
    method: "POST",
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
      console.log(response)
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something went wrong");
      }
    })
    .catch((error) => {
      console.error(error);
      return {error: error}
    });
};

export const findAll = async () => {
  return await fetch(url)
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
  return await fetch(`${url}/${id}`)
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
  return await fetch(`${url}/${id}`, {
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
  return await fetch(`${url}/${id}`, {
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
