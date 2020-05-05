import {
  IClientModel,
  IItemModel
}                           from '../../../../../graphql/models'
import {IDiscountSurcharge} from '../../../../interface'

export interface ICalculationItemTemp {
  item : IItemModel
  id : string | number,
  quantity : string | number
  purchasePrice : string | number
  sellingPrice : string | number
  discount : IDiscountSurcharge
}

export interface IDiscountRecord {
  discount : IDiscountSurcharge
  description : string
}

export interface IAdditionalCostsRecord {
  description : string
  tax : number // vat position
  finance : string | number
}

export interface IDueDateRecord {
  date : string
  description ?: string
  finance : string | number
}

export interface ICalculationTemp {
  dateOfIssue ?: string
  dueDate ?: IDueDateRecord[]
  number ?: string
  totalFinance ?: string | number
  discount ?: IDiscountRecord[]
    /** this is global discount */
  additionalCosts ?: IAdditionalCostsRecord[]
  supplier ?: IClientModel
  items : ICalculationItemTemp[]
}


