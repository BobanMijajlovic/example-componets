import React             from 'react'
import {
  StyleSheet,
  Text,
  View
}                        from '@react-pdf/renderer'
import {formatDateLong,} from '../../../../utils/Utils'

const ClientCustomerPart = () => {
  const styles = StyleSheet.create({
    content: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    columnContent: {
      flexDirection: 'column',
      justifyContent: 'flex-start'
    }
  })
  return (
    <>
      <View style={styles.content}>
        <View style={styles.columnContent}>
          <Text>HWT DOO</Text>
          <Text>Jasicki put 9A</Text>
          <Text>37000 Krusevac, Srbija</Text>
          <Text>PIB: 107112543</Text>
          <Text>TR: </Text>
        </View>
        <View style={styles.columnContent}>
          <Text>V23D</Text>
          <Text>Jasicki put 9A</Text>
          <Text>37000 Krusevac, Srbija</Text>
          <Text>PIB: 107112543</Text>
        </View>
      </View>
    </>
  )
}

const InvoiceHeaderPart = () => {
  const styles = StyleSheet.create({
    invoiceNoContainer: {
      fontSize: 16,
      marginTop: 10,
      justifyContent: 'flex-start'
    },
    invoiceContainer: {
      marginTop: 5,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    invoiceColumn: {
      flexDirection: 'column',
      justifyContent: 'flex-start'
    },
    bold: {
      fontWeight: 'bold'
    }
  })
  return (
    <>
      <ClientCustomerPart/>
      <View style={styles.invoiceNoContainer}>
        <Text>Gotovinski racun : <Text style={styles.bold}>00125-2020</Text></Text>
      </View>
      <View style={styles.invoiceContainer}>
        <View style={styles.invoiceColumn}>
          <Text>Datum prometa dobra: {formatDateLong(new Date().toString())}</Text>
          <Text>Mesto prometa dobara: 37000 Krusevac</Text>
          <Text>Broj fiskalnog isecka: 234</Text>
        </View>
        <View style={styles.invoiceColumn}>
          <Text>Datum izdavanja racuna: {formatDateLong(new Date().toString())}</Text>
          <Text>Mesto izdavanja racuna: 37000 Krusevac</Text>
          <Text>Nacin placanja: Gotovina</Text>
        </View>
      </View>
    </>
  )
}

export default InvoiceHeaderPart
