import React from 'react'

import {
  assign,
  createMachine
}                   from 'xstate'
import {useMachine} from '@xstate/react'

import {ACTIONS_CLIENT}              from './client-info/ClientInfoDetails'
import {openDialogClientInfo}        from './client-form/ClientInfo'
import {ACTIONS_ADDRESSES}           from '../address/AddressShow'
import {openDialogAddress}           from '../address/AddressForm'
import {openDialogDeleteModelById}   from '../modal/DeleteModal'
import {ACTIONS_CONTACTS}            from '../contact/ContactShow'
import {openDialogContact}           from '../contact/ContactForm'
import {openDialogAddClientFormFull} from './client-form/ClientForm'
import {ClientDocument}              from '../../../graphql/graphql'
import {IClientModel}                from '../../../graphql/models'
import {useApplicationState}         from '../../hooks/useApplicationState'

type ClientDashboardContext = {
  searchString : string
}

export enum CLIENT_MACHINE_EVENTS {
  ACTIONS_CLIENT_FETCH_CLIENTS = 'ACTIONS_CLIENT_FETCH_CLIENTS',
  ACTIONS_CLIENT_SET_SELECTED_CLIENT = 'ACTION_SET_SELECTED_CLIENT',
  ACTIONS_CLIENT_SET_SEARCH_STRING = 'ACTIONS_CLIENT_SET_SEARCH_STRING',
  ACTIONS_CLIENT_ADD = 'ACTIONS_CLIENT_ADD_NEW',
}

export enum MACHINE_STATES {
  LOADED = 'loaded',
  RENDERED = 'rendered'
}

export type ClientDashboardEvent =
    {
      type : CLIENT_MACHINE_EVENTS.ACTIONS_CLIENT_FETCH_CLIENTS
      payload ?: IClientModel[]
    } |
    {
      type : CLIENT_MACHINE_EVENTS.ACTIONS_CLIENT_SET_SEARCH_STRING
      payload : string
    } |
    {
      type : ACTIONS_CONTACTS.ACTION_EVENT_CONTACT_DELETE |
      ACTIONS_CONTACTS.ACTION_EVENT_CONTACT_EDIT |
      ACTIONS_CONTACTS.ACTION_EVENT_CONTACT_ADD |
      ACTIONS_ADDRESSES.ACTION_EVENT_ADDRESS_ADD |
      ACTIONS_ADDRESSES.ACTION_EVENT_ADDRESS_EDIT |
      ACTIONS_CLIENT.ACTION_EVENT_CLIENT_INFO_EDIT |
      ACTIONS_ADDRESSES.ACTION_EVENT_ADDRESS_DELETE |
      CLIENT_MACHINE_EVENTS.ACTIONS_CLIENT_SET_SELECTED_CLIENT |
      CLIENT_MACHINE_EVENTS.ACTIONS_CLIENT_ADD
    }

type ClientDashboardState =
    {
      value : MACHINE_STATES.LOADED | MACHINE_STATES.RENDERED
      context : ClientDashboardContext
    }

