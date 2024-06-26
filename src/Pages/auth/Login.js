import React, { useEffect, useState } from 'react'
import styles from './auth.module.scss'
import loginImg from '../../assets/login.png'
import Card from '../../Components/card/Card'
import { Link, useNavigate } from 'react-router-dom'
import { validateEmail } from '../../utils'
import { toast } from 'react-toastify'
import Loader from '../../Components/loader/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { RESET_AUTH, login } from '../../redux/features/auth/authSlice'

const Login = () => {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const {isLoading, isLoggedIn, isSuccess} = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loginUser = async(e) => {
        e.preventDefault();
        if((!email) || (!password)){
            return toast.error("All the fields are required");
        }
        if(!validateEmail(email)) {
            return toast.error("Please enter a valid email");
        }
        const userData = {
            email,
            password
        }
        // console.log(userData);
        await dispatch(login(userData));
    }

    useEffect(() => {
        if(isSuccess && isLoggedIn) {
            navigate('/');
        }
        dispatch(RESET_AUTH());
    },[isSuccess, isLoggedIn, dispatch, navigate])

  return (
    <>
        {isLoading && <Loader></Loader>}
        <section className={`container ${styles.auth}`}>
            <div className={styles.img}>
                <img src={loginImg} alt='login' width="400"></img>
            </div>
            
            <Card>
                <div className={styles.form}>
                    <h2>Login</h2>
                    <form onSubmit={loginUser}>
                        <input type='text' placeholder='Email' required value={email} onChange={(e) => {setEmail(e.target.value)}}></input>
                        <input type='password' placeholder='Password' required value={password} onChange={(e) => {setPassword(e.target.value)}}></input>
                        <button type='submit' className='--btn --btn-primary --btn-block'>Login</button>
                    </form>
                    <span className={styles.register}>
                        <p>Don't have an account?</p>
                        <Link to='/register'>Register</Link>
                    </span>
                </div>
            </Card>
        </section>
    </>
  )
}

export default Login