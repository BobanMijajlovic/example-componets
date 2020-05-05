import React                            from 'react'
import {
  StyleSheet,
  Text,
  View
}                                       from '@react-pdf/renderer'
import CalculationPdfHeaderSupplierPart from './header/CalculationPdfHeaderSupplierPart'
import CalculationPdfHeaderDueDatePart  from './header/CalculationPdfHeaderDueDatePart'
import CalculationPdfHeaderReceiverPart from './header/CalculationPdfHeaderReceiverPart'
const styles = StyleSheet.create({
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#929292',
    borderBottomStyle: 'solid',
    marginBottom: 10
  },
  headerPart: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})
const CalculationPdfHeader = () => {

  return (
    <View>
      <View style={styles.title}>
        <Text>Calculation</Text>
        <Text>Date</Text>
      </View>
      <View style={styles.headerPart}>
        <CalculationPdfHeaderSupplierPart/>
        <CalculationPdfHeaderReceiverPart/>
      </View>
    </View>
  )
}

export default CalculationPdfHeader
