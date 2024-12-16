/**
 * General configuration file for the UI.
 * Describes the main nav bar, and how each table must render.
 * @module config
 */


export const APP_LANGUAGE = 'es-ES'

export const mainNavbarConfig = [
    {
        title: "Movimientos",
        children: [
            { path: "/new", title: "Nuevo" },
            { path: "/transactions", title: "Listar"}
        ]
    },
    {
        title: "Editar",
        children: [
            { path: "/edit/categories", title: "Categorías" },
        ]
    },
    {
        title: "Informes",
        children: [
            {path: "/view/income_statement", title: "Resultados"},
            {path: "/byperiod/categories_report", title: "Categorías por período"}
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
 * Returns value in the correct data type. Currently category is number, and type and acccount are string
 */
export const toInFilterValue = (field, value) => field === 'category' ? parseInt(value) : value

/*
    
*/
export const labels = {
    transactions_view: {
        date:           "Fecha",
        period:         "Período",
        amount:         "Monto",
        category:       "Categoría",
        category_name:  "Categoría",
        type:           "Tipo",
        type_name:      "Tipo",
        account:        "Cuenta",
        account_name:   "Cuenta"
    },
    income_statement: {
        period:         "Periodo",

        d_fij:          "FIJ",
        d_ord:          "ORD",
        d_ext:          "EXT",
        d_total:        "Débitos",

        c_fij:          "FIJ",
        c_ord:          "ORD",
        c_ext:          "EXT",
        c_total:        "Créditos",

        result:         "Resultado"
    }   
}

export const transactionsViewTable = {
    fields: [
        "date",
        "period",
        "amount", 
        "category_name",
        "type_name",
        "account_name",
    ],
    labels: labels.transactions_view
}

export const incomeStatementTable = {
    fields: [
        "period",

        "d_fij",
        "d_ord",
        "d_ext",
        "d_total",

        "c_fij",
        "c_ord",
        "c_ext",
        "c_total",

        "result"
    ],
    labels: labels.income_statement
}


export const formatters = {
    yy_month: (date) => 
        new Intl.DateTimeFormat(APP_LANGUAGE, {
            year: '2-digit',
            month: 'short'
        }).format(new Date(date))
}

/**
 * Describes how a ViewTable shows the specified table from the DB
 */
export const tables = {
    transactions_view: {    // "transactions_view" is a table or view from the DB
        
        key: "id",          // Key field for iterating using Array.map()
        fields: [           // These are the corresponding field for each column
            "date",
            "period",
            "amount", 
            "category_name",
            "type_name",
            "account_name",
        ],
        labels: labels.transactions_view,   // label[field] is the columns's header
        formatters: {   // If specified a function for transforming the raw data
            period: formatters.yy_month
        }
    },
    income_statement: {
        key: "period",
        fields: [
            "period",
    
            "d_fij",
            "d_ord",
            "d_ext",
            "d_total",
    
            "c_fij",
            "c_ord",
            "c_ext",
            "c_total",
    
            "result"
        ],
        labels: labels.income_statement,
        formatters: {
            period: formatters.yy_month
        }
    },
    categories_report: {
        key: 'category_path',
        fields: [
            'category_path',
            'category_total',
            'total_with_children'
        ],
        labels: {
            category_path: 'Categoría',
            category_total: 'Parcial',
            total_with_children: 'Total'
        }
    }
}

/**
 * Gives an unique key for a row when iterating with map()
 */
export const rowKey = (dataRow, tableName) => dataRow[tables[tableName].key]

/**
 * Format the data to show it on the screen
 */
export const applyFormat = (value, field, tableName) => (tables[tableName].formatters && tables[tableName].formatters[field]) ? tables[tableName].formatters[field](value) : value