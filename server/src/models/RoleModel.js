const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
    name: {
        type: String,
        Unique: true,
        required: true,
    },
});

const Role = mongoose.model('Role', RoleSchema);

module.exports = Role;