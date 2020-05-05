import React     from 'react'
import {Tooltip} from './index'

export default () => {
  return (
    <div style={{
      display: 'flex',
      height: '300px',
      marginTop: '200px',
      flexDirection: 'column',
      justifyContent: 'flex-start'
    }}>
      <div style={{margin: '40px'}}>
        <Tooltip
                    text={'TEST TOOLTIP TOP'}
                    position={'top'}
                    type={'info'}
        />
      </div>
      <div style={{margin: '40px'}}>
        <Tooltip

                    text={'TEST TOOLTIP TOP LEFT'}
                    position={'top-left'}
                    type={'error'}

        />
      </div>
      <div style={{margin: '40px'}}>
        <Tooltip
                    text={'TEST TOOLTIP TOP-RIGHT'}
                    position={'top-right'}
                    type={'question'}

        />
      </div>

    </div>
  )

}
