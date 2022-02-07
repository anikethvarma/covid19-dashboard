import {Link} from 'react-router-dom'
import './index.css'

const Header = () => (
  <div className="header-main-container">
    <div className="header-logo-container">
      <img
        src="https://res.cloudinary.com/dp6mcbgji/image/upload/v1644071963/covid_19_dashboard_logo_eui1rf.png"
        alt="header-logo"
        className="header-logo"
      />
    </div>
    <ul className="header-ul">
      <Link to="/">
        <li className="header-li">Home</li>
      </Link>
      <Link to="/about">
        <li className="header-li">About</li>
      </Link>
    </ul>
  </div>
)

export default Header
