import React               from 'react'
import {ADDRESS_FLAGS_INT} from '../../../interface'
import ComponentInfoRender from '../../../../components/Info/ComponentInfoRender'
import {FontAwesomeIcon}   from '@fortawesome/react-fontawesome'
import {faHome}            from '@fortawesome/free-solid-svg-icons/faHome'
import {faPhoneAlt}        from '@fortawesome/free-solid-svg-icons/faPhoneAlt'
import {CONTACT_TYPES}     from '../../../constants'
import {
  IAddressModel,
  IContactModal
}                          from '../../../../graphql/models'

interface IClientModel {
  id : string
  descriptionShort : string
  description : string,
  flag : string,
  taxNumber : string,
  clientNumber : string,
  addresses : IAddressModel[],
  contacts : IContactModal[]
}

interface IClientInfoRenderProps {
  client : IClientModel
}

const ClientInfoRender = ({client} : IClientInfoRenderProps) => {

  return (
    <div className={'d-flex p-2 d-flex flex-column flex-fill'}>
      <div className={'d-flex flex-row justify-content-start text-center align-items-center flex-fill'}>
        <ComponentInfoRender label={'NAME'} value={client.descriptionShort}/>
        <ComponentInfoRender label={'TAX NUMBER'} value={client.taxNumber}/>
        <ComponentInfoRender label={'CLIENT NUMBER'} value={client.clientNumber}/>
      </div>
      <div className={'d-flex flex-row flex-fill'}>
        <div className={'m-2 text-upper letter-spacing mr-2'}>
          <div className={'d-flex align-items-center mb-2'}>
            <div className={'font-smaller-1 font-weight-600 mr-5 '}><FontAwesomeIcon icon={faHome}/></div>
          </div>
          <div>
            <table className={'border-top-double'} data-action-root>
              <tbody>
                {client.addresses ?
                  client.addresses.map((address : IAddressModel, index : number) => {
                    return (
                      <tr key={address.id}
                                            className={`font-weight-300 border-bottom${index % 2 === 1 ? ' row-odd' : ' row-even'}`}>
                        <td>
                          <div className={'py-1 d-flex flex-column'}>
                            <div
                                                        className={'px-1 font-smaller-2 font-weight-600'}>{ADDRESS_FLAGS_INT[+address.flag]}</div>
                            <div
                                                        className={'font-smaller-5  font-weight-300'}>&nbsp;{address.description}&nbsp;</div>
                          </div>
                        </td>
                        <td className={'px-1 '}>{address.street}</td>
                        <td className={'px-4'}>{address.zipCode}&nbsp;{address.city}</td>
                        <td className={'px-1'}>{address.state}</td>
                      </tr>
                    )
                  }) : null
                }
              </tbody>
            </table>
          </div>
        </div>
        <div className={'m-2 text-upper letter-spacing'}>

          <div className={'d-flex align-items-center mb-2'}>

            <div className={'font-smaller-1  mr-5 font-weight-600'}><FontAwesomeIcon icon={faPhoneAlt}/>
            </div>
          </div>
          <table className={'border-top-double'} data-action-root>
            <tbody>
              {
                client.contacts ? client.contacts.map((contact : IContactModal) => {
                  return (
                    <tr key={contact.id} className={'border-bottom'}>
                      <td>
                        <div className={'d-flex flex-column'}>
                          <div className={'d-flex justify-content-start text-left mt-1'}>
                            <div
                                                        className={'font-smaller-2 font-weight-600 letter-spacing '}>{CONTACT_TYPES[+contact.flag]}</div>
                          </div>
                          <div className={'font-weight-300'}>
                            <div
                                                        className={'font-weight-300 font-smaller-2'}>{contact.value}&nbsp;</div>
                            <div className={'px-1 font-smaller-5'}>{contact.description}</div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )
                }) : null
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>

  )

}

export default ClientInfoRender
