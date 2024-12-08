import * as React from 'react'

import { Stack } from 'react-bootstrap'
import { TransactionsProvider } from '../Context/TransactionsContext'
import Filters from '../Components/Filters/Filters'
import TransactionLoader from '../Components/Filters/TransactionsLoader'

export default function ViewTransactions() {

    return (<>
        <TransactionsProvider>
        <Stack gap="3"> 
            <Filters />
            <TransactionLoader />
        </Stack>
        </TransactionsProvider>
    </>)
}