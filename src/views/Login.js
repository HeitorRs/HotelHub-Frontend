import React, {useState} from "react";
import {useNavigate } from 'react-router-dom';
import axios from "axios";

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
        const response = await axios.post("https://localhost:7074/api/Hospedes", data);

        if (response.status === 200) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.hospdeId)
        } else {
            console.log(response.data);
        }
        } catch (error) {
        console.log(error);
        }
        navigate("/")
  };
  return (
    <div class="d-flex flex-column min-vh-100">
    <div class="row justify-content-center">
        <div class="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
            <div class="card">
                <h3 class="text-center mb-4">Login</h3>
                <form class="form-card" onSubmit={handleSubmit}>
                    <div class="form-group"> 
                        <label class="form-control-label">Email</label>
                        <input type="email" id="email" class="form-control" value={Email} onChange={(e) => setEmail(e.target.value)}/> 
                    </div>
                    <div class="form-group"> 
                        <label class="form-control-label">Senha</label>
                        <input type="password" id="senha" class="form-control" value={Senha} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className='row d-flex justify-content-center'>
                        <div class="form-group"> 
                            <button type="submit" class="btn btn-primary">Login</button> 
                        </div>
                        <div class="form-group align-self-start"> 
                            <a href='./Cadastro'>Criar conta</a> 
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    </div>
  );
}

export default Login;