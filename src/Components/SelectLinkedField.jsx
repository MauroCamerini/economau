import * as React from 'react';
import { Form } from 'react-bootstrap';
import { flattenItems } from '../utils/ui'


export default function SelectLinkedField({linkedField, register}){

    const [processedItems, setProcessedItems] = React.useState()

      React.useEffect(()=> {
          setProcessedItems(linkedField.IsHierarchical ? flattenItems(linkedField.Items) : linkedField.Items)
      }, [linkedField])


      return (<>{
         processedItems && 
            <Form.Group>
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
