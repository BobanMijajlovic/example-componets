import React    from 'react'
import {Button} from '../../../../components/Button'

const ReportsDashboard = () => {

  return (
    <div className={'d-flex flex-row align-items-center p-3'}>
      <Button label={'Z REPORT'} color={'primary'} outline classNames={'mr-3'}/>
      <Button label={'X REPORT'} color={'primary'} outline classNames={'mr-3'}/>
      <Button label={'SUMMARY'} color={'primary'} outline/>
    </div>
  )
}

export default ReportsDashboard
