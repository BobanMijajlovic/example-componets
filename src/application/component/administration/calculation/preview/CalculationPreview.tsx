import React, {
  useEffect,
  useState
} from 'react'
import {
  formatDateLong,
  formatDecimal
}                                    from '../../../../utils/Utils'
import CalculationPreviewItemsPart   from './CalculationPreviewItemsPart'
import CalculationPreviewClientPart  from './CalculationPreviewClientPart'
import {
  IDueDateRecord,
  useAppCalculationTemp
}                                    from '../../../../hooks/useAppCalculationTemp'
import ComponentInfo                 from '../../../../../components/Info/ComponentInfo'
import CalculationPreviewFinancePart from './CalculationPreviewFinancePart'
import ButtonsForm                   from '../../../../../components/Button/ButtonsForm'
import {CalculationDocument}         from '../../../../../graphql/graphql'
import {useQuery}                    from '@apollo/react-hooks'

interface ICalculationPreviewProps {
  closeDialog ?: () => void
  id ?: string | number,
  actionConfirm ?: () => void
}

const CalculationPreview = ({actionConfirm,closeDialog, id} : ICalculationPreviewProps) => {
  const {calculation:calculationTemp} = useAppCalculationTemp()
  const [calculation,setCalculationState] : [any,(r : any) => void] = useState({})

  const {data} = useQuery(CalculationDocument, {
    fetchPolicy: 'network-only',
    variables: {
      id: id
    },
    skip: !Number(id)
  })
  const calculationB = React.useMemo(() => !data || !data.data ? undefined : {
    ...data.data,
    dueDate: data.data.dueDate.map((dueDate : any) => {
      return {
        ...dueDate,
        finance: dueDate.value
      }
    })
  }, [data])

  useEffect(() => {
    if (!calculationB) {
      setCalculationState(calculationTemp)
      return
    }
    setCalculationState(calculationB)
  },[calculationB,calculationTemp])

  const handlerOnSave = () => {
    actionConfirm && actionConfirm()
   // closeDialog && closeDialog()
  }

  return (
    <div className={'calculation-preview-root w-100 p-2 font-smaller-2'}>
      {
        calculation ?
          (
            <>
              <div className={'d-flex flex-row justify-content-start text-center align-items-start mb-4'}>
                <div className={'d-flex flex-row justify-content-end text-left'}>
                  <CalculationPreviewClientPart/>
                </div>
                <div className={'d-flex flex-wrap flex-column  component-info mb-2 ml-4 text-center text-upper align-items-left'}>
                  <ComponentInfo
                         classNameLabel={'text-left font-weight-600 min-width-120'}
                         label={'CALCULATION NUMBER'}
                         value={calculation.number ? `${calculation.number}` : ''}
                  />
                  <ComponentInfo
                         classNameLabel={'text-left font-weight-600 min-width-120'}
                         label={'CALCULATION DATE'}
                         value={formatDateLong(calculation.dateOfIssue ? calculation.dateOfIssue : '')}
                  />
                </div>
                <div className={'d-flex flex-fill justify-content-end '}>
                  <div className={'col-11 calculation-due-date-preview p-2 text-left'}>
                    <div className={'d-flex flex-column'}>
                      <div className={'font-bold text-upper font-smaller-2'}>DUE DATE</div>
                      {
                        calculation.dueDate && calculation.dueDate.length !== 0 ?
                          calculation.dueDate.map((dueDate : IDueDateRecord, key : number) => {
                            return (
                              <div key={key} className={'d-flex flex-row justify-content-start align-items-center relative font-smaller-3 pt-1 border-bottom'}>
                                <div className={'col-2 mr-1  px-0 font-weight-bold'}> {formatDateLong(dueDate.date)} </div>
                                <div className={'col-10 px-0 d-flex flex-row text-left'}>
                                  <div className={'col-8 pl-0 pr-1'}>{dueDate.description}</div>
                                  <div className={'col-4 d-flex flex-row justify-content-end pl-0 pr-1'}>
                                    <div>{formatDecimal(dueDate.finance)}</div>
                                  </div>
                                </div>
                              </div>
                            )
                          }) : null
                      }
                    </div>
                  </div>
                </div>
              </div>
              <div className={'w-100'}>
                {
                  calculation.items ?
                    <CalculationPreviewItemsPart items={calculation.items}/> : <></>
                }
              </div>
              <div className={'d-flex flex-fill justify-content-between'}>
                <div className={'col-md-4'}>{actionConfirm ?
                  <ButtonsForm
                        buttonsCancel={{
                          label: 'CANCEL',
                          color: 'danger',
                          action: closeDialog
                        }}
                        buttonSubmit={{
                          label: 'SAVE',
                          color: 'primary',
                          action: handlerOnSave
                        }}
                        term={{
                          label: 'Calculation done',
                          labelSize: 1,
                          labelColor: 'grey'
                        }}
                  />
                  : <></>}
                </div>
                <div className={'w-25'}>
                  <CalculationPreviewFinancePart/>
                </div>

              </div>

            </>
          )
          : (<div>Calculation not exists in system. Try again.</div>)
      }
    </div>
  )
}

export default CalculationPreview
