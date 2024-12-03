
/**
 * Application routing. Element has to be included in pages.config
 */
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
                element: "GetTransactions",
            }
        ]
    },

]

/**
 * Menus for the navbar. Title is the text shown, path is the "to" prop for the Link component
 */
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
                title: "Filtrar",
            }
        ]
    },

]

/**
 * Configures the table that shows transactions in the UI
 */
export const transactionTableConfig = {
    columns: [
        /*
            title: Name shown in the UI,
            field: Corresponding colum name in the transactions table in the DB
            filter: what kind of filter to apply (range, in, equals). If not specified no filters is allowed for the column
            format: gets the value from the DB and adapts it to the UI
            parse: the opposite as format, returns a value to insert or compare to the UI
            linkedName: field from the linked table used to show in te screen, if not specified it takes the field Name
        */
        {title: "Fecha", field: "Date", filter: "range"},
        {title: "Mes", field: "Period", filter: "range"},
        {
            title: "Monto", 
            field: "Amount", 
            // amount is stored as cents, so we need to add the . and for 2 decimal points
            format: (num) => `${num < 0 ? '-' : ''}${Math.abs(num).toString().padStart(3, '0').slice(0, -2) || 0}.${Math.abs(num).toString().padStart(3, '0').slice(-2)}`,
        },
        {title: "Categoría", field: "Category", filter: "in", 
            /* Useful when comparing data from a controlled input and data parsed from the DB */
            parse: value => parseInt(value)
        },
        {title: "Tipo", field: "Type", linkedName: "ID", filter: "in", parse: value => value},
        {title: "Cuenta", field: "Account", linkedName: "ID", filter: "in", parse: value => value},
    ],

}
