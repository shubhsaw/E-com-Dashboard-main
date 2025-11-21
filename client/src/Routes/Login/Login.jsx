import React, { useEffect } from 'react'
import style from './Login.module.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Login = () => {
    const navigate=useNavigate();
    const [emai,setEmail]=useState("");
    const[password,setPass]=useState("")
    const[loginData,setLoginData]=useState({email:"",password:""});

    useEffect(()=>{
        const auth=localStorage.getItem('user');
        if(auth){
            navigate('/')
        }
    },[])
    async function handleLogin(e){
        e.preventDefault();
        let data={
            email:emai,
            password:password
        }
        //storing form data into a single state
        setLoginData(data)
        // console.log(data);
        try{
            let result=await fetch("http://localhost:5000/login",{
                method:"post",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(data)
            })
            result=await result.json();
            //console.log(result);
            
            if(result.auth){
                //without storing it to local storage you will be redirected to Sign up page
                localStorage.setItem("user", JSON.stringify(result.user));
                localStorage.setItem("token",JSON.stringify(result.auth))
                navigate('/');
            }else{
                alert(JSON.stringify(result))
            }
        }catch(err){
            console.log(err);
            
        }
        setEmail("");
        setPass("")
    }
  return (
    <div className={style.login}>
        <div className={style.container}>
            <div id={style.heading}><h1>Login </h1></div>
            <form action="" id={style.form_login} onSubmit={handleLogin}>
                <label className={style.label} htmlFor="">Email Address</label>
                <input className={style.inputbox} type="email" placeholder='Enter Email Address' value={emai} onChange={(e)=>setEmail(e.target.value)} required/> 

                <label className={style.label} htmlFor="">Password</label>

                <input className={style.inputbox} type="password"  placeholder='Enter Password' value={password} onChange={(e)=>setPass(e.target.value)}required/>

                <input className={style.inputbox} type="submit" placeholder='Login'/>
            </form>
        </div>
    </div>
  )
}

export default Login
