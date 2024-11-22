import * as React from 'react'
import SelectLinkedField from './SelectLinkedField';
import { DatabaseContext } from '../Context/DatabaseContext';

export default function LinkedFieldSelector({ register }) {

    const { linkedFields } = React.useContext(DatabaseContext);

    return (
      <div>
        {linkedFields.map((linkedField) => (
          <SelectLinkedField
            key={linkedField.TableName}
            linkedField={linkedField}
            register={register}
          />
        ))}
      </div>
    );
  }