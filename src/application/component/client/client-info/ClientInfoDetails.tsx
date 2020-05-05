import React             from 'react'
import {CLIENT_FLAG}     from '../../../interface/client-part'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {IClientModel}    from '../../../../graphql/models'
import ComponentInfo     from '../../../../components/Info/ComponentInfo'
import {faEdit}          from '@fortawesome/free-solid-svg-icons'

export enum ACTIONS_CLIENT {
  ACTION_EVENT_CLIENT_INFO_EDIT = 'client-edit'
}

const ClientInfoDetails = ({id, taxNumber, clientNumber, descriptionShort, description, flag} : IClientModel) => {
  return (
    <div className={'d-flex flex-wrap text-upper mb-4 '}>

      <div className={'mb-2 text-center'}>
        <div className={'hw-button small-padding primary outline mr-2'}
                     data-action={ACTIONS_CLIENT.ACTION_EVENT_CLIENT_INFO_EDIT}
                     data-action-id={id}
        >
          <FontAwesomeIcon icon={faEdit }/>
        </div>

      </div>

      <div
                className={'d-flex flex-wrap flex-column component-info mb-2 ml-4 text-center text-upper align-items-left '}>

        <ComponentInfo

                    classNameValue={'font-bigger-4 font-weight-600 border-bottom-double mb-2'}
                    value={description}
        />

        <ComponentInfo
                    label={'TAX NUMBER'}
                    classNameLabel={'text-left min-width-120'}
                    value={taxNumber}

        />
        <ComponentInfo
                    label={'CLIENT NUMBER'}
                    classNameLabel={'text-left min-width-120'}
                    value={clientNumber}
        />
        <ComponentInfo
                    label={'CLIENT TYPE'}
                    value={CLIENT_FLAG[+flag]}
                    classNameLabel={'text-left min-width-120'}

        />

      </div>
    </div>
  )
}

export default ClientInfoDetails
