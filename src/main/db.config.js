

export const dbConfig = {
    fileName: 'economau.db',
}

const categoriesReportQuery = `WITH CategoryWithChildren AS (
    SELECT 
        root.id AS root_id,
        root.name AS root_name,
        root.path AS root_path,
        child.id AS child_id
    FROM 
        category_items root
    LEFT JOIN 
        category_items child ON child.path LIKE printf('%s%%', root.path)
)
SELECT 
    root.root_name AS category_name,
    root.root_path AS category_path,
    SUM(CASE WHEN t.category = root.root_id THEN t.amount ELSE 0 END) AS category_total,
    SUM(t.amount) AS total_with_children
FROM 
    transactions t
JOIN 
    CategoryWithChildren root ON t.category = root.child_id
WHERE 
    t.period = @period -- Here goes the param
GROUP BY 
    root.root_id, root.root_name
ORDER BY 
    root.root_path`

/*
    When
*/
export const dynamicViews = {
    categories_report: {
        query: categoriesReportQuery
    }
}