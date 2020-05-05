import React             from 'react'
import {
  Document,
  Font,
  Page,
  PDFViewer,
  StyleSheet
}                        from '@react-pdf/renderer'
import InvoiceItemPart   from './InvoiceItemPart'
import InvoiceFooterPart from './InvoiceFooterPart'
import InvoiceHeaderPart from './InvoiceHeaderPart'
import {useReceiptQuery} from '../../../../../graphql/graphql'
import {get as _get}     from 'lodash'
import font              from '../../../../../assets/fonts/Roboto-Medium.ttf'
import robotoBold        from '../../../../../assets/fonts/Roboto-Bold.ttf'
import robotoItalic      from '../../../../../assets/fonts/Roboto-Italic.ttf'
import robotoBoldItalic  from '../../../../../assets/fonts/Roboto-BoldItalic.ttf'

Font.register({
  family: 'Roboto',
  fonts: [
    {
      src: font,
      fontWeight: 'normal'
    },
    {
      src: robotoBold,
      fontWeight: 'bold'
    },
    {
      src: robotoItalic,
      fontWeight: 'normal',
      fontStyle: 'italic'
    },
    {
      src: robotoBoldItalic,
      fontWeight: 'bold',
      fontStyle: 'italic'
    }
  ]
})

const InvoicePreview = ({receiptId, clientId} : { receiptId : string, clientId : string }) => {

  const styles = StyleSheet.create({
    page: {
      fontSize: 11,
      paddingTop: 30,
      paddingLeft: 60,
      paddingRight: 60,
      lineHeight: 1.5,
      flexDirection: 'column'
    },
  })

  const {data:_receipt} = useReceiptQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    variables: {
      id: receiptId
    },
    skip: !Number(receiptId)
  })

  const receipt = React.useMemo(() => !_receipt || !_receipt.data ? {} : _receipt.data, [_receipt])
  const items = React.useMemo(() => _get(receipt, 'items') || [], [receipt])

  const total = items.map((item : any) => +item.quantity * +item.price)
    .reduce((accumulator : number, currentValue : number) => accumulator + currentValue, 0)

  return (
    <PDFViewer style={{width: window.innerWidth - 100, height: window.innerHeight - 100}}>
      <Document title={'Invoice'} >
        <Page size="A4" style={styles.page}>
          <InvoiceHeaderPart/>
          <InvoiceItemPart items={items}/>
          <InvoiceFooterPart total={total}/>
        </Page>
      </Document>
    </PDFViewer>
  )
}

export default InvoicePreview

