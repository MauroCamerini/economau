
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
        {title: "Fecha", field: "Date", filter: "range"},
        {title: "Mes", field: "Period", filter: "range"},
        {
            title: "Monto", 
            field: "Amount", 
            // amount is stored as cents, so we need to add the . and for 2 decimal points
            format: (num) => `${num < 0 ? '-' : ''}${Math.abs(num).toString().padStart(3, '0').slice(0, -2) || 0}.${Math.abs(num).toString().padStart(3, '0').slice(-2)}`,
        },
        {title: "Categoría", field: "Category", filter: "in", 
            /* Usefull when comparing data from a controlled input and data parsed from the DB */
            parse: value => parseInt(value)
        },
        {title: "Tipo", field: "Type", linkedName: "ID", filter: "in", parse: value => value},
        {title: "Cuenta", field: "Account", linkedName: "ID", filter: "in", parse: value => parseInt(value)},
    ]
}
