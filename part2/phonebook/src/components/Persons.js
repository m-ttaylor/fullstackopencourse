const Person = ({ name, number, id, onClick }) => {
    return <p>{name} {number} <button onClick={onClick(id, name)}>delete</button></p>
}
  
const Persons = ({persons, handleDelete}) => {
    if (persons.length < 1) return (<>...</>)

    return (
        persons.map(person => <Person key={person.id} name={person.name} number={person.number} id={person.id} onClick={handleDelete}/>)
    )
}

export default Persons