

const selectWithHierarchy = (tableName, whereClause = "") =>
     `WITH RECURSIVE cte_hierarchy(id, name, parent_id, depth) AS (
    -- No Parent
    SELECT id, name, parent_id, 0 AS depth
    FROM ${tableName}
    WHERE parent_id IS NULL
    UNION ALL
    -- Has parent, goes recursive
    SELECT h.id, h.name, h.parent_id, cte.depth + 1
    FROM ${tableName} h
    INNER JOIN cte_hierarchy cte ON h.parent_id = cte.id
)
SELECT id, name, parent_id, depth
FROM cte_hierarchy
${whereClause}
;
`