const mongoose = require('mongoose');
const User = require("./User");

/**mongoose.connect("mongodb://localhost/testdb", () => {
    console.log("Hola de nuevo");
}, e => console.error(e)
);*/

mongoose.connect("mongodb://localhost/testdb2")


run();


async function run() {

    try {
        // Consulta por Id.
        const userFind = await User.findById("620d8bc0656895d9c6bee7ae");
        console.log(userFind);
        // Consulta el primer registro que contenga el nombre Sally.
        const userFindOne = await User.findOne({name: "Sally"});
        console.log(userFindOne);
        // Elimina un solo registro.
        await User.deleteOne({name: "Alejandro"});
        // Consulta usando Where.
        const userWhere = await User.where("age")
                                .gt(27)
                                .lt(31)
                                .where("name")
                                .equals("Alejandro")
                                .select("age")
        console.log(userWhere);
        // Creando un usuario
        const user = await User.create({
            name: "Alejo", 
            age: 26,
            email: "Prueba@gmail.com",
            hobbies: ["Weight lifting","Bowling"],
            address: {
                street: "Main St",
                city: "Colorado"
            }
        });
        user.name = "Alejandro"
        await user.save()
        console.log(user)

        //Utilizando metodos del esquema user.
        console.log(user.sayHi())
        console.log(await User.findByName("Alejandro"))
        console.log(await User.find().byName("Alejandro"))
        const userVirtual = await User.findOne({name:"Alejandro"});
        console.log(userVirtual);
        console.log(userVirtual.nameEmail);
    } catch (error) {
        console.log(error.message);
    }
    
}
