import React, {useEffect} from 'react'
import EmptyTag           from '../../../../../../components/Util/EmptyTag'
import InputTextWithValidation    from '../../../../../../forms/componentsWithValidation/InputTextWithValidation'
import {
  IClientModel,
  IItemModel
}                                 from '../../../../../../graphql/models'
import {
  required,
  useValidation
}                                 from '../../../../../../validation'
import ButtonsForm      from '../../../../../../components/Button/ButtonsForm'
import {
  EasyDialogApolloProvider,
  easyDialogError
}                       from '../../../../../../components/EasyModel/EasyModal'
import {CenteredDialog} from '../../../../../../components/Dialog/DialogBasic'
import {
  GetSupplierSkuDocument,
  SetSupplierSkuForItemDocument,
  useInsertItemMutation
}                                   from '../../../../../../graphql/graphql'
import {
  useMutation,
  useQuery
}                                   from '@apollo/react-hooks'
import {processError}               from '../../../../../../graphql/utils'
import {
  KeyboardEventCodes,
  useExternalKeyboard
}                                   from '../../../../../../components/hooks/useExternalKeybaord'
import ComponentInfo                from '../../../../../../components/Info/ComponentInfo'
import AutoCompleteResultRenderItem from '../../../../items/autocomplete/AutoCompleteResultRenderItem'

export interface ISupplierItemFormProps {
  client : IClientModel
  item : IItemModel
  closeDialog ?: () => void
  successFunction ?: (item : IItemModel) => void
}
interface ISupplierSkuModel {
  supplierSku : string
}

const SupplierItemForm = ({client,item,closeDialog,successFunction} : ISupplierItemFormProps) => {

  const validation = useValidation<ISupplierSkuModel>()

  const {data:supplierData} = useQuery(GetSupplierSkuDocument,{
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    variables: {
      clientId: client.id,
      itemId: item.id
    },
    skip: !Number(client.id) || !Number(item.id)
  })
  const supplierItem = React.useMemo(() => !supplierData || !supplierData.data ? undefined : supplierData.data ,[supplierData])

  useEffect(() => {
    if (!supplierItem) {
      return
    }
    validation.setFieldValue('supplierSku',supplierItem.code,false)
  },[supplierItem])

  const [mutationInsertSupplierSku, {loading}] = useMutation(SetSupplierSkuForItemDocument)

  const handlerCancelDialog = () => {
    closeDialog && closeDialog()
  }

  const handlerOnSubmit = async () => {
    const {error, data} = await validation.validate()
    if (error || !client || !item.id) {
      return
    }
    const _data = {
      variables: {
        data: {
          clientId: client.id,
          itemId: item.id,
          code: data.supplierSku
        }
      }
    }
    await mutationInsertSupplierSku(_data).then(v => {
      const result = v.data.data
      successFunction &&  successFunction(result.item)
      handlerCancelDialog()
    })
      .catch((e) => {
        const s = processError(e, validation as any)
        if (s) {
          easyDialogError(s)
        }
      })
  }

  useExternalKeyboard((e : KeyboardEvent) => {
    handlerOnSubmit()
  }, true,[KeyboardEventCodes.Enter])

  return (
    <div className={'d-flex flex-fill flex-wrap hw-supplier-sku-root'}>
      <div className={'col-md-6 d-flex flex-column justify-content-start font-smaller-2 text-left'}>
        <div className={'px-1 font-bold text-upper'}><EmptyTag model={client} field={'descriptionShort'} placeholder={'CLIENT NAME'}/></div>
        <small className={'px-1'}><EmptyTag model={client} field={'description'} placeholder={'Client business full name'}/> </small>
        <div className={'d-flex  flex-row justify-content-between p-1'}>
          <div className={'d-flex flex-column align-items-left pr-1'}>
            <div className={'opacity-4'}>Tax ID&nbsp;:</div>
            <div className={''}><EmptyTag model={client} field={'taxNumber'} placeholder={'#########'}/>
            </div>
          </div>
          <div className={'d-flex flex-column align-items-center px-1'}>
            <div className={'opacity-4'}>Tax #Num&nbsp;:</div>
            <div className={''}><EmptyTag model={client} field={'clientNumber'} placeholder={'#########'}/>
            </div>
          </div>
        </div>
      </div>
      <div className={'col-md-6'}>
        <InputTextWithValidation
              label={'Supplier SKU'}
              helperText={'enter sku'}
              align={'align-right'}
              validation={{
                useValidation: validation,
                model: 'supplierSku',
                rule: {
                  required
                },
                format: {
                  rule: {
                    format: '########',
                    validSize: 1
                  },
                  validationMessage: 'Enter valid SKU'
                }
              }}
        />
      </div>
      <div className={'col-md-12 d-flex flex-column font-smaller-2'}>
        <AutoCompleteResultRenderItem data={item} />
      </div>

      <div className={'container pt-4'}>
        <ButtonsForm
                  buttonsCancel={{
                    label: 'CANCEL',
                    action: handlerCancelDialog
                  }}
                  buttonSubmit={{
                    label: 'SAVE',
                    action: handlerOnSubmit
                  }}
        />
      </div>

    </div>
  )
}

export default SupplierItemForm

interface IDialogAddSupplierSkuProps {
  client : IClientModel
  item : IItemModel
  successFunction ?: (item : IItemModel) => void
}

export const openDialogAddSupplierSku = ({...rest} : IDialogAddSupplierSkuProps) => {

  EasyDialogApolloProvider((closeDialog : () => any, openDialog : (data : any) => any) => {

    const Component = () => {
      const ComponentToRender = () => {
        return (
          <SupplierItemForm
                        closeDialog={closeDialog}
                        {...rest}
          />
        )
      }
      return (
        <>
          <CenteredDialog
                        title={'Define supplier sku'}
                        closeAction={closeDialog}
                        Component={ComponentToRender}

          />
        </>
      )
    }
    openDialog(<Component/>)
  })
}

