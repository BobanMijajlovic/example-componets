import React           from 'react'
import {
  assign,
  createMachine
}                      from 'xstate'
import {useMachine}    from '@xstate/react'
import {IReceiptModel} from '../../../interface'

type ReceiptDashboardContext = {
  searchString : string
  receiptNumber : string
}

export enum EVENTS {
  EVENT_FETCH_RECEIPT = 'EVENT_FETCH_RECEIPT',
  EVENT_SET_SELECTED_RECEIPT = 'EVENT_SET_SELECTED_RECEIPT',
  EVENT_SET_SEARCH_STRING = 'EVENT_SET_SEARCH_STRING'
}

export enum MACHINE_STATES {
  LOADED = 'loaded',
  RENDERED = 'rendered'
}

export type ReceiptDashboardEvent =
    {
      type : EVENTS.EVENT_FETCH_RECEIPT
      payload ?: IReceiptModel[]
    } |
    {
      type : EVENTS.EVENT_SET_SEARCH_STRING
      payload : string
    } |
    {
      type : EVENTS.EVENT_SET_SELECTED_RECEIPT
      payload : string
    }

type ReceiptDashboardState =
    {
      value : MACHINE_STATES.LOADED | MACHINE_STATES.RENDERED,
      context : ReceiptDashboardContext
    }

const receiptDashboardMachine = createMachine<ReceiptDashboardContext, ReceiptDashboardEvent, ReceiptDashboardState>({
  id: 'receiptDashboard',
  initial: MACHINE_STATES.LOADED,
  context: {
    searchString: '',
    receiptNumber: ''
  },
  states: {
    [MACHINE_STATES.LOADED]: {
      on: {
        [EVENTS.EVENT_FETCH_RECEIPT]: {
          actions: ['_setFirstReceiptNumber'],
          target: MACHINE_STATES.RENDERED
        }
      }
    },
    [MACHINE_STATES.RENDERED]: {
      on: {
        [EVENTS.EVENT_SET_SEARCH_STRING]: {
          actions: assign({
            searchString: (_context, event) => event.payload
          })
        },
        [EVENTS.EVENT_SET_SELECTED_RECEIPT]: {
          actions: assign({
            receiptNumber: (_context, event) => {
              return (event as any).payload.id
            }
          })
        }
      }
    },
    closed: {}
  },
})

export const useReceiptDashboardMachine = () => {

  const _setFirstReceiptNumber = (_context : any, event : any) => {
    if (event.payload && event.payload.length !== 0) {
      machineSendEvent(EVENTS.EVENT_SET_SELECTED_RECEIPT, {payload: event.payload[0]})
    }
  }

  const [machineState, machineSendEvent] = useMachine(receiptDashboardMachine, {
    actions: {
      _setFirstReceiptNumber
    }
  })

  const setStringSearch = (searchString : string) => machineSendEvent(EVENTS.EVENT_SET_SEARCH_STRING, {payload: searchString})
  const isMachineState = (state : string) => machineState.matches(state)
  const searchString = React.useMemo(() => machineState.context.searchString, [machineState.context.searchString])
  const selectedReceipt = React.useMemo(() => machineState.context.receiptNumber, [machineState.context.receiptNumber])

  return {
    searchString,
    selectedReceipt,
    setStringSearch,
    isMachineState,
    machineSendEvent
  }
}
