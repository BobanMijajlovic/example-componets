import React               from 'react'
import EmptyTag            from '../../../../components/Util/EmptyTag'
import AddressTag          from '../../address/AddressTag'
import {
  IAddressModel,
  IClientModel
}                          from '../../../../graphql/models'
import {ADDRESS_FLAGS_INT} from '../../../interface'

export interface IClientViewBasicProps {
  client : IClientModel
}

const ClientViewShort = ({client} : IClientViewBasicProps) => {

  const address = React.useMemo(() => (!client || !client.addresses) ? undefined :
    client.addresses.find((address : IAddressModel) => +address.flag === ADDRESS_FLAGS_INT.HOME), [client])

  return (
    <div className={'text-align-left mt-2'}>
      <div className={'d-flex  flex-column justify-content-center text-align-left'}>
        <div className={'px-1 font-bold text-upper'}><EmptyTag model={client} field={'descriptionShort'}
                                                            placeholder={'CLIENT NAME'}/></div>
        <small className={'px-1'}><EmptyTag model={client} field={'description'}
                                                    placeholder={'Client business full name'}/> </small>
      </div>

      <div>
        <AddressTag address={address as IAddressModel}/>
      </div>

      <div className={'d-flex  flex-row justify-content-between py-1'}>
        <div className={'d-flex flex-row align-items-center pr-1 pr-4'}>
          <sub className={'opacity-4'}>Tax ID&nbsp;:</sub>
          <div className={'px-1'}><EmptyTag model={client} field={'taxNumber'} placeholder={'#########'}/>
          </div>
        </div>
        <div className={'d-flex flex-row align-items-center px-1'}>
          <sub className={'opacity-4'}>Tax #Num&nbsp;:</sub>
          <div className={'px-1'}><EmptyTag model={client} field={'clientNumber'} placeholder={'#########'}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClientViewShort
