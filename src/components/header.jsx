import { FormattedMessage } from 'react-intl'

export default function Header() {
  return (
    <header>
      <nav id='pages'>
        <a href="/"><FormattedMessage id="app.nav.home" /></a>
        <a href="/faq"><FormattedMessage id="app.nav.faq" /></a>
        <a href="/info"><FormattedMessage id="app.nav.info" /></a>
      </nav>
    </header>
  )
}