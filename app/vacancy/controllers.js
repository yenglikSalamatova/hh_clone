const { Op } = require("sequelize");
const Experience = require("./models/Experience");
const Vacancy = require("./models/Vacancy");
const Company = require("../auth/Company");
const City = require("../region/City");

const getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.findAll();
    res.status(200).send(experiences);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error when get experiences");
  }
};

const createVacancy = async (req, res) => {
  try {
    // Extract vacancy data from request body
    const {
      name,
      salary_from,
      salary_to,
      salary_type,
      address,
      description,
      skills,
      about_company,
      cityId,
      specializationId,
      experienceId,
      employmentTypeId,
    } = req.body;

    // Create new vacancy
    const vacancy = await Vacancy.create({
      name,
      salary_from,
      salary_to,
      salary_type,
      address,
      description,
      skills,
      about_company,
      cityId,
      userId: req.user.id,
      companyId: req.user.companyId,
      specializationId,
      experienceId,
    });

    // Associate vacancy with employment types
    if (employmentTypeId && employmentTypeId.length > 0) {
      await vacancy.setEmploymentType(employmentTypeId);
    }

    // Send response
    res.status(201).json({ vacancy });
  } catch (error) {
    // Handle error
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the vacancy" });
  }
};

const getMyVacancies = async (req, res) => {
  try {
    const vacancy = await Vacancy.findAll({
      where: {
        companyId: req.user.companyId,
      },
    });
    res.status(200).json({ vacancy });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while get vacancies" });
  }
};

const getVacancyById = async (req, res) => {
  try {
    // Extract vacancy ID from request parameters
    const { id } = req.params;

    // Find vacancy by ID
    const vacancy = await Vacancy.findByPk(id, {
      include: [
        { association: "city" },
        { association: "company" },
        { association: "specialization" },
        { association: "experience" },
        { association: "employmentType" },
      ],
    });

    // Check if vacancy was found
    if (!vacancy) {
      return res.status(404).json({ error: "Vacancy not found" });
    }

    // Send response
    res.json({ vacancy });
  } catch (error) {
    // Handle error
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the vacancy" });
  }
};

const deleteVacancy = async (req, res) => {
  try {
    const vacancy = await Vacancy.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).end();
  } catch (error) {
    console.error("Error deleting vacancy:", error);
    return res.status(500).json({ error: "Error deleting vacancy" });
  }
};

const editVacancy = async (req, res) => {
  const {
    id,
    name,
    salary_from,
    salary_to,
    salary_type,
    address,
    description,
    skills,
    about_company,
    cityId,
    specializationId,
    experienceId,
    employmentTypeId,
  } = req.body;
  try {
    const vacancy = await Vacancy.findByPk(id);

    if (!vacancy) {
      return res.status(404).json({ error: "Вакансия не найдена" });
    }

    await vacancy.update({
      name,
      salary_from,
      salary_to,
      salary_type,
      address,
      description,
      skills,
      about_company,
      cityId,
      userId: req.user.id,
      companyId: req.user.companyId,
      specializationId,
      experienceId,
    });

    if (employmentTypeId && employmentTypeId.length > 0) {
      await vacancy.setEmploymentType(employmentTypeId);
    }

    res.json({ vacancy });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the vacancy" });
  }
};

const searchVacancies = async (req, res) => {
  try {
    console.log(req.query);
    const {
      q,
      cityId,
      employmentTypeId,
      specializationId,
      salary,
      salary_type,
      experienceId,
    } = req.query;

    const where = {};

    if (q) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${q}%` } },
        { description: { [Op.iLike]: `%${q}%` } },
        { skills: { [Op.iLike]: `%${q}%` } },
      ];
    }

    if (specializationId) {
      where.specializationId = specializationId;
    }

    if (cityId) {
      where.cityId = cityId;
    }

    if (salary_type) {
      where.salary_type = salary_type;
    }

    if (salary) {
      where.salary_from = { [Op.lte]: salary };
      where.salary_to = { [Op.gte]: salary };
    }

    if (experienceId) {
      where.experienceId = experienceId;
    }

    const vacancies = await Vacancy.findAll({
      where,
      include: [
        { association: "city" },
        { association: "company" },
        { association: "specialization" },
        { association: "experience" },
        {
          association: "employmentType",
          where: employmentTypeId ? { id: employmentTypeId } : {},
        },
      ],
    });
    res.status(200).json({ vacancies });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while searching for vacancies" });
  }
};

module.exports = {
  getExperiences,
  createVacancy,
  getMyVacancies,
  getVacancyById,
  deleteVacancy,
  editVacancy,
  searchVacancies,
};
