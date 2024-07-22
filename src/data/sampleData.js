const sampleData = {
    data: {
        tables: [
            {
                name: 'employees',
                data: {
                    columns: ['id', 'name', 'department_id', 'salary'],
                    rows: [
                        [1, 'Alice', 1, 70000],
                        [2, 'Bob', 1, 65000],
                        [3, 'Charlie', 2, 60000],
                        [4, 'David', 2, 62000],
                        [5, 'Eve', 3, 55000],
                    ],
                },
            },
            {
                name: 'departments',
                data: {
                    columns: ['id', 'department_name'],
                    rows: [
                        [1, 'Engineering'],
                        [2, 'HR'],
                        [3, 'Sales'],
                    ],
                },
            },
            {
                name: 'projects',
                data: {
                    columns: ['id', 'project_name', 'department_id'],
                    rows: [
                        [1, 'Project Alpha', 1],
                        [2, 'Project Beta', 1],
                        [3, 'Project Gamma', 2],
                        [4, 'Project Delta', 3],
                    ],
                },
            },
        ],
        result: {
            columns: ['id', 'name', 'department', 'salary', 'project_name'],
            rows: [
                [1, 'Alice', 'Engineering', 70000, 'Project Alpha'],
                [1, 'Alice', 'Engineering', 70000, 'Project Beta'],
                [2, 'Bob', 'Engineering', 65000, 'Project Alpha'],
                [2, 'Bob', 'Engineering', 65000, 'Project Beta'],
                [3, 'Charlie', 'HR', 60000, 'Project Gamma'],
                [4, 'David', 'HR', 62000, 'Project Gamma'],
                [5, 'Eve', 'Sales', 55000, 'Project Delta'],
            ],
        },
    },
    query: `
    CREATE TABLE employees (
        id INTEGER PRIMARY KEY,
        name TEXT,
        department_id INTEGER,
        salary INTEGER
    );
    
    INSERT INTO employees (name, department_id, salary) VALUES
    ('Alice', 1, 70000),
    ('Bob', 1, 65000),
    ('Charlie', 2, 60000),
    ('David', 2, 62000),
    ('Eve', 3, 55000);
    
    CREATE TABLE departments (
        id INTEGER PRIMARY KEY,
        department_name TEXT
    );
    
    INSERT INTO departments (id, department_name) VALUES
    (1, 'Engineering'),
    (2, 'HR'),
    (3, 'Sales');
    
    CREATE TABLE projects (
        id INTEGER PRIMARY KEY,
        project_name TEXT,
        department_id INTEGER
    );
    
    INSERT INTO projects (project_name, department_id) VALUES
    ('Project Alpha', 1),
    ('Project Beta', 1),
    ('Project Gamma', 2),
    ('Project Delta', 3);
  `,
};

export default sampleData;
