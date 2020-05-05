import React, {useState} from 'react'
import {Spinner}         from './index'
import Spinner1          from './Spinner1'
import {Button}          from '../Button'

export default () => {

  const [state, setState] : [
    string,
    (s : string) => void
  ] = useState('1')

  const handlerOnClick = (value : string) => {
    setState(value)
  }

  return (
    <div style={{margin: '100px auto'}}>
      <Button label={'Spinner 1'} onClick={() => handlerOnClick('1')}/>
      <Button label={'Spinner 2'} onClick={() => handlerOnClick('2')}/>
      <Button label={'Spinner 3'} onClick={() => handlerOnClick('3')}/>

      {
        state === '1' ? (
          <Spinner/>
        ) : state === '2' ? (<Spinner1 pulse/>) : (<Spinner1/>)
      }
    </div>
  )
}
