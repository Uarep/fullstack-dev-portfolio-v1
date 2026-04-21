const express = require('express');
const cors = require('cors');
const pool = require('./db');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/skills', async (req, res) => {
    try{
        const {skill_name,level,category} = req.body;
        const newSkill = await pool.query(`
            INSERT INTO skills (skill_name, level, category) VALUES ($1, $2, $3) RETURNING *`,
            [skill_name, level, category]);
            res.json(newSkill.rows[0]);
        }catch (err) {
            console.error(err.message);
            res.status(500).send('Sever Error');
        }
});

app.get('/api/skills', async (req, res) => {
    try {
        const allSkills = await pool.query("SELECT * FROM skills ORDER BY id DESC");
        res.json(allSkills.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Could not fetch skills" });
    }
});
// PUT — อัปเดต skill
app.put('/api/skills/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { skill_name, level, category } = req.body;
        const updated = await pool.query(
            `UPDATE skills SET skill_name=$1, level=$2, category=$3 WHERE id=$4 RETURNING *`,
            [skill_name, level, category, id]
        );
        if (updated.rows.length === 0) return res.status(404).json({ error: 'Not found' });
        res.json(updated.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// DELETE — ลบ skill
app.delete('/api/skills/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM skills WHERE id=$1', [id]);
        res.json({ message: 'Deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.listen(3000,() => {
    console.log('Server is running on port 3000');
});