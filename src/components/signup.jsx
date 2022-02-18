import { useState } from "react";
import { getLoginCreds } from "./commonFunctions/getLoginCreds";

export const Signup = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(props.login);

  const handleLogin = (e) => {
    e.preventDefault();
    getLoginCreds({
      username,
      password,
    }).then(({isAuthenticated}) => {
      if (isAuthenticated) {
        window.location.reload();
      }
    });
  };
  const handleSignup = (e) => {
    e.preventDefault();
    const request = { username, password };
    fetch("https://pbvictor.herokuapp.com/api/music/user", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(request),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else throw new Error();
      })
      .then((data) => {
        localStorage.setItem("user", { data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="pb-2">
      {isLogin ? (
        <h1>Login to your account</h1>
      ) : (
        <h1>Signup to access more features</h1>
      )}
      <form className="flex flex-col space-y-1 justify-center items-center">
        <input
          className="bg-transparent outline outline-1 outline-gray-700 rounded-sm"
          type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="bg-transparent outline outline-1 outline-gray-700 rounded-sm"
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {isLogin && (
          <button
            className="bg-blue-600 p-2 mx-1 rounded-sm transition-colors hover:bg-blue-700"
            onClick={(e) => handleLogin(e)}
          >
            Login
          </button>
        )}
        {!isLogin && (
          <button
            className="bg-blue-600 p-2 mx-1 rounded-sm transition-colors hover:bg-blue-700"
            onClick={(e) => handleSignup(e)}
          >
            Signup
          </button>
        )}
      </form>
      {!isLogin && (
        <div
          onClick={(e) => setIsLogin(true)}
          className="cursor-pointer text-blue-800 underline"
        >
          Already have an account? Login.
        </div>
      )}
      {isLogin && (
        <div
          onClick={(e) => setIsLogin(false)}
          className="cursor-pointer text-blue-800 underline"
        >
          Create an account
        </div>
      )}
    </div>
  );
};
