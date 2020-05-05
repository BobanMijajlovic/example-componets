import React    from 'react'
import {AppBar} from './index'
import {faBars} from '@fortawesome/free-solid-svg-icons'

const Show = () => {
  return (
    <div style={{minWidth: 1000, position: 'relative'}}>
      <AppBar icon={faBars} label={'DEAL-SELL POS'}/>

    </div>
  )
}

export default Show
