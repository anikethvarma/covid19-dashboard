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
  ResponsiveContainer,
} from 'recharts'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

class StateWiseDetails extends Component {
  state = {
    activeTab: 'CONFIRMED',
    districtWiseDetails: [],
    dayWiseStateDetails: [],
    isLoading: true,
    stateName: '',
  }

  componentDidMount = () => {
    this.getStateDetails()
  }

  getStateDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {stateId} = params

    const stateDetailsList = statesList.filter(
      eachElement => eachElement.state_code === stateId,
    )
    const stateNameDerived = stateDetailsList[0].state_name

    this.setState({stateName: stateNameDerived})

    const response = await fetch(
      `https://apis.ccbp.in/covid19-timelines-data/${stateId}`,
    )
    const jsonData = await response.json()
    const keyNames = Object.keys(jsonData[stateId].dates)
    const districtNames = Object.keys(jsonData[stateId].districts)

    const districtWiseData = []
    districtNames.forEach(district => {
      if (
        jsonData[stateId].districts[`${district}`].dates[
          keyNames[keyNames.length - 1]
        ] !== undefined
      ) {
        districtWiseData.push({
          district,
          confirmed:
            jsonData[stateId].districts[`${district}`].dates[
              keyNames[keyNames.length - 1]
            ].total.confirmed,
          active:
            jsonData[stateId].districts[`${district}`].dates[
              keyNames[keyNames.length - 1]
            ].total.confirmed -
            jsonData[stateId].districts[`${district}`].dates[
              keyNames[keyNames.length - 1]
            ].total.recovered -
            jsonData[stateId].districts[`${district}`].dates[
              keyNames[keyNames.length - 1]
            ].total.deceased,
          recovered:
            jsonData[stateId].districts[`${district}`].dates[
              keyNames[keyNames.length - 1]
            ].total.recovered,
          deceased:
            jsonData[stateId].districts[`${district}`].dates[
              keyNames[keyNames.length - 1]
            ].total.deceased,
        })
      }
    })

