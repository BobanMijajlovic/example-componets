import React from 'react'
import {
  StyleSheet,
  Text,
  View
} from '@react-pdf/renderer'

const CalculationPdfHeaderSupplierPart = () => {
  const styles = StyleSheet.create({
    columnContent: {
      flexDirection: 'column',
      justifyContent: 'flex-start'
    },
    supplierTitle: {
      fontWeight: 'black',
      marginBottom: 10
    }
  })
  return (
    <>
      <View style={styles.columnContent}>
        <Text style={styles.supplierTitle}>Supplier</Text>
        <Text>HWT DOO</Text>
        <Text>Jasicki put 9A</Text>
        <Text>37000 Krusevac, Srbija</Text>
        <Text>PIB: 107112543</Text>
      </View>
    </>
  )
}

export default CalculationPdfHeaderSupplierPart
