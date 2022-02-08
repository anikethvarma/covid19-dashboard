import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BsSearch} from 'react-icons/bs'
import {BiChevronRightSquare} from 'react-icons/bi'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import StateItem from '../StateItem'

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

const formattedStatesList = statesList.map(eachElement => ({
  stateCode: eachElement.state_code,
  stateName: eachElement.state_name,
}))

class Home extends Component {
  state = {
    searchInput: '',
    suggestionList: [],
    isSuggesting: false,
    statesData: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    const response = await fetch('https://apis.ccbp.in/covid19-state-wise-data')
    const jsonData = await response.json()

    const resultList = []

    const keyNames = Object.keys(jsonData)

    keyNames.forEach(keyName => {
      if (jsonData[keyName]) {
        const {total} = jsonData[keyName]

        const confirmed = total.confirmed ? total.confirmed : 0
        const deceased = total.deceased ? total.deceased : 0
        const recovered = total.recovered ? total.recovered : 0
        const tested = total.tested ? total.tested : 0
        const population = jsonData[keyName].meta.population
          ? jsonData[keyName].meta.population
          : 0

        if (
          formattedStatesList.find(state => state.stateCode === keyName) !==
          undefined
        ) {
          resultList.push({
            stateCode: keyName,
            name: formattedStatesList.find(state => state.stateCode === keyName)
              .stateName,
            confirmed,
            deceased,
            recovered,
            tested,
            population,
            active: confirmed - (deceased + recovered),
          })
        }
      }
    })
    this.setState({statesData: resultList, isLoading: false})
  }

  getTotalConfirmed = () => {
    const {statesData} = this.state
    const getTotalConfirmedArray = statesData.map(
      eachElement => eachElement.confirmed,
    )
    const totalConfirmed = getTotalConfirmedArray.reduce(
      (pre, acc) => pre + acc,
    )
    return totalConfirmed
  }

  getTotalActive = () => {
    const {statesData} = this.state
    const getTotalActiveArray = statesData.map(
      eachElement => eachElement.active,
    )
    const totalActive = getTotalActiveArray.reduce((pre, acc) => pre + acc)
    return totalActive
  }

  getTotalRecovered = () => {
    const {statesData} = this.state
    const getTotalRecoveredArray = statesData.map(
      eachElement => eachElement.recovered,
    )
    const totalRecovered = getTotalRecoveredArray.reduce(
      (pre, acc) => pre + acc,
    )
    return totalRecovered
  }

  getTotalDeceased = () => {
    const {statesData} = this.state
    const getTotalDeceasedArray = statesData.map(
      eachElement => eachElement.confirmed,
    )
    const totalDeceased = getTotalDeceasedArray.reduce((pre, acc) => pre + acc)
    return totalDeceased
  }

  searchSuggestions = () => {
    const {searchInput} = this.state
    if (searchInput !== '') {
      const getSuggestionList = formattedStatesList.filter(eachElement =>
        eachElement.stateName.toLowerCase().includes(searchInput.toLowerCase()),
      )
      this.setState({suggestionList: getSuggestionList, isSuggesting: true})
    } else {
      this.setState({isSuggesting: false})
    }
  }

  renderSuggestion = () => {
    const {suggestionList} = this.state
    return (
      <ul className="suggestion-ul">
        {suggestionList.map(eachElement => (
          <Link
            to={`/state/${eachElement.stateCode}`}
            className="nav-link"
            key={eachElement.stateCode}
          >
            <li className="suggestion-li" key={eachElement.stateCode}>
              <p className="suggestion-state-name">{eachElement.stateName}</p>
              <button type="button" className="suggestion-button">
                {eachElement.stateCode}{' '}
                <BiChevronRightSquare className="suggestion-icon" />
              </button>
            </li>
          </Link>
        ))}
      </ul>
    )
  }

  onSearchState = event => {
    this.setState({searchInput: event.target.value}, this.searchSuggestions)
  }

  render() {
    const {statesData, isLoading, isSuggesting} = this.state

    return (
      <>
        <Header />
        <div className="home-bg">
          {isLoading ? (
            <div className="about-loader-bg" testid="loader">
              <Loader type="TailSpin" color="#ffffff" height={50} width={50} />
            </div>
          ) : (
            <div className="home-bg">
              <div className="home-input-container">
                <BsSearch className="home-input-search-icon" />
                <input
                  text="search"
                  className="home-input"
                  placeholder="Enter State"
                  onChange={this.onSearchState}
                />
              </div>
              {isSuggesting && <div>{this.renderSuggestion()}</div>}
              <ul className="home-total-tabs-ul">
                <li className="home-total-tabs-li">
                  <p className="home-total-tabs-head red">Confirmed</p>
                  <img
                    src="https://res.cloudinary.com/dp6mcbgji/image/upload/v1644090918/covid_19_dashboard_confirmed_logo_iebyax.png"
                    alt="confirmed"
                    className="home-total-tabs-image"
                  />
                  <p className="home-total-count red">
                    {this.getTotalConfirmed()}
                  </p>
                </li>
                <li className="home-total-tabs-li">
                  <p className="home-total-tabs-head blue">Active</p>
                  <img
                    src="https://res.cloudinary.com/dp6mcbgji/image/upload/v1644091069/covid_19_dashboard_active_logo_ssdh3c.png"
                    alt="confirmed"
                    className="home-total-tabs-image"
                  />
                  <p className="home-total-count blue">
                    {this.getTotalActive()}
                  </p>
                </li>
                <li className="home-total-tabs-li">
                  <p className="home-total-tabs-head green">Recovered</p>
                  <img
                    src="https://res.cloudinary.com/dp6mcbgji/image/upload/v1644091123/covid_19_dashboard_recovered_logo_a2zuxo.png"
                    alt="confirmed"
                    className="home-total-tabs-image"
                  />
                  <p className="home-total-count green">
                    {this.getTotalRecovered()}
                  </p>
                </li>
                <li className="home-total-tabs-li">
                  <p className="home-total-tabs-head grey">Deceased</p>
                  <img
                    src="https://res.cloudinary.com/dp6mcbgji/image/upload/v1644091183/covid_19_dashboard_deceased_logo_ihuiz4.png"
                    alt="confirmed"
                    className="home-total-tabs-image"
                  />
                  <p className="home-total-count grey">
                    {this.getTotalDeceased()}
                  </p>
                </li>
              </ul>
              <ul className="home-table">
                <li className="home-table-row">
                  <p className="home-table-header-name">States/UT</p>
                  <p className="home-table-header">Confirmed</p>
                  <p className="home-table-header">Active</p>
                  <p className="home-table-header">Recovered</p>
                  <p className="home-table-header">Deceased</p>
                  <p className="home-table-header">Population</p>
                </li>
                {statesData.map(eachElement => (
                  <StateItem
                    stateItemDetails={eachElement}
                    key={eachElement.stateCode}
                  />
                ))}
              </ul>
            </div>
          )}
        </div>
        <Footer />
      </>
    )
  }
}
export default Home
