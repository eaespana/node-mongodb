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
        const user = await User.create({
            name: "Alejo", 
            age: 27,
            hobbies: ["Weight lifting","Bowling"],
            address: {
                street: "Main St",
                city: "Colorado"
            }
        });
        user.name = "Sally"
        await user.save()
        console.log(user)
    } catch (error) {
        console.log(error.message);
    }
    
}
