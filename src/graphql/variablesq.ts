import {
  _$like,
  _$or
} from '../application/utils/apolloUtil'

export const queryVariablesForClients = (searchString : string) => {
  const q = {
    offset: 0,
    limit: 1000
  }
  return (searchString.trim().length > 0) ? {
    ...q,
    ...{
      filter: _$like(['description', 'descriptionShort', 'clientNumber', 'taxNumber'], `%${searchString}%`)
    }
  } : q
}

export const queryVariablesForReceipts = (searchString : string) => {
  const q = {
    offset: 0,
    limit: 1000
  }
  return (searchString.trim().length > 0) ? {
    ...q,
    ...{
      filter: _$like(['receiptNumber'], `%${searchString}%`)
    }
  } : q
}

export const queryVariablesForItems = (searchString : string) => {
  const q = {
    offset: 0,
    limit: 1000
  }
  return (searchString.trim().length > 0) ? {
    ...q,
    ...{
      filter: _$like(['shortDescription', 'barCode'], `%${searchString}%`)
    }
  } : q
}

export const queryVariablesItemsBarCodeSku = (searchString : string) => {
  const q = {
    offset: 0,
    limit: 1000
  }
  return (searchString.trim().length > 0) ? {
    ...q,
    ...{
      filter: _$or(['sku', 'barCode'], `${searchString}`)
    }
  } : q
}

export const queryVariablesForSale = (searchString : string) => {
  const q = {
    offset: 0,
    limit: 1000
  }
  return (searchString.trim().length > 0) ? {
    ...q,
    ...{
      filter: _$like(['barCode', 'sku', 'shortDescription', 'description'], `%${searchString}%`)
    }
  } : q
}

export const queryVariablesForAutoComplete = (variables : string[], searchString : string) => {
  const q = {
    offset: 0,
    limit: 10
  }
  return (searchString.trim().length > 0) ? {
    ...{
      filter: _$like(variables, `%${searchString}%`)
    }
  } : q
}

export const queryVariablesForCalculations = (searchString : string) => {
  const q = {
    offset: 0,
    limit: 1000
  }
  return (searchString.trim().length > 0) ? {
    ...q,
    ...{
      filter: _$like(['dateOfIssue', 'number'], `%${searchString}%`)
    }
  } : q
}

