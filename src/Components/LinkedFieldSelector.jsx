import * as React from 'react'
import SelectLinkedField from './SelectLinkedField';
import { DatabaseContext } from '../Context/DatabaseContext';

export default function LinkedFieldSelector({ register }) {

    const [linkedFields, setLinkedFields] = React.useState()
    const { dbfunctions } = React.useContext(DatabaseContext);

    React.useEffect(()=> {

      async function loadData() {
        const res = await dbfunctions.getLinkedFields()
        setLinkedFields(res.data)
      }

      if(!linkedFields) {
        loadData()
      }
    }, [linkedFields])


    if(!linkedFields) return (<>Cargando... </>)

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