import React, { useEffect, useState } from 'react'
import styles from './auth.module.scss'
import registerImg from '../../assets/register.png'
import Card from '../../Components/card/Card';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { validateEmail } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { RESET_AUTH, register } from '../../redux/features/auth/authSlice';
import Loader from '../../Components/loader/Loader';

const initialState ={
    name: "",
    email: "",
    password: "",
    cpassword: "",
}

const Register = () => {
    const [formData,setFormData] = useState(initialState);
    const {name, email, password, cpassword} = formData;
    // importring states from redux
    const {isLoading, isLoggedIn, isSuccess} = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData,[name]: value})
    }

    //its importan to to do the data validation both in frontend and backend
    const registerUser = async(e) => {
        e.preventDefault();
        if(!email || !password)
        {
            return toast.error("All fields are required");
        }
        if(password.length < 6) {
            return toast.error("Password must be up to 6 characters")
        }
        if(!validateEmail(email)){
            return toast.error("Please enter a valid email")
        }
        if(password !== cpassword) {
            return toast.error("Password do not match")
        }
        
        const userData = {
            name, email, password
        }

        await dispatch(register(userData));
    }

    useEffect(() => {
        if(isSuccess && isLoggedIn) {
            navigate("/")
        }
        // after we have been logged in and directed to home page our task for regitration has been completed. So we want our auth states to be back to reset state so that we can use them for other task.
        dispatch(RESET_AUTH());
    },[isSuccess, isLoggedIn, dispatch, navigate])

  return (
    <>
        {isLoading && <Loader></Loader>}
        <section className={`container ${styles.auth}`}>
        
            <Card>
                <div className={styles.form}>
                    <h2>Register</h2>
                    <form onSubmit={registerUser}>
                        <input type='text' placeholder='Name' required name="name" value={name} onChange={handleInputChange}></input>
                        <input type='text' placeholder='Email' required name="email"  value={email} onChange={handleInputChange}></input>
                        <input type='password' placeholder='Password' required name="password" value={password} onChange={handleInputChange}></input>
                        <input type='password' placeholder='Confirm Password' required name="cpassword" value={cpassword} onChange={handleInputChange}></input>
                        <button type='submit' className='--btn --btn-primary --btn-block'>Login</button>
                    </form>
                    <span className={styles.register}>
                        <p>Already have an account?</p>
                        <Link to='/login'>Login</Link>
                    </span>
                </div>
            </Card>

            <div className={styles.img}>
                <img src={registerImg} alt='login' width="400"></img>
            </div>
        </section>
    </>
  )
}

export default Register