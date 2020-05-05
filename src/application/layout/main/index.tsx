import React, {useState}               from 'react'
import {Switch}                        from 'react-router-dom'
import {
  Route,
  RouteComponentProps,
  withRouter
}                                      from 'react-router'
import MainNavBar                      from '../../navbars/MainNavBar'
import {Dashboard as AccountDashboard} from '../../component/account'

import ClientDashboard         from '../../component/client/ClientDashboard'
import {faBars,}               from '@fortawesome/free-solid-svg-icons'
import {AppBar}                from '../../../components/AppBar'
import LoginStatus             from '../../auth/LoginStatus'
import SaleDashboard           from '../../component/sale/SaleDashboard'
import ItemsDashboard          from '../../component/items/ItemsDashboard'
import SettingsDashboard       from '../../component/settings/SettingsDashboard'
import AdministrationDashboard from '../../component/administration/AdministrationDashboard'
import {useApplicationState}   from '../../hooks/useApplicationState'
import {APP_LAYOUT}            from '../../constants'
import {clearAccessToken}      from '../../../apollo/accessToken'
import ButtonHeaderComponent   from '../../../components/Button/ButtonHeaderComponent'
import {useAppBar}             from '../../hooks/useAppBar'
import CalculationPdf          from '../../component/administration/calculation/pdf/CalculationPdf'
import {useVatsLast}           from '../../hooks/useVats'

export interface ISideBarState {
  open : boolean,
  mini : boolean,
  visible : boolean,
  selected ?: string
}

const MainLayout = (props : RouteComponentProps) => {
  const [state, setState] = useState({
    open: false,
    mini: true,
    visible: true
  } as ISideBarState)

  const {appBarState} = useAppBar('header')

  useVatsLast()

  const {setRedirectLink} = useApplicationState()
    /** call to initiate vats */

  const onClickHandler = () => {
    setState({
      ...state,
      ...{
        visible: !state.visible
      }
    })
  }

  const onClickBarListHandler = () => {
    setState({
      ...state,
      ...{
        mini: !state.mini,
        open: !state.open
      }
    })
  }

  const changeStatus = () => {
    clearAccessToken()
    setRedirectLink(APP_LAYOUT.AUTH, 'login')
  }

  return (
    <>
      <div className={'hw-app-layout-main'}>
        <AppBar icon={faBars} menuAction={onClickHandler} label={'DEAL-SELL POS'}>

          {appBarState.buttonsForPage.length !== 0 ?
            <div><ButtonHeaderComponent buttons={appBarState.buttonsForPage}/></div> :
            <div>{appBarState.buttonsForPage.length}</div>}
          <LoginStatus changeStatus={changeStatus} label={'LOGOUT'}/>
        </AppBar>
        <div className={'hw-app-layout-main-root'}>
          <MainNavBar state={state} onClickBarListHandler={onClickBarListHandler}/>
          <div
                        className={`hw-app-layout-main-data${state.mini && state.visible ? ' mini' : state.open && state.visible ? ' opened' : ' hide'}`}>
            <Switch>
              <Route path={'/application/main/accounts'}><AccountDashboard/></Route>
              <Route path={'/application/main/client'}>
                <ClientDashboard/>
              </Route>
              <Route path={'/application/main/items'}>
                <ItemsDashboard/>
              </Route>
              <Route path={'/application/main/sale'}>
                <SaleDashboard/>
              </Route>
              <Route path={'/application/main/settings'}>
                <SettingsDashboard/>
              </Route>
              <Route path={'/application/main/administration'}>
                <AdministrationDashboard/>
              </Route>
              <Route path={'/application/main/calculation-pdf'}>
                <CalculationPdf/>
              </Route>
            </Switch>
          </div>
        </div>

      </div>
    </>
  )
}

export default withRouter(MainLayout)
