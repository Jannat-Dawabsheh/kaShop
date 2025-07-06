import React from 'react'
import style from '../footer/footer.module.css'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
export default function Footer() {
  return (
    <>
    <div className={style.upperfooter}></div>
    <div className={style.footerSection}>
      <div className={style.row}>
        <p>Sunday to Thursday<br/>09 AM — 07 PM</p>
        <div className={style.iconsrow}>
          <div className={style.icons}><LocalPhoneIcon/></div>
          <div className={style.icons}><EmailIcon/></div>
          <div className={style.icons}> <InstagramIcon/></div>
          <div className={style.icons}><TwitterIcon/></div>
          
         
          
        </div>
        <p>KA Store © 2025 | All Rights Reserved</p>
      </div>
    </div>
    </>
  )
}
