import fs from 'fs';
import path from 'path';
import { Pool } from 'pg';
import 'dotenv/config';

async function init() {
  const pool = new Pool({
    user: process.env.DB_USER || '',
    host: process.env.DB_HOST || '',
    database: process.env.DB_NAME || '',
    password: process.env.DB_PASS || '',
    port: Number(process.env.DB_PORT) || 5432,
  });

  const seedQuery = fs.readFileSync(path.resolve(__dirname, 'seeding.sql'), {
    encoding: 'utf8',
  });

  //   const seedQuery = `INSERT INTO cart (id, user_id, status) VALUES ('1e529e54-7ab0-4c7d-9837-851b89ad51ed', '1', 'OPEN')`;
  console.log('seedQuery', seedQuery);

  pool.query(seedQuery, (err, res) => {
    console.log(err, res);
    console.log('Seeding Completed!');

    pool.end();
  });
}

init();
