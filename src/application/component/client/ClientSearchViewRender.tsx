import {CLIENT_MACHINE_EVENTS} from './useClientDashboard'
import React                   from 'react'
import {IComponentRenderProps} from '../_common/SearchView'

const Component = ({model} : IComponentRenderProps) => {
  return (
    <div
            className={'d-flex flex-fill flex-column  p-0 pb-1  border-bottom cursor-pointer row-odd-div '}
            key={model.id}
            data-action={CLIENT_MACHINE_EVENTS.ACTIONS_CLIENT_SET_SELECTED_CLIENT}
            data-action-id={model.id}
    >
      <div className={'d-flex flex-row flex-fill justify-content-between p-1'}>
        <div className={'d-flex flex-column font-smaller-4'}>
          <div className={'font-smaller-6 text-center  line-height-1'}>
                        TAX NUMBER
          </div>
          <div>{model.taxNumber}</div>
        </div>
        <div className={'d-flex flex-column font-smaller-4'}>
          <div className={' font-smaller-6 text-center  line-height-1'}>
                        CLIENT NUMBER
          </div>
          <div className={'text-center'}>{model.clientNumber}</div>
        </div>
      </div>
      <div className={'d-flex flex-column align-items-center'}>
        <div className={'font-bigger-1 font-weight-300 line-height-11'}>{model.descriptionShort}</div>
        <div className={'font-smaller-4 text-center'}>{model.description}</div>
      </div>
    </div>
  )
}

export default Component
