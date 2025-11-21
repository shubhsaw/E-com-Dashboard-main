import React, { useEffect, useState } from 'react'
import style from './Profile.module.css'
import { Mail } from 'lucide-react'
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
const Profile = () => {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: ""
  });
  const navigate = useNavigate()

  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (userString) {
      const userData = JSON.parse(userString);
      setUser(userData);
    }
  }, []);

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className={style.profileContainer}>
      <div className={style.card}>

        <button
          className={style.backbtn}
          onClick={() => navigate('/')}
        >
          <IoIosArrowBack /> back
        </button>

        <div className={style.avatar}>
          {user.firstname.charAt(0)}{user.lastname.charAt(0)}
        </div>
        <h2 className={style.name}>
          {user.firstname} {user.lastname}
        </h2>
        <p className={style.email}>
          <Mail size={16} className={style.icon} /> {user.email}
        </p>
      </div>
    </div>
  )
}

export default Profile;
