import React                      from 'react'
import {IClientModel}             from '../../../../../graphql/models'
import {FontAwesomeIcon}          from '@fortawesome/react-fontawesome'
import {faEdit}                   from '@fortawesome/free-solid-svg-icons/faEdit'
import {EasyDialogApolloProvider} from '../../../../../components/EasyModel/EasyModal'
import {CenteredDialog}           from '../../../../../components/Dialog/DialogBasic'
import ClientViewShort            from '../../../client/views/ClientViewShort'
import ClientSearch               from '../../../client/modal/ClientSearch'
import {useAppCalculationTemp}    from '../../../../hooks/useAppCalculationTemp'

const CalculationPreviewClientPart = () => {

  const {calculation, calculationSetSupplier} = useAppCalculationTemp()
  return (
    <div className={'d-flex flex-column pb-1 pl-1 pr-2 bg-color-aqua-opacity hw-calculation-client-preview relative'}>
      <ClientViewShort client={calculation.supplier as IClientModel}/>
    </div>
  )
}

export default CalculationPreviewClientPart

export const openDialogAddEditClient = (handlerClientSelected : (client : IClientModel) => void) => {
  EasyDialogApolloProvider((closeDialog : () => any, openDialog : (data : any) => any) => {
    const Component = () => {
      return (
        <>
          <CenteredDialog
                        closeAction={closeDialog}
                        Component={ClientSearch}
                        componentRenderProps={{
                          cancelFunction: closeDialog,
                          successFunction: handlerClientSelected
                        }}
          />
        </>
      )
    }
    openDialog(<Component/>)
  })
}
