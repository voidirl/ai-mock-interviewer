import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

const Login = () => {
    const [form, setForm] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await api.post("/auth/login", new URLSearchParams(form), {
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
            });
            login(res.data.access_token);
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: "100px auto", padding: "2rem" }}>
            <h2>Login</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    name="username"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                    required
                    style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
                />

                <button type="submit" disabled={loading} style={{ width: "100%" }}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form >
            <p>Don't have an account? <Link to="/register">Register</Link></p>
        </div >
    );
};

export default Login;