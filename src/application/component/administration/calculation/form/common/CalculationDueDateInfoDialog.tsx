import React                   from 'react'
import {useAppCalculationTemp} from '../../../../../hooks/useAppCalculationTemp'
import ButtonsForm             from '../../../../../../components/Button/ButtonsForm'

const CalculationDueDateInfoDialog = ({actionConfirm,closeDialog} : { actionConfirm ?: () => void,closeDialog ?: () => void }) => {
  const {calculation,calculationAddDueDate} = useAppCalculationTemp()
  const handlerOnSubmit = () => {
    calculationAddDueDate({
      date: calculation.dateOfIssue,
      finance: calculation.totalFinance
    } as any)
    actionConfirm && actionConfirm()
    closeDialog && closeDialog()
  }

  const handleOnCancel = () => {
    closeDialog && closeDialog()
  }

  return (
    <div className={'d-flex flex-column justify-content-start calculation-due-date-info-dialog-root'}>
      <div className={'text-left'}>You did not enter due date. If you confirm, the due date will be created in the amount from the invoice on the day of the calculation.</div>
      <div className={'px-5 pt-4'}>
        <ButtonsForm
              buttonsCancel={{
                label: 'CANCEL',
                action: handleOnCancel
              }}
              buttonSubmit={{
                label: 'OK',
                action: handlerOnSubmit
              }}
        />
      </div>

    </div>
  )
}

export default CalculationDueDateInfoDialog
