import React         from 'react'
import {
  InputText,
  InputTextDatePicker,
  InputTextPassword
}                    from '../basic/withState'
import {
  faKey,
  faUser
}                    from '@fortawesome/free-solid-svg-icons'
import ShowComponent from '../basic/ShowComponent'
import {NavLink}     from 'react-router-dom'

export default () => {

  return (
    <div>
      <div>
                The input component is used to capture text input from the user.<br/>
                It has support for error, helper text, label, icon and comes in variety of styles,colors and types.<br/>
                All the attributes set on input that are in the list of props. <NavLink to={'/input-api'}>Input Props
                API </NavLink><br/>
                All attributes except label are optional.

      </div>
      <ShowComponent>
        <InputText
                    label={'Simple'}
                    helperText={'helper Text'}

        />
        <div>
                    Simple input with helper text.
        </div>
      </ShowComponent>

      <ShowComponent>
        <InputTextPassword
                    required
                    label={'Simple iconAction'}
                    helperText={'helper Text required'}
        />
        <div>
                    Required input with define type of input, helper text and icon.
        </div>
      </ShowComponent>

      <ShowComponent>
        <InputTextPassword
                    required
                    label={'Simple icon & iconAction'}
                    helperText={'helper Text required'}
                    icon={faKey}
        />
        <div>
                    Input with the predefined type, which is a password, required, action icon and helper text.
        </div>
      </ShowComponent>

      <ShowComponent>
        <InputTextDatePicker
                    required
                    label={'Simple icon - Date picker'}
                    helperText={'helper Text required'}
                    icon={faUser}
        />
        <div>
                    Input with the predefined type, which is a password, required, action icon, simple icon and helper
                    text.
        </div>
      </ShowComponent>

      <ShowComponent>
        <InputText
                    label={'Simple error'}
                    helperText={'helper Text'}
                    error={'error text'}
        />
        <div>
                    Simple input with error and helper text.
        </div>
      </ShowComponent>

      <ShowComponent>
        <InputText
                    label={'Simple error - boolean'}
                    error
        />
        <div>
                    Simple input with error.
        </div>
      </ShowComponent>

      <ShowComponent>
        <InputText
                    label={'Simple disabled'}
                    helperText={'helper Text'}
                    disabled
                    value={'disabled'}
        />
        <div>
                    Input with disabled attribute and helper text.
        </div>
      </ShowComponent>

      <ShowComponent>
        <InputText
                    label={'Simple readonly'}
                    helperText={'Readonly'}
                    fullWidth={true}
                    readOnly
                    value={'readonly'}
        />
        <div>
                    Input with readonly attribute and helper text.
        </div>
      </ShowComponent>

      <ShowComponent>
        <InputText
                    label={'Readonly & Disabled'}
                    helperText={'Readonly & Disabled'}
                    fullWidth={true}
                    readOnly
                    disabled
                    value={'Readonly & Disabled'}
        />
        <div>
                    Input with attributes disabled, readonly and helper text.
        </div>
      </ShowComponent>

    </div>

  )
}
