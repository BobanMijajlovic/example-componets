import React                from 'react'
import Tabs                 from '../../../components/Tabs/Tabs'
import {
  faCalculator,
  faFile,
  faFileInvoice,
  faFileInvoiceDollar
}                           from '@fortawesome/free-solid-svg-icons'
import ReceiptDashboard     from './receipt/ReceiptDashboard'
import ReportsDashboard     from './reports/ReportsDashboard'
import InvoiceForm          from './invoices/InvoiceForm'
import CalculationDashboard from './calculation/CalculationDashboard'
import CalculationForm      from './calculation/CalculationForm'

const AdministrationDashboard = () => {

  return (
    <div className={'d-flex flex-row w-100 h-100 p-2'}>
      <Tabs
                tabs={
                  [
                    {
                      tabName: 'Reports',

                      tabContent: ReportsDashboard
                    },
                    {
                      tabName: 'Receipts',

                      tabContent: ReceiptDashboard
                    },
                    {
                      tabName: 'Invoices',

                      tabContent: InvoiceForm
                    },
                    {
                      tabName: 'Calc. Preview',

                      tabContent: CalculationDashboard
                    },
                    {
                      tabName: 'Calculation Form',

                      tabContent: CalculationForm
                    }
                  ]
                }
                stateTab={{active: 3}}
      />
    </div>
  )
}

export default AdministrationDashboard
