export default function SearchBar({ value, onChange }) {
    return (
      <form onSubmit={(e) => e.preventDefault()}>
        <input 
          type="text" 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter movie name..."
          className='search-input'
        />
      </form>
    )
  }