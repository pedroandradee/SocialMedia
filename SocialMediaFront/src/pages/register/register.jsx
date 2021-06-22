import "./register.css";
import { useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router";

export default function Register() {

    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const history = useHistory();

    const handleClick = async (e) => {
        e.preventDefault();
        if(passwordAgain.current.value !== password.current.value){
            password.current.setCustomValidity("As senhas não coincidem!")
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
                profilePicture: "noAvatar.png",
                coverPicture: "noCover.png"
            }
            try{
                await axios.post("http://localhost:5000/api/auth/register", user);
                history.push("/login")
            } catch(err){
                console.log(err);
            }
        }
    }

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">LifeMoments</h3>
                    <span className="loginDesc">Conecte-se com seus amigos e pessoas de todo o mundo no LifeMoments.</span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input placeholder="Nome" required ref={username} className="loginInput" />
                        <input 
                            placeholder="Email" 
                            type="email" 
                            required 
                            className="loginInput" 
                            ref={email}
                        />
                        <input 
                            placeholder="Senha" 
                            type="password" 
                            required
                            minLength="6"
                            className="loginInput" 
                            ref={password}
                        />
                        <input 
                            placeholder="Confirmar senha" 
                            type="password"
                            required
                            minLength="6"
                            className="loginInput"
                            ref={passwordAgain} 
                        />
                        <button className="loginButton" type="submit">Cadastrar</button>
                        <button className="loginRegisterButton">Já possui uma conta?</button>
                    </form>
                </div>
            </div>
        </div>
    );
}