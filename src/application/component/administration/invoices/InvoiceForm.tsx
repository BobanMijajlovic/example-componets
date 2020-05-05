import React, {useState}             from 'react'
import {useApolloClient}             from '@apollo/react-hooks'
import FindInput                     from './FindInput'
import ClientInfoRender              from './ClientInfoRender'
import Fab                           from '../../../../components/Button/Fab'
import {faUserPlus}                  from '@fortawesome/free-solid-svg-icons/faUserPlus'
import {faFilePdf}                   from '@fortawesome/free-regular-svg-icons'
import {openDialogAddClientFormFull} from '../../client/client-form/ClientForm'
import {
  EasyDialogApolloProvider,
  easyDialogError
}                                 from '../../../../components/EasyModel/EasyModal'
import {CenteredDialog}           from '../../../../components/Dialog/DialogBasic'
import InvoicePreview             from './preview/InvoicePreview'
import {
  ClientsDocument,
  GetReceiptByNumberDocument
}                                 from '../../../../graphql/graphql'
import {queryVariablesForClients} from '../../../../graphql/variablesq'
import {parseGQError}             from '../../../../graphql/utils'
import {FontAwesomeIcon}          from '@fortawesome/react-fontawesome'
import {faEdit}                   from '@fortawesome/free-solid-svg-icons'
import {ACTIONS_CLIENT}           from '../../client/client-info/ClientInfoDetails'

interface IModelData {
  value : string
  error ?: string | boolean
  data ?: any
}

interface IInvoiceState {
  client : IModelData
  receipt : IModelData
}

const InvoiceForm = () => {

  const [invoiceState, setInvoiceState] : [IInvoiceState, (r : IInvoiceState) => void] = useState({
    receipt: {
      value: '1586531577448'
    },
    client: {
      value: '107112543'
    }
  })

  const {receipt, client} = invoiceState

  const apolloClient = useApolloClient()

  const handlerFindReceiptNumber = async (value : string) => {
    await apolloClient.query({
      query: GetReceiptByNumberDocument,
      variables: {
        receiptNumber: value
      }
    }).then((result) => {
      if (!result.data || !result.data.data) {
        setInvoiceState({
          ...invoiceState,
          ...{
            receipt: {
              value: value,
              error: 'Receipt not exists in system.'
            }
          }
        })
        return
      }
      setInvoiceState({
        ...invoiceState,
        ...{
          receipt: {
            value: value,
            data: result.data.data
          }
        }
      })
    })
      .catch((e) => {
        const s = parseGQError(e)
        if (s) {
          easyDialogError(s)
        }
      })
  }
  const handlerFindClient = async (value : string) => {
    await apolloClient.query({
      query: ClientsDocument,
      variables: {
        value: queryVariablesForClients(value)
      }
    }).then((result) => {
      if (!result.data || !result.data.data) {
        setInvoiceState({
          ...invoiceState,
          ...{
            client: {
              value: value,
              error: 'Client not exists in system.'
            }
          }
        })
        return
      }
      setInvoiceState({
        ...invoiceState,
        ...{
          client: {
            value: value,
            data: result.data.data
          }
        }
      })
    })
      .catch((e) => {
        const s = parseGQError(e)
        if (s) {
          easyDialogError(s)
        }
      })
  }

  const handlerGenerateInvoice = () => openDialogInvoicePreview(invoiceState.receipt.data.id, invoiceState.client.data.id)

  return (
    <div className={'d-flex flex-row p-2 mt-4'}>
      <div className={'col-md-3'}>
        <FindInput
                    label={'Receipt number'}
                    helperText={'enter fiscal number'}
                    handlerFind={handlerFindReceiptNumber}
                    {...invoiceState.receipt}
        />
        {receipt.data && client.data ?

          <div style={{width: 50}} className={'hw-button small-padding primary outline mr-2'}
                 onClick={() => handlerGenerateInvoice()}
          >
            <FontAwesomeIcon icon={faFilePdf}/>
          </div> : null}

      </div>
      <div className={'col-md-9'}>
        <div className={'d-flex flex-row'}>
          <div className={'col-md-4 relative'}>
            <FindInput
                            label={'Find Client'}
                            helperText={'enter #tin, #client number, #name'}
                            handlerFind={handlerFindClient}
                            {...invoiceState.client}
            />

            <div style={{position: 'absolute', top: -20, right: 15}}>
              <div className={'hw-button small-padding primary outline mr-2'}
                   onClick={() => openDialogAddClientFormFull()}
              >
                <FontAwesomeIcon icon={faUserPlus}/>
              </div>
            </div>
          </div>
          <div className={'col-md-8 relative'}>
            {invoiceState.client.data ? <ClientInfoRender client={invoiceState.client.data}/> : null}
          </div>
        </div>
      </div>
    </div>
  )

}

export default InvoiceForm

export const openDialogInvoicePreview = (receiptId : string, clientId : string) => {
  EasyDialogApolloProvider((closeDialog : () => any, openDialog : (data : any) => any) => {
    const Component = () => {
      const ComponentToRender = () => {
        return (
          <InvoicePreview
                        receiptId={'1'}
                        clientId={'1'}
          />
        )
      }
      return (
        <>
          <CenteredDialog
                        title={'Preview invoice'}
                        closeAction={closeDialog}
                        Component={ComponentToRender}
          />
        </>
      )
    }
    openDialog(<Component/>)
  })
}
