import * as React from 'react';
import TableSelect from './TableSelect';

export default function CategorySelect({table, register}){

    const { data } = table

    /* Transforms a flat array of categories into a flat array with hierarchical captions. 
    Captions use spaces to indicate depth, maintaining parent-child order. */
    function flattenCategories(data) {
        const categoryMap = new Map();
        
        data.forEach(category => {
          categoryMap.set(category.ID, category);
        });
      
        const processCategory = (category, depth, result) => {

          const nestedName = `${'> '.repeat(depth)}${category.Name}` 
          result.push({...category, Name: nestedName});
      
          const children = data.filter(c => c.ParentID === category.ID);
          children.forEach(child => processCategory(child, depth + 1, result));
        };
      
        const result = [];
      
        data
          .filter(category => !category.ParentID)
          .forEach(rootCategory => processCategory(rootCategory, 0, result));
      
        return result;
      }
      
      const processedData = flattenCategories(data)

      return (
        <TableSelect table={table} data={processedData} register={register}/>
      );

}
