import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import Head from 'next/head'
import Link from 'next/link'
import { RiAccountCircleFill } from 'react-icons/ri'
import { register, reset } from '../../redux/authSlice'
import Spinner from '@/components/Spinner'
import Newsletter from '@/components/Newsletter';
import RegisterStyles from '../../styles/components/Register.module.scss'

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })
    const dispatch = useDispatch()
    const { user, isLoading, isError, isSuccess, message} = useSelector(
        (state) => state.auth
    )
    const { name, email, password, password2 } = formData

    useEffect(() => { 
        
        if (isError) {
            toast.error(message)
        }

        if (isSuccess || user) {
            console.log(user)
        }

        dispatch(reset())

    }, [user, isError, isSuccess, message, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if (password !== password2) {
            toast.error('Passwords do not match')
        } else {
            const userData = {
                name,
                email,
                password,
                password2
            }
            
            dispatch(register(userData))
        }
    }
    if (isLoading) {
        return <Spinner />
    }
    return (
        <>
            <Head>
                <title>Marquet | Join Marquet</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/MarquetLogo.ico" />
            </Head>
            <div className={RegisterStyles.registerPage}>
                <div className={RegisterStyles.registerHeader}>
                    <div className={RegisterStyles.registerTitle}>
                        <h1>Join Marquet</h1>
                    </div>
                    <p>It's quick and easy</p>
                </div>

                <form className={RegisterStyles.form} onSubmit={onSubmit}>
                    <input 
                        className={RegisterStyles.field}
                        type="text" 
                        id="name" 
                        name="name" 
                        value={name}
                        placeholder="Enter your name"
                        onChange={onChange}
                    />
                    <input 
                        className={RegisterStyles.field}
                        type="text" 
                        id="email" 
                        name="email" 
                        value={email}
                        placeholder="Enter your email"
                        onChange={onChange}
                    />
                    <input 
                        className={RegisterStyles.field}
                        type="text" 
                        id="password" 
                        name="password" 
                        value={password}
                        placeholder="Enter your password"
                        onChange={onChange}
                    />
                    <input 
                        className={RegisterStyles.field}
                        type="text" 
                        id="password2" 
                        name="password2" 
                        value={password2}
                        placeholder="Re-enter your password"
                        onChange={onChange}
                    />
                    <button className={RegisterStyles.registerBtn} type="submit" >
                        Join Marquet
                    </button>
                </form>
                <Link href="/account/login">
                    <p>Login</p>
                </Link>
            </div>
            
            <Newsletter />
        </>
    )
}

export default Register