const clientDashboardMachine = createMachine<ClientDashboardContext, ClientDashboardEvent, ClientDashboardState>({
  id: 'clientDashboard',
  initial: MACHINE_STATES.LOADED,
  context: {
    searchString: ''
  },
  states: {
    [MACHINE_STATES.LOADED]: {
      on: {
        [CLIENT_MACHINE_EVENTS.ACTIONS_CLIENT_FETCH_CLIENTS]: {
          actions: ['_setFirstClientId'],
          target: MACHINE_STATES.RENDERED
        }
      }
    },
    [MACHINE_STATES.RENDERED]: {
      on: {
        [CLIENT_MACHINE_EVENTS.ACTIONS_CLIENT_SET_SEARCH_STRING]: {
          actions: assign({
            searchString: (_context, event) => event.payload
          })
        },
        [CLIENT_MACHINE_EVENTS.ACTIONS_CLIENT_ADD]: {
          actions: ['_openDialogClientAdd']
        },
        [ACTIONS_CLIENT.ACTION_EVENT_CLIENT_INFO_EDIT]: {
          actions: ['_openDialogClientEdit']
        },
        [ACTIONS_ADDRESSES.ACTION_EVENT_ADDRESS_ADD]: {
          actions: ['_openDialogAddress']
        },
        [ACTIONS_ADDRESSES.ACTION_EVENT_ADDRESS_EDIT]: {
          actions: ['_openDialogAddress']
        },
        [ACTIONS_ADDRESSES.ACTION_EVENT_ADDRESS_EDIT]: {
          actions: ['_openDialogAddress']
        },
        [ACTIONS_ADDRESSES.ACTION_EVENT_ADDRESS_DELETE]: {
          actions: ['_deleteAddress']
        },
        [ACTIONS_CONTACTS.ACTION_EVENT_CONTACT_DELETE]: {
          actions: ['_deleteContacts']
        },
        [ACTIONS_CONTACTS.ACTION_EVENT_CONTACT_ADD]: {
          actions: ['_openDialogContacts']
        },
        [ACTIONS_CONTACTS.ACTION_EVENT_CONTACT_EDIT]: {
          actions: ['_openDialogContacts']
        },
        [CLIENT_MACHINE_EVENTS.ACTIONS_CLIENT_SET_SELECTED_CLIENT]: {
          actions: ['_setSelectedClient']
        }
      }
    },
    closed: {}
  }
})

export const useClientDashboardMachine = () => {

  const {setGlobalClientId, clientCurrentAppId} = useApplicationState()

  const _setFirstClientId = (_context : any, event : any) => {
    if (event.payload && event.payload.length !== 0) {
      setGlobalClientId(event.payload[0].id.toString())
    }
  }

  const querySelectedClient = React.useMemo(() => ({
    query: ClientDocument,
    variables: {
      id: clientCurrentAppId
    }
  }), [clientCurrentAppId])

  const _openDialogClientEdit = () => openDialogClientInfo({
    modelHolder: {model: 'Client', id: clientCurrentAppId as string},
    refQueries: [querySelectedClient]
  })

  const _openDialogClientAdd = () => openDialogAddClientFormFull()

  const _openDialogAddress = (_context : any, event : any) => openDialogAddress({
    modelHolder: {model: 'Client', id: clientCurrentAppId as string},
    addressId: event.payload.id,
    refQueries: [querySelectedClient]
  })

  const _deleteContacts = (_context : any, event : any) => openDialogDeleteModelById({
    modelHolder: {model: 'Contact', id: event.payload.id.toString()},
    refQueries: [querySelectedClient],
    messages: [
      'Are you sure, you want to delete this contact?'
    ],
    title: 'Delete contact'
  })

  const _deleteAddress = (_context : any, event : any) => openDialogDeleteModelById({
    modelHolder: {model: 'Address', id: event.payload.id.toString()},
    refQueries: [querySelectedClient],
    messages: [
      'Are you sure, you want to delete this address?'
    ],
    title: 'Delete address'
  })

  const _openDialogContacts = (_context : any, event : any) => openDialogContact({
    modelHolder: {model: 'Client', id: clientCurrentAppId as string},
    contactId: event.payload.id,
    refQueries: [querySelectedClient],
  })

  const _setSelectedClient = (_context : any, event : any) => {
    if (!event || !event.payload || !event.payload.id) {
      return
    }
    setGlobalClientId(event.payload.id)
  }

  const [machineState, machineSendEvent] = useMachine(clientDashboardMachine, {
    actions: {
      _setFirstClientId,
      _openDialogClientEdit,
      _openDialogClientAdd,
      _openDialogAddress,
      _deleteAddress,
      _deleteContacts,
      _openDialogContacts,
      _setSelectedClient
    }
  })

  const setStringSearch = (searchString : string) => machineSendEvent(CLIENT_MACHINE_EVENTS.ACTIONS_CLIENT_SET_SEARCH_STRING, {payload: searchString})

  const isMachineState = (state : string) => machineState.matches(state)
  const searchString = React.useMemo(() => machineState.context.searchString, [machineState.context.searchString])

  return {
    searchString,
    setStringSearch,
    isMachineState,
    machineSendEvent,
  }
}
