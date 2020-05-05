import React                 from 'react'
import ShowComponent         from '../basic/ShowComponent'
import {NavLink}             from 'react-router-dom'
import {InputTextDatePicker} from '../basic/withState'

export default () => {

  return (
    <div>
      <div>
                The input component is used to capture text input from the user.<br/>
                It has support for error, helper text, label, icon and comes in variety of styles,colors and types.<br/>
                All the attributes set on input that are in the list of props. <NavLink to={'/calendar-api'}>Calendar
                Props API </NavLink><br/>
                All attributes except label are optional.

      </div>
      <ShowComponent>
        <InputTextDatePicker
                    required
                    label={'Simple icon - Date picker'}
                    helperText={'helper Text required'}
                    locales={'us'}
                    align={'align-center'}
                    format={'MMddyyyy'}
        />
        <div>
                    Input with the predefined type, which is a password, required, action icon, simple icon and helper
                    text.
        </div>
      </ShowComponent>
      <ShowComponent>
        <InputTextDatePicker
                    required
                    label={'Simple icon - Date picker'}
                    helperText={'helper Text required'}
                    start-day={'MON'}
                    locales={'fr'}
                    format={'MMddyyyy'}
                    sub-header={'show'}
                    date={new Date()}
        />
        <div>
                    Input with the predefined type, which is a password, required, action icon, simple icon and helper
                    text.
        </div>
      </ShowComponent>
    </div>
  )
}
