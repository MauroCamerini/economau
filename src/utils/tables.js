
export const tables = [
    {
        name: 'Accounts',
        nullable: false,
        title: 'Cuenta',
        hierarchy: false,
        field: 'Account'
    }, 
    {
        name: 'Categories',
        nullable: false,
        title: 'Categoría',
        hierarchy: true,
        field: 'Category'
    }, 
    {
        name: 'Types',
        nullable: false,
        title: 'Tipo',
        hierarchy: false,
        field: 'Type'
    }, 
    {
        name: 'Entities',
        nullable: true,
        title: 'Entidad',
        hierarchy: false,
        field: 'Entity'
    }
]