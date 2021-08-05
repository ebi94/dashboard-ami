import React from "react";
import LoginForm from "views/LoginForm";
import Footer from "components/Footer/Footer";

const Login = () => {
    return (
        <div style={{ width: '100%', position: 'fixed', backgroundColor: '#d8d8d8', height: '100vh' }}>
            <LoginForm />
            <div
                style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: '100%',
                    boxShadow: '0 20px 50px rgba(8, 112, 184, 0.7)',
                }}
            >
                <Footer />
            </div>
        </div>
    );
}

export default Login;
