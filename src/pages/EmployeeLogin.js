import { useState } from "react";
import bellaPic from '../assets/Bella-login.png';
import LoginFunction from "../components/LoginFunction";
import { useNavigate } from "react-router-dom";

const EmployeeLogin = ({ updateLogin }) => {
    const [ psswd,setPsswd ] = useState('');
    const [ showPsswd, setShowPsswd ] = useState(false);
    const [email, setEmail ] = useState('');
    const navigate = useNavigate();


const handleLogin = () => {
    LoginFunction(email,psswd)
    .then((loginSuccessful) => {
        if(loginSuccessful) {
            updateLogin(true);
            navigate('/settings');
        }
        else {
            updateLogin(false);
        }
    })
    .catch((error) => {
        console.error(error);
    })
}
    return(
    <div className="loginElement-container">
        <div className="login-area">
            <h1>Welcome</h1>
            <img src={ bellaPic } alt='login-pic' className="login-pic" />
            <input type='text' className='username' placeholder="Email" value={ email } onChange={(e) => setEmail(e.target.value)}/>
            <input type={showPsswd ? 'text' : 'password' } className='password' placeholder="Password" value={ psswd } onChange={(e) => setPsswd(e.target.value)} />
            <label>Show Password</label>
            <input className="check" type="checkbox" value={ showPsswd } onChange={() => {
                setShowPsswd((prev) => !prev)
            }} />
            <button onClick={ handleLogin }className="login-button">Login</button>
        </div>
    </div>
        
    );
}
export default EmployeeLogin;