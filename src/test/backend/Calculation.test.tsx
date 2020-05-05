import 'jest-extended'
import React                          from "react"
import Enzyme, {mount}                from 'enzyme'
import Adapter                        from 'enzyme-adapter-react-16';
import {useInsertCalculationMutation} from "../../graphql/graphql";
import {TestComponent}                from "../TestComponent";
import {act}                          from "react-dom/test-utils";
import  *  as _ from 'lodash'

Enzyme.configure({adapter: new Adapter()});

const calculationObject = {
    number: "CAL-TEST-1",
    dateOfIssue: new Date().toISOString(),
    supplier: 1,
    items:[
        {
            purchasePrice: 20,
            sellingPrice: 30,
            quantity: 15,
            item: 2
        },
        {
            purchasePrice: 10,
            sellingPrice: 15,
            quantity: 28,
            item: 6
        },
        {
            purchasePrice: 12,
            sellingPrice: 15,
            quantity: 28,
            item: 7
        }
    ],
    dueDate:[
        {
            value: 1000,
            date:new Date("01/04/2020").toISOString()
        },
        {
            value: 2000,
            date:new Date("03/04/2020").toISOString()
        }
    ],
    additionalCosts:[
        {
            vat: 0,
            value: 1000,
            description: "some costs first"
        },
        {
            vat: 2,
            value: 22000,
            description: "some costs second"
        },
    ],
    discount:[
        {
            percent:-10,
            description: "standard discount"
        },
        {
            value: 1000
        },
    ],


}

describe('Calculation test', () => {
    let articles = []
    let mutation: any;
    const renderHook = (hook: any) => {
        const HookWrapper = () => {
            mutation = hook()
            return null
        };
        mount(<TestComponent render={HookWrapper}/>);
        return mutation;
    };
    it('calculation insert ', async (done) => {
        renderHook(useInsertCalculationMutation);
        const [mutationCall] = mutation

       await act( async ()=> {
            let result;
            try {
                result = await mutationCall({
                     variables:{
                          data:calculationObject
                     }
                 })
            } catch (e) {  }
            const calculation = _.get(result,'data.data')
            expect(calculation).toBeObject()
            expect(calculation.number).toBe(calculation.number)
            expect(calculation).toHaveProperty('dueDate')
            expect(calculation.dueDate).toBeArrayOfSize(2)
            expect(calculation).toHaveProperty('items')
            expect(calculation.items).toBeArrayOfSize(3)
            expect(calculation).toHaveProperty('additionalCosts')
            expect(calculation.additionalCosts).toBeArrayOfSize(2),
            expect(calculation).toHaveProperty('discount')
            expect(calculation.discount).toBeArrayOfSize(2)
            expect(calculation).toHaveProperty('supplier')
            expect(calculation.supplier).toHaveProperty('id')
            expect(calculation.supplier.id).toBe('1')
        })
        done()
    })
})
