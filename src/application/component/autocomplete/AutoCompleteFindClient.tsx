import React                          from 'react'
import {IClientModel}                 from '../../../graphql/models'
import AutoCompleteWithValidation     from '../../../forms/componentsWithValidation/AutoCompleteWithValidation'
import {useValidation}                from '../../../validation'
import ApolloAsyncCall                from '../../../graphql/ApolloAsyncCallClass'
import {openDialogAddClientFormFull}  from '../client/client-form/ClientForm'
import AutoCompleteResultRenderClient from '../client/autocomplete/AutoCompleteResultRenderClient'
import {FontAwesomeIcon}              from '@fortawesome/react-fontawesome'
import {faUserEdit} from '@fortawesome/free-solid-svg-icons/faUserEdit'
import {
  KeyboardEventCodes,
  useExternalKeyboard
}                   from '../../../components/hooks/useExternalKeybaord'

interface IAutoCompleteWithValidationModel {
  value : string
}

export interface IAutoCompleteBasicProps {
  processSelected : (client : IClientModel) => void,
  label ?: string,
  helperText ?: string
}

const AutoCompleteFindClient = ({processSelected, label, helperText} : IAutoCompleteBasicProps) => {

  const validation = useValidation<IAutoCompleteWithValidationModel>()
  const handlerSearch = async (value : string) : Promise<any> => {
    value = value.trim()
    const data : any = await ApolloAsyncCall.clientsFind(value)
    if (value.length !== 0 && data.length === 0) {
      validation.setFieldError('value', 'No clients found with this rule')
    }
    return data
  }

  const handlerOpenAddClientDialog = () => {
    const fn = (client : IClientModel) => {
      processSelected(client)
      focus()
    }
    openDialogAddClientFormFull(fn)
  }

  useExternalKeyboard((e : KeyboardEvent) => {
    handlerOpenAddClientDialog()
  }, true, [KeyboardEventCodes.Insert])

  const focus = () => {
    const data = validation.getFieldRef('value')
    if (!data) {
      return
    }
    (data.ref as any).current.focus()
  }

  return (
    <div className={'d-flex align-items-center justify-content-around width-parent-full'}>
      <div>
        <div className={'hw-button small-padding primary outline'} onClick={handlerOpenAddClientDialog}>
          <FontAwesomeIcon icon={faUserEdit}/>
        </div>
      </div>
      <div className={'mx-2 width-parent-three-quarter'}>
        <AutoCompleteWithValidation
                    validation={{
                      useValidation: validation,
                      model: 'value',
                      rule: {}
                    }}
                    focusOnMount={true}
                    classInputText={'lined-version'}
                    label={label}
                    fullWidth
                    helperText={helperText}
                    ComponentResultRender={AutoCompleteResultRenderClient}
                    handlerSearch={handlerSearch}
                    handlerSelectValue={processSelected}
        />
      </div>
    </div>
  )
}

export default AutoCompleteFindClient

