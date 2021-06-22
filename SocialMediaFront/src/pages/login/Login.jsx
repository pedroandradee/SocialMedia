import "./login.css";
import { useContext, useRef } from "react";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext"
import { CircularProgress } from "@material-ui/core";

export default function Login() {

    const email = useRef();
    const password = useRef();
    const {user, isFetching, error, dispatch} = useContext(AuthContext);

    const handleClick = (e) => {
        e.preventDefault();
        loginCall({email: email.current.value, password: password.current.value}, dispatch);
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
                        <button className="loginButton" type="submit" disabled={isFetching}>
                            {isFetching ? (
                                <CircularProgress color="white" size="20px" />
                            ) : (
                                "Entrar"
                            )}
                        </button>
                        <span className="loginForgot">Esqueceu a senha?</span>
                        <button className="loginRegisterButton">
                            {isFetching ? (
                                <CircularProgress color="white" size="20px" />
                            ) : (
                                "Criar uma conta"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}