import React, {useState} from 'react'
import {faSearch}        from '@fortawesome/free-solid-svg-icons'
import {
  IInputTextProps,
  InputText
}                        from '../../../../components/InputText'

interface IFindReceiptInputProps extends IInputTextProps {
  handlerFind : (r : string) => void
}

const FindInput = ({handlerFind, value: initVal, ...rest} : IFindReceiptInputProps) => {

  const [value, setValue] : [string, (r : string) => void] = useState(initVal as string)

  const iconActionHandler = (e : any) => {
    handlerFind(value)
  }

  const handlerOnChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setValue(val)
  }

  return (
    <InputText
            value={value}
            onChange={handlerOnChange}
            iconAction={{
              handler: iconActionHandler,
              icon: faSearch
            }}
            {...rest}
    />
  )

}

export default FindInput
