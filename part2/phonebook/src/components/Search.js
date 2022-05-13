const Search = ({ text,value, onChange}) => (
    <>
    {text} <input value={value} onChange={onChange} />
    </>
)

export default Search