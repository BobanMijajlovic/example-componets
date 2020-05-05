import React                           from 'react'
import {
  StyleSheet,
  View,
  Text
} from '@react-pdf/renderer'
import CalculationPdfHeaderDueDatePart from './header/CalculationPdfHeaderDueDatePart'

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15
  }
})

const CalculationPdfFooter = () => {
  return (
    <View style={styles.footer}>
      <CalculationPdfHeaderDueDatePart/>
      <View>
        <Text>TOTAL</Text>
      </View>
    </View>
  )
}

export default CalculationPdfFooter
