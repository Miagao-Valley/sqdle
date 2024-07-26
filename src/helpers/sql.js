export function generateSELECTAllTablesSQL(table_names) {
    let sql = '';

    for (const table_name of table_names) {
        sql += `SELECT * FROM ${table_name};`;
    }

    return sql;
}
