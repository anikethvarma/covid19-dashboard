import './index.css'

const StateItem = props => {
  const {stateItemDetails} = props
  const {
    name,
    confirmed,
    active,
    recovered,
    deceased,
    population,
  } = stateItemDetails

  return (
    <li className="state-item-li">
      <p className="state-item-name">{name}</p>
      <p className="state-item-para red">{confirmed}</p>
      <p className="state-item-para blue">{active}</p>
      <p className="state-item-para green">{recovered}</p>
      <p className="state-item-para grey">{deceased}</p>
      <p className="state-item-para white">{population}</p>
    </li>
  )
}

export default StateItem
