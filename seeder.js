const fs = require('fs');
const mongoose = require('mongoose')
const color = require('colors');
const dotenv = require('dotenv');

//load env vars
dotenv.config({ path: './config/config.env' })

//load model
const bootcamp = require('./models/Bootcamp');
const { deleteMany } = require('./models/Bootcamp');

//connect to db
mongoose.connect(process.env.MONGO_URI)

//Read JSON File

const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.js`, 'utf-8'))

//Import into db
const importData = async () => {
    try {
        await bootcamp.create(bootcamps)
        console.log('Data Imported Successful...'.green.inverse);
        process.exit()
    } catch (err) {
        console.error(err);
    }
}

//Delete Data From db
const deleteData = async () => {
    try {
        await bootcamp.deleteMany()
        console.log("Dta Deleted Successful...".green.inverse);
        process.exit()
    } catch (err) {
        console.error(err);
    }
}

//when to del or store data
if (process.argv[2] === '-i') { //node seeder -i  (console)
    importData();
}
else if (process.argv[2] === '-d') { //node seeder -d  (console)
    deleteData()
}


