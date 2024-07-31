import _ from "lodash";

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

const wrongCellStyle = { color: "white", backgroundColor: "red" };
const correctCellStyle = { color: "white", backgroundColor: "green" };
// Target Table = Correct table
// Answer Table = User's answer
export function transformToValidatedTable(targetTable, answerTable) {
    const { columns: targetColumns, rows: targetRows } = targetTable;
    const { name, columns: answerColumns, rows: answerRows } = answerTable;

    const validatedColumns = answerColumns.map((column) => ({
        cellStyle: (params) => {
            const columnExists = targetColumns.find(
                (targetColumn) => targetColumn.field === column.field
            );

            // If column doesn't exist in target table, it is automatically wrong
            if (!columnExists) {
                return wrongCellStyle;
            }

            // Find if the value exists from the row data from the target table. The value should be in the correct column and has the same value.
            // We are certain that the column exists in the target table since we already checked that before.
            const columnName = column.field;
            const value = params.value;
            const dataCorrect = targetRows.find(
                (row) => row[columnName] === value
            );

            if (!dataCorrect) {
                return wrongCellStyle;
            }

            return correctCellStyle;
        },
        ...column,
    }));

    let score = 0;

    for (const targetRow of targetRows) {
        // const targetRow = targetRows[row];
        const isRowAnswered = answerRows.find((answerRow) =>
            _.isEqual(answerRow, targetRow)
        );
        if (isRowAnswered) {
            score += 1;
        }
    }

    return {
        name,
        columns: validatedColumns,
        rows: answerRows,
        score,
    };
}
