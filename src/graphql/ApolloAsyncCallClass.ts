import {
  ClientsDocument,
  ItemDocument,
  ItemsDocument
}                                      from './graphql'
import {queryVariablesForAutoComplete} from './variablesq'
import {
  get as _get,
  omit as _omit
}                                      from 'lodash'

class ApolloAsyncCallClass {
  private client : any

  set apolloClient (value : any) {
    this.client = value
  }

  itemsFind = (value : string, findBy : string[] = ['description', 'shortDescription', 'barCode', 'sku']) => {
    value = value.trim()
    return new Promise(resolve => {
      if (value.length === 0) {
        return resolve([])
      }
      this.client.query({
        query: ItemsDocument,
        fetchPolicy: 'network-only',
        variables: queryVariablesForAutoComplete(findBy, value),
      }).then((result : any) => {
        let data = _get(result, 'data.data.items')
        !data && (data = [])
        resolve(data)
      })
        .catch((e : any) => {
          console.log(e)
        })
    })
  }

  itemFindById = (value : string | number) => {
    return new Promise(resolve => {
      this.client.query({
        query: ItemDocument,
        fetchPolicy: 'network-only',
        variables: {
          id: value ? value.toString() : ''
        },
      }).then((result : any) => {
        const data = _omit(_get(result, 'data.data'), '__typename')
        resolve(data)
      })
        .catch((e : any) => {
          console.log(e)
        })
    })
  }

 /* findSupplierSku = (clientId : string,itemId : string) => {
    return new Promise(resolve => {
      this.client.query({
        query: ItemDocument,
        fetchPolicy: 'network-only',
        variables: {
          clientId: clientId,
          itemId: itemId
        },
      }).then((result : any) => {
        const data = _omit(_get(result, 'data.data'), '__typename')
        resolve(data)
      })
        .catch((e : any) => {
          console.log(e)
        })
    })
  }*/

  clientsFind = (value : string, findBy : string[] = ['description', 'descriptionShort', 'taxNumber', 'clientNumber']) => {
    value = value.trim()
    return new Promise(resolve => {
      if (value.length === 0) {
        return resolve([])
      }
      this.client.query({
        query: ClientsDocument,
        fetchPolicy: 'network-only',
        variables: queryVariablesForAutoComplete(findBy, value),
      }).then((result : any) => {
        let data = _get(result, 'data.data.items')
        !data && (data = [])
        resolve(data)
      })
        .catch((e : any) => {
          console.log(e)
        })
    })
  }

}

const ApolloAsyncCall = new ApolloAsyncCallClass()

export default ApolloAsyncCall
