const mysql2 = require("mysql2");
const userOptions = require("./config");

const findAll = async () => {
    let item
    let fields
    const createPool = mysql2.createPool(userOptions).promise();
    try {
        [item, fields] = await createPool.query(
            "SELECT id, name, type, size FROM milky_way"
        );
    } catch (e) {
        console.log(e)
    } finally {
        await createPool.end()
    }
    return item;
};

const store = async (data) => {
    let item
    let fields
    console.log(data)
    const createPool = mysql2.createPool(userOptions).promise();
    try {
        [item, fields] = await createPool.execute(
            "INSERT INTO milky_way (name, size, type) VALUES (?, ?, ?)",
            [data.name, data.size, data.type]
        );
    } catch (e) {
        console.log(e)
    } finally {
        await createPool.end()
    }
    return item;
};

const update = async (options, item) => {

};


const destroy = async (options, id) => {

};

module.exports = {
    findAll,
    store,
    update,
    destroy
}