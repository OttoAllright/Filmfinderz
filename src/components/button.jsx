import { FormattedMessage } from 'react-intl'

function Button({ onClick }) {
  return (
    <button onClick={onClick}>
      <FormattedMessage id="app.search.button" />
    </button>
  )
}

export default Button