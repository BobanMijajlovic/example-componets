import React from 'react'

import {
  faAddressCard,
  faEnvelope
}                    from '@fortawesome/free-regular-svg-icons'
import ShowComponent from '../basic/ShowComponent'
import Button        from './Button'
import {faPlus}      from '@fortawesome/free-solid-svg-icons'
import Fab           from './Fab'

export default () => {
  return (
    <div style={{width: '100%'}}>
      <div>Buttons allow users to take some actions,
                and comes in variety of styles,colors.<br/>
                All attributes except label are optional.
                ( larger or smaller buttons? Use the size property.)
                (Buttons with icon and label.For example, if you have a login button you can label it with a login
                icon).

      </div>
      <ShowComponent>
        <div>
          <Button label={'Standard'}/>
        </div>
        <div>
                    Standard button
        </div>
      </ShowComponent>

      <ShowComponent>
        <Button label={'Primary'} color={'primary'}/>
        <div>
                    Primary button
        </div>
      </ShowComponent>

      <ShowComponent>
        <Button label={'Secondary'} color={'secondary'}/>
        <div>
                    Secondary button
        </div>
      </ShowComponent>

      <ShowComponent>
        <Button label={'Success'} color={'success'}/>
        <div>
                    Success button
        </div>
      </ShowComponent>

      <ShowComponent>
        <Button label={'Danger'} color={'danger'}/>
        <div>
                    Danger button
        </div>
      </ShowComponent>

      <ShowComponent>
        <Button label={'Info'} color={'info'}/>
        <div>
                    Info button
        </div>
      </ShowComponent>

      <ShowComponent>
        <Button label={'Icon'} color={'primary'} icon={faEnvelope}/>
        <div>
                    Button with icon
        </div>
      </ShowComponent>

      <ShowComponent>
        <Button label={'Icon'} color={'primary'} iconRight={faAddressCard}/>
        <div>
                    Button with icon right
        </div>
      </ShowComponent>

      <ShowComponent>
        <Button label={'Icon'} color={'primary'} icon={faEnvelope} iconRight={faAddressCard}/>
        <div>
                    explain here
        </div>
      </ShowComponent>

      <ShowComponent>
        <Button label={'Glossy'} color={'primary'} glossy/>
        <div>
                    explain here
        </div>
      </ShowComponent>

      <ShowComponent>
        <Button label={'Glossy'} color={'danger'} glossy/>
        <div>
                    Glossy button style
        </div>
      </ShowComponent>

      <ShowComponent>
        <Button label={'Outline'} color={'primary'} outline/>
        <div>
                    Outline button style
        </div>
      </ShowComponent>

      <ShowComponent>
        <Button label={'Outline'} color={'danger'} outline/>
        <div>
                    explain here
        </div>
      </ShowComponent>

      <ShowComponent>
        <Button label={'Small'} color={'primary'} size={'sm'}/>
        <div>
                    Button small
        </div>
      </ShowComponent>

      <ShowComponent>
        <Button label={'Large'} color={'primary'} size={'lg'}/>
        <div>
                    Button large
        </div>
      </ShowComponent>

      <ShowComponent>
        <Button label={'Disabled'} disabled/>
        <div>
                    Button disabled
        </div>
      </ShowComponent>

      <ShowComponent>
        <Button label={'Disable'} disabled color={'primary'}/>
        <div>
                    explain here
        </div>
      </ShowComponent>

      <ShowComponent>
        <Button label={'Full width'} fullWidth color={'primary'} outline/>
        <div>
                    Button full width
        </div>
      </ShowComponent>

      <ShowComponent>
        <Button label={'Full width'} fullWidth color={'primary'}/>
        <div>
                    explain here
        </div>
      </ShowComponent>

      <ShowComponent>
        <Fab icon={faPlus} color={'primary'}/>
        <div>
                    explain here
        </div>
      </ShowComponent>

      <ShowComponent>
        <Fab icon={faPlus} size={'sm'} color={'primary'}/>
        <div>
                    explain here
        </div>
      </ShowComponent>

      <ShowComponent>
        <Fab icon={faPlus} size={'lg'} color={'primary'}/>
        <div>
                    explain here
        </div>
      </ShowComponent>

    </div>
  )
}

