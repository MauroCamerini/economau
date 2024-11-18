import * as React from 'react';
import { Form } from 'react-bootstrap';

export default function TableSelect({ table, register, data }) {
  

    return (
    <Form.Group controlId={table.name}>
      <Form.Label>{table.title}</Form.Label>
      <Form.Control 
        as="select" 
        {...register(table.field)} 
      >
        {table.nullable && (
          <option value=''>* Ninguna</option>
        )}
        {data.map((item) => ( !item.Internal &&
          <option key={item.ID} value={item.ID}>
            {item.Name}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
}
