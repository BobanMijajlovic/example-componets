import React, {useState} from 'react'
import {IconProp}        from '@fortawesome/fontawesome-svg-core'
import TabsHeader        from './TabsHeader'
import TabsContent from './TabsContent'
import {
  IUseOptimizeEventData,
  useOptimizeEventClick
}                  from '../hooks/useOptimizeEventClick'

export interface ITabDefinition {
  tabName : string,
  tabIcon ?: IconProp
  tabContent ?: React.ComponentType
}

export interface ITabState {
  active : number
}

export interface ITabsProps {
  tabs : ITabDefinition[]
  stateTab : ITabState
  scrollable ?: boolean
}

const Tabs = ({tabs, stateTab, scrollable} : ITabsProps) => {

  const [state, setState] : [number, (r : number) => void] = useState(stateTab.active)

  const {onClickHandler} = useOptimizeEventClick({
    eventHandler (data : IUseOptimizeEventData) {
      setState(+(data.id as string))
    }
  })
  return (
    <div className={'d-flex flex-column align-items-center w-100 hw-tabs-root'}>
      <div className={'d-flex w-100'} onClick={onClickHandler} data-action-root>
        <TabsHeader tabs={tabs} state={state}/>
      </div>
      <div className={'w-100 p-2 tab-content overflow-overlay'}>
        <TabsContent tabs={tabs} state={state}/>
      </div>
    </div>
  )
}

export default Tabs
