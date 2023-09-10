import React, { forwardRef, useImperativeHandle, useState } from 'react'

const ToggleVisibility = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const toggleVisibility = () => setVisible(!visible)

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility // pass toggleVisibility function to parent component
        }
    })

    return (
        <div>
            {visible && props.children}
            <button
                style={{ marginTop: '2px' }}
                onClick={toggleVisibility}
            >
                {visible ? 'Cancel' : props.buttonLabel}
            </button>
        </div>
    )
})

export default ToggleVisibility