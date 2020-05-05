import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};

export type Query = {
   __typename?: 'Query';
  calculation?: Maybe<Calculation>;
  calculations: ResponseCalculations;
  receipt?: Maybe<Receipt>;
  receipts: ResponseReceipts;
  item?: Maybe<Item>;
  items: ResponseItems;
  settings: ResponseSettings;
  contact?: Maybe<Contact>;
  contacts: ResponseContacts;
  account?: Maybe<Account>;
  accounts: ResponseAccounts;
  user?: Maybe<User>;
  users: ResponseUsers;
  address?: Maybe<Address>;
  addresses: ResponseAddresses;
  client?: Maybe<Client>;
  clients: ResponseClients;
  authLogin: LoginTokens;
  authPasswordRecovery: Scalars['String'];
  authLogged: Account;
};


export type QueryCalculationArgs = {
  id: Scalars['String'];
};


export type QueryCalculationsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
};


export type QueryReceiptArgs = {
  id: Scalars['String'];
};


export type QueryReceiptsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
};


export type QueryItemArgs = {
  id: Scalars['String'];
};


export type QueryItemsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
};


export type QuerySettingsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
};


export type QueryContactArgs = {
  id: Scalars['String'];
};


export type QueryContactsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
};


export type QueryAccountArgs = {
  id: Scalars['String'];
};


export type QueryAccountsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
};


export type QueryUserArgs = {
  id: Scalars['String'];
};


export type QueryUsersArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
};


export type QueryAddressArgs = {
  id: Scalars['String'];
};


export type QueryAddressesArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
};


export type QueryClientArgs = {
  id: Scalars['String'];
};


export type QueryClientsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
};


export type QueryAuthLoginArgs = {
  data: AccountTypeLogin;
};


export type QueryAuthPasswordRecoveryArgs = {
  email: Scalars['String'];
};

export type Calculation = {
   __typename?: 'Calculation';
  id: Scalars['ID'];
  number: Scalars['String'];
  dateOfIssue: Scalars['DateTime'];
  supplierId: Scalars['Int'];
  retailShopId: Scalars['Int'];
  totalInvoiceTax: Scalars['Float'];
  totalInvoiceFinance: Scalars['Float'];
  extraExpenseTotal: Scalars['Float'];
  extraExpenseTax: Scalars['Float'];
  totalPurchaseFinance: Scalars['Float'];
  totalSellingFinance: Scalars['Float'];
  status: Scalars['Int'];
  userId: Scalars['Int'];
  accountId: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  supplier: Client;
  discount: Array<CalculationDiscountSurcharge>;
  dueDate: Array<CalculationDueDate>;
  additionalCosts: Array<CalculationExtraExpense>;
  items: Array<CalculationItem>;
};


export type Client = {
   __typename?: 'Client';
  id: Scalars['ID'];
  taxNumber: Scalars['String'];
  clientNumber: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  descriptionShort: Scalars['String'];
  flag: Scalars['Float'];
  status: Scalars['Int'];
  userId: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  user: User;
  addresses: Array<Address>;
  contacts: Array<Contact>;
};

export type User = {
   __typename?: 'User';
  id: Scalars['ID'];
  accountCode: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  status: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  accounts: Array<Account>;
};

