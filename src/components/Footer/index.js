import {VscGithubAlt} from 'react-icons/vsc'
import {FiInstagram} from 'react-icons/fi'
import {FaTwitter} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="footer-bg">
    <div className="footer-logo-container">
      <img
        src="https://res.cloudinary.com/dp6mcbgji/image/upload/v1644071963/covid_19_dashboard_logo_eui1rf.png"
        alt="footer-logo"
        className="footer-logo"
      />
    </div>
    <p className="footer-paragraph">
      we stand with everyone fighting on the front lines
    </p>
    <div className="footer-icons-container">
      <VscGithubAlt className="footer-icon" />
      <FiInstagram className="footer-icon" />
      <FaTwitter className="footer-icon" />
    </div>
  </div>
)

export default Footer
