import React             from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {CONTACT_TYPES}   from '../../constants'
import {
  faPlus,
  faTimes
}                        from '@fortawesome/free-solid-svg-icons'

import {faEdit}        from '@fortawesome/free-regular-svg-icons'
import {faPhoneAlt}    from '@fortawesome/free-solid-svg-icons/faPhoneAlt'
import {IContactModal} from '../../../graphql/models'
import {faPlusCircle}  from '@fortawesome/free-solid-svg-icons/faPlusCircle'

export interface IContactShowProps {
  contacts : IContactModal[]
}

export enum ACTIONS_CONTACTS {
  ACTION_EVENT_CONTACT_ADD = 'contact-add',
  ACTION_EVENT_CONTACT_EDIT = 'contact-edit',
  ACTION_EVENT_CONTACT_DELETE = 'contact-delete'
}

const ContactShow = ({contacts} : IContactShowProps) => {

  return (

    <>
      <div className={'ml-4 m-2 text-upper letter-spacing'}>

        <div className={'d-flex align-items-center mb-2'}>

          <div className={'font-smaller-1  mr-4 font-weight-600'}><FontAwesomeIcon icon={faPhoneAlt}/></div>
          <div
                        className={'d-flex justify-content-center align-items-center font-smaller-3 hw-button small-padding primary outline p-1'}
                        data-action={ACTIONS_CONTACTS.ACTION_EVENT_CONTACT_ADD}>
            <div className={'px-1 font-smaller-2 '}>ADD</div>
            <div className={''}><FontAwesomeIcon icon={faPlusCircle}/></div>
          </div>
        </div>

        <div>

          <table className={'border-top-double'} data-action-root>
            <tbody>
              {contacts.map((contact : IContactModal) => {
                return (
                  <tr key={contact.id} className={'border-bottom'}>
                    <td>
                      <div className={'d-flex flex-column'}>
                        <div
                                                className={'d-flex justify-content-start text-left mt-1  align-items-center'}>
                          <div
                                                    className={'font-smaller-2 font-weight-600 letter-spacing mr-4 '}>{CONTACT_TYPES[+contact.flag]}</div>
                          <div className={'d-flex ml-4 justify-content-between '}>
                            <div className={'px-1 button-effect '}
                                                         data-action={ACTIONS_CONTACTS.ACTION_EVENT_CONTACT_EDIT}
                                                         data-action-id={contact.id}
                            >
                              <FontAwesomeIcon className={'color-primary'} icon={faEdit}/>
                            </div>
                            <div className={'px-1 button-effect '}
                                                         data-action={ACTIONS_CONTACTS.ACTION_EVENT_CONTACT_DELETE}
                                                         data-action-id={contact.id}
                            >
                              <FontAwesomeIcon className={'color-danger'} icon={faTimes}/>
                            </div>
                          </div>
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
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default ContactShow
