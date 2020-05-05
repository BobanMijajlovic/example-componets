import React                        from 'react'
import {IReceiptInfoComponentProps} from '../../../../interface'
import ReceiptPreview               from './ReceiptPreview'
import {useReceiptQuery}            from '../../../../../graphql/graphql'

const ReceiptInfoComponent = ({receiptNumber} : IReceiptInfoComponentProps) => {

  const {data} = useReceiptQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    variables: {
      id: receiptNumber
    },
    skip: !receiptNumber
  })

  const receipt : any = React.useMemo(() => (!data || !data.data) ? {} : data.data, [data])

  return (
    <div className={'d-flex p-4  receipt-info '}>
      <ReceiptPreview {...receipt}/>
    </div>
  )
}

export default ReceiptInfoComponent