export type Account = {
   __typename?: 'Account';
  id: Scalars['ID'];
  userName: Scalars['String'];
  email: Scalars['String'];
  status: Scalars['Int'];
  userId: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type Address = {
   __typename?: 'Address';
  id: Scalars['ID'];
  street: Scalars['String'];
  zipCode: Scalars['String'];
  city: Scalars['String'];
  state?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  flag: Scalars['Int'];
  status: Scalars['Int'];
  userId: Scalars['Int'];
  clientId: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  user: User;
  client: Client;
};

export type Contact = {
   __typename?: 'Contact';
  id: Scalars['ID'];
  flag: Scalars['Float'];
  value: Scalars['String'];
  description: Scalars['String'];
  status: Scalars['Int'];
  userId: Scalars['Int'];
  clientId: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type CalculationDiscountSurcharge = {
   __typename?: 'CalculationDiscountSurcharge';
  id: Scalars['ID'];
  calculationId: Scalars['Int'];
  value: Scalars['Float'];
  percent: Scalars['Float'];
  description?: Maybe<Scalars['String']>;
  status: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  calculation: Calculation;
};

export type CalculationDueDate = {
   __typename?: 'CalculationDueDate';
  id: Scalars['ID'];
  calculationId: Scalars['Int'];
  value: Scalars['Float'];
  date: Scalars['DateTime'];
  status: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  calculation: Calculation;
};

export type CalculationExtraExpense = {
   __typename?: 'CalculationExtraExpense';
  id: Scalars['ID'];
  calculationId: Scalars['Int'];
  value: Scalars['Float'];
  vat: Scalars['Int'];
  vatValue: Scalars['Int'];
  description?: Maybe<Scalars['String']>;
  status: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  calculation: Calculation;
};

export type CalculationItem = {
   __typename?: 'CalculationItem';
  id: Scalars['ID'];
  calculationId: Scalars['Int'];
  itemId: Scalars['Int'];
  purchasePrice: Scalars['Float'];
  discountValue: Scalars['Float'];
  discountPercent: Scalars['Float'];
  extraCost: Scalars['Float'];
  sellingPrice: Scalars['Float'];
  quantity: Scalars['Float'];
  vat: Scalars['Int'];
  vatValue: Scalars['Int'];
  status: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  calculation: Calculation;
  item: Item;
};

export type Item = {
   __typename?: 'Item';
  id: Scalars['ID'];
  description?: Maybe<Scalars['String']>;
  shortDescription: Scalars['String'];
  barCode: Scalars['String'];
  qrCode?: Maybe<Scalars['String']>;
  sku?: Maybe<Scalars['Int']>;
  vat: Scalars['Int'];
  unit: Scalars['Int'];
  group: Scalars['Int'];
  price: Scalars['Float'];
  status: Scalars['Int'];
  userId: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type Sorting = {
  direction?: Maybe<Scalars['String']>;
  field: Scalars['String'];
};


export type ResponseCalculations = {
   __typename?: 'responseCalculations';
  items: Array<Calculation>;
  count: Scalars['Int'];
  perPage?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  hasMore: Scalars['Boolean'];
};

export type Receipt = {
   __typename?: 'Receipt';
  id: Scalars['ID'];
  userId: Scalars['Int'];
  accountId?: Maybe<Scalars['Int']>;
  receiptNumber: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  user: User;
  account: Account;
  items: Array<ReceiptItem>;
  payments: Array<ReceiptPayment>;
};

export type ReceiptItem = {
   __typename?: 'ReceiptItem';
  id: Scalars['ID'];
  itemId: Scalars['Int'];
  receiptId: Scalars['Int'];
  quantity: Scalars['Float'];
  price: Scalars['Float'];
  vat: Scalars['Int'];
  vatValue: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  receipt: Receipt;
  item: Item;
};

export type ReceiptPayment = {
   __typename?: 'ReceiptPayment';
  id: Scalars['ID'];
  receiptId: Scalars['Int'];
  type: Scalars['String'];
  value: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  receipt: Receipt;
};

export type ResponseReceipts = {
   __typename?: 'responseReceipts';
  items: Array<Receipt>;
  count: Scalars['Int'];
  perPage?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  hasMore: Scalars['Boolean'];
};

export type ResponseItems = {
   __typename?: 'responseItems';
  items: Array<Item>;
  count: Scalars['Int'];
  perPage?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  hasMore: Scalars['Boolean'];
};

export type ResponseSettings = {
   __typename?: 'responseSettings';
  items: Array<Settings>;
  count: Scalars['Int'];
  perPage?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  hasMore: Scalars['Boolean'];
};

export type Settings = {
   __typename?: 'Settings';
  id: Scalars['ID'];
  type: Scalars['String'];
  key: Scalars['String'];
  value?: Maybe<Scalars['String']>;
  valueJSON?: Maybe<Scalars['JSON']>;
  status: Scalars['Int'];
  userId: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type ResponseContacts = {
   __typename?: 'responseContacts';
  items: Array<Contact>;
  count: Scalars['Int'];
  perPage?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  hasMore: Scalars['Boolean'];
};

export type ResponseAccounts = {
   __typename?: 'responseAccounts';
  items: Array<Account>;
  count: Scalars['Int'];
  perPage?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  hasMore: Scalars['Boolean'];
};

export type ResponseUsers = {
   __typename?: 'responseUsers';
  items: Array<User>;
  count: Scalars['Int'];
  perPage?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  hasMore: Scalars['Boolean'];
};

export type ResponseAddresses = {
   __typename?: 'responseAddresses';
  items: Array<Address>;
  count: Scalars['Int'];
  perPage?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  hasMore: Scalars['Boolean'];
};

export type ResponseClients = {
   __typename?: 'responseClients';
  items: Array<Client>;
  count: Scalars['Int'];
  perPage?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  hasMore: Scalars['Boolean'];
};

export type AccountTypeLogin = {
  accountCode?: Maybe<Scalars['String']>;
  userName: Scalars['String'];
  password: Scalars['String'];
};

export type LoginTokens = {
   __typename?: 'loginTokens';
  token: Scalars['String'];
};

export type Mutation = {
   __typename?: 'Mutation';
  updateCalculation: Calculation;
  insertCalculation: Calculation;
  updateReceipt: Receipt;
  insertReceipt: Receipt;
  updateItem: Item;
  insertItem: Item;
  updateSettings: Settings;
  insertSettings: Settings;
  updateContact: Contact;
  insertContact: Contact;
  updateAccount: Account;
  insertAccount: Account;
  updateUser: User;
  insertUser: User;
  updateAddress: Address;
  insertAddress: Address;
  updateClient: Client;
  insertClient: Client;
  authRegistration: Scalars['String'];
  authConfirmation: Scalars['String'];
  authPasswordChange: Scalars['String'];
};


export type MutationUpdateCalculationArgs = {
  data: CalculationClassTypeUpdate;
  id: Scalars['Int'];
};


export type MutationInsertCalculationArgs = {
  data: CalculationClassTypeInsert;
};


export type MutationUpdateReceiptArgs = {
  data: ReceiptClassTypeUpdate;
  id: Scalars['Int'];
};


export type MutationInsertReceiptArgs = {
  data: ReceiptClassTypeInsert;
};


export type MutationUpdateItemArgs = {
  data: ItemClassTypeUpdate;
  id: Scalars['Int'];
};


export type MutationInsertItemArgs = {
  data: ItemClassTypeInsert;
};


export type MutationUpdateSettingsArgs = {
  data: SettingsClassTypeUpdate;
  id: Scalars['Int'];
};


export type MutationInsertSettingsArgs = {
  data: SettingsClassTypeInsert;
};


export type MutationUpdateContactArgs = {
  data: ContactClassTypeUpdate;
  id: Scalars['Int'];
};


export type MutationInsertContactArgs = {
  data: ContactClassTypeInsert;
};


export type MutationUpdateAccountArgs = {
  data: AccountClassTypeUpdate;
  id: Scalars['Int'];
};


export type MutationInsertAccountArgs = {
  data: AccountClassTypeInsert;
};


export type MutationUpdateUserArgs = {
  data: UserClassTypeUpdate;
  id: Scalars['Int'];
};


export type MutationInsertUserArgs = {
  data: UserClassTypeInsert;
};


export type MutationUpdateAddressArgs = {
  data: AddressClassTypeUpdate;
  id: Scalars['Int'];
};


export type MutationInsertAddressArgs = {
  data: AddressClassTypeInsert;
};


export type MutationUpdateClientArgs = {
  data: ClientClassTypeUpdate;
  id: Scalars['Int'];
};


export type MutationInsertClientArgs = {
  data: ClientClassTypeInsert;
};


export type MutationAuthRegistrationArgs = {
  data: AccountTypeRegister;
};


export type MutationAuthConfirmationArgs = {
  key: Scalars['String'];
};


export type MutationAuthPasswordChangeArgs = {
  data: AccountTypeChangePassword;
};

export type CalculationClassTypeUpdate = {
  number: Scalars['String'];
  dateOfIssue: Scalars['DateTime'];
  supplier: Scalars['Int'];
  dueDate?: Maybe<Array<CalculationDueDateRecordTypeInsert>>;
  additionalCosts?: Maybe<Array<CalculationExtraExpenseTypeInsert>>;
  discount?: Maybe<Array<CalculationDiscountSurchargeTypeInsert>>;
  items: Array<CalculationItemTypeInsert>;
};

export type CalculationDueDateRecordTypeInsert = {
  description?: Maybe<Scalars['String']>;
  date: Scalars['DateTime'];
  value: Scalars['Float'];
};

export type CalculationExtraExpenseTypeInsert = {
  vat: Scalars['Float'];
  value: Scalars['Float'];
  description?: Maybe<Scalars['String']>;
};

export type CalculationDiscountSurchargeTypeInsert = {
  percent?: Maybe<Scalars['Float']>;
  value?: Maybe<Scalars['Float']>;
  description?: Maybe<Scalars['String']>;
};

export type CalculationItemTypeInsert = {
  purchasePrice: Scalars['Float'];
  sellingPrice: Scalars['Float'];
  quantity: Scalars['Float'];
  discountValue?: Maybe<Scalars['Float']>;
  discountPercent?: Maybe<Scalars['Float']>;
  item: Scalars['Float'];
};

export type CalculationClassTypeInsert = {
  number: Scalars['String'];
  dateOfIssue: Scalars['DateTime'];
  supplier: Scalars['Int'];
  dueDate?: Maybe<Array<CalculationDueDateRecordTypeInsert>>;
  additionalCosts?: Maybe<Array<CalculationExtraExpenseTypeInsert>>;
  discount?: Maybe<Array<CalculationDiscountSurchargeTypeInsert>>;
  items: Array<CalculationItemTypeInsert>;
};

export type ReceiptClassTypeUpdate = {
  items?: Maybe<Array<ReceiptItemTypeInsert>>;
  payments?: Maybe<Array<ReceiptPaymentTypeInsert>>;
};

export type ReceiptItemTypeInsert = {
  itemId: Scalars['Float'];
  quantity: Scalars['Float'];
  price: Scalars['Float'];
};

export type ReceiptPaymentTypeInsert = {
  type: Scalars['String'];
  value: Scalars['String'];
};

export type ReceiptClassTypeInsert = {
  items?: Maybe<Array<ReceiptItemTypeInsert>>;
  payments?: Maybe<Array<ReceiptPaymentTypeInsert>>;
};

export type ItemClassTypeUpdate = {
  barCode: Scalars['String'];
  sku?: Maybe<Scalars['Int']>;
  qrCode?: Maybe<Scalars['String']>;
  price: Scalars['Float'];
  shortDescription: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  vat: Scalars['Int'];
  unit: Scalars['Int'];
  group?: Maybe<Scalars['Int']>;
};

export type ItemClassTypeInsert = {
  barCode: Scalars['String'];
  sku?: Maybe<Scalars['Int']>;
  qrCode?: Maybe<Scalars['String']>;
  price: Scalars['Float'];
  shortDescription: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  vat: Scalars['Int'];
  unit: Scalars['Int'];
  group?: Maybe<Scalars['Int']>;
};

export type SettingsClassTypeUpdate = {
  value?: Maybe<Scalars['String']>;
  valueJSON?: Maybe<Scalars['String']>;
};

export type SettingsClassTypeInsert = {
  key: Scalars['String'];
  value?: Maybe<Scalars['String']>;
  valueJSON?: Maybe<Scalars['String']>;
};

export type ContactClassTypeUpdate = {
  flag: Scalars['Int'];
  status?: Maybe<Scalars['Int']>;
  value?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type ContactClassTypeInsert = {
  flag?: Maybe<Scalars['Float']>;
  value: Scalars['String'];
  description: Scalars['String'];
};

export type AccountClassTypeUpdate = {
  id?: Maybe<Scalars['ID']>;
  userName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type AccountClassTypeInsert = {
  userName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UserClassTypeUpdate = {
  accountCode?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type UserClassTypeInsert = {
  accountCode?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type AddressClassTypeUpdate = {
  street?: Maybe<Scalars['String']>;
  zipCode?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  flag?: Maybe<Scalars['String']>;
};

export type AddressClassTypeInsert = {
  street?: Maybe<Scalars['String']>;
  zipCode?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  flag?: Maybe<Scalars['String']>;
};

export type ClientClassTypeUpdate = {
  taxNumber?: Maybe<Scalars['String']>;
  clientNumber?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  descriptionShort?: Maybe<Scalars['String']>;
  flag?: Maybe<Scalars['Int']>;
  addresses?: Maybe<Array<AddressTypeInsert>>;
  contacts?: Maybe<Array<ContactTypeInsert>>;
};

export type AddressTypeInsert = {
  street?: Maybe<Scalars['String']>;
  zipCode?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  flag?: Maybe<Scalars['String']>;
};

export type ContactTypeInsert = {
  flag?: Maybe<Scalars['Float']>;
  value: Scalars['String'];
  description: Scalars['String'];
};

export type ClientClassTypeInsert = {
  taxNumber: Scalars['String'];
  clientNumber: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  descriptionShort: Scalars['String'];
  flag?: Maybe<Scalars['Int']>;
  addresses?: Maybe<Array<AddressTypeInsert>>;
  contacts?: Maybe<Array<ContactTypeInsert>>;
};

export type AccountTypeRegister = {
  accountCode?: Maybe<Scalars['String']>;
  userName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type AccountTypeChangePassword = {
  password: Scalars['String'];
  key: Scalars['String'];
};

export type CalculationTax = {
   __typename?: 'CalculationTax';
  id: Scalars['ID'];
  calculationId: Scalars['Int'];
  vat: Scalars['Int'];
  vatValue: Scalars['Int'];
  status: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  calculation: Calculation;
};

export type Email = {
   __typename?: 'Email';
  id: Scalars['ID'];
  subject: Scalars['String'];
  to: Scalars['String'];
  numTryToSend: Scalars['Float'];
  status: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type RetailShop = {
   __typename?: 'RetailShop';
  id: Scalars['ID'];
  name: Scalars['String'];
  clientId: Scalars['Int'];
  status: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  client: Client;
};

export type SupplierItem = {
   __typename?: 'SupplierItem';
  id: Scalars['ID'];
  clientId: Scalars['Int'];
  itemId: Scalars['Int'];
  code: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  client: Client;
  item: Item;
};

export type PaginationFilterSortPart = {
  direction: Scalars['String'];
  field: Scalars['String'];
};

export type PaginationFilterSearchPart = {
  value: Scalars['String'];
  fields: Array<Scalars['String']>;
};

export type PaginationFilterRequest = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<PaginationFilterSortPart>;
  filter?: Maybe<PaginationFilterSearchPart>;
};

export type UserDetailsFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'description' | 'status' | 'createdAt' | 'updatedAt'>
);

export type AccountDetailsFragment = (
  { __typename?: 'Account' }
  & Pick<Account, 'id' | 'userName' | 'email' | 'status' | 'userId' | 'createdAt' | 'updatedAt'>
);

export type ClientDetailsFragment = (
  { __typename?: 'Client' }
  & Pick<Client, 'id' | 'taxNumber' | 'clientNumber' | 'description' | 'descriptionShort' | 'flag' | 'status'>
);

export type AddressDetailsFragment = (
  { __typename?: 'Address' }
  & Pick<Address, 'id' | 'street' | 'city' | 'state' | 'zipCode' | 'description' | 'flag' | 'createdAt' | 'updatedAt'>
);

export type ContactDetailsFragment = (
  { __typename?: 'Contact' }
  & Pick<Contact, 'id' | 'flag' | 'value' | 'description' | 'status' | 'createdAt' | 'updatedAt'>
);

export type ItemDetailsFragment = (
  { __typename?: 'Item' }
  & Pick<Item, 'id' | 'barCode' | 'sku' | 'description' | 'shortDescription' | 'price' | 'vat' | 'unit' | 'group'>
);

export type ReceiptDetailsFragment = (
  { __typename?: 'Receipt' }
  & Pick<Receipt, 'id' | 'receiptNumber' | 'createdAt'>
  & { items: Array<(
    { __typename?: 'ReceiptItem' }
    & Pick<ReceiptItem, 'id' | 'quantity' | 'price' | 'vat' | 'vatValue'>
    & { item: (
      { __typename?: 'Item' }
      & ItemDetailsFragment
    ) }
  )>, payments: Array<(
    { __typename?: 'ReceiptPayment' }
    & Pick<ReceiptPayment, 'id' | 'type' | 'value'>
  )> }
);

export type SettingsDetailsFragment = (
  { __typename?: 'Settings' }
  & Pick<Settings, 'id' | 'type' | 'key' | 'value' | 'valueJSON' | 'status' | 'createdAt' | 'updatedAt'>
);

export type SupplierItemDeatilsFragment = (
  { __typename?: 'SupplierItem' }
  & Pick<SupplierItem, 'id' | 'code'>
  & { item: (
    { __typename?: 'Item' }
    & ItemDetailsFragment
  ) }
);

export type CalculationItemDetailsFragment = (
  { __typename?: 'CalculationItem' }
  & Pick<CalculationItem, 'id' | 'purchasePrice' | 'sellingPrice' | 'quantity' | 'discountValue' | 'discountPercent' | 'extraCost' | 'vat' | 'vatValue' | 'status'>
  & { item: (
    { __typename?: 'Item' }
    & ItemDetailsFragment
  ) }
);

export type CalculationDetailsFragment = (
  { __typename?: 'Calculation' }
  & Pick<Calculation, 'id' | 'number' | 'dateOfIssue' | 'totalInvoiceTax' | 'totalInvoiceFinance' | 'extraExpenseTotal' | 'extraExpenseTax' | 'totalPurchaseFinance' | 'totalSellingFinance' | 'status'>
  & { supplier: (
    { __typename?: 'Client' }
    & ClientDetailsFragment
  ), items: Array<(
    { __typename?: 'CalculationItem' }
    & CalculationItemDetailsFragment
  )>, discount: Array<(
    { __typename?: 'CalculationDiscountSurcharge' }
    & Pick<CalculationDiscountSurcharge, 'id' | 'value' | 'description' | 'percent'>
  )>, dueDate: Array<(
    { __typename?: 'CalculationDueDate' }
    & Pick<CalculationDueDate, 'id' | 'date' | 'value' | 'status'>
  )>, additionalCosts: Array<(
    { __typename?: 'CalculationExtraExpense' }
    & Pick<CalculationExtraExpense, 'id' | 'value' | 'vat' | 'vatValue' | 'description' | 'status'>
  )> }
);

export type AccountsQueryVariables = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type AccountsQuery = (
  { __typename?: 'Query' }
  & { data: (
    { __typename?: 'responseAccounts' }
    & Pick<ResponseAccounts, 'count' | 'perPage' | 'page'>
    & { items: Array<(
      { __typename?: 'Account' }
      & AccountDetailsFragment
    )> }
  ) }
);

export type AddressQueryVariables = {
  id: Scalars['String'];
};


export type AddressQuery = (
  { __typename?: 'Query' }
  & { address?: Maybe<(
    { __typename?: 'Address' }
    & AddressDetailsFragment
  )> }
);

export type AddressesQueryVariables = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
};


export type AddressesQuery = (
  { __typename?: 'Query' }
  & { addresses: (
    { __typename?: 'responseAddresses' }
    & Pick<ResponseAddresses, 'count' | 'perPage' | 'page'>
    & { items: Array<(
      { __typename?: 'Address' }
      & AddressDetailsFragment
    )> }
  ) }
);

export type UpdateAddressMutationVariables = {
  id: Scalars['Int'];
  data: AddressClassTypeUpdate;
};


export type UpdateAddressMutation = (
  { __typename?: 'Mutation' }
  & { address: (
    { __typename?: 'Address' }
    & AddressDetailsFragment
  ) }
);

export type AuthPasswordRecoveryQueryVariables = {
  email: Scalars['String'];
};


export type AuthPasswordRecoveryQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'authPasswordRecovery'>
);

export type AuthLoginQueryVariables = {
  data: AccountTypeLogin;
};


export type AuthLoginQuery = (
  { __typename?: 'Query' }
  & { authLogin: (
    { __typename?: 'loginTokens' }
    & Pick<LoginTokens, 'token'>
  ) }
);

export type AuthLoggedQueryVariables = {};


export type AuthLoggedQuery = (
  { __typename?: 'Query' }
  & { authLogged: (
    { __typename?: 'Account' }
    & AccountDetailsFragment
  ) }
);

export type AuthPasswordChangeMutationVariables = {
  data: AccountTypeChangePassword;
};


export type AuthPasswordChangeMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'authPasswordChange'>
);

export type AuthRegistrationMutationVariables = {
  data: AccountTypeRegister;
};


export type AuthRegistrationMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'authRegistration'>
);

export type AuthConfirmationMutationVariables = {
  key: Scalars['String'];
};


export type AuthConfirmationMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'authConfirmation'>
);

export type CalculationQueryVariables = {
  id: Scalars['String'];
};


export type CalculationQuery = (
  { __typename?: 'Query' }
  & { data?: Maybe<(
    { __typename?: 'Calculation' }
    & CalculationDetailsFragment
  )> }
);

export type CalculationsQueryVariables = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
};


export type CalculationsQuery = (
  { __typename?: 'Query' }
  & { data: (
    { __typename?: 'responseCalculations' }
    & Pick<ResponseCalculations, 'count' | 'perPage' | 'page'>
    & { items: Array<(
      { __typename?: 'Calculation' }
      & CalculationDetailsFragment
    )> }
  ) }
);

export type InsertCalculationMutationVariables = {
  data: CalculationClassTypeInsert;
};


export type InsertCalculationMutation = (
  { __typename?: 'Mutation' }
  & { data: (
    { __typename?: 'Calculation' }
    & CalculationDetailsFragment
  ) }
);

export type ClientsQueryVariables = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
};


export type ClientsQuery = (
  { __typename?: 'Query' }
  & { data: (
    { __typename?: 'responseClients' }
    & Pick<ResponseClients, 'count' | 'perPage' | 'page'>
    & { items: Array<(
      { __typename?: 'Client' }
      & { addresses: Array<(
        { __typename?: 'Address' }
        & AddressDetailsFragment
      )>, contacts: Array<(
        { __typename?: 'Contact' }
        & ContactDetailsFragment
      )> }
      & ClientDetailsFragment
    )> }
  ) }
);

export type ClientQueryVariables = {
  id: Scalars['String'];
};


export type ClientQuery = (
  { __typename?: 'Query' }
  & { data?: Maybe<(
    { __typename?: 'Client' }
    & { addresses: Array<(
      { __typename?: 'Address' }
      & AddressDetailsFragment
    )>, contacts: Array<(
      { __typename?: 'Contact' }
      & ContactDetailsFragment
    )> }
    & ClientDetailsFragment
  )> }
);

export type InsertClientMutationVariables = {
  data: ClientClassTypeInsert;
};


export type InsertClientMutation = (
  { __typename?: 'Mutation' }
  & { client: (
    { __typename?: 'Client' }
    & { addresses: Array<(
      { __typename?: 'Address' }
      & AddressDetailsFragment
    )>, contacts: Array<(
      { __typename?: 'Contact' }
      & ContactDetailsFragment
    )> }
    & ClientDetailsFragment
  ) }
);

export type UpdateClientMutationVariables = {
  id: Scalars['Int'];
  data: ClientClassTypeUpdate;
};


export type UpdateClientMutation = (
  { __typename?: 'Mutation' }
  & { client: (
    { __typename?: 'Client' }
    & ClientDetailsFragment
  ) }
);

export type ContactsQueryVariables = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
};


export type ContactsQuery = (
  { __typename?: 'Query' }
  & { contacts: (
    { __typename?: 'responseContacts' }
    & Pick<ResponseContacts, 'count' | 'perPage' | 'page'>
    & { items: Array<(
      { __typename?: 'Contact' }
      & ContactDetailsFragment
    )> }
  ) }
);

export type ContactQueryVariables = {
  id: Scalars['String'];
};


export type ContactQuery = (
  { __typename?: 'Query' }
  & { contact?: Maybe<(
    { __typename?: 'Contact' }
    & ContactDetailsFragment
  )> }
);

export type InsertContactMutationVariables = {
  data: ContactClassTypeInsert;
};


export type InsertContactMutation = (
  { __typename?: 'Mutation' }
  & { contact: (
    { __typename?: 'Contact' }
    & ContactDetailsFragment
  ) }
);

export type UpdateContactMutationVariables = {
  id: Scalars['Int'];
  data: ContactClassTypeUpdate;
};


export type UpdateContactMutation = (
  { __typename?: 'Mutation' }
  & { contact: (
    { __typename?: 'Contact' }
    & ContactDetailsFragment
  ) }
);

export type ItemQueryVariables = {
  id: Scalars['String'];
};


export type ItemQuery = (
  { __typename?: 'Query' }
  & { data?: Maybe<(
    { __typename?: 'Item' }
    & ItemDetailsFragment
  )> }
);

export type ItemsQueryVariables = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
};


