import { useState, forwardRef, useImperativeHandle } from 'react'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button
          className="text-white bg-blue-300 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-small rounded-md text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={toggleVisibility}
        >
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button
          className="text-white bg-blue-300 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-small rounded-md text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={toggleVisibility}
        >
          cancel
        </button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'
export default Togglable
