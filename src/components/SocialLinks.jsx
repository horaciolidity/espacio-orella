import React from 'react'
import { FaInstagram, FaFacebookF, FaWhatsapp } from 'react-icons/fa'
import { SiX } from 'react-icons/si'

function SocialLinks() {
  return (
    <div className="social-links">
      <a href="https://wa.me/569XXXXXXXX" aria-label="WhatsApp" target="_blank" rel="noreferrer"><FaWhatsapp /></a>
      <a href="https://www.instagram.com/" aria-label="Instagram" target="_blank" rel="noreferrer"><FaInstagram /></a>
      <a href="https://x.com/" aria-label="X (Twitter)" target="_blank" rel="noreferrer"><SiX /></a>
      <a href="https://www.facebook.com/" aria-label="Facebook" target="_blank" rel="noreferrer"><FaFacebookF /></a>
    </div>
  )
}

export default SocialLinks
