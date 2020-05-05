import React from 'react'

import ShowComponent from '../basic/ShowComponent'
import {CheckBox}    from '../basic/withState'

export default () => {

  return (
    <div style={{position: 'relative'}}>

      <ShowComponent>
        <CheckBox
                    label={'Simple'}

        />
        <div>
                    explain here
        </div>
      </ShowComponent>

      <ShowComponent>
        <CheckBox
                    label={'Simple left-label'}
                    component-direction={'row-reverse'}
        />
        <div>
                    explain here
        </div>
      </ShowComponent>

      <ShowComponent>
        <CheckBox
                    label={'Simple disabled'}
                    disabled
        />
        <div>
                    explain here
        </div>
      </ShowComponent>

    </div>

  )
}
