import React, {useEffect} from 'react'
import {
  Font,
  StyleSheet,
  Text,
  View
}                         from '@react-pdf/renderer'
import {borderColor}  from './InvoiceItemPart'
import {numberToWord} from '../../../../utils/Utils'
import font           from '../../../../../assets/fonts/Roboto-Medium.ttf'
import robotoBold from '../../../../../assets/fonts/Roboto-Bold.ttf'
import robotoItalic from '../../../../../assets/fonts/Roboto-Italic.ttf'
import robotoBoldItalic from '../../../../../assets/fonts/Roboto-BoldItalic.ttf'

const InvoiceFooterPart = ({total} : { total : number }) => {

  const styles = StyleSheet.create({
    content: {
      position: 'absolute',
      bottom: 20,
      left: 0,
      right: 0,
      padding: '0 40px 20px 40px',
      flexDirection: 'row',
      alignItems: 'center'
    },
    columnOwner: {
      width: '35%',
      textAlign: 'center',
      paddingBottom: 20,
      borderBottomWidth: 1,
      borderBottomColor: borderColor
    },
    columnMP: {
      width: '20%',
      textAlign: 'center',
      paddingTop: 20,
      marginRight: 30,
      marginLeft: 30
    },
    columnClient: {
      width: '35%',
      textAlign: 'center',
      paddingBottom: 20,
      borderBottomWidth: 1,
      borderBottomColor: borderColor
    },
    columnNumberToWords: {
      fontFamily:  'Roboto',
      marginTop: 15
    },
    columnText: {
      padding: 10,
    }
  })

  return (
    <>
      <View style={styles.columnNumberToWords}>
        <Text style={styles.columnText}>{numberToWord(total)}</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.columnOwner}>
          <Text>FAKTURISAO</Text>
        </View>
        <View style={styles.columnMP}>
          <Text>M.P.</Text>
        </View>
        <View style={styles.columnClient}>
          <Text>RACUN PRIMIO</Text>
        </View>
      </View>
    </>
  )
}

export default InvoiceFooterPart
