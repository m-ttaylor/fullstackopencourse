const Form = ({onSubmit, handlers, values}) => (
    <form onSubmit={onSubmit}>
        <FormItem onChange={handlers[0]} value={values[0]} />
        <FormItem onChange={handlers[1]} value={values[1]} />
        <div>
            <button type="submit">add</button>
        </div>
    </form>
)

const FormItem = ({ value, onChange }) => (
    <div>
        name: <input value={value} onChange={onChange} />
    </div>
)

export default Form