    const dateWiseTotalData = []
    keyNames.forEach(date =>
      dateWiseTotalData.push({
        date,
        confirmed: jsonData[stateId].dates[date].total.confirmed,
        active:
          jsonData[stateId].dates[date].total.confirmed -
          jsonData[stateId].dates[date].total.deceased -
          jsonData[stateId].dates[date].total.recovered,
        deceased: jsonData[stateId].dates[date].total.deceased,
        recovered: jsonData[stateId].dates[date].total.recovered,
        tested: jsonData[stateId].dates[date].total.tested,
      }),
    )
    this.setState({
      dayWiseStateDetails: dateWiseTotalData,
      districtWiseDetails: districtWiseData,
      isLoading: false,
    })
  }

  getTotalConfirmed = () => {
    const {dayWiseStateDetails} = this.state
    return dayWiseStateDetails[dayWiseStateDetails.length - 1].confirmed
  }

  getTotalActive = () => {
    const {dayWiseStateDetails} = this.state
    return dayWiseStateDetails[dayWiseStateDetails.length - 1].active
  }

  getTotalRecovered = () => {
    const {dayWiseStateDetails} = this.state
    return dayWiseStateDetails[dayWiseStateDetails.length - 1].recovered
  }

  getTotalDeceased = () => {
    const {dayWiseStateDetails} = this.state

    return dayWiseStateDetails[dayWiseStateDetails.length - 1].deceased
  }

  activatingConfirmedTab = () => {
    this.setState({activeTab: 'CONFIRMED'})
  }

  activatingActiveTab = () => {
    this.setState({activeTab: 'ACTIVE'})
  }

  activatingRecoveredTab = () => {
    this.setState({activeTab: 'RECOVERED'})
  }

  activatingDeceasedTab = () => {
    this.setState({activeTab: 'DECEASED'})
  }

  renderTotalStatsTabs = () => (
    <ul className="home-total-tabs-ul">
      <li className="home-total-tabs-li" onClick={this.activatingConfirmedTab}>
        <p className="home-total-tabs-head red">Confirmed</p>
        <img
          src="https://res.cloudinary.com/dp6mcbgji/image/upload/v1644090918/covid_19_dashboard_confirmed_logo_iebyax.png"
          alt="confirmed"
          className="home-total-tabs-image"
        />
        <p className="home-total-count red">{this.getTotalConfirmed()}</p>
      </li>
      <li className="home-total-tabs-li" onClick={this.activatingActiveTab}>
        <p className="home-total-tabs-head blue">Active</p>
        <img
          src="https://res.cloudinary.com/dp6mcbgji/image/upload/v1644091069/covid_19_dashboard_active_logo_ssdh3c.png"
          alt="confirmed"
          className="home-total-tabs-image"
        />
        <p className="home-total-count blue">{this.getTotalActive()}</p>
      </li>
      <li className="home-total-tabs-li" onClick={this.activatingRecoveredTab}>
        <p className="home-total-tabs-head green">Recovered</p>
        <img
          src="https://res.cloudinary.com/dp6mcbgji/image/upload/v1644091123/covid_19_dashboard_recovered_logo_a2zuxo.png"
          alt="confirmed"
          className="home-total-tabs-image"
        />
        <p className="home-total-count green">{this.getTotalRecovered()}</p>
      </li>
      <li className="home-total-tabs-li" onClick={this.activatingDeceasedTab}>
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
        <div className="state-details-line-graphs-container red-bg">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              width={730}
              height={250}
              data={dayWiseStateDetails}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}
            >
              <CartesianGrid strokeDasharray="3 3" visibility="hidden" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="confirmed"
                stroke="#FF073A"
                fill="#FF073A"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="state-details-line-graphs-container blue-bg">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              width={730}
              height={250}
              data={dayWiseStateDetails}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}
            >
              <CartesianGrid strokeDasharray="3 3" visibility="hidden" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="active"
                stroke="#007BFF"
                fill="#007BFF"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="state-details-line-graphs-container green-bg">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              width={730}
              height={250}
              data={dayWiseStateDetails}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}
            >
              <CartesianGrid strokeDasharray="3 3" visibility="hidden" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="recovered"
                stroke="#27A243"
                fill="#27A243"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="state-details-line-graphs-container grey-bg">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              width={730}
              height={250}
              data={dayWiseStateDetails}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}
            >
              <CartesianGrid strokeDasharray="3 3" visibility="hidden" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="deceased"
                stroke="#6C757D"
                fill="#6C757D"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="state-details-line-graphs-container violet-bg">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              width={730}
              height={250}
              data={dayWiseStateDetails}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}
            >
              <CartesianGrid strokeDasharray="3 3" visibility="hidden" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="tested"
                stroke="#9673B9"
                fill="#9673B9"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    )
  }

  getSortedConfirmedDistricts = () => {
    const {districtWiseDetails} = this.state
    const sortedConfirmedDistrictDetails = districtWiseDetails.sort(
      (a, b) => b.confirmed - a.confirmed,
    )

    return (
      <div className="sorted-districts-bg">
        <h1 className="sorted-districts-main-heading red">Top Districts</h1>
        <ul className="sorted-districts-ul">
          {sortedConfirmedDistrictDetails.map(eachElement => (
            <li className="sorted-districts-li" key={eachElement.district}>
              <p className="sorted-districts-count">{eachElement.confirmed}</p>
              <p className="sorted-districts-state">{eachElement.district}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  getSortedActiveDistricts = () => {
    const {districtWiseDetails} = this.state
    const sortedActiveDistrictDetails = districtWiseDetails.sort(
      (a, b) => b.active - a.active,
    )

    return (
      <div className="sorted-districts-bg">
        <h1 className="sorted-districts-main-heading blue">Top Districts</h1>
        <ul className="sorted-districts-ul">
          {sortedActiveDistrictDetails.map(eachElement => (
            <li className="sorted-districts-li" key={eachElement.district}>
              <p className="sorted-districts-count">{eachElement.active}</p>
              <p className="sorted-districts-state">{eachElement.district}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  getSortedRecoveredDistricts = () => {
    const {districtWiseDetails} = this.state
    const sortedRecoveredDistrictDetails = districtWiseDetails.sort(
      (a, b) => b.recovered - a.recovered,
    )

    return (
      <div className="sorted-districts-bg">
        <h1 className="sorted-districts-main-heading green">Top Districts</h1>
        <ul className="sorted-districts-ul">
          {sortedRecoveredDistrictDetails.map(eachElement => (
            <li className="sorted-districts-li" key={eachElement.district}>
              <p className="sorted-districts-count">{eachElement.recovered}</p>
              <p className="sorted-districts-state">{eachElement.district}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  getSortedDeceasedDistricts = () => {
    const {districtWiseDetails} = this.state
    const sortedDeceasedDistrictDetails = districtWiseDetails.sort(
      (a, b) => b.deceased - a.deceased,
    )

    return (
      <div className="sorted-districts-bg">
        <h1 className="sorted-districts-main-heading grey">Top Districts</h1>
        <ul className="sorted-districts-ul">
          {sortedDeceasedDistrictDetails.map(eachElement => (
            <li className="sorted-districts-li" key={eachElement.district}>
              <p className="sorted-districts-count">{eachElement.deceased}</p>
              <p className="sorted-districts-state">{eachElement.district}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderConfirmedBarGraph = () => {
    const {dayWiseStateDetails} = this.state
    return (
      <div className="bar-graph-bg">
        <ResponsiveContainer width="100%" height={400} color="#9A0E31">
          <BarChart
            width={800}
            height={450}
            data={dayWiseStateDetails.slice(
              dayWiseStateDetails.length - 11,
              dayWiseStateDetails.length - 1,
            )}
            margin={{top: 5}}
          >
            <CartesianGrid strokeDasharray="" visibility="hidden" />
            <XAxis dataKey="date" />
            <YAxis visibility="hidden" />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="confirmed"
              fill="#9A0E31"
              className="bar"
              label={{position: 'top', color: 'white'}}
              barSize="10%"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }

  renderActiveBarGraph = () => {
    const {dayWiseStateDetails} = this.state
    return (
      <div className="bar-graph-bg">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            width={800}
            height={450}
            data={dayWiseStateDetails.slice(
              dayWiseStateDetails.length - 11,
              dayWiseStateDetails.length - 1,
            )}
            margin={{top: 5}}
          >
            <CartesianGrid strokeDasharray="" visibility="hidden" />
            <XAxis dataKey="date" />
            <YAxis visibility="hidden" />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="active"
              fill="#0A4FA0"
              className="bar"
              label={{position: 'top', color: 'white'}}
              barSize="10%"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }

  renderRecoveredBarGraph = () => {
    const {dayWiseStateDetails} = this.state
    return (
      <div className="bar-graph-bg">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            width={800}
            height={450}
            data={dayWiseStateDetails.slice(
              dayWiseStateDetails.length - 11,
              dayWiseStateDetails.length - 1,
            )}
            margin={{top: 5}}
          >
            <CartesianGrid strokeDasharray="" visibility="hidden" />
            <XAxis dataKey="date" />
            <YAxis visibility="hidden" />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="recovered"
              fill="#216837"
              className="bar"
              label={{position: 'top', color: 'white'}}
              barSize="10%"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }

  renderDeceasedBarGraph = () => {
    const {dayWiseStateDetails} = this.state
    return (
      <div className="bar-graph-bg">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            width={800}
            height={450}
            data={dayWiseStateDetails.slice(
              dayWiseStateDetails.length - 11,
              dayWiseStateDetails.length - 1,
            )}
            margin={{top: 5}}
          >
            <CartesianGrid strokeDasharray="" visibility="hidden" />
            <XAxis dataKey="date" />
            <YAxis visibility="hidden" />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="deceased"
              fill="#474C57"
              className="bar"
              label={{position: 'top', color: 'white'}}
              barSize="10%"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }

  renderDistrictsAndBarGraphs = () => {
    const {activeTab} = this.state
    switch (activeTab) {
      case 'CONFIRMED':
        return (
          <div>
            {this.getSortedConfirmedDistricts()}
            {this.renderConfirmedBarGraph()}
          </div>
        )

      case 'ACTIVE':
        return (
          <div>
            {this.getSortedActiveDistricts()}
            {this.renderActiveBarGraph()}
          </div>
        )

      case 'RECOVERED':
        return (
          <div>
            {this.getSortedRecoveredDistricts()}
            {this.renderRecoveredBarGraph()}
          </div>
        )
      case 'DECEASED':
        return (
          <div>
            {this.getSortedDeceasedDistricts()}
            {this.renderDeceasedBarGraph()}
          </div>
        )
      default:
        return null
    }
  }

  render() {
    const {isLoading, stateName} = this.state
    return (
      <>
        <Header />
        {isLoading ? (
          <div className="about-loader-bg" testid="loader">
            <Loader type="TailSpin" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <div className="state-wise-details-bg">
            <div className="state-wise-details-name-container">
              <p className="state-wise-details-name">{stateName}</p>
            </div>
            {this.renderTotalStatsTabs()}
            {this.renderDistrictsAndBarGraphs()}
            {this.renderCompleteGraphs()}
          </div>
        )}

        <Footer />
      </>
    )
  }
}

export default StateWiseDetails
