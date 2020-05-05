import React, {useState}      from 'react'
import AutoCompleteFindClient from '../../autocomplete/AutoCompleteFindClient'
import ClientViewShort        from '../views/ClientViewShort'
import {Button}               from '../../../../components/Button'
import Paper                  from '../../../../components/Paper'
import {IClientModel}         from '../../../../graphql/models'
import ButtonsForm            from '../../../../components/Button/ButtonsForm'

export interface IClientSearchProps {
  successFunction : (client : IClientModel) => void
  cancelFunction : () => void
}

const ClientSearch = ({successFunction, cancelFunction} : IClientSearchProps) => {

  const [state, setState] = useState()

  const setClient = (data : any) => {
    setState(data)
  }

  const handler = () => {
    if (!state) {
      return
    }
    successFunction(state as any)
    cancelFunction()
  }

  return (
    <Paper className={'d-flex flex-column hw-paper'} header={'Find Client'}>
      <div className={'d-flex align-items-center justify-content-around'}>
        <AutoCompleteFindClient processSelected={setClient} helperText={'search by name/tin/client #'}/>
      </div>
      <div className={'m-1 px-4 bg-light p-3'}>
        <ClientViewShort client={state as any}/>
      </div>

      <div className={'d-flex flex-row justify-content-around mt-3'}>
        <ButtonsForm
              buttonsCancel={{
                label: 'CANCEL',
                action: cancelFunction,
                color: 'danger'
              }}
              buttonSubmit={{
                label: 'OK',
                action: handler,
                color: 'primary'
              }}
        />
      </div>
    </Paper>
  )

}

export default ClientSearch
