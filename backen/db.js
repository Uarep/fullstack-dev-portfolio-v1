const { Pool } = require('pg');

// ตั้งค่าการเชื่อมต่อตามเครื่องของคุณ
const pool = new Pool({
  user: 'postgres',          // ชื่อ user ใน pgAdmin
  password: '1234', // รหัสผ่านของคุณ
  host: 'localhost',
  port: 5432,                // port มาตรฐานของ Postgres
  database: 'skills_db' // ชื่อฐานข้อมูลที่สร้างไว้
});

module.exports = pool;