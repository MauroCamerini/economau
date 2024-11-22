import * as React from 'react';
import { Form } from 'react-bootstrap';

/** Orders and renames items in order to show hierarchy
 * 
 * @param {Array} items - Array of a unorderer list of items
 * @returns - An array wich items are orederd a named related to the hierarchy
 */
function flattenItems(items) {
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

export default function SelectLinkedField({linkedField, register}){

    const [processedItems, setProcessedItems] = React.useState()

      React.useEffect(()=> {
          setProcessedItems(linkedField.IsHierarchical ? flattenItems(linkedField.Items) : linkedField.Items)
      }, [linkedField])


      return (<>{
         processedItems && 
            <Form.Group controlId={linkedField.TransactionField}>
              <Form.Label>{linkedField.Title}</Form.Label>
              <Form.Control 
                as="select" 
                {...register(linkedField.TransactionField)} 
              >
                {!linkedField.IsRequired && (
                  <option value=''>* Ninguno</option>
                )}
                {processedItems.map((item) => ( !item.Internal &&
                  <option key={item.ID} value={item.ID}>
                    {item.Name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
      }</>)

}