export type ItemsQuery = (
  { __typename?: 'Query' }
  & { data: (
    { __typename?: 'responseItems' }
    & Pick<ResponseItems, 'count' | 'perPage' | 'page'>
    & { items: Array<(
      { __typename?: 'Item' }
      & ItemDetailsFragment
    )> }
  ) }
);

export type InsertItemMutationVariables = {
  data: ItemClassTypeInsert;
};


export type InsertItemMutation = (
  { __typename?: 'Mutation' }
  & { item: (
    { __typename?: 'Item' }
    & ItemDetailsFragment
  ) }
);

export type UpdateItemMutationVariables = {
  id: Scalars['Int'];
  data: ItemClassTypeUpdate;
};


export type UpdateItemMutation = (
  { __typename?: 'Mutation' }
  & { item: (
    { __typename?: 'Item' }
    & ItemDetailsFragment
  ) }
);

export type InsertReceiptMutationVariables = {
  data: ReceiptClassTypeInsert;
};


export type InsertReceiptMutation = (
  { __typename?: 'Mutation' }
  & { receipt: (
    { __typename?: 'Receipt' }
    & ReceiptDetailsFragment
  ) }
);

export type ReceiptQueryVariables = {
  id: Scalars['String'];
};


export type ReceiptQuery = (
  { __typename?: 'Query' }
  & { data?: Maybe<(
    { __typename?: 'Receipt' }
    & ReceiptDetailsFragment
  )> }
);

