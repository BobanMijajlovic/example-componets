import React               from 'react'
import {
  StyleSheet,
  Text,
  View
}                          from '@react-pdf/renderer'
import {formatDecimal}     from '../../../../utils/Utils'
import {IReceiptItemModel} from '../../../../interface'

export interface ITableProps {
  items : IReceiptItemModel[]
}

export const borderColor = '#bdbdbd'
const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 24,
    borderWidth: 1,
    borderColor: borderColor,
  },
  tableHeaderContainer: {
    flexDirection: 'row',
    borderBottomColor: borderColor,
    backgroundColor: borderColor,
    borderBottomWidth: 1,
    alignItems: 'center',
    height: 24,
    textAlign: 'center',
    fontStyle: 'bold',
  },
  no: {
    width: '5%',
    textAlign: 'center',
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  description: {
    width: '50%',
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  qty: {
    width: '10%',
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  rate: {
    width: '15%',
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  amount: {
    width: '20%'
  },
})

const stylesRow = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderBottomColor: borderColor,
    borderBottomWidth: 1,
    alignItems: 'center',
    height: 24,
    fontStyle: 'bold',
  },
  no: {
    width: '5%',
    textAlign: 'center',
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  description: {
    width: '50%',
    textAlign: 'left',
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingLeft: 8,
  },
  qty: {
    width: '10%',
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: 'right',
    paddingRight: 8,
  },
  rate: {
    width: '15%',
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: 'right',
    paddingRight: 8,
  },
  amount: {
    width: '20%',
    textAlign: 'right',
    paddingRight: 8,
  },
})

const stylesFooter = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'flex-end',
    width: '33%',
    marginTop: 20,
    borderColor: borderColor,
    borderWidth: 1,
    borderStyle: 'solid'
  },
  row: {
    flexDirection: 'row',
    borderBottomColor: borderColor,
    borderBottomWidth: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 24,
    fontSize: 12,
    fontStyle: 'bold',
  },
  description: {
    display: 'flex',
    width: '50%',
    textAlign: 'left',
    alignItems: 'center',
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingLeft: 3,
  },
  total: {
    display: 'flex',
    width: '50%',
    textAlign: 'right',
    alignItems: 'center',
    paddingRight: 3,
  },
})

const InvoiceTableHeader = () => {
  return (
    <View style={styles.tableHeaderContainer}>
      <Text style={styles.no}>#</Text>
      <Text style={styles.description}>Item Description</Text>
      <Text style={styles.qty}>Qty</Text>
      <Text style={styles.rate}>Price</Text>
      <Text style={styles.amount}>Total</Text>
    </View>
  )
}

const InvoiceTableBody = ({items} : ITableProps) => {
  const rows = items.map((item : any, index : number) =>
    <View style={stylesRow.row} key={item.id.toString()}>
      <Text style={styles.no}>{index + 1}</Text>
      <Text style={stylesRow.description}>{item.item.shortDescription}</Text>
      <Text style={stylesRow.qty}>{formatDecimal(item.quantity)}</Text>
      <Text style={stylesRow.rate}>{formatDecimal(item.price)}</Text>
      <Text style={stylesRow.amount}>{formatDecimal(+item.quantity * +item.price)}</Text>
    </View>)
  return (<>{rows}</>)
}

const InvoiceTableFooter = ({items} : ITableProps) => {
  const total = items.map(item => +item.quantity * +item.price)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
  return (
    <View style={stylesFooter.container}>
      <View style={stylesFooter.row}>
        <Text style={stylesFooter.description}>SUBTOTAL</Text>
        <Text style={stylesFooter.total}>{formatDecimal(total)}</Text>
      </View>
      <View style={stylesFooter.row}>
        <Text style={stylesFooter.description}>TAX</Text>
        <Text style={stylesFooter.total}>{formatDecimal(0.00)}</Text>
      </View>
      <View style={stylesFooter.row}>
        <Text style={stylesFooter.description}>TOTAL</Text>
        <Text style={stylesFooter.total}>{formatDecimal(total)}</Text>
      </View>
    </View>
  )
}

const InvoiceItemPart = ({items} : ITableProps) => {
  return (
    <>
      <View style={styles.tableContainer}>
        <InvoiceTableHeader/>
        <InvoiceTableBody items={items}/>
      </View>
      <InvoiceTableFooter items={items}/>
    </>
  )
}

export default InvoiceItemPart
