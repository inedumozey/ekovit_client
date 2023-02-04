import { useState, createContext } from 'react';
import Layout from '../layouts';

const ContextData = createContext()

function ContextApi({ children }) {

    const state = {
        // ...staticData
    }

    return (
        <ContextData.Provider value={state}>
            <Layout>
                {children}
            </Layout>
        </ContextData.Provider>
    )
}

export { ContextApi, ContextData }