export type ReceiptsQueryVariables = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
};


export type ReceiptsQuery = (
  { __typename?: 'Query' }
  & { data: (
    { __typename?: 'responseReceipts' }
    & Pick<ResponseReceipts, 'count' | 'perPage' | 'page'>
    & { items: Array<(
      { __typename?: 'Receipt' }
      & ReceiptDetailsFragment
    )> }
  ) }
);

export type UsersQueryVariables = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
};


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: (
    { __typename?: 'responseUsers' }
    & Pick<ResponseUsers, 'count' | 'perPage' | 'page'>
    & { items: Array<(
      { __typename?: 'User' }
      & UserDetailsFragment
    )> }
  ) }
);

export type UserQueryVariables = {
  id: Scalars['String'];
};


export type UserQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & { accounts: Array<(
      { __typename?: 'Account' }
      & AccountDetailsFragment
    )> }
    & UserDetailsFragment
  )> }
);

export const UserDetailsFragmentDoc = gql`
    fragment userDetails on User {
  id
  description
  status
  createdAt
  updatedAt
}
    `;
export const AccountDetailsFragmentDoc = gql`
    fragment accountDetails on Account {
  id
  userName
  email
  status
  userId
  createdAt
  updatedAt
}
    `;
export const AddressDetailsFragmentDoc = gql`
    fragment addressDetails on Address {
  id
  street
  city
  state
  zipCode
  description
  flag
  createdAt
  updatedAt
}
    `;
export const ContactDetailsFragmentDoc = gql`
    fragment contactDetails on Contact {
  id
  flag
  value
  description
  status
  createdAt
  updatedAt
}
    `;
export const ItemDetailsFragmentDoc = gql`
    fragment itemDetails on Item {
  id
  barCode
  sku
  description
  shortDescription
  price
  vat
  unit
  group
}
    `;
export const ReceiptDetailsFragmentDoc = gql`
    fragment receiptDetails on Receipt {
  id
  receiptNumber
  items {
    id
    item {
      ...itemDetails
    }
    quantity
    price
    vat
    vatValue
  }
  payments {
    id
    type
    value
  }
  createdAt
}
    ${ItemDetailsFragmentDoc}`;
export const SettingsDetailsFragmentDoc = gql`
    fragment settingsDetails on Settings {
  id
  type
  key
  value
  valueJSON
  status
  createdAt
  updatedAt
}
    `;
export const SupplierItemDeatilsFragmentDoc = gql`
    fragment supplierItemDeatils on SupplierItem {
  id
  item {
    ...itemDetails
  }
  code
}
    ${ItemDetailsFragmentDoc}`;
export const ClientDetailsFragmentDoc = gql`
    fragment clientDetails on Client {
  id
  taxNumber
  clientNumber
  description
  descriptionShort
  flag
  status
}
    `;
export const CalculationItemDetailsFragmentDoc = gql`
    fragment calculationItemDetails on CalculationItem {
  id
  purchasePrice
  sellingPrice
  quantity
  discountValue
  discountPercent
  extraCost
  item {
    ...itemDetails
  }
  vat
  vatValue
  status
}
    ${ItemDetailsFragmentDoc}`;
