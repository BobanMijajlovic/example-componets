import React                   from 'react'
import {
  FORMAT_RULE_ZIP,
  IUseValidation,
  minLength,
  required
}                              from 'react-hook-custom-validation'
import InputTextWithValidation from '../../../../forms/componentsWithValidation/InputTextWithValidation'

export interface IClientAddressProps<T> {
  fieldParentName ?: string,
  validation : IUseValidation<T>,
  index ?: number
}

const ClientAddress = <T extends any>({fieldParentName, validation} : IClientAddressProps<T>) => {

  return (
    <div className={'row p-2 '}>
      <div className={'col-md-9'}>
        <InputTextWithValidation
                    required
                    label={'Street'}
                    helperText={'enter street'}
                    validation={{
                      useValidation: validation,
                      model: `${fieldParentName}.street`,
                      rule: {
                        required
                      }
                    }}
        />
      </div>
      <div className={'col-md-3'}>
        <InputTextWithValidation
                    required
                    label={'Zip'}
                    helperText={'enter zip'}
                    validation={{
                      useValidation: validation,
                      model: `${fieldParentName}.zipCode`,
                      rule: {
                        required,
                        minLength: minLength({min: 5})
                      },
                      format: {
                        rule: FORMAT_RULE_ZIP,
                        validationMessage: 'Zip is not valid'
                      }
                    }}
        />
      </div>
      <div className={'col-md-6 mt-3 '}>
        <InputTextWithValidation
                    required
                    label={'City'}
                    helperText={'enter city'}
                    validation={{
                      useValidation: validation,
                      model: `${fieldParentName}.city`,
                      rule: {
                        required
                      }
                    }}
        />
      </div>
      <div className={'col-md-6 mt-3 '}>
        <InputTextWithValidation
                    label={'State'}
                    helperText={'enter state'}
                    validation={{
                      useValidation: validation,
                      model: `${fieldParentName}.state`,

                    }}
        />
      </div>
    </div>
  )
}

export default ClientAddress
