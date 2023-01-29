import React, { useState } from 'react';
import { Container, Image } from 'semantic-ui-react';
import instaclone from '../../assets/instaclone.png';
import LoginForm from '../../components/auth/loginForm';
import RegisterForm from '../../components/auth/registerForm';
import './Auth.scss';

export default function Auth() {
    const [showLogin, setShowLogin] = useState(true);

    return (
        <Container fluid className="auth">
            <Image src={instaclone} />

            <div className="container-form">
                {
                    showLogin ? < LoginForm /> : <RegisterForm setShowLogin={setShowLogin} />
                }
            </div>

            <div className="change-form">
                <p>
                   
                </p>
                {
                    showLogin ? (
                        <>
                            ¿no tienes cuenta?
                            <span onClick={() => setShowLogin(!showLogin)}>Registrate</span>
                        </>
                    ) : (
                        <>
                            ¡Entra con tu cuenta!
                            <span onClick={() => setShowLogin(!showLogin)}>Iniciar sesión</span>
                        </>
                    )
                }
            </div>
        </Container>
    )
}
