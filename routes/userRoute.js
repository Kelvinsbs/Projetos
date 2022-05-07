const { json } = require('body-parser');
const fs = require('fs');
const { join } = require('path')

const filePath = join(__dirname, 'user.json');

const getUsers = () => {
    const data = fs.existsSync(filePath) ? fs.readFileSync(filePath) : [];

    try {
        json.parse(data)
    } catch (error) {
        return [];
    }
}

const saveUsers = (users) => fs.writeFileSync(filePath, JSON.stringify(users, null, '\t'));

const userRoute = (app) => {
    app.route('/users/:id?')
        .get((req, res) => {
            const user = getUsers();

            res.send({ user })
        })
}

module.exports = userRoute