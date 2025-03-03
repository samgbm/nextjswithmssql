import sql from 'mssql';

const config = {
    user: 'sa',
    password: '*********88',
    server: 'localhost',
    database: 'master', // We'll use the master database initially
    options: {
        trustServerCertificate: true, // For local dev only
        enableArithAbort: true
    }
};

// Connection pool
const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Connected to SQL Server');
        return pool;
    })
    .catch(err => console.log('Database Connection Failed: ', err));

export async function executeQuery(query, params = []) {
    try {

        
        const pool = await poolPromise;

        // Switch to the new database
        await pool.request().query(`USE nextjsapp;`);

        const request = pool.request();

        // Add parameters if provided (for preventing SQL injection)
        params.forEach((param, index) => {
            request.input(`param${index}`, param.value);
        });

        const result = await request.query(query);
        return result.recordset;
    } catch (error) {
        console.error('SQL error', error);
        throw error;
    }
}

// Function to initialize the database
export async function initializeDatabase() {
    try {
        const pool = await poolPromise;

        // Create a new database if it doesn't exist
        await pool.request().query(`
      IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'nextjsapp')
      BEGIN
        CREATE DATABASE nextjsapp;
      END
    `);

        // Switch to the new database
        await pool.request().query(`USE nextjsapp;`);

        // Create a table for users if it doesn't exist
        await pool.request().query(`
      IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'users')
      BEGIN
        CREATE TABLE users (
          id INT IDENTITY(1,1) PRIMARY KEY,
          name NVARCHAR(100) NOT NULL,
          email NVARCHAR(100) NOT NULL,
          created_at DATETIME DEFAULT GETDATE()
        );
      END
    `);

        console.log('Database initialized successfully');
        return true;
    } catch (error) {
        console.error('Database initialization error', error);
        throw error;
    }
}