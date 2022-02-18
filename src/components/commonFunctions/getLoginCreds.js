import { useState } from "react";

export const getLoginCreds = async ({ username, password }) => {
  let isAuthenticated = false;
  let error = null;
  let name = "";
  const savedCredentials = localStorage.getItem("user");
  if (savedCredentials) {
    isAuthenticated = true;
    const user = JSON.parse(savedCredentials);
    name = user.username;
  } else {
    if (!username || !password) {
      return { isAuthenticated };
    }
    await fetch("https://pbvictor.herokuapp.com/api/music/user/" + username)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error();
      })
      .then((user) => {
        error = null;
        if (user.username === username && user.password === password) {
          isAuthenticated = true;
          name = username;
          localStorage.setItem("user", JSON.stringify(user));
        } else {
          isAuthenticated = false;
        }
      })
      .catch((err) => {
        isAuthenticated = false;
        error = err.message;
      });
  }
  return { isAuthenticated, error, name };
};
export const useLoginCreds = ({ username, password }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [name, setName] = useState("");
  getLoginCreds({ username, password }).then(({ isAuthenticated, name }) => {
    setAuthenticated(isAuthenticated);
    setName(name);
  });
  return { isAuthenticated, name };
};
