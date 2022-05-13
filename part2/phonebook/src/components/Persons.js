const Person = ({ name, number }) => {
    return <p>{name} {number}</p>
}
  
const Persons = ({persons}) => {
    if (persons.length < 1) return (<>...</>)

    return (
        persons.map(person => <Person key={person.id} name={person.name} number={person.number}/>)
    )
}

export default Persons