export const CalculationDetailsFragmentDoc = gql`
    fragment calculationDetails on Calculation {
  id
  number
  dateOfIssue
  totalInvoiceTax
  totalInvoiceFinance
  extraExpenseTotal
  extraExpenseTax
  totalPurchaseFinance
  totalSellingFinance
  supplier {
    ...clientDetails
  }
  status
  items {
    ...calculationItemDetails
  }
  discount {
    id
    value
    description
    percent
  }
  dueDate {
    id
    date
    value
    status
  }
  additionalCosts {
    id
    value
    vat
    vatValue
    description
    status
  }
}
    ${ClientDetailsFragmentDoc}
${CalculationItemDetailsFragmentDoc}`;
export const AccountsDocument = gql`
    query accounts($offset: Int, $limit: Int) {
  data: accounts(offset: $offset, limit: $limit) {
    items {
      ...accountDetails
    }
    count
    perPage
    page
  }
}
    ${AccountDetailsFragmentDoc}`;

/**
 * __useAccountsQuery__
 *
 * To run a query within a React component, call `useAccountsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccountsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccountsQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useAccountsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AccountsQuery, AccountsQueryVariables>) {
        return ApolloReactHooks.useQuery<AccountsQuery, AccountsQueryVariables>(AccountsDocument, baseOptions);
      }
export function useAccountsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AccountsQuery, AccountsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<AccountsQuery, AccountsQueryVariables>(AccountsDocument, baseOptions);
        }
export type AccountsQueryHookResult = ReturnType<typeof useAccountsQuery>;
export type AccountsLazyQueryHookResult = ReturnType<typeof useAccountsLazyQuery>;
export type AccountsQueryResult = ApolloReactCommon.QueryResult<AccountsQuery, AccountsQueryVariables>;
export const AddressDocument = gql`
    query address($id: String!) {
  address(id: $id) {
    ...addressDetails
  }
}
    ${AddressDetailsFragmentDoc}`;

/**
 * __useAddressQuery__
 *
 * To run a query within a React component, call `useAddressQuery` and pass it any options that fit your needs.
 * When your component renders, `useAddressQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAddressQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAddressQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AddressQuery, AddressQueryVariables>) {
        return ApolloReactHooks.useQuery<AddressQuery, AddressQueryVariables>(AddressDocument, baseOptions);
      }
export function useAddressLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AddressQuery, AddressQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<AddressQuery, AddressQueryVariables>(AddressDocument, baseOptions);
        }
export type AddressQueryHookResult = ReturnType<typeof useAddressQuery>;
export type AddressLazyQueryHookResult = ReturnType<typeof useAddressLazyQuery>;
export type AddressQueryResult = ApolloReactCommon.QueryResult<AddressQuery, AddressQueryVariables>;
export const AddressesDocument = gql`
    query addresses($limit: Int, $offset: Int, $page: Int, $perPage: Int, $sort: Sorting) {
  addresses(limit: $limit, offset: $offset, page: $page, perPage: $perPage, sort: $sort) {
    count
    perPage
    page
    items {
      ...addressDetails
    }
  }
}
    ${AddressDetailsFragmentDoc}`;

/**
 * __useAddressesQuery__
 *
 * To run a query within a React component, call `useAddressesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAddressesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAddressesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useAddressesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AddressesQuery, AddressesQueryVariables>) {
        return ApolloReactHooks.useQuery<AddressesQuery, AddressesQueryVariables>(AddressesDocument, baseOptions);
      }
export function useAddressesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AddressesQuery, AddressesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<AddressesQuery, AddressesQueryVariables>(AddressesDocument, baseOptions);
        }
export type AddressesQueryHookResult = ReturnType<typeof useAddressesQuery>;
export type AddressesLazyQueryHookResult = ReturnType<typeof useAddressesLazyQuery>;
export type AddressesQueryResult = ApolloReactCommon.QueryResult<AddressesQuery, AddressesQueryVariables>;
export const UpdateAddressDocument = gql`
    mutation updateAddress($id: Int!, $data: AddressClassTypeUpdate!) {
  address: updateAddress(id: $id, data: $data) {
    ...addressDetails
  }
}
    ${AddressDetailsFragmentDoc}`;
export type UpdateAddressMutationFn = ApolloReactCommon.MutationFunction<UpdateAddressMutation, UpdateAddressMutationVariables>;

/**
 * __useUpdateAddressMutation__
 *
 * To run a mutation, you first call `useUpdateAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAddressMutation, { data, loading, error }] = useUpdateAddressMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateAddressMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateAddressMutation, UpdateAddressMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateAddressMutation, UpdateAddressMutationVariables>(UpdateAddressDocument, baseOptions);
      }
export type UpdateAddressMutationHookResult = ReturnType<typeof useUpdateAddressMutation>;
export type UpdateAddressMutationResult = ApolloReactCommon.MutationResult<UpdateAddressMutation>;
export type UpdateAddressMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateAddressMutation, UpdateAddressMutationVariables>;
export const AuthPasswordRecoveryDocument = gql`
    query authPasswordRecovery($email: String!) {
  authPasswordRecovery(email: $email)
}
    `;

/**
 * __useAuthPasswordRecoveryQuery__
 *
 * To run a query within a React component, call `useAuthPasswordRecoveryQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthPasswordRecoveryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthPasswordRecoveryQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useAuthPasswordRecoveryQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AuthPasswordRecoveryQuery, AuthPasswordRecoveryQueryVariables>) {
        return ApolloReactHooks.useQuery<AuthPasswordRecoveryQuery, AuthPasswordRecoveryQueryVariables>(AuthPasswordRecoveryDocument, baseOptions);
      }
export function useAuthPasswordRecoveryLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AuthPasswordRecoveryQuery, AuthPasswordRecoveryQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<AuthPasswordRecoveryQuery, AuthPasswordRecoveryQueryVariables>(AuthPasswordRecoveryDocument, baseOptions);
        }
export type AuthPasswordRecoveryQueryHookResult = ReturnType<typeof useAuthPasswordRecoveryQuery>;
export type AuthPasswordRecoveryLazyQueryHookResult = ReturnType<typeof useAuthPasswordRecoveryLazyQuery>;
export type AuthPasswordRecoveryQueryResult = ApolloReactCommon.QueryResult<AuthPasswordRecoveryQuery, AuthPasswordRecoveryQueryVariables>;
export const AuthLoginDocument = gql`
    query authLogin($data: AccountTypeLogin!) {
  authLogin(data: $data) {
    token
  }
}
    `;

/**
 * __useAuthLoginQuery__
 *
 * To run a query within a React component, call `useAuthLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthLoginQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAuthLoginQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AuthLoginQuery, AuthLoginQueryVariables>) {
        return ApolloReactHooks.useQuery<AuthLoginQuery, AuthLoginQueryVariables>(AuthLoginDocument, baseOptions);
      }
export function useAuthLoginLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AuthLoginQuery, AuthLoginQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<AuthLoginQuery, AuthLoginQueryVariables>(AuthLoginDocument, baseOptions);
        }
export type AuthLoginQueryHookResult = ReturnType<typeof useAuthLoginQuery>;
export type AuthLoginLazyQueryHookResult = ReturnType<typeof useAuthLoginLazyQuery>;
export type AuthLoginQueryResult = ApolloReactCommon.QueryResult<AuthLoginQuery, AuthLoginQueryVariables>;
export const AuthLoggedDocument = gql`
    query authLogged {
  authLogged {
    ...accountDetails
  }
}
    ${AccountDetailsFragmentDoc}`;

/**
 * __useAuthLoggedQuery__
 *
 * To run a query within a React component, call `useAuthLoggedQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthLoggedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthLoggedQuery({
 *   variables: {
 *   },
 * });
 */
export function useAuthLoggedQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AuthLoggedQuery, AuthLoggedQueryVariables>) {
        return ApolloReactHooks.useQuery<AuthLoggedQuery, AuthLoggedQueryVariables>(AuthLoggedDocument, baseOptions);
      }
export function useAuthLoggedLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AuthLoggedQuery, AuthLoggedQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<AuthLoggedQuery, AuthLoggedQueryVariables>(AuthLoggedDocument, baseOptions);
        }
