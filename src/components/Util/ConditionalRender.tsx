import React from 'react'
import {PropsWithChildren} from 'react'

export interface IConditionalRendering extends PropsWithChildren<any> {
  condition : boolean
}

const ConditionalRendering = ({condition, children} : IConditionalRendering) => {

  if (!condition) {
    return <></>
  }
  return (
    <>
      {children}
    </>
  )
}

export default ConditionalRendering
