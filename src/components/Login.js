import React, { useState } from "react";

function Login() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("")


    return (
        <>
            <div className="login-box" >
                <h1>Login</h1>
                <form className="login-form">
                    <input placeholder="User Name" value={name}
                     onChange={e => setName(e.target.value)}/>
                     <input type="password" placeholder="Password" value={password}
                     onChange={e => setPassword(e.target.value)}/>
                     <input type="submit" value="Submit" />

                </form>
            </div>

        </>
    )
}

export default Login;