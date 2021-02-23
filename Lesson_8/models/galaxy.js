const db = require('./db.js');
const config = require('../config');

class Galaxy {
    static async findAll() {
        return await db.query("SELECT id, name, type, size FROM galaxies");
    };

    static async store(data) {
        return db.execute(
            "INSERT INTO galaxies (name, size, type) VALUES (?, ?, ?)",
            [data.name, data.size, data.type]
        );
    };

    static async update(item) {
        return await db.execute(

        );
    };

    static async destroy(id) {
        return await db.execute(

        );
    };
}
module.exports = Galaxy;