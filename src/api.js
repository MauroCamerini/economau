
/*
    dbcontroller functions
    this array is used in main and preload to expose dbfunctions in DatabaseProviders, so
    the react app can use the dbcontroller
    probably isn't right for security reasons, but it works
*/
export default [
    "insertTransaction",
    "getAllTransactions",
    "getAllLists"
]