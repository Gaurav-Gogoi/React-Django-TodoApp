import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";
import LoadingIndicator from "./LoadingIndicator";
import { Link } from "react-router-dom";

function Form({ route, method }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const name = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    e.preventDefault();   // prevent page refresh
    setLoading(true);

    try {
      const res = await api.post(route, { username, password });

      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);

        navigate("/"); // redirect after login
      } else {
        navigate("/login"); // redirect after register
      }

    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        alert(JSON.stringify(error.response.data));
      } else {
        console.error(error);
        alert("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1>{name}</h1>
  
      <input
        className="form-input"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
  
      <input
        className="form-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
  
      {loading && <LoadingIndicator/>}
  
      <button className="form-button" type="submit" disabled={loading}>
        {loading ? "Loading..." : name}
      </button>
  
      {method === "login" ? (
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      ) : (
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      )}
    </form>
  );
}

export default Form;