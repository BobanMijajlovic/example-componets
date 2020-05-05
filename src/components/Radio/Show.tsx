import React from 'react'

import ShowComponent     from '../basic/ShowComponent'
import {RadioGroup}      from '../basic/withState'
import {Radio}           from '../Radio'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
  faBaseballBall,
  faBiking
}                        from '@fortawesome/free-solid-svg-icons'
import {faGrinHearts}    from '@fortawesome/free-regular-svg-icons'

const Example1 = (props : any) => {

  return (
    <div>
      <div><FontAwesomeIcon icon={props.icon}/></div>
      <div>{props.label}</div>
    </div>
  )
}

export default () => {

  return (
    <div style={{position: 'relative'}}>
      <div>Radio buttons allow the user to select one option from a set.<br/>
                (You can change the placement of the label:)
      </div>
      <ShowComponent>
        <RadioGroup
                    label={'Label align right column'}
                    helperText={'helper text here'}
                    component-direction={'column'}
                    align-items={'end'}
        >
          {
            ({value, onRadioChanged} : { value : string | number, onRadioChanged : (value ?: string | number) => void }) => (

              <>
                <Radio
                                    value={1}
                                    label={'label some  1'}
                                    selected={value}
                                    onRadioChanged={onRadioChanged}
                />
                <Radio
                                    value={2}
                                    label={'label  that is only 2'}
                                    selected={value}
                                    onRadioChanged={onRadioChanged}
                />

                <Radio
                                    value={3}
                                    label={'label 3'}
                                    selected={value}
                                    onRadioChanged={onRadioChanged}
                />
              </>
            )

          }
        </RadioGroup>
        <div>
                    explain here
        </div>
      </ShowComponent>

      <ShowComponent>
        <RadioGroup
                    label={'Label main 2'}
                    helperText={'helper text here'}
                    component-direction={'row'}
                    align-items={'end'}
        >
          {
            ({value, onRadioChanged} : { value : string | number, onRadioChanged : (value ?: string | number) => void }) => (

              <>
                <Radio
                                    value={1}
                                    selected={value}
                                    onRadioChanged={onRadioChanged}
                                    component-direction={'column'}
                ><Example1 label={'biking'} icon={faBiking}/></Radio>
                <Radio
                                    value={2}
                                    selected={value}
                                    onRadioChanged={onRadioChanged}
                                    component-direction={'column'}
                ><Example1 label={'Ball'} icon={faBaseballBall}/></Radio>

                <Radio
                                    value={3}
                                    label={'label 3'}
                                    selected={value}
                                    onRadioChanged={onRadioChanged}
                                    component-direction={'column'}
                ><Example1 label={'Hearts'} icon={faGrinHearts}/></Radio>
              </>
            )

          }
        </RadioGroup>
        <div>
                    explain here
        </div>
      </ShowComponent>

      <ShowComponent>
        <RadioGroup
                    label={'Label main 3'}
                    helperText={'helper text here'}
                    component-direction={'column'}
                    align-items={'start'}
                    error={'erro here'}
        >
          {
            ({value, onRadioChanged} : { value : string | number, onRadioChanged : (value ?: string | number) => void }) => (

              <>
                <Radio
                                    value={1}
                                    selected={value}
                                    onRadioChanged={onRadioChanged}
                                    component-direction={'row-reverse'}
                ><Example1 label={'biking'} icon={faBiking}/></Radio>
                <Radio
                                    value={2}
                                    selected={value}
                                    onRadioChanged={onRadioChanged}
                                    component-direction={'row-reverse'}
                ><Example1 label={'Ball'} icon={faBaseballBall}/></Radio>

                <Radio
                                    value={3}
                                    label={'label 3'}
                                    selected={value}
                                    onRadioChanged={onRadioChanged}
                                    component-direction={'row-reverse'}
                ><Example1 label={'Hearts'} icon={faGrinHearts}/></Radio>
              </>
            )

          }
        </RadioGroup>
        <div>
                    explain here
        </div>
      </ShowComponent>

      <ShowComponent>
        <RadioGroup
                    label={'Label main 4'}
                    helperText={'helper text here'}
                    component-direction={'row'}
                    align-items={'center'}
        >
          {
            ({value, onRadioChanged} : { value : string | number, onRadioChanged : (value ?: string | number) => void }) => (

              <>
                <Radio
                                    value={1}
                                    selected={value}
                                    onRadioChanged={onRadioChanged}
                                    component-direction={'row'}
                ><Example1 label={'biking'} icon={faBiking}/></Radio>
                <Radio
                                    value={2}
                                    selected={value}
                                    disabled
                                    onRadioChanged={onRadioChanged}
                                    component-direction={'row'}
                ><Example1 label={'Ball'} icon={faBaseballBall}/></Radio>

                <Radio
                                    value={3}
                                    label={'label 3'}
                                    selected={value}
                                    onRadioChanged={onRadioChanged}
                                    component-direction={'row'}
                ><Example1 label={'Hearts'} icon={faGrinHearts}/></Radio>
              </>
            )

          }
        </RadioGroup>
        <div>
                    explain here
        </div>
      </ShowComponent>

    </div>

  )
}
