import React             from 'react'
import {IUseValidation}  from 'react-hook-custom-validation'
import {
  faPencilAlt,
  faTimes
}                        from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {CONTACT_TYPES}   from '../../../constants'
import {IContactModal}   from '../../../../graphql/models'

interface IClientContactTableProps<T> {
  validation : IUseValidation<T>
  fieldParentName : string,
  handlerOnClickEvent : (action : string, index ?: number) => void
}

const ClientContactTable = <T extends any>({validation, handlerOnClickEvent} : IClientContactTableProps<T>) => {
  return (
    <>
      <div className={'hw-client-contact-grid'}>
        <div className={'hw-client-contact-grid-row'}>
          <div>TYPE</div>
          <div>VALUE</div>
          <div>&nbsp;</div>
        </div>
        {
          (validation.state).contacts && (validation.state).contacts.map((contactModel : IContactModal, key : number) => {
            const flag = CONTACT_TYPES[contactModel.flag as any]
            return (
              <div key={key} className={'hw-client-contact-grid-row '}>
                <div>{flag}</div>
                <div>{contactModel.value}</div>
                <div>
                  <div className={'hw-client-contact-row'}>
                    <FontAwesomeIcon icon={faPencilAlt}
                                                         onClick={() => handlerOnClickEvent('edit', key)}/>
                    <FontAwesomeIcon icon={faTimes}
                                                         onClick={() => handlerOnClickEvent('delete', key)}/>
                  </div>
                </div>
              </div>

            )
          })
        }
      </div>
    </>
  )
}

export default ClientContactTable
