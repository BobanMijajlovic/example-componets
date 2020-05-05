import React, {
  useEffect,
  useState
}            from 'react'
import Table from '../../../../components/Table/Table'
import {
  formatDateLong,
  formatDecimal,
}                                 from '../../../utils/Utils'
import {faUser}                        from '@fortawesome/free-solid-svg-icons'
import {EasyDialogApolloProvider}      from '../../../../components/EasyModel/EasyModal'
import {CenteredDialog}                 from '../../../../components/Dialog/DialogBasic'
import CalculationPreview               from './preview/CalculationPreview'
import {useAppBar}                      from '../../../hooks/useAppBar'
import {KeyboardEventCodes}             from '../../../../components/hooks/useExternalKeybaord'
import {ITableModelCellChanged}         from '../../../../components/Table'
import {TableActionCell}                from '../../../../components/Table/render/CellRender'
import {
  useCalculationsQuery
}                                       from '../../../../graphql/graphql'
import {queryVariablesForCalculations}  from '../../../../graphql/variablesq'
import {openDialogPreviewCalculation}   from './CalculationForm'
import {TableHeaderRenderManageColumns} from '../../../../components/Table/render/HeaderRender'
import SearchInput                      from '../../../../components/InputText/SearchInput'

const CalculationTable = () => {

  const {setButtonsForPage, clearButtonsForPage} = useAppBar()

  const [search,setSearchString] : [string,(r : string) => void] = useState('' as string)

  const {data} = useCalculationsQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    variables: queryVariablesForCalculations(search)
  })

  const handlerSearch = (value : string) => {
    setSearchString(value)
  }

  const calculations = React.useMemo(() => !data || !data.data.items || data.data.items.length === 0 ? [] : data.data.items,[data])

  useEffect(() => {
    const id = setButtonsForPage([
      {
        label: 'fprview',
        icon: faUser,
        shortcut: KeyboardEventCodes.F10,
        onClick: () => alert('bobi')
      }
    ])
    return () => clearButtonsForPage(id)
  }, [setButtonsForPage, clearButtonsForPage])

  const header = [
    {
      field: 'id',
      cell: {
        classes: ['hw-table-cell-center'],
      }
    },
    {
      field: 'supplier.descriptionShort',
      label: 'Supplier',
      cell: {
        classes: ['hw-table-cell-center'],
        style: {
          minWidth: 250
        }
      }
    },
    {
      label: 'Calculation number',
      field: 'number',
      cell: {
        classes: ['hw-table-cell-center'],
        style: {
          maxWidth: 150
        }
      }
    },
    {
      label: 'Calculation date',
      field: 'dateOfIssue',
      cell: {
        classes: ['hw-table-cell-center'],
        format: (value : string) => {
          return formatDateLong(value)
        },
        style: {
          maxWidth: 150
        }
      }
    },
    {
      label: 'Invoice finance',
      field: 'totalInvoiceFinance',
      cell: {
        classes: ['hw-table-cell-right'],
        format: (value : string) => {
          return formatDecimal(value)
        }
      }
    },
    {
      label: 'Invoice tax',
      field: 'totalInvoiceTax',
      cell: {
        classes: ['hw-table-cell-right'],
        format: (value : string) => {
          return formatDecimal(value)
        }
      }
    },
    {
      label: 'Selling Finance',
      field: 'totalSellingFinance',
      cell: {
        classes: ['hw-table-cell-right'],
        format: (value : string) => {
          return formatDecimal(value)
        }
      }
    },
    {
      field: 'act',
      notHide: true,
      cell: {
        classes: ['hw-table-cell-center'],
        render: TableActionCell,
        renderProps: {
          preventEdit: true,
          preventDelete: true
        }
      },
      width: '50px',
      render: TableHeaderRenderManageColumns
    }
  ]

  const handlerDataEventClick = (event : any, id : any, action : any, param : any) => {
    console.log(event, id, action, param)
    if (action === 'preview') {
      if (!id) {
        return
      }
      openDialogPreviewCalculation({
        id: id
      })
    }
  }

  const handlerModelFieldChanged = (data : ITableModelCellChanged) => {
    console.log('data is changed', data)
  }

  return (
    <div className={'d-flex flex-column flex-fill py-2 pl-2 letter-spacing hw-find-item-root'}>
      <div className={'d-flex align-content-stretch justify-content-end pb-3'}>
        <div className={'d-flex flex-grow-1 col-3 px-2 '}>
          <SearchInput
                handlerSearch={handlerSearch}
                label={''}
                fullWidth
                helperText={'search by number/ date'}
                lined
          />
        </div>
      </div>
      <div className={'p-1 m-0 hw-calculation-table-preview'}>
        <Table
              tableName={'calculation-table-84932jm4k32j42j4h324'}
              header={header}
              data={calculations}
              separator={'cell'}
              handlerEventDataClick={handlerDataEventClick}
              handlerEventModelFieldChanged={handlerModelFieldChanged}
        />
      </div>
    </div>

  )
}

export default CalculationTable

