import "./Login.css"
import { Button } from "reactstrap"
const Login = () => {
    return (
        <div className='LoginPage'>
            <div className='Box'>
                <div className='imgBox'>
                    <img
                        src=""
                        alt='Logo'
                    >
                    </img>
                </div>
                <div className='LoginBox'>
                    <input type="text" placeholder='Id'>
                    </input>
                    <input type="password" placeholder="Password"></input>
                    <button className='LoginButton' >LOG IN</button>
                </div>
            </div>

            <div className='Box'>
                <p>
                    계정이 없으신가요? <a herf ="g">가입하기</a>
                </p>
            </div>

        </div>
    )
}

export default Login;