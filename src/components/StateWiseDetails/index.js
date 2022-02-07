import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  BarChart,
  Bar,
} from 'recharts'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

class StateWiseDetails extends Component {
  state = {activeTab: 'CONFIRMED', dayWiseStateDetails: [], isLoading: true}

  componentDidMount = () => {
    this.getStateDetails()
  }

  getStateDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {stateId} = params

    const response = await fetch(
      `https://apis.ccbp.in/covid19-timelines-data/${stateId}`,
    )
    const jsonData = await response.json()

    const keyNames = Object.keys(jsonData.AP.dates)

    const dateWiseTotalData = []
    keyNames.forEach(date =>
      dateWiseTotalData.push({
        date,
        confirmed: jsonData.AP.dates[date].total.confirmed,
        active:
          jsonData.AP.dates[date].total.confirmed -
          jsonData.AP.dates[date].total.deceased -
          jsonData.AP.dates[date].total.recovered,
        deceased: jsonData.AP.dates[date].total.deceased,
        recovered: jsonData.AP.dates[date].total.recovered,
        tested: jsonData.AP.dates[date].total.tested,
      }),
    )
    this.setState({dayWiseStateDetails: dateWiseTotalData, isLoading: false})
  }

  getTotalConfirmed = () => {
    const {dayWiseStateDetails} = this.state
    const getTotalConfirmedArray = dayWiseStateDetails.map(
      eachElement => eachElement.confirmed,
    )
    const totalConfirmed = getTotalConfirmedArray.reduce(
      (pre, acc) => pre + acc,
    )
    return totalConfirmed
  }

  getTotalActive = () => {
    const {dayWiseStateDetails} = this.state
    const getTotalActiveArray = dayWiseStateDetails.map(
      eachElement => eachElement.active,
    )
    const totalActive = getTotalActiveArray.reduce((pre, acc) => pre + acc)
    return totalActive
  }

  getTotalRecovered = () => {
    const {dayWiseStateDetails} = this.state
    const getTotalRecoveredArray = dayWiseStateDetails.map(
      eachElement => eachElement.recovered,
    )
    const totalRecovered = getTotalRecoveredArray.reduce(
      (pre, acc) => pre + acc,
    )
    return totalRecovered
  }

  getTotalDeceased = () => {
    const {dayWiseStateDetails} = this.state
    const getTotalDeceasedArray = dayWiseStateDetails.map(
      eachElement => eachElement.confirmed,
    )
    const totalDeceased = getTotalDeceasedArray.reduce((pre, acc) => pre + acc)
    return totalDeceased
  }

  renderTotalStatsTabs = () => (
    <ul className="home-total-tabs-ul">
      <li className="home-total-tabs-li">
        <p className="home-total-tabs-head red">Confirmed</p>
        <img
          src="https://res.cloudinary.com/dp6mcbgji/image/upload/v1644090918/covid_19_dashboard_confirmed_logo_iebyax.png"
          alt="confirmed"
          className="home-total-tabs-image"
        />
        <p className="home-total-count red">{this.getTotalConfirmed()}</p>
      </li>
      <li className="home-total-tabs-li">
        <p className="home-total-tabs-head blue">Active</p>
        <img
          src="https://res.cloudinary.com/dp6mcbgji/image/upload/v1644091069/covid_19_dashboard_active_logo_ssdh3c.png"
          alt="confirmed"
          className="home-total-tabs-image"
        />
        <p className="home-total-count blue">{this.getTotalActive()}</p>
      </li>
      <li className="home-total-tabs-li">
        <p className="home-total-tabs-head green">Recovered</p>
        <img
          src="https://res.cloudinary.com/dp6mcbgji/image/upload/v1644091123/covid_19_dashboard_recovered_logo_a2zuxo.png"
          alt="confirmed"
          className="home-total-tabs-image"
        />
        <p className="home-total-count green">{this.getTotalRecovered()}</p>
      </li>
      <li className="home-total-tabs-li">
        <p className="home-total-tabs-head grey">Deceased</p>
        <img
          src="https://res.cloudinary.com/dp6mcbgji/image/upload/v1644091183/covid_19_dashboard_deceased_logo_ihuiz4.png"
          alt="confirmed"
          className="home-total-tabs-image"
        />
        <p className="home-total-count grey">{this.getTotalDeceased()}</p>
      </li>
    </ul>
  )

  renderCompleteGraphs = () => {
    const {dayWiseStateDetails} = this.state

    return (
      <div className="state-details-line-graphs-main-container">
        <h1 className="state-details-line-graphs-main-heading">Line Chart</h1>
        <div className="state-details-line-graphs-confirmed">
          <LineChart
            width={730}
            height={250}
            data={dayWiseStateDetails}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="confirmed" stroke="#8884d8" />
          </LineChart>
        </div>
        <div className="state-details-line-graphs-active">
          <LineChart
            width={730}
            height={250}
            data={dayWiseStateDetails}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="active" stroke="#8884d8" />
          </LineChart>
        </div>
        <div className="state-details-line-graphs-recovered">
          <LineChart
            width={730}
            height={250}
            data={dayWiseStateDetails}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="recovered" stroke="#8884d8" />
          </LineChart>
        </div>
        <div className="state-details-line-graphs-deceased">
          <LineChart
            width={730}
            height={250}
            data={dayWiseStateDetails}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="deceased" stroke="#8884d8" />
          </LineChart>
          <div className="state-details-line-graphs-tested">
            <LineChart
              width={730}
              height={250}
              data={dayWiseStateDetails}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="tested" stroke="#8884d8" />
            </LineChart>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <>
        <Header />
        {isLoading ? (
          <div className="about-loader-bg" testid="loader">
            <Loader type="TailSpin" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <div>
            {this.renderTotalStatsTabs()}
            {this.renderCompleteGraphs()}
          </div>
        )}

        <Footer />
      </>
    )
  }
}

export default StateWiseDetails
