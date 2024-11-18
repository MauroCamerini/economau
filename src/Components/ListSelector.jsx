import * as React from 'react'
import LinkedSelect from './LinkedSelect/LinkedSelect';
import { DatabaseContext } from '../Context/DatabaseContext';

export default function ListSelector({ register }) {
    const { tables } = React.useContext(DatabaseContext);
     
    return (
      <div>
        {tables.map((table) => (
          <LinkedSelect
            key={table.name}
            table={table}
            register={register}
          />
        ))}
      </div>
    );
  }