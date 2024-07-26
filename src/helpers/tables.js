export function transformSQLDataToTable(sqlData, tableName) {
    const columnLength = sqlData.columns.length;
    const columns = sqlData.columns.map((columnName) => ({
        field: columnName,
        filter: true,
    }));

    const rows = sqlData.values.map((row) => {
        const rowData = {};

        for (let i = 0; i < columnLength; i++) {
            rowData[sqlData.columns[i]] = row[i];
        }

        return rowData;
    });

    return {
        name: tableName,
        columns,
        rows,
    };
}
