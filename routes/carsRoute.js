const { json } = require('body-parser');
const res = require('express/lib/response');
const fs = require('fs');
const { join } = require('path')

const filePath = join(__dirname, 'car.json');

const getCars = () => {
    const data = fs.existsSync(filePath) ? fs.readFileSync(filePath) : [];

    try {
        return JSON.parse(data)
    } catch (error) {
        return [];
    }
}

const saveCars = (car) => fs.writeFileSync(filePath, JSON.stringify(car, null, '\t'));

const carRoute = (app) => {
    app.route('/cars/:id?')
        .get((req, res) => {
            const cars = getCars();

            res.send( { cars } );
        })
        .post((req, res) => {
            const cars = getCars();

            cars.push(req.body)
            
            saveCars(cars)

            res.status(201).send('Criado com sucesso');
        })
        .put((req, res) => {
            const cars = getCars();
            console.log(cars, req.params)
            saveCars(cars.map(cars => {
                if(cars.id === req.params.id){
                    return {
                        ...cars,
                        ...req.body
                    }
                }

                return cars
            }))

            res.status(200).send('Alterado com sucesso');
        })
        .delete((req, res) => {
            const cars = getCars();

            saveCars(cars.filter(car => car.id !== req.params.id))

            res.status(200).send('Deletado com sucesso');
        })
}

module.exports = carRoute