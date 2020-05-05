import {
  useEffect,
  useReducer
} from 'react'

export enum EVENTS {
  NewEvent = 'NewEvent',
  RemoveEvent = 'RemoveEvent'
}

interface IReducerAction {
  type : EVENTS,
  payload : KeyboardEvent

}

interface IDispatchListener {
  stopPropagation : boolean,
  dispatch : any
  keys ?: string[]
}

let listeners : IDispatchListener[] = []

const reducer = (state : KeyboardEvent[], action : IReducerAction) => {
  switch (action.type) {
    case EVENTS.NewEvent:
      return [...state, action.payload]
    case EVENTS.RemoveEvent:
      return state.filter(x => x !== action.payload)
  }
}

/**
 *
 * @param eventHandler : handler to use for key event in component
 * @param stopPropagation : perform stopPropagation()
 * @param keys: list of keys code to react in handler, list is down
 *
 *   useExternalKeyboard((e:KeyboardEvent)=>{
 *        /// process event
 *   },false)
 *
 */
export const useExternalKeyboard = (eventHandler ?: (event : KeyboardEvent) => void, stopPropagation ?: boolean, keys ?: string[]) => {

  const [events, dispatch] = useReducer(reducer, [])

  useEffect(() => {
    if (!eventHandler || events.length === 0) {
      return
    }
    const ev = events[0]
    eventHandler(ev)
    dispatch({
      type: EVENTS.RemoveEvent,
      payload: ev
    })
  }, [eventHandler, events])

  useEffect(() => {
    if (!eventHandler) {
      return
    }
    listeners.push({
      dispatch,
      stopPropagation: !!stopPropagation,
      keys
    })
    return () => {
      listeners = listeners.filter(li => li.dispatch !== dispatch)
    }
  }, [dispatch, eventHandler, keys, stopPropagation])

  const dispatchKeyEvent = (event : KeyboardEvent) => {
    const len = listeners.length
    for (let i = len - 1; i >= 0; i--) {
      const l = listeners[i]
      if (!l.stopPropagation) {
        continue
      }
      if (l.keys) {
        const isKey = !l.keys.every((k) => !(event.key === k || event.code === k))
        if (!isKey) {
          continue
        }
      }
      l.dispatch({
        type: EVENTS.NewEvent,
        payload: event
      })
      return
    }

    for (const l of listeners) {
      const isKey = l.keys && !l.keys.every((k) => !(event.key === k || event.code === k))
      if (!isKey) {
        continue
      }
      l.dispatch({
        type: EVENTS.NewEvent,
        payload: event
      })
    }
  }
  return {
    dispatchKeyEvent
  }
}

export const isKeyboardEvent = (e : KeyboardEvent, keys : string[]) => {
  return !keys.every((x => {
    return !(e.key === x || e.code === x)
  }))
}

export enum KeyboardEventCodes {
  ArrowDown = 'ArrowDown',
  ArrowUp = 'ArrowUp',
  Enter = 'Enter',
  Tab = 'Tab',
  Insert = 'Insert',
  Esc = 'Escape',
  F1 = 'F1',
  F2 = 'F2',
  F3 = 'F3',
  F4 = 'F4',
  F5 = 'F5',
  F6 = 'F6',
  F7 = 'F7',
  F8 = 'F8',
  F9 = 'F9',
  F10 = 'F10',
  F11 = 'F11'
}

