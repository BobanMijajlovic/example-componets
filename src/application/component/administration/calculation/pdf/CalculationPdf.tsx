import React                from 'react'
import {
  Document,
  Page,
  PDFViewer,
  StyleSheet
}                           from '@react-pdf/renderer'
import CalculationPdfHeader from './CalculationPdfHeader'
import PdfTable             from '../../../pdf/Table/Table'
import {formatDecimal}      from '../../../../utils/Utils'
import CalculationPdfFooter from './CalculationPdfFooter'
import {useVatsLast}        from '../../../../hooks/useVats'
import Calculation          from '../../../../models/Calculation'

const CalculationPdf = () => {
  // const {getVat} = useVatsLast()

  const styles = StyleSheet.create({
    page: {
      fontFamily: 'Helvetica',
      fontSize: 8,
      paddingTop: 20,
      paddingLeft: 20,
      paddingRight: 20,
      lineHeight: 1.5,
      flexDirection: 'column'
    },
  })

  const tableHeader = [
    {
      label : 'Name',
      field : 'item.shortDescription',
      width: '150px',
      cell: {
        align: 'left'
      }
    },
    {
      label : 'Unit',
      field : 'item.unit',
      width: '25px',
      cell: {
        align: 'center'
      }
    },
    {
      label : 'Price',
      field : 'purchasePrice',
      width: '50px',
      cell: {
        align: 'right',
        format: (value : string) => {
          return formatDecimal(value)
        }
      }
    },
    {
      label : 'Disc',
      field : 'discount',
      width: '30px',
      cell: {
        align: 'right',
        format: (value : string) => {
          if (!value) {
            value = '0'
          }
          return formatDecimal(value)
        }
      }
    },

    {
      label : 'Price af. disc',
      field : 'priceAfterDisc',
      width: '45px',
      cell: {
        align: 'right',
        format: (value : string) => {
          return formatDecimal(value)
        }
      }
    },
    {
      label : 'Qty',
      field : 'quantity',
      width: '50px',
      cell: {
        align: 'right',
        format: (value : string) => {
          return formatDecimal(value)
        }
      }
    },
    {
      label : 'Expenses',
      field : 'extraExpense',
      width: '40px',
      cell: {
        align: 'right',
        format: (value : string,data : any) => {
          return formatDecimal(value)
        }
      }
    },
    {
      label : 'Price af.exp.',
      field : 'priceAfterExtra',
      width: '50px',
      cell: {
        align: 'right',
        format: (value : string,data : any,field : string) => {
          return formatDecimal(value)
        }
      }
    },
    {
      label : 'Margin',
      field : 'margin',
      width: '30px',
      cell: {
        align: 'right',
        format: (value : string) => {
          return formatDecimal(value)
        }
      }
    },
    {
      label : 'Sell.p off pdv',
      field : 'sellingPrice',
      width: '50px',
      cell: {
        align: 'right',
        format: (value : string) => {
          return formatDecimal(value)
        }
      }
    },
    {
      label : 'Tax',
      field : 'item.vat',
      width: '30px',
      cell: {
        format: (value : string,data : any) => {
          console.log(data)
          // const vat = getVat(data.item.vat)
          return data.item.vat
        }
      }
    },
    {
      label : 'Tax value',
      field : 'sellingPrice',
      width: '40px',
      cell: {
        align: 'right',
        format: (value : string,data : any) => {
          // return formatDecimal(Calculation.renderSellingPriceVatValue(data))
          return 0
        }
      }
    },
    {
      label : 'Sell Price',
      field : 'sellingPrice',
      width: '50px',
      cell: {
        align: 'right',
        format: (value : string,data : any) => {
          // return formatDecimal(Calculation.renderSellingPriceWithTax(data))
          return 0
        }
      }
    },
    {
      label : 'Sell fin off tax',
      field : 'sellingPrice',
      width: '55px',
      cell: {
        align: 'right',
        format: (value : string,data : any) => {
          return formatDecimal(Calculation.renderSellingWithoutTaxItem(data))
        }
      }
    },
    {
      label : 'Sell tax',
      field : 'sellingPrice',
      width: '50px',
      cell: {
        align: 'right',
        format: (value : string,data : any) => {
          // return formatDecimal(Calculation.renderSellingTaxItem(data))
          return 0
        }
      }
    },
    {
      label : 'Total',
      field : 'sellingPrice',
      width: '55px',
      cell: {
        align: 'right',
        format: (value : string,data : any) => {
          // return formatDecimal(Calculation.renderSellingFinanceItem(data))
          return 0
        }
      }
    },

  ]

  const tableData = [{'item':{'id':'2','barCode':'2','sku':'2','description':'NEVENA BABY PUDER 90 GR long description','shortDescription':'NEVENA BABY PUDER 90 GR','price':4040.81,'vat':3,'unit':1,'group':0,'__typename':'Item'},'purchasePrice':'123','quantity':'1500','sellingPrice':'152','position':0,'tax':'0','priceAfterDisc':'123','extraExpense':'0','priceAfterExtra':'123','margin':23.58},{'item':{'id':'2','barCode':'2','sku':'2','description':'NEVENA BABY PUDER 90 GR long description','shortDescription':'NEVENA BABY PUDER 90 GR','price':4040.81,'vat':3,'unit':1,'group':0,'__typename':'Item'},'purchasePrice':'123','quantity':'1232','sellingPrice':'150','position':1,'tax':'0','priceAfterDisc':'123','extraExpense':'0','priceAfterExtra':'123','margin':21.95},{'item':{'id':'2','barCode':'2','sku':'2','description':'NEVENA BABY PUDER 90 GR long description','shortDescription':'NEVENA BABY PUDER 90 GR','price':4040.81,'vat':3,'unit':1,'group':0,'__typename':'Item'},'purchasePrice':'125','quantity':'1820','sellingPrice':'185','position':2,'tax':'0','priceAfterDisc':'125','extraExpense':'0','priceAfterExtra':'125','margin':48},{'item':{'id':'3','barCode':'3','sku':'3','description':'BEBI BOCA NATURAL AVENT 125ML0+ long description','shortDescription':'BEBI BOCA NATURAL AVENT 125ML0+','price':3545.14,'vat':3,'unit':2,'group':2,'__typename':'Item'},'purchasePrice':'4502','quantity':'120','sellingPrice':'5822','position':3,'tax':'0','priceAfterDisc':'4502','extraExpense':'0','priceAfterExtra':'4502','margin':29.32},{'item':{'id':'123','barCode':'123','sku':'123','description':'PANA SOL 1MG/ML 5ML   HFOT long description','shortDescription':'PANA SOL 1MG/ML 5ML   HFOT','price':682.69,'vat':0,'unit':2,'group':1,'__typename':'Item'},'purchasePrice':'125','quantity':'151','sellingPrice':'154','position':4,'tax':'0','priceAfterDisc':'125','extraExpense':'0','priceAfterExtra':'125','margin':23.2},{'item':{'id':'2','barCode':'2','sku':'2','description':'NEVENA BABY PUDER 90 GR long description','shortDescription':'NEVENA BABY PUDER 90 GR','price':4040.81,'vat':3,'unit':1,'group':1,'__typename':'Item'},'purchasePrice':'125','quantity':'100','sellingPrice':'252','position':5,'tax':'0','priceAfterDisc':'125','extraExpense':'0','priceAfterExtra':'125','margin':101.6},{'item':{'id':'2','barCode':'2','sku':'2','description':'NEVENA BABY PUDER 90 GR long description','shortDescription':'NEVENA BABY PUDER 90 GR','price':4040.81,'vat':3,'unit':1,'group':1,'__typename':'Item'},'purchasePrice':'123','quantity':'1235','sellingPrice':'185','position':6,'tax':'0','priceAfterDisc':'123','extraExpense':'0','priceAfterExtra':'123','margin':50.41},{'item':{'id':'2','barCode':'2','sku':'2','description':'NEVENA BABY PUDER 90 GR long description','shortDescription':'NEVENA BABY PUDER 90 GR','price':4040.81,'vat':3,'unit':1,'group':1,'__typename':'Item'},'purchasePrice':'125','quantity':'125','sellingPrice':'150','position':7,'tax':'0','priceAfterDisc':'125','extraExpense':'0','priceAfterExtra':'125','margin':20}]

  return (
    <PDFViewer style={{width: window.innerWidth - 100, height: window.innerHeight - 100}}>
      <Document title={'Calculation'} >
        <Page size="A4" style={styles.page} orientation={'landscape'}>
          <CalculationPdfHeader/>
          <PdfTable header={tableHeader} data={tableData}/>
          <CalculationPdfFooter/>
        </Page>
      </Document>
    </PDFViewer>
  )
}

export default CalculationPdf
