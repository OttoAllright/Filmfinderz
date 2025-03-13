import { FormattedMessage } from 'react-intl'

export default function Title() {
  return ( 
    <div>
      <h1><FormattedMessage id="app.title" /></h1>
      <p><FormattedMessage id="app.subtitle" /></p>
    </div>
  )
}