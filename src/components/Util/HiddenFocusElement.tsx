import React, {forwardRef} from 'react'

const HiddenFocusElement = forwardRef((props, ref : React.Ref<any>) => {

  return (
    <div className={'absolute'} style={{maxWidth: '0px', maxHeight: '0px'}}>
      <input ref={ref} style={{maxWidth: '0px', maxHeight: '0px', padding: '0px', border: '0px'}}/>
    </div>
  )
})

export default HiddenFocusElement
