import 'jest-extended'
import React                     from "react"
import Enzyme, {mount}           from 'enzyme'
import Adapter                   from 'enzyme-adapter-react-16';
import {useInsertClientMutation} from "../../graphql/graphql";
import {TestComponent}           from "../TestComponent";
import {act}                     from "react-dom/test-utils";
import *  as _                   from 'lodash'
import {ClientFlag}              from "../../application/type_logic/types";

Enzyme.configure({adapter: new Adapter()});

const taxNumber = () => {
    const str = '' + _.random(10000, 1000000) + _.random(10000, 1000000) + _.random(10000, 1000000)
    return str.substr(0, 9)
}

describe('Calculation test', () => {
    const renderHook = (hook: any) => {
        let _hook: any;
        const HookWrapper = () => {
            _hook = hook()
            return null
        };
        mount(<TestComponent render={HookWrapper}/>);
        return _hook;
    }

    it('Client insert simple record/try same ', async (done) => {
        const mutation = renderHook(useInsertClientMutation)
        const [mutationCall] = mutation
        const clientObject = {
            taxNumber: taxNumber(),
            clientNumber: taxNumber(),
            descriptionShort: `Some comp ${taxNumber()}`,
            flag: ClientFlag.CLIENT
        }

        await act(async () => {
            let result = void (0);
            try {
                result = await mutationCall({
                    variables: {
                        data: clientObject
                    }
                })
            } catch (e) { }

            const client = _.get(result, 'data.client')
            expect(client).toBeObject()
            expect(client).toHaveProperty('taxNumber')
            expect(_.get(client, 'taxNumber')).toBe(clientObject.taxNumber)
            expect(_.get(client, 'clientNumber')).toBe(clientObject.clientNumber)
        })

        await act(async () => {
            let result = void (0);
            let error = void (0);
            try {
                result = await mutationCall({
                    variables: {
                        data: {
                            ...clientObject,
                            clientNumber: taxNumber(),
                            descriptionShort: `Some comp ${taxNumber()}`,
                            flag: ClientFlag.CUSTOMER
                        }
                    }
                })
            } catch (e) { error = e }

            expect(error).toBeObject()
            console.log(error)
        })
        done()
    })
})
