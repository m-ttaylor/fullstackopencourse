const Form = ({onSubmit, handlers, values}) => (
    <form onSubmit={onSubmit}>
        <FormItem onChange={handlers[0]} value={values[0]} itemName='name' />
        <FormItem onChange={handlers[1]} value={values[1]} itemName='number' />
        <div>
            <button type="submit">add</button>
        </div>
    </form>
)

const FormItem = ({ itemName, value, onChange }) => (
    <div>
        {itemName}: <input value={value} onChange={onChange} />
    </div>
)

export default Form