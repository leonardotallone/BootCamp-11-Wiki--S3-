const Pages = require("./Pages")
const Users = require("./Users")


Pages.belongsTo(Users, { as: 'author' });

module.exports = { Pages, Users }