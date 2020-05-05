import React         from 'react'
import {get as _get} from 'lodash'

export interface IEmptyTagProps {
  model : any,
  field : string,
  placeholder ?: string,
  condition?:boolean
}

const EmptyTag = ({model, field, placeholder} : IEmptyTagProps) => {

  const data = React.useMemo(() => {
    return _get(model, field)
  }, [model, field])

  return (
    <>
      {data ? data :
        placeholder ? <span className={'opacity-2'}>{placeholder}</span> : <> &nbsp;</>}
    </>
  )
}

export default EmptyTag

