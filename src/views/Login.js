import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "./Login.css";

function Login() {
    const navigate = useNavigate();
    const [Email, setEmail] = useState("");
    const [Senha, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            Email,
            Senha
        };
        try {
            const response = await axios.post("https://localhost:7074/Login", data);

            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userId', response.data.id);
                localStorage.setItem('role', response.data.tipo);
            } else {
                console.log(response.data);
            }
        } catch (error) {
            console.log(error);
        }
        navigate("/");
    };

    return (
        <div className="container-fluid">
            <div className="row justify-content-center align-items-center min-vh-100">
                <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
                    <div className="card">
                        <h3 className="text-center">Login</h3>
                        <div className="card-body">
                            <form className="form-card" onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" id="email" className="form-control" value={Email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="senha" className="form-label">Senha</label>
                                    <input type="password" id="senha" className="form-control" value={Senha} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-4">
                                        <button type="submit" className="btn btn-primary w-100">Login</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;