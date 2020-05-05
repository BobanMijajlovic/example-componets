import React             from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {IconProp}        from '@fortawesome/fontawesome-svg-core'
import {TABS_ACTIONS}    from './TabsHeader'

export interface ITabItemProps {
  tabIcon ?: IconProp
  tabName : string
  active ?: boolean
  index : number
}

const TabItem = ({tabIcon, tabName, active, index} : ITabItemProps) => {

  const classRoot = React.useMemo(() => {
    return `d-flex flex-column justify-content-center align-items-center hw-tab-item-root${active ? ' active' : ''}`
  }, [active])

  return (
    <div className={classRoot}
             data-action={TABS_ACTIONS.TABS_ACTION_CHANGE_TAB}
             data-action-id={index}
    >
      {tabIcon ? <div> <FontAwesomeIcon icon={tabIcon}/></div> : <></>}
      <div>{tabName}</div>
    </div>
  )
}

export default TabItem
