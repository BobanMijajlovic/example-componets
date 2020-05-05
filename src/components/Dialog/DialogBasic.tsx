import React                    from 'react'
import {IconProp}               from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon}        from '@fortawesome/react-fontawesome'
import {
  faExclamationCircle,
  faInfoCircle,
  faQuestionCircle,
  faTimes
}                               from '@fortawesome/free-solid-svg-icons'
import {
  Button,
  IButtonProps
}                               from '../Button'
import MessageComponent         from './MessageComponent'
import MessageComponentRedirect from './MessageComponentRedirect'
import {
  RouteComponentProps,
  withRouter
}                               from 'react-router'

export const DIALOG_CLOSE_BUTTON = 'CLOSE_BUTTON'
export const DIALOG_SUBMIT_BUTTON = 'SUBMIT_BUTTON'

type IActionButtonProps = IButtonProps

export interface IDialogProps {
  title ?: string,
  logo ?: string,
  closeAction ?: () => void,
  Component ?: any,
  componentRenderProps ?: any,
  text ?: string,
  icon ?: IconProp,
  actionButtons ?: IActionButtonProps[],
  className ?: string
  scrollable ?: boolean
}

interface IDialogActionsProps {
  actionButtons : IActionButtonProps[],
  closeAction ?: () => void
}

interface IRegistrationDialogProps {
  error ?: boolean,
  title ?: string,
  text : string,
  sub ?: string
}

interface IActivationDialogProps extends RouteComponentProps {
  error ?: boolean,
  title ?: string,
  text : string
}

const DialogActions = ({actionButtons} : IDialogActionsProps) => {

  return (
    <div className={'hw-dialog-action'}>
      {
        actionButtons.map((buttonProps : IActionButtonProps, key : number) => {
          return (
            <Button
                            key={key}
                            onClick={buttonProps.onClick}
                            color={buttonProps.color ? buttonProps.color : 'primary'}
                            outline
                            label={buttonProps.label ? buttonProps.label : 'TITLE'}
            />
          )
        })
      }
    </div>
  )
}

const DialogBasic = ({closeAction, text, title, logo, Component, componentRenderProps, actionButtons, icon,scrollable, className} : IDialogProps) => {
  const propsContext = componentRenderProps ? componentRenderProps : {}

  const DialogContent = () => {
    return (
      <>
        <div className={`hw-dialog-content${scrollable ? ' hw-dialog-scrollable' : ''}${className ? ` ${className}` : ''}`}>
          {
            Component ? (
              <Component
                                    {...propsContext}
                                    closeDialog={closeAction}
              />
            ) :
              text ? text : null
          }
          {
            icon ? (
              <div className={`hw-dialog-icon${className ? ` ${className}` : ''}`}>
                <FontAwesomeIcon icon={icon}/>
              </div>) : null
          }

        </div>
      </>
    )
  }
  return (
    <div className={'hw-dialog'}>
      <div className={`hw-dialog-root${className ? ` ${className}` : ''}`}>

        {title || logo ?
          (
            <div
                            className={`hw-dialog-header d-flex justify-content-between${logo ? ' hw-dialog-logo' : ''}${className ? ` ${className}` : ''}`}>
              {logo ? 'LOGO' : title}
              {
                closeAction ? (
                  <div className={'hw-close-dialog'} onClick={closeAction}>
                    <FontAwesomeIcon icon={faTimes}/>
                  </div>
                ) : null
              }
            </div>
          ) : null
        }
        <DialogContent/>
        {
          actionButtons ? <DialogActions actionButtons={actionButtons} closeAction={closeAction}/> : null
        }
      </div>
    </div>
  )
}
export default DialogBasic

export const CenteredDialog = (props : IDialogProps) => {
  return (
    <div className={'hw-dialog-centered-root'}>
      <div className={'hw-dialog-shadow d-flex '}></div>
      <DialogBasic {...props} />
    </div>
  )
}

export const DialogError = ({text, buttonLabel, actionButton, closeAction} : { text : string, buttonLabel : string, actionButton : (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => void, closeAction ?: () => void }) => {
  return (
    <CenteredDialog
            title={'ERROR'}
            text={text}
            icon={faExclamationCircle}
            className={'error'}
            closeAction={closeAction}
            actionButtons={
              [
                {
                  onClick: actionButton,
                  label: buttonLabel,
                  color: 'danger'
                }
              ]
            }

    />
  )
}

export interface IDialogBasicInfoProps {
  text ?: string
  buttonLabel ?: string
  action ?: (e : React.MouseEvent<HTMLButtonElement>) => void
  closeAction ?: (e : React.MouseEvent<HTMLElement>) => void
}

export interface IDialogBasicQuestionProps {
  text ?: string
  title ?: string
  action ?: (e : React.MouseEvent<HTMLButtonElement>) => void
  closeAction ?: () => void
}

export const DialogInfo = ({text, buttonLabel, action} : IDialogBasicInfoProps) => {
  return (
    <CenteredDialog
            closeAction={() => {}}
            title={'Info'}
            text={text}
            icon={faInfoCircle}
            className={'info'}
            actionButtons={
              [
                {
                  onClick: action,
                  label: buttonLabel ? buttonLabel : 'OK',
                  color: 'primary'
                }
              ]
            }
    />
  )
}

export const DialogQuestion = ({text, title, closeAction, action} : IDialogBasicQuestionProps) => {

  return (
    <CenteredDialog
            closeAction={closeAction}
            title={title ? title : 'Question'}
            text={text}
            icon={faQuestionCircle}
            actionButtons={
              [
                {
                  onClick: action,
                  label: 'OK',
                  color: 'primary'
                },
                {
                  onClick: closeAction,
                  label: 'CANCEL',
                  color: 'danger'
                }
              ]
            }
            className={'question'}
    />
  )
}

export const DialogMessageComponent = (props : IRegistrationDialogProps) => {
  return (
    <DialogBasic
            Component={MessageComponent}
            componentRenderProps={{
              ...props
            }}
    />
  )
}

export const DialogMessageComponentRedirect = withRouter((props : IActivationDialogProps) => {
  return (
    <DialogBasic
            Component={MessageComponentRedirect}
            componentRenderProps={{
              ...props
            }}
    />
  )
})

