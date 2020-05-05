import React             from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {IconProp}        from '@fortawesome/fontawesome-svg-core'

export interface IAppBarProps extends React.PropsWithChildren<any> {
  label : string,
  icon : IconProp,
  fixed ?: boolean,
  menuAction ?: () => void
}

const AppBar = ({label, fixed, icon, menuAction, children} : IAppBarProps) => {
  return (
    <div className={`hw-appbar-root ${fixed ? `${' fixed'}` : ''}`}>
      <div className={'hw-toolbar-root'}>
        <div className={'hw-toolbar-app-name'}>
          <div onClick={menuAction} className={'hw-appbar-menu-icon'}>
            <FontAwesomeIcon icon={icon}/>
          </div>
          <div className={'hw-appbar-label'}>{label}</div>
        </div>
        <div className={'hw-children d-flex flex-row'}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default AppBar
