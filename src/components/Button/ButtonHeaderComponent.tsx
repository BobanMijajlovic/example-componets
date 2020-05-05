import React                                  from 'react'
import ButtonShortcut, {IButtonShortcutProps} from './ButtonShortcut'
import {useExternalKeyboard}                  from '../hooks/useExternalKeybaord'

export interface IButtonHeaderComponentProps {
  buttons : IButtonShortcutProps[]
}

const ButtonHeaderComponent = ({buttons} : IButtonHeaderComponentProps) => {

  const shortCuts : string[] = React.useMemo(() => buttons.map(x => x.shortcut), [buttons]) as string[]

  useExternalKeyboard((e : KeyboardEvent) => {
    const button = buttons.find(x => x.shortcut === e.code || x.shortcut === e.key)
    if (button && button.onClick) {
      button.onClick({} as any)
    }

  }, true, shortCuts)

  return (
    <div className={'d-flex flex-row mr-4'}>
      {
        buttons.map((button : IButtonShortcutProps, key : number) => {
          return (
            <div key={key} className={'pr-2'}>
              <ButtonShortcut {...button} />
            </div>
          )
        })
      }
    </div>
  )
}

export default ButtonHeaderComponent
