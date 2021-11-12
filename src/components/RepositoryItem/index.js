import './index.css'

const RepositoryItem = props => {
  const {eachItem} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = eachItem

  return (
    <li className="list-bg">
      <img src={avatarUrl} alt={name} className="item-image" />
      <h1 className="para-heading">{name}</h1>
      <div className="para-pro">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="image-icon"
        />
        <p>{starsCount}</p>
        <p>stars</p>
      </div>
      <div className="para-pro">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="image-icon"
        />
        <p>{forksCount}</p>
        <p>forks</p>
      </div>
      <div className="para-pro">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="image-icon"
        />
        <p>{issuesCount}</p>
        <p>open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
