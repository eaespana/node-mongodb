const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const addressSchema = new Schema({
    street: String,
    city: String
});

const userSchema = new Schema({
    name: String,
    age: {
        type: Number,
        min: 1,
        max: 100,
        validate: {
            validator: v => v % 2 === 0,
            message: props => `${props.value} is not an even number`
        }
    },
    email: {
        type: String,
        minlength: 10,
        required: true,
        lowercase: true
    },
    createdAT: {
        type: Date,
        default: new Date()
    },
    updateAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },
    bestFriend: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    },
    hobbies: [String],
    address: addressSchema
});

userSchema.methods.sayHi = function() {
    console.log(`Hi. My namé is ${this.name}`);
}

userSchema.statics.findByName = function(name) {
    return this.where({name: new RegExp(name,'i')})
    // RegExp la i hace referencia a la búsqueda que no
    // distingue entre mayúsculas y minúsculas.
}

userSchema.query.byName = function (name) {
    return this.where({name: new RegExp(name,'i')})
}

userSchema.virtual('nameEmail').get(function() {
    return`${this.name} <${this.email}>`
})


//Antes de guardar un usuario va actualizar la fecha de registro.
userSchema.pre('save', function(next){
    this.updateAt = Date.now()
    next()
})

//Despues de guardar un usuario saluda.
userSchema.post('save', function(doc,next){
    doc.sayHi()
    next()
})

module.exports = mongoose.model("User",userSchema);