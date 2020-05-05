import React from 'react'

import {
  faAdjust,
  faAnchor,
  faArchway,
  faBiking,
  faBullhorn,
  faKey,
  faUser
}                    from '@fortawesome/free-solid-svg-icons'
import ShowComponent from '../basic/ShowComponent'
import {Select}      from '../basic/withState'

export default () => {

  const options1 = [
    {
      label: 'choose 1',
      value: 'choose 1',
      description: 'choose 1 - desc',
      icon: faUser
    },
    {
      label: 'choose 2',
      value: 'choose 2',
      description: 'choose 2 - desc',
      icon: faKey
    },
    {
      label: 'choose 3',
      value: 'choose 3',
      description: 'choose 3 - desc',
      icon: faAdjust
    },
    {
      label: 'choose 4',
      value: 'choose 4',
      icon: faAnchor
    },
    {
      label: 'choose 5',
      value: 'choose 5',
      description: 'choose 5 - desc',
      icon: faBullhorn
    },
    {
      label: 'choose 6',
      value: 'choose 6',
      description: 'choose 5 - desc',
      icon: faBiking
    },
    {
      label: 'choose 7',
      value: 'choose 7',
      description: 'choose 5 - desc',
      icon: faArchway
    },
    {
      label: 'choose 8',
      value: 'choose 8',
      description: 'choose 5 - desc'
    },
    {
      label: 'choose 9',
      value: 'choose 9',
      description: 'choose 5 - desc'
    },
    {
      label: 'choose 10',
      value: 'choose 10',
      description: 'choose 5 - desc'
    }
  ]

  const makeToChoose = (num : number) => {
    const arr = [...Array(num)].map((x, index) => {
      return {
        label: `label ${index + 11}`,
        value: `choose ${index + 11}`
      }
    })
    return [...options1, ...arr]
  }

  return (
    <div style={{position: 'relative'}}>
      <div>Select components are used for collecting user provided information from a list of options.<br/>
                It has support for error, helper text, label, icons and placeholder.
      </div>
      <ShowComponent>
        <Select
                    label={'Simple'}
                    helperText={'helper Text'}
                    error={false}
                    options={options1}
        />
        <div>
                    Simple select which contains options with icons.
        </div>
      </ShowComponent>

      <ShowComponent>
        <Select
                    label={'Simple - just string options'}
                    helperText={'helper Text'}
                    placeholder={'choose one name '}
                    error={false}
                    options={['boban', 'ivana', 'aleskej']}
        />
        <div>
                    Select with placeholder and define options.
        </div>
      </ShowComponent>

      <div style={{position: 'absolute', top: '700px'}}>
        <ShowComponent>
          <Select
                        label={'absolute positon '}
                        helperText={'helper Text'}
                        error={false}
                        options={options1}
          />
          <div>
                        Select with absolute position.
          </div>
        </ShowComponent>
      </div>

      <ShowComponent>
        <Select
                    label={'Simple'}
                    helperText={'helper Text'}
                    placeholder={'choose 722'}
                    error={false}
                    options={options1}
        />
        <div>
                    Simple select with placeholder which contains options with icons.
        </div>
      </ShowComponent>

      <ShowComponent>
        <Select
                    label={'Simple'}
                    helperText={'helper Text'}
                    error={false}
                    options={makeToChoose(15)}
                    placeholder={'20 to choose'}
        />
        <div>
                    Select with long list of options.
        </div>
      </ShowComponent>

      <ShowComponent>
        <Select
                    label={'Simple'}
                    helperText={'helper Text'}
                    error={'some error'}
                    placeholder={'has to be red'}
                    options={options1}
        />
        <div>
                    Select with error.
        </div>
      </ShowComponent>

      <ShowComponent>
        <Select
                    label={'Simple'}
                    helperText={'helper Text'}
                    error={false}
                    options={options1}
        />
        <div>
                    explain here
        </div>
      </ShowComponent>

    </div>

  )
}
