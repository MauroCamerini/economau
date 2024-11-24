
export const routesConfig = [
    {
        path: "/",
        element: "Layout",
        caption: "Home",
        inNavbar: true,
        index: {
            element: "Home"
        },
        children: [
            {
                path: "new",
                element: "NewTransaction",
                caption: "Agregar",
                inNavbar: true
            },
            {
                path: "getall",
                element: "ShowAllTransactions",
                caption: "Ver todas",
                inNavbar: true
            }
        ]
    },

]
