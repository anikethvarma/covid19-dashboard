import './index.css'

const NotFound = () => (
  <div className="not-found-bg">
    <img
      src="https://res.cloudinary.com/dp6mcbgji/image/upload/v1644071137/covid_19_dashboard_not_found_luzkvh.png"
      alt="not found"
      className="not-found-image"
    />
    <p className="not-found-head">PAGE NOT FOUND</p>
    <p className="not-found-para">
      we’re sorry, the page you requested could not be found
      <br />
      Please go back to the homepage
    </p>
  </div>
)

export default NotFound
