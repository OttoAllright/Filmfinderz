import { useIntl } from 'react-intl'

export default function SearchBar({ value, onChange }) {
  const intl = useIntl();
  
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input 
        type="text" 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={intl.formatMessage({ id: 'app.search.placeholder' })}
        className="search-input"
      />
    </form>
  )
}