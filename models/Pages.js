const Sequelize = require("sequelize");
const db = require("../db");


class Pages extends Sequelize.Model {
  static findByTag = function (tag) {
    return Pages.findAll({ where: { tags: { [Sequelize.Op.overlap]: [tag]} } })
  }
  static findSimilar = function () {
    return Pages.findAll({ where: { tags: { [Sequelize.Op.not]: this.tags} } })
  }
}
Pages.init(
  {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    urlTitle: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    tags: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      defaultValue: [],
      set: function (tags) {
        tags = tags || [];
        if (typeof tags === "string") {
          tags = tags.split(",").map((str) => str.trim());
        }
        this.setDataValue("tags", tags);
      },
    },
    route: {
      type: Sequelize.VIRTUAL,
      get() {
        return `/wiki/${this.getDataValue("urlTitle")}`;
      },
    },
  },
  { sequelize: db, modelName: "pages" }
);

module.exports = Pages;
