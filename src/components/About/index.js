import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import Header from '../Header'
import Footer from '../Footer'

class About extends Component {
  state = {faqsList: [], isLoading: true}

  componentDidMount() {
    this.getfaqs()
  }

  getfaqs = async () => {
    const response = await fetch('https://apis.ccbp.in/covid19-faqs')
    const jsonData = await response.json()
    console.log(jsonData.faq)
    this.setState({faqsList: jsonData.faq, isLoading: false})
  }

  render() {
    const {faqsList, isLoading} = this.state
    return (
      <>
        <Header />
        {isLoading ? (
          <div className="about-loader-bg" testid="loader">
            <Loader type="TailSpin" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <div className="about-bg">
            <h1 className="about-main-heading">About</h1>
            <p className="about-main-paragraph">
              COVID-19 vaccines be ready for distribution
            </p>
            <ul className="about-faq-ul">
              {faqsList.map(eachElement => (
                <li className="about-faq-li">
                  <p className="about-faq-question">{eachElement.question}</p>
                  <p className="about-faq-answer">{eachElement.answer}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
        <Footer />
      </>
    )
  }
}
export default About
