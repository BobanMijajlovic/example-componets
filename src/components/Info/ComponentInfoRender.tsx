import React from 'react'

export interface IComponentInfoRender {
  label ?: string
  value ?: any
  'value-align' ?: 'text-right' | 'text-left'
  classNameValue ?: string
  classNameLabel ?: string
}

const ComponentInfoRender = ({label, value, 'value-align': valueAlign, classNameValue, classNameLabel} : IComponentInfoRender) => {
  return (
    <div className={'d-flex flex-column info-component text-upper'}>
      <div
                className={`font-smaller-4  font-weight-300 border-bottom-color-primary px-2${classNameLabel ? ` ${classNameLabel}` : ''}`}>{label}</div>
      <div
                className={`font-bigger-1 font-weight-400 pt-1 ${valueAlign ? ` ${valueAlign}` : 'text-center'}${classNameValue ? ` ${classNameValue}` : ''}`}>{value}</div>
    </div>
  )
}

export default ComponentInfoRender
