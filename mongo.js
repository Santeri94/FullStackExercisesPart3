const mongoose = require('mongoose')  // määritetää mongoose palikka joka auttaa lisää databasee olioita

if (process.argv.length<3) {        // katotaa et jos komentorivi parametrejä liia vähä ni pyydetään passu
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]  // määritetää komentoriville parametrit 
const name = process.argv[3]      // Hox alempana sit assign paramterit niille kuuluviin arvoihi
const number = process.argv[4]

const url =`mongodb+srv://Santeri:Luka-2019@cluster0.d4yu1vj.mongodb.net/?retryWrites=true&w=majority`
// Mongodb urli ja alempana connect urlii
mongoose.connect(url)

const personSchema = new mongoose.Schema({   // Schema eli missäs muodossa olio tulee databasee ja mitä arvoja
  name: String,                              // Määritetää vaa et mis muodossa "string" etc...
  number: String
})

const Person = mongoose.model('Person', personSchema) //Määritetää modelin nimi (oliot luodaa tästä modelista)

const person = new Person({  // Luo olio
  name: name,
  number: number
})

if (!name){  // tsekkaa jos nimi on tyhjä nii sit listataa koko phonebook database
  console.log(`Phonebook:`)
  Person.find({}).then(result => { // find methodilla haetaa kaikki "Personit"
    result.forEach(person => {     // sit callbackfunc then -> annetaa parametri result
      console.log(`${person.name} ${person.number}`)  // result printtaa kaikki personit eli oliot databasesta
    })
    mongoose.connection.close()  // sulje yhteys aina callbackfunc jälkee (then)
  })
}
else {
  person.save().then(result => {  //josk nimi parametris oli arvo ni sit lisätää person databasee
    console.log(`added ${name} ${number} to phonebook`)
    mongoose.connection.close()
  })
}

