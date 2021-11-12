import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstats = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class GithubPopularRepos extends Component {
  state = {
    itemsList: [],
    ActiveId: languageFiltersData[0].id,
    apiStatus: apiStatusConstats.initial,
  }

  componentDidMount() {
    this.getProducts()
  }

  onClickLanguage = id => {
    this.setState({ActiveId: id}, this.getProducts)
  }

  getUpdatedData = popularRepos => {
    const updata = popularRepos.map(data => ({
      name: data.name,
      id: data.id,
      issuesCount: data.issues_count,
      forksCount: data.forks_count,
      starsCount: data.stars_count,
      avatarUrl: data.avatar_url,
    }))

    return updata
  }

  getProducts = async () => {
    this.setState({apiStatus: apiStatusConstats.loading})
    const {ActiveId} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${ActiveId}`

    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)
    const fetchedData = await response.json()

    if (response.ok === true) {
      const popularRepos = fetchedData.popular_repos
      const updatedData = this.getUpdatedData(popularRepos)
      this.setState({
        itemsList: updatedData,
        apiStatus: apiStatusConstats.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstats.failure})
    }
  }

  renderFailedView = () => (
    <img
      src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
      alt="failure view"
    />
  )

  getResult = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstats.loading:
        return this.renderLoadingView()
      case apiStatusConstats.success:
        return this.renderSuccessView()
      case apiStatusConstats.failure:
        return this.renderFailedView()
      default:
        return null
    }
  }

  renderLoadingView = () => (
    <div testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderSuccessView = () => {
    const {itemsList} = this.state
    return (
      <ul className="repository-list">
        {itemsList.map(eachItem => (
          <RepositoryItem eachItem={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  render() {
    const {ActiveId} = this.state

    return (
      <div className="page-bg">
        <h1>Popular</h1>
        <ul className="ul-container">
          {languageFiltersData.map(eachItem => (
            <LanguageFilterItem
              key={eachItem.id}
              eachItem={eachItem}
              isActive={eachItem.id === ActiveId}
              onClickLanguage={this.onClickLanguage}
            />
          ))}
        </ul>
        <div className="result-container">{this.getResult()}</div>
      </div>
    )
  }
}

export default GithubPopularRepos
