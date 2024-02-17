import React, { useContext } from 'react';
import logo from '../assets/logo.png';
import loginImg from '../assets/login.jpg';
import userImg from '../assets/userimg.jpg'
import { Col, Row } from 'react-bootstrap';
import GoogleButton from 'react-google-button';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firbase';
import { useNavigate } from 'react-router-dom';
import { isLoginContext } from '../context/ContextShare';

function Login() {
  const {islogin, setIsLogin}=useContext(isLoginContext)
    const navigate = useNavigate()
    const handleLogin =()=>{
        signInWithPopup(auth,provider).then((res)=>{
            // console.log(res);
            setIsLogin(true)
            sessionStorage.setItem("CurrentUser",JSON.stringify(res.user.email))
            navigate('/home')
        }).catch((err)=>{
            console.log(err);
        })
    }
  return (
    <div  style={{height:'80vh'}}>
      <div className='container'>
        <img src={logo} alt="Logo" width={50} className='mt-4' />
        <Row>
          <Col md={6} className='d-flex align-items-center'>
            <div className='p-lg-5'>
             
              <h3 className='text-center fw-bold mb-3'>Login</h3>
                <div className='text-center d-block d-md-none '><img src={userImg} alt="user image" width={100}/></div>

             <div className='d-flex flex-column align-items-center  justify-content-center '>
             <div className='lead p-3'>
                  Envision a landscape where your to-dos aren't burdens but stepping stones toward a grander vision of success. The clutter of everyday life gives way to a digital canvas where you, the curator, arrange your tasks into a masterpiece of efficiency. 
                </div>
                 <GoogleButton onClick={handleLogin}/>
            </div>
            </div>
          </Col>
          <Col md={6} className='d-none d-md-block '>
            <img src={loginImg} alt="Login Image" style={{ width: '100%' }} />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Login;
