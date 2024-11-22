/** Orders and renames items in order to show tables hierarchy
 * 
 * @param {Array} items - Array of a unorderer list of items
 * @returns - A new array wich items are orederd a named related to the hierarchy
 */
export function flattenItems(items) {
    const itemMap = new Map()
    
    items.forEach(item => {
      itemMap.set(item.ID, item)
    })
  
    // Recursive function to add '> ' to the name
    const processItem = (item, depth, result) => {
  
      const nestedName = `${'> '.repeat(depth)}${item.Name}` 
      result.push({...item, Name: nestedName})
  
      const children = items.filter(c => c.ParentID === item.ID);
      children.forEach(child => processItem(child, depth + 1, result))
    };
  
    // Orders the list
    const result = []
  
    items
      .filter(item => !item.ParentID)
      .forEach(rootItem => processItem(rootItem, 0, result))
  
    return result;
  }

/** Returns a new object with the same keys, but fields that are linked with another table contains the related item of that table
 * 
 * @param {Object} transaction - A transaction as is loadad from the DB
 * @param {[Object]} linkedFields - Linked fields loaded in the DatabaseContext
 * @returns - A new object containing the expanded data
 */
export function expandTransactionFields(transaction, linkedFields) {

    const expanded = {    }

    Object.keys(transaction).forEach((key) => {
        const linked = linkedFields.find((value) => key === value.TransactionField)
        expanded[key] = linked ? linked.Items.find(i => i.ID == transaction[key]) : transaction[key]
    })

    return expanded

}
