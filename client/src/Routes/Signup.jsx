import React, { useEffect, useState } from 'react'
import styles from './Signup.module.css'
import { Link, useNavigate } from 'react-router-dom';
let api=import.meta.env.VITE_SEVER_API

const Signup = () => {
  const [email, setEmail] = useState("")
  const [firstN, setFirstN] = useState("")
  const [lastN, setLastN] = useState("")
  const [pass, setPass] = useState("")
  const [formData, setFormData] = useState(null)
  const navigate = useNavigate();
  const auth=localStorage.getItem('user')
  useEffect(() => {
    if (auth) {
      navigate('/');
    }
  }, [auth])
  async function handleSubmit(e) {
    e.preventDefault()

    const newData = {
      email: email,
      firstname: firstN,
      lastname: lastN,
      password: pass,
    }

    setFormData(newData)
    console.log(newData)

    try {
      let result = await fetch(api+"/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      });
      result = await result.json();
      console.log(result);

      //storing Data in localStorage
      localStorage.setItem("user", JSON.stringify(result.newUser));
      localStorage.setItem("token " ,JSON.stringify(result.auth))

      // redirect to Home page after successful signup
      if(result._id){
        navigate('/');
      }
      
    } catch (err) {
      console.error("Error:", err);
    }


    // reset fields
    setEmail("")
    setFirstN("")
    setLastN("")
    setPass("")
  }

  return (
    <div className={styles.signupContainer}>
      <form onSubmit={handleSubmit} className={styles.form_signup}>
        <h1 className={styles.title}>Signup</h1>

        <div className={styles.inputbox}>
          <label className={styles.label}>Work Email</label>
          <input
            className={styles.email}
            type="email"
            placeholder="name@work.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={styles.namebox}>
          <div>
            <label className={styles.label} htmlFor="firstName">First Name</label>
            <input
              className={styles.firstname}
              type="text"
              id="firstName"
              placeholder="First Name"
              value={firstN}
              onChange={(e) => setFirstN(e.target.value)}
              required
            />
          </div>
          <div>
            <label className={styles.label} htmlFor="lastName">Last Name</label>
            <input
              className={styles.lastname}
              type="text"
              id="lastName"
              placeholder="Last Name"
              value={lastN}
              onChange={(e) => setLastN(e.target.value)}
              required
            />
          </div>
        </div>

        <div className={styles.inputbox}>
          <label className={styles.label} >Password</label>
          <input
            className={styles.password}
            type="password"
            placeholder="Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
          />
        </div>

        <button type="submit" className={styles.submitBtn} >
          Continue with Email
        </button>

        

        <p className={styles.signin}>
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </form>
    </div>
  )
}

export default Signup
