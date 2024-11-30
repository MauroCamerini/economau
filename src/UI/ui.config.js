
export const routesConfig = [
    {
        path: "/",
        element: "Layout",
        index: {
            element: "Home"
        },
        children: [
            {
                path: "new",
                element: "NewTransaction",
            },
            {
                path: "update/:id",
                element: "UpdateTransaction",
            },
            {
                path: "getall",
                element: "ShowAllTransactions",
            }
        ]
    },

]

export const mainNavbarConfig = [
    {
        title: "Movimientos",
        children: [
            {
                path: "/new",
                title: "Agregar",
            },
            {
                path: "/getall",
                title: "Ver todas",
            }
        ]
    },

]

export const transactionTableConfig = {
    columns: [
        {title: "Fecha", field: "Date"},
        {title: "Mes", field: "Period"},
        {
            title: "Monto", 
            field: "Amount", 
            // amount is stored as cents, so we need to add the . and for 2 decimal points
            format: (num) => `${num < 0 ? '-' : ''}${Math.abs(num).toString().padStart(3, '0').slice(0, -2) || 0}.${Math.abs(num).toString().padStart(3, '0').slice(-2)}`
            //format: (num) => (num < 0 ? '-' : '') + (Math.abs(num) / 100).toFixed(2).slice(0, -3)
        },
        {title: "Categoría", field: "Category", },
        {title: "Tipo", field: "Type", linkedName: "ID"},
        {title: "Cuenta", field: "Account", linkedName: "ID"},
    ]
}
