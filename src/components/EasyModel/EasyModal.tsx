import ReactDOM         from 'react-dom'
import React            from 'react'
import {
  DialogError,
  DialogInfo,
  DialogQuestion
}                       from '../Dialog/DialogBasic'
import {ApolloProvider} from '@apollo/react-hooks'

import {client} from '../../apollo'

const openDialog = (elemHolder : any, Component : any) => {
  ReactDOM.render(Component, elemHolder)
}

const openDialogApolloProvider = (elemHolder : any, Component : any) => {

  const CMD = () => {
    return (
      <ApolloProvider client={client}>
        {Component}
      </ApolloProvider>
    )
  }
  ReactDOM.render(<CMD/>, elemHolder)
}

export const EasyDialog = (f : any) => {
  const elemHolder = document.createElement('div')
  document.body.appendChild(elemHolder)
  const closeDialog = () => {
    ReactDOM.unmountComponentAtNode(elemHolder)
    setTimeout(() => {
      document.body.removeChild(elemHolder)
    })
  }
  setTimeout(() => {
    f(closeDialog, openDialog.bind(null, elemHolder))
  })
}

export const EasyDialogApolloProvider = (f : any) => {
  const elemHolder = document.createElement('div')
  document.body.appendChild(elemHolder)
  const closeDialog = () => {
    ReactDOM.unmountComponentAtNode(elemHolder)
    setTimeout(() => {
      document.body.removeChild(elemHolder)
    })
  }
  setTimeout(() => {
    f(closeDialog, openDialogApolloProvider.bind(null, elemHolder))
  })
}

export const easyDialogError = (message : string) => {

  EasyDialog((closeDialog : () => any, openDialog : (data : any) => any) => {
    const Component = () => {
      return (
        <>
          <DialogError text={message} buttonLabel={'OK'} actionButton={closeDialog}
                                 closeAction={closeDialog}/>
        </>
      )
    }
    openDialog(<Component/>)
  })
}

export const easyDialogInfo = (message : string, action ?: () => void) => {

  EasyDialog((closeDialog : () => any, openDialog : (data : any) => any) => {
    const Component = () => {
      return (
        <>
          <DialogInfo text={message} buttonLabel={'OK'} action={action ? action : closeDialog}
                                closeAction={closeDialog}/>
        </>
      )
    }
    openDialog(<Component/>)
  })
}

export const easyDialogQuestion = (message ?: string, action ?: () => void) => {

  EasyDialog((closeDialog : () => any, openDialog : (data : any) => any) => {
    const Component = () => {
      const handlerAction = () => {
        if (action) {
          action()
        }
        closeDialog()
      }
      return (
        <>
          <DialogQuestion text={message} title={'Info'} action={handlerAction} closeAction={closeDialog}/>
        </>
      )
    }
    openDialog(<Component/>)
  })
}