export type AuthLoggedQueryHookResult = ReturnType<typeof useAuthLoggedQuery>;
export type AuthLoggedLazyQueryHookResult = ReturnType<typeof useAuthLoggedLazyQuery>;
export type AuthLoggedQueryResult = ApolloReactCommon.QueryResult<AuthLoggedQuery, AuthLoggedQueryVariables>;
export const AuthPasswordChangeDocument = gql`
    mutation authPasswordChange($data: AccountTypeChangePassword!) {
  authPasswordChange(data: $data)
}
    `;
export type AuthPasswordChangeMutationFn = ApolloReactCommon.MutationFunction<AuthPasswordChangeMutation, AuthPasswordChangeMutationVariables>;

/**
 * __useAuthPasswordChangeMutation__
 *
 * To run a mutation, you first call `useAuthPasswordChangeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthPasswordChangeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authPasswordChangeMutation, { data, loading, error }] = useAuthPasswordChangeMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAuthPasswordChangeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AuthPasswordChangeMutation, AuthPasswordChangeMutationVariables>) {
        return ApolloReactHooks.useMutation<AuthPasswordChangeMutation, AuthPasswordChangeMutationVariables>(AuthPasswordChangeDocument, baseOptions);
      }
export type AuthPasswordChangeMutationHookResult = ReturnType<typeof useAuthPasswordChangeMutation>;
export type AuthPasswordChangeMutationResult = ApolloReactCommon.MutationResult<AuthPasswordChangeMutation>;
export type AuthPasswordChangeMutationOptions = ApolloReactCommon.BaseMutationOptions<AuthPasswordChangeMutation, AuthPasswordChangeMutationVariables>;
export const AuthRegistrationDocument = gql`
    mutation authRegistration($data: AccountTypeRegister!) {
  authRegistration(data: $data)
}
    `;
export type AuthRegistrationMutationFn = ApolloReactCommon.MutationFunction<AuthRegistrationMutation, AuthRegistrationMutationVariables>;

/**
 * __useAuthRegistrationMutation__
 *
 * To run a mutation, you first call `useAuthRegistrationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthRegistrationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authRegistrationMutation, { data, loading, error }] = useAuthRegistrationMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAuthRegistrationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AuthRegistrationMutation, AuthRegistrationMutationVariables>) {
        return ApolloReactHooks.useMutation<AuthRegistrationMutation, AuthRegistrationMutationVariables>(AuthRegistrationDocument, baseOptions);
      }
export type AuthRegistrationMutationHookResult = ReturnType<typeof useAuthRegistrationMutation>;
export type AuthRegistrationMutationResult = ApolloReactCommon.MutationResult<AuthRegistrationMutation>;
export type AuthRegistrationMutationOptions = ApolloReactCommon.BaseMutationOptions<AuthRegistrationMutation, AuthRegistrationMutationVariables>;
export const AuthConfirmationDocument = gql`
    mutation authConfirmation($key: String!) {
  authConfirmation(key: $key)
}
    `;
export type AuthConfirmationMutationFn = ApolloReactCommon.MutationFunction<AuthConfirmationMutation, AuthConfirmationMutationVariables>;

/**
 * __useAuthConfirmationMutation__
 *
 * To run a mutation, you first call `useAuthConfirmationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthConfirmationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authConfirmationMutation, { data, loading, error }] = useAuthConfirmationMutation({
 *   variables: {
 *      key: // value for 'key'
 *   },
 * });
 */
export function useAuthConfirmationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AuthConfirmationMutation, AuthConfirmationMutationVariables>) {
        return ApolloReactHooks.useMutation<AuthConfirmationMutation, AuthConfirmationMutationVariables>(AuthConfirmationDocument, baseOptions);
      }
export type AuthConfirmationMutationHookResult = ReturnType<typeof useAuthConfirmationMutation>;
export type AuthConfirmationMutationResult = ApolloReactCommon.MutationResult<AuthConfirmationMutation>;
export type AuthConfirmationMutationOptions = ApolloReactCommon.BaseMutationOptions<AuthConfirmationMutation, AuthConfirmationMutationVariables>;
export const CalculationDocument = gql`
    query calculation($id: String!) {
  data: calculation(id: $id) {
    ...calculationDetails
  }
}
    ${CalculationDetailsFragmentDoc}`;

