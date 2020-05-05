import React                 from 'react'
import ClientInfoDetails     from './ClientInfoDetails'
import AddressShow           from '../../address/AddressShow'
import ContactShow           from '../../contact/ContactShow'
import {useClientQuery}      from '../../../../graphql/graphql'
import {useApplicationState} from '../../../hooks/useApplicationState'

const ClientInfoComponent = () => {

  const {clientCurrentAppId} = useApplicationState()

  const {data} = useClientQuery({
    notifyOnNetworkStatusChange: true,
    variables: {
      id: clientCurrentAppId as string
    },
    skip: !clientCurrentAppId || !Number(+clientCurrentAppId)
  })

  const client : any = React.useMemo(() => (!data || !data.data) ? {
    addresses: [],
    contacts: []
  } : data.data
  , [data])

  return (
    <>
      {data ? (
        <div className={'d-flex col-md-12 flex-fill flex-column p-3 '}>
          <ClientInfoDetails {...client}/>
          <div className={'d-flex'}>
            <div className={'px-1'}><AddressShow addresses={client.addresses}/></div>
            <div className={'px-1'}><ContactShow contacts={client.contacts}/></div>
          </div>
        </div>) : null}
    </>
  )
}

export default ClientInfoComponent
