import './index.css'

const LanguageFilterItem = props => {
  const {eachItem, isActive, onClickLanguage} = props
  const {language, id} = eachItem

  const clickcedButton = () => {
    onClickLanguage(id)
  }

  const activeIdStyle = isActive ? 'border-blue' : ''
  return (
    <li>
      <button
        type="button"
        className={`language-button ${activeIdStyle}`}
        onClick={clickcedButton}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
