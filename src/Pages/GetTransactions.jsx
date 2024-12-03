import * as React from 'react'

import { Stack } from 'react-bootstrap'
import Filters from '../Components/Filters/Filters'
import { TransactionsProvider } from '../Context/TransactionsContext'
import TransactionLoader from '../Components/TransactionTable/TransactionsLoader'

export default function GetTransactions() {

    return (<>
        <TransactionsProvider>
        <Stack gap="3"> 
            <Filters />
            <TransactionLoader />
        </Stack>
        </TransactionsProvider>
    </>)
}