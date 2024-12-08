export const mainNavbarConfig = [
    {
        title: "Movimientos",
        children: [
            { path: "/new", title: "Nuevo" },
            { path: "/view", title: "Ver"}
        ]
    },
    {
        title: "Informes",
        children: [
            {path: "/incstmt", title: "Resultados"}
        ]
    },
]

export const filtersConfig = {
    date: 'range',
    period: 'range',
    amount: 'sign',
    category: 'in',
    type: 'in',
    account: 'in'

}

/**
 * Configures the table that shows transactions in the UI
 */
export const transactionTableConfig = {
    columns: [
        {title: "Fecha", field: "date"},
        {title: "Período", field: "period"},
        {
            title: "Monto", 
            field: "amount", 
            // amount is stored as cents, so we need to add the . and for 2 decimal points
            // format: (trx) => `${trx.amount < 0 ? '-' : ''}${Math.abs(trx.amount).toString().padStart(3, '0').slice(0, -2) || 0}.${Math.abs(trx.amount).toString().padStart(3, '0').slice(-2)}`,
            filter: "sign",
        },
        {title: "Categoría", field: "category_name"},
        {
            title: "Tipo", 
            field: "type_name",
            format: (trx) => `${trx.type} - ${trx.type_name}`,
        },
        {
            title: "Cuenta", 
            field: "account_name",
            format: (trx) => `${trx.account} - ${trx.account_name}`,
        
        },
    ],

}