/**
 * __useCalculationQuery__
 *
 * To run a query within a React component, call `useCalculationQuery` and pass it any options that fit your needs.
 * When your component renders, `useCalculationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCalculationQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCalculationQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CalculationQuery, CalculationQueryVariables>) {
        return ApolloReactHooks.useQuery<CalculationQuery, CalculationQueryVariables>(CalculationDocument, baseOptions);
      }
export function useCalculationLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CalculationQuery, CalculationQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CalculationQuery, CalculationQueryVariables>(CalculationDocument, baseOptions);
        }
export type CalculationQueryHookResult = ReturnType<typeof useCalculationQuery>;
export type CalculationLazyQueryHookResult = ReturnType<typeof useCalculationLazyQuery>;
export type CalculationQueryResult = ApolloReactCommon.QueryResult<CalculationQuery, CalculationQueryVariables>;
export const CalculationsDocument = gql`
    query calculations($limit: Int, $offset: Int, $page: Int, $perPage: Int, $sort: Sorting, $filter: JSON) {
  data: calculations(limit: $limit, offset: $offset, page: $page, perPage: $perPage, sort: $sort, filter: $filter) {
    items {
      ...calculationDetails
    }
    count
    perPage
    page
  }
}
    ${CalculationDetailsFragmentDoc}`;

/**
 * __useCalculationsQuery__
 *
 * To run a query within a React component, call `useCalculationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCalculationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCalculationsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      sort: // value for 'sort'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useCalculationsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CalculationsQuery, CalculationsQueryVariables>) {
        return ApolloReactHooks.useQuery<CalculationsQuery, CalculationsQueryVariables>(CalculationsDocument, baseOptions);
      }
export function useCalculationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CalculationsQuery, CalculationsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CalculationsQuery, CalculationsQueryVariables>(CalculationsDocument, baseOptions);
        }
export type CalculationsQueryHookResult = ReturnType<typeof useCalculationsQuery>;
export type CalculationsLazyQueryHookResult = ReturnType<typeof useCalculationsLazyQuery>;
export type CalculationsQueryResult = ApolloReactCommon.QueryResult<CalculationsQuery, CalculationsQueryVariables>;
export const InsertCalculationDocument = gql`
    mutation insertCalculation($data: CalculationClassTypeInsert!) {
  data: insertCalculation(data: $data) {
    ...calculationDetails
  }
}
    ${CalculationDetailsFragmentDoc}`;
export type InsertCalculationMutationFn = ApolloReactCommon.MutationFunction<InsertCalculationMutation, InsertCalculationMutationVariables>;

/**
 * __useInsertCalculationMutation__
 *
 * To run a mutation, you first call `useInsertCalculationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertCalculationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertCalculationMutation, { data, loading, error }] = useInsertCalculationMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useInsertCalculationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<InsertCalculationMutation, InsertCalculationMutationVariables>) {
        return ApolloReactHooks.useMutation<InsertCalculationMutation, InsertCalculationMutationVariables>(InsertCalculationDocument, baseOptions);
      }
export type InsertCalculationMutationHookResult = ReturnType<typeof useInsertCalculationMutation>;
export type InsertCalculationMutationResult = ApolloReactCommon.MutationResult<InsertCalculationMutation>;
export type InsertCalculationMutationOptions = ApolloReactCommon.BaseMutationOptions<InsertCalculationMutation, InsertCalculationMutationVariables>;
export const ClientsDocument = gql`
    query clients($limit: Int, $offset: Int, $page: Int, $perPage: Int, $sort: Sorting, $filter: JSON) {
  data: clients(limit: $limit, offset: $offset, page: $page, perPage: $perPage, sort: $sort, filter: $filter) {
    items {
      ...clientDetails
      addresses {
        ...addressDetails
      }
      contacts {
        ...contactDetails
      }
    }
    count
    perPage
    page
  }
}
    ${ClientDetailsFragmentDoc}
${AddressDetailsFragmentDoc}
${ContactDetailsFragmentDoc}`;

/**
 * __useClientsQuery__
 *
 * To run a query within a React component, call `useClientsQuery` and pass it any options that fit your needs.
 * When your component renders, `useClientsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClientsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      sort: // value for 'sort'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useClientsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ClientsQuery, ClientsQueryVariables>) {
        return ApolloReactHooks.useQuery<ClientsQuery, ClientsQueryVariables>(ClientsDocument, baseOptions);
      }
export function useClientsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ClientsQuery, ClientsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ClientsQuery, ClientsQueryVariables>(ClientsDocument, baseOptions);
        }
export type ClientsQueryHookResult = ReturnType<typeof useClientsQuery>;
export type ClientsLazyQueryHookResult = ReturnType<typeof useClientsLazyQuery>;
export type ClientsQueryResult = ApolloReactCommon.QueryResult<ClientsQuery, ClientsQueryVariables>;
export const ClientDocument = gql`
    query client($id: String!) {
  data: client(id: $id) {
    ...clientDetails
    addresses {
      ...addressDetails
    }
    contacts {
      ...contactDetails
    }
  }
}
    ${ClientDetailsFragmentDoc}
${AddressDetailsFragmentDoc}
${ContactDetailsFragmentDoc}`;

/**
 * __useClientQuery__
 *
 * To run a query within a React component, call `useClientQuery` and pass it any options that fit your needs.
 * When your component renders, `useClientQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClientQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useClientQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ClientQuery, ClientQueryVariables>) {
        return ApolloReactHooks.useQuery<ClientQuery, ClientQueryVariables>(ClientDocument, baseOptions);
      }
export function useClientLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ClientQuery, ClientQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ClientQuery, ClientQueryVariables>(ClientDocument, baseOptions);
        }
export type ClientQueryHookResult = ReturnType<typeof useClientQuery>;
export type ClientLazyQueryHookResult = ReturnType<typeof useClientLazyQuery>;
export type ClientQueryResult = ApolloReactCommon.QueryResult<ClientQuery, ClientQueryVariables>;
export const InsertClientDocument = gql`
    mutation insertClient($data: ClientClassTypeInsert!) {
  client: insertClient(data: $data) {
    ...clientDetails
    addresses {
      ...addressDetails
    }
    contacts {
      ...contactDetails
    }
  }
}
    ${ClientDetailsFragmentDoc}
${AddressDetailsFragmentDoc}
${ContactDetailsFragmentDoc}`;
export type InsertClientMutationFn = ApolloReactCommon.MutationFunction<InsertClientMutation, InsertClientMutationVariables>;

/**
 * __useInsertClientMutation__
 *
 * To run a mutation, you first call `useInsertClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertClientMutation, { data, loading, error }] = useInsertClientMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useInsertClientMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<InsertClientMutation, InsertClientMutationVariables>) {
        return ApolloReactHooks.useMutation<InsertClientMutation, InsertClientMutationVariables>(InsertClientDocument, baseOptions);
      }
export type InsertClientMutationHookResult = ReturnType<typeof useInsertClientMutation>;
export type InsertClientMutationResult = ApolloReactCommon.MutationResult<InsertClientMutation>;
export type InsertClientMutationOptions = ApolloReactCommon.BaseMutationOptions<InsertClientMutation, InsertClientMutationVariables>;
export const UpdateClientDocument = gql`
    mutation updateClient($id: Int!, $data: ClientClassTypeUpdate!) {
  client: updateClient(id: $id, data: $data) {
    ...clientDetails
  }
}
    ${ClientDetailsFragmentDoc}`;
export type UpdateClientMutationFn = ApolloReactCommon.MutationFunction<UpdateClientMutation, UpdateClientMutationVariables>;

/**
 * __useUpdateClientMutation__
 *
 * To run a mutation, you first call `useUpdateClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateClientMutation, { data, loading, error }] = useUpdateClientMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateClientMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateClientMutation, UpdateClientMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateClientMutation, UpdateClientMutationVariables>(UpdateClientDocument, baseOptions);
      }
export type UpdateClientMutationHookResult = ReturnType<typeof useUpdateClientMutation>;
export type UpdateClientMutationResult = ApolloReactCommon.MutationResult<UpdateClientMutation>;
export type UpdateClientMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateClientMutation, UpdateClientMutationVariables>;
export const ContactsDocument = gql`
    query contacts($limit: Int, $offset: Int, $page: Int, $perPage: Int, $sort: Sorting) {
  contacts(limit: $limit, offset: $offset, page: $page, perPage: $perPage, sort: $sort) {
    items {
      ...contactDetails
    }
    count
    perPage
    page
  }
}
    ${ContactDetailsFragmentDoc}`;

/**
 * __useContactsQuery__
 *
 * To run a query within a React component, call `useContactsQuery` and pass it any options that fit your needs.
 * When your component renders, `useContactsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useContactsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useContactsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ContactsQuery, ContactsQueryVariables>) {
        return ApolloReactHooks.useQuery<ContactsQuery, ContactsQueryVariables>(ContactsDocument, baseOptions);
      }
export function useContactsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ContactsQuery, ContactsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ContactsQuery, ContactsQueryVariables>(ContactsDocument, baseOptions);
        }
export type ContactsQueryHookResult = ReturnType<typeof useContactsQuery>;
export type ContactsLazyQueryHookResult = ReturnType<typeof useContactsLazyQuery>;
export type ContactsQueryResult = ApolloReactCommon.QueryResult<ContactsQuery, ContactsQueryVariables>;
export const ContactDocument = gql`
    query contact($id: String!) {
  contact(id: $id) {
    ...contactDetails
  }
}
    ${ContactDetailsFragmentDoc}`;

/**
 * __useContactQuery__
 *
 * To run a query within a React component, call `useContactQuery` and pass it any options that fit your needs.
 * When your component renders, `useContactQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useContactQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useContactQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ContactQuery, ContactQueryVariables>) {
        return ApolloReactHooks.useQuery<ContactQuery, ContactQueryVariables>(ContactDocument, baseOptions);
      }
export function useContactLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ContactQuery, ContactQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ContactQuery, ContactQueryVariables>(ContactDocument, baseOptions);
        }
export type ContactQueryHookResult = ReturnType<typeof useContactQuery>;
export type ContactLazyQueryHookResult = ReturnType<typeof useContactLazyQuery>;
export type ContactQueryResult = ApolloReactCommon.QueryResult<ContactQuery, ContactQueryVariables>;
export const InsertContactDocument = gql`
    mutation insertContact($data: ContactClassTypeInsert!) {
  contact: insertContact(data: $data) {
    ...contactDetails
  }
}
    ${ContactDetailsFragmentDoc}`;
export type InsertContactMutationFn = ApolloReactCommon.MutationFunction<InsertContactMutation, InsertContactMutationVariables>;

/**
 * __useInsertContactMutation__
 *
 * To run a mutation, you first call `useInsertContactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertContactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertContactMutation, { data, loading, error }] = useInsertContactMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useInsertContactMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<InsertContactMutation, InsertContactMutationVariables>) {
        return ApolloReactHooks.useMutation<InsertContactMutation, InsertContactMutationVariables>(InsertContactDocument, baseOptions);
      }
export type InsertContactMutationHookResult = ReturnType<typeof useInsertContactMutation>;
export type InsertContactMutationResult = ApolloReactCommon.MutationResult<InsertContactMutation>;
export type InsertContactMutationOptions = ApolloReactCommon.BaseMutationOptions<InsertContactMutation, InsertContactMutationVariables>;
export const UpdateContactDocument = gql`
    mutation updateContact($id: Int!, $data: ContactClassTypeUpdate!) {
  contact: updateContact(id: $id, data: $data) {
    ...contactDetails
  }
}
    ${ContactDetailsFragmentDoc}`;
export type UpdateContactMutationFn = ApolloReactCommon.MutationFunction<UpdateContactMutation, UpdateContactMutationVariables>;

/**
 * __useUpdateContactMutation__
 *
 * To run a mutation, you first call `useUpdateContactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateContactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateContactMutation, { data, loading, error }] = useUpdateContactMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateContactMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateContactMutation, UpdateContactMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateContactMutation, UpdateContactMutationVariables>(UpdateContactDocument, baseOptions);
      }
export type UpdateContactMutationHookResult = ReturnType<typeof useUpdateContactMutation>;
export type UpdateContactMutationResult = ApolloReactCommon.MutationResult<UpdateContactMutation>;
export type UpdateContactMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateContactMutation, UpdateContactMutationVariables>;
export const ItemDocument = gql`
    query item($id: String!) {
  data: item(id: $id) {
    ...itemDetails
  }
}
    ${ItemDetailsFragmentDoc}`;

/**
 * __useItemQuery__
 *
 * To run a query within a React component, call `useItemQuery` and pass it any options that fit your needs.
 * When your component renders, `useItemQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useItemQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useItemQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ItemQuery, ItemQueryVariables>) {
        return ApolloReactHooks.useQuery<ItemQuery, ItemQueryVariables>(ItemDocument, baseOptions);
      }
export function useItemLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ItemQuery, ItemQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ItemQuery, ItemQueryVariables>(ItemDocument, baseOptions);
        }
export type ItemQueryHookResult = ReturnType<typeof useItemQuery>;
export type ItemLazyQueryHookResult = ReturnType<typeof useItemLazyQuery>;
export type ItemQueryResult = ApolloReactCommon.QueryResult<ItemQuery, ItemQueryVariables>;
export const ItemsDocument = gql`
    query items($limit: Int, $offset: Int, $page: Int, $perPage: Int, $sort: Sorting, $filter: JSON) {
  data: items(limit: $limit, offset: $offset, page: $page, perPage: $perPage, sort: $sort, filter: $filter) {
    items {
      ...itemDetails
    }
    count
    perPage
    page
  }
}
    ${ItemDetailsFragmentDoc}`;

/**
 * __useItemsQuery__
 *
 * To run a query within a React component, call `useItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useItemsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      sort: // value for 'sort'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useItemsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ItemsQuery, ItemsQueryVariables>) {
        return ApolloReactHooks.useQuery<ItemsQuery, ItemsQueryVariables>(ItemsDocument, baseOptions);
      }
export function useItemsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ItemsQuery, ItemsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ItemsQuery, ItemsQueryVariables>(ItemsDocument, baseOptions);
        }
export type ItemsQueryHookResult = ReturnType<typeof useItemsQuery>;
export type ItemsLazyQueryHookResult = ReturnType<typeof useItemsLazyQuery>;
export type ItemsQueryResult = ApolloReactCommon.QueryResult<ItemsQuery, ItemsQueryVariables>;
export const InsertItemDocument = gql`
    mutation insertItem($data: ItemClassTypeInsert!) {
  item: insertItem(data: $data) {
    ...itemDetails
  }
}
    ${ItemDetailsFragmentDoc}`;
export type InsertItemMutationFn = ApolloReactCommon.MutationFunction<InsertItemMutation, InsertItemMutationVariables>;

/**
 * __useInsertItemMutation__
 *
 * To run a mutation, you first call `useInsertItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertItemMutation, { data, loading, error }] = useInsertItemMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useInsertItemMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<InsertItemMutation, InsertItemMutationVariables>) {
        return ApolloReactHooks.useMutation<InsertItemMutation, InsertItemMutationVariables>(InsertItemDocument, baseOptions);
      }
export type InsertItemMutationHookResult = ReturnType<typeof useInsertItemMutation>;
export type InsertItemMutationResult = ApolloReactCommon.MutationResult<InsertItemMutation>;
export type InsertItemMutationOptions = ApolloReactCommon.BaseMutationOptions<InsertItemMutation, InsertItemMutationVariables>;
export const UpdateItemDocument = gql`
    mutation updateItem($id: Int!, $data: ItemClassTypeUpdate!) {
  item: updateItem(id: $id, data: $data) {
    ...itemDetails
  }
}
    ${ItemDetailsFragmentDoc}`;
export type UpdateItemMutationFn = ApolloReactCommon.MutationFunction<UpdateItemMutation, UpdateItemMutationVariables>;

/**
 * __useUpdateItemMutation__
 *
 * To run a mutation, you first call `useUpdateItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateItemMutation, { data, loading, error }] = useUpdateItemMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateItemMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateItemMutation, UpdateItemMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateItemMutation, UpdateItemMutationVariables>(UpdateItemDocument, baseOptions);
      }
export type UpdateItemMutationHookResult = ReturnType<typeof useUpdateItemMutation>;
export type UpdateItemMutationResult = ApolloReactCommon.MutationResult<UpdateItemMutation>;
export type UpdateItemMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateItemMutation, UpdateItemMutationVariables>;
export const InsertReceiptDocument = gql`
    mutation insertReceipt($data: ReceiptClassTypeInsert!) {
  receipt: insertReceipt(data: $data) {
    ...receiptDetails
  }
}
    ${ReceiptDetailsFragmentDoc}`;
export type InsertReceiptMutationFn = ApolloReactCommon.MutationFunction<InsertReceiptMutation, InsertReceiptMutationVariables>;

/**
 * __useInsertReceiptMutation__
 *
 * To run a mutation, you first call `useInsertReceiptMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertReceiptMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertReceiptMutation, { data, loading, error }] = useInsertReceiptMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useInsertReceiptMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<InsertReceiptMutation, InsertReceiptMutationVariables>) {
        return ApolloReactHooks.useMutation<InsertReceiptMutation, InsertReceiptMutationVariables>(InsertReceiptDocument, baseOptions);
      }
export type InsertReceiptMutationHookResult = ReturnType<typeof useInsertReceiptMutation>;
export type InsertReceiptMutationResult = ApolloReactCommon.MutationResult<InsertReceiptMutation>;
export type InsertReceiptMutationOptions = ApolloReactCommon.BaseMutationOptions<InsertReceiptMutation, InsertReceiptMutationVariables>;
export const ReceiptDocument = gql`
    query receipt($id: String!) {
  data: receipt(id: $id) {
    ...receiptDetails
  }
}
    ${ReceiptDetailsFragmentDoc}`;

/**
 * __useReceiptQuery__
 *
 * To run a query within a React component, call `useReceiptQuery` and pass it any options that fit your needs.
 * When your component renders, `useReceiptQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReceiptQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useReceiptQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ReceiptQuery, ReceiptQueryVariables>) {
        return ApolloReactHooks.useQuery<ReceiptQuery, ReceiptQueryVariables>(ReceiptDocument, baseOptions);
      }
export function useReceiptLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ReceiptQuery, ReceiptQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ReceiptQuery, ReceiptQueryVariables>(ReceiptDocument, baseOptions);
        }
export type ReceiptQueryHookResult = ReturnType<typeof useReceiptQuery>;
export type ReceiptLazyQueryHookResult = ReturnType<typeof useReceiptLazyQuery>;
export type ReceiptQueryResult = ApolloReactCommon.QueryResult<ReceiptQuery, ReceiptQueryVariables>;
export const ReceiptsDocument = gql`
    query receipts($limit: Int, $offset: Int, $page: Int, $perPage: Int, $sort: Sorting, $filter: JSON) {
  data: receipts(limit: $limit, offset: $offset, page: $page, perPage: $perPage, sort: $sort, filter: $filter) {
    items {
      ...receiptDetails
    }
    count
    perPage
    page
  }
}
    ${ReceiptDetailsFragmentDoc}`;

/**
 * __useReceiptsQuery__
 *
 * To run a query within a React component, call `useReceiptsQuery` and pass it any options that fit your needs.
 * When your component renders, `useReceiptsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReceiptsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      sort: // value for 'sort'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useReceiptsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ReceiptsQuery, ReceiptsQueryVariables>) {
        return ApolloReactHooks.useQuery<ReceiptsQuery, ReceiptsQueryVariables>(ReceiptsDocument, baseOptions);
      }
export function useReceiptsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ReceiptsQuery, ReceiptsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ReceiptsQuery, ReceiptsQueryVariables>(ReceiptsDocument, baseOptions);
        }
export type ReceiptsQueryHookResult = ReturnType<typeof useReceiptsQuery>;
export type ReceiptsLazyQueryHookResult = ReturnType<typeof useReceiptsLazyQuery>;
export type ReceiptsQueryResult = ApolloReactCommon.QueryResult<ReceiptsQuery, ReceiptsQueryVariables>;
export const UsersDocument = gql`
    query users($limit: Int, $offset: Int, $page: Int, $perPage: Int, $sort: Sorting) {
  users(limit: $limit, offset: $offset, page: $page, perPage: $perPage, sort: $sort) {
    items {
      ...userDetails
    }
    count
    perPage
    page
  }
}
    ${UserDetailsFragmentDoc}`;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        return ApolloReactHooks.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
      }
export function useUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = ApolloReactCommon.QueryResult<UsersQuery, UsersQueryVariables>;
export const UserDocument = gql`
    query user($id: String!) {
  user(id: $id) {
    ...userDetails
    accounts {
      ...accountDetails
    }
  }
}
    ${UserDetailsFragmentDoc}
${AccountDetailsFragmentDoc}`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UserQuery, UserQueryVariables>) {
        return ApolloReactHooks.useQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
      }
export function useUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = ApolloReactCommon.QueryResult<UserQuery, UserQueryVariables>;