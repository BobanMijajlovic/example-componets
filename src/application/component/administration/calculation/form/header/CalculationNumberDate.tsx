import React, {ChangeEvent}    from 'react'
import {
  InputText,
  InputTextDatePicker
}                              from '../../../../../../components/InputText'
import {useAppCalculationTemp} from '../../../../../hooks/useAppCalculationTemp'

const CalculationNumberDate = () => {

  const {calculation, calculationSetField} = useAppCalculationTemp()

  const changeDate = React.useCallback((event : ChangeEvent<HTMLInputElement>) => {
    calculationSetField('dateOfIssue', event.target.value)
  }, [calculationSetField])

  const changeNumber = React.useCallback((event : ChangeEvent<HTMLInputElement>) => {
    calculationSetField('number', event.target.value)
  }, [calculationSetField])

  return (
    <div className={'d-flex flex-column justify-content-center  px-4'} style={{maxWidth: '260px', border: '1px solid #184264',background: '#f0f8ff26',borderRadius: '3px'}}>

      <div className={'pb-2'}>
        <InputText
                    required
                    label={''}
                    useLabel={false}
                    onChange={changeNumber}
                    value={calculation.number}
                    classNames={'lined-version'}
                    helperText={'enter calculation number'}
                    fullWidth
        />

      </div>

      <div className={'mx-6'}>
        <InputTextDatePicker

                    format={'dd/MM/yyyy'}
                    helperText={'date of issue'}
                    classNames={'lined-version'}
                    value={calculation.dateOfIssue}
                    onChange={changeDate}
                    fullWidth
                    useLabel={false}
                    label={''}
        />

      </div>

    </div>
  )
}

export default CalculationNumberDate
