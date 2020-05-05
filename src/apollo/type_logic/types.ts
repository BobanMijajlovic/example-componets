import {
  Account,
  Address,
  Calculation,
  CalculationDiscountSurcharge,
  CalculationDueDate,
  CalculationExtraExpense,
  CalculationItem,
  Client,
  Contact,
  Item,
  User
} from '../../graphql/graphql'

type MergeSubType<Base, SubBase> = {
  [Key in keyof SubBase] :
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
  undefined extends Base[Key] ? never : SubBase[Key]
}
type Merge<M, N> = Pick<M, Exclude<keyof M, keyof N>> & MergeSubType<M, N>
type Composite<M, N, K> = Merge<M, N> & Pick<K, Exclude<keyof K, keyof M>>



export type TAccount = Partial<Account>
export type TUser = Partial<Merge<User, {
  accounts : TAccount[]
}>>

export type TItem = Partial<Item>

export type TCalculationItem = Partial<Merge<CalculationItem, {
  item : TItem
}>>

export type TAddress = Partial<Address>
export type TContact = Partial<Contact>

export type TClient = Partial<Merge<Client, {
  addresses : TAddress[]
  contact : TContact[]
}>>

export type TCalculationDiscountSurcharge = Partial<CalculationDiscountSurcharge>
export type TCalculationDueDate = Partial<CalculationDueDate>
export type TCalculationExtraExpense = Partial<CalculationExtraExpense>

export type ICalculation = Partial<Merge<Calculation, {
  items : TCalculationItem[]
  discount ?: TCalculationDiscountSurcharge[]
  dueDate ?: TCalculationDueDate
  additionalCosts : TCalculationExtraExpense[]
  supplier : TClient
}>>

export enum ClientFlag {
  'OWNER',
  'CUSTOMER',
  'CLIENT',
  'SUPPLIER',
  'CLIENT-SUPPLIER'
}
