"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Vacancies", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      salary_from: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      salary_to: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      salary_type: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      skills: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      about_company: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      cityId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Cities",
          key: "id",
        },
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      companyId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Companies",
          key: "id",
        },
      },
      specializationId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Specializations",
          key: "id",
        },
      },
      experienceId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Experiences",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Vacancies");
  },
};
