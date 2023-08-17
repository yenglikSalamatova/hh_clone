const Resume = require("./Resume");
const WorkingHistory = require("./WorkingHistory");
const Education = require("./Education");
const ForeignLanguage = require("./ForeignLanguages");
const ResumeEmploymentType = require("./ResumeEmploymentType");
const ResumeSkill = require("./ResumeSkill");
const Skill = require("../skills/Skill");
const EmploymentType = require("../employment-type/EmploymentType");
const City = require("../region/City");
const Country = require("../region/Country");
const { Op } = require("sequelize");

const createResume = async (req, res) => {
  const {
    first_name,
    last_name,
    phone,
    birthday,
    gender,
    about,
    position,
    salary,
    salary_type,
    main_language,
    workingHistories,
    education,
    foreignLanguages,
    employmentTypes,
    cityId,
    citizenshipId,
    skills,
  } = req.body;
  try {
    const resume = await Resume.create({
      first_name,
      last_name,
      phone,
      birthday,
      gender,
      about,
      position,
      salary,
      salary_type,
      main_language,
      cityId,
      citizenshipId,
      userId: req.user.id,
    });

    if (workingHistories && workingHistories.length > 0) {
      await WorkingHistory.bulkCreate(
        workingHistories.map((history) => ({
          ...history,
          resumeId: resume.id, // Associate the working history with the newly created resume
        }))
      );
    }

    if (education && education.length > 0) {
      await Education.bulkCreate(
        education.map((educate) => ({
          ...educate,
          resumeId: resume.id,
        }))
      );
    }

    if (foreignLanguages && foreignLanguages.length > 0) {
      await ForeignLanguage.bulkCreate(
        foreignLanguages.map((language) => ({
          ...language,
          resumeId: resume.id,
        }))
      );
    }

    if (employmentTypes && employmentTypes.length > 0) {
      await ResumeEmploymentType.bulkCreate(
        employmentTypes.map((typeId) => ({
          resumeId: resume.id,
          employmentTypeId: typeId,
        }))
      );
    }

    if (skills && skills.length > 0) {
      const skillInstances = await Skill.findAll({
        where: { id: skills }, // Получите экземпляры навыков по айди из массива skills
      });
      await resume.addSkills(skillInstances);
    }

    return res.status(201).json({ message: "Резюме успешно создано", resume });
  } catch (error) {
    console.error("Error creating resume:", error);
    return res.status(500).json({ error: "Ошибка при создании резюме" });
  }
};

const getMyResumes = async (req, res) => {
  try {
    const resumes = await Resume.findAll({
      where: {
        userId: req.user.id,
      },
    });
    res.status(200).json({ resumes });
  } catch (error) {
    console.error("Error creating resume:", error);
    return res.status(500).json({ error: "Ошибка при получении резюме" });
  }
};

const getResume = async (req, res) => {
  try {
    const resume = await Resume.findByPk(req.params.id, {
      include: [
        {
          model: WorkingHistory,
          as: "workingHistories",
        },
        {
          model: Education,
          as: "education",
        },
        {
          model: EmploymentType,
          as: "employmentTypes",
        },
        {
          model: City,
          as: "city",
        },
        {
          model: Country,
          as: "citizenship",
        },
        {
          model: ForeignLanguage,
          as: "foreignLanguages",
        },
      ],
    });
    res.status(200).json({ resume });
  } catch (error) {
    console.error("Error creating resume:", error);
    return res.status(500).json({ error: "Ошибка при получении резюме" });
  }
};

const deleteResume = async (req, res) => {
  try {
    const data = await Resume.destroy({
      where: {
        id: req.params.id,
      },
    });
    console.log(data);
    res.status(200).end();
  } catch (error) {
    console.error("Error deleting resume:", error);
    return res.status(500).json({ error: "Ошибка при удалении резюме" });
  }
};

const editResume = async (req, res) => {
  const resumeId = req.body.id; // Получаем айди резюме из URL параметра
  const {
    first_name,
    last_name,
    phone,
    birthday,
    gender,
    about,
    position,
    salary,
    salary_type,
    main_language,
    workingHistories,
    education,
    foreignLanguages,
    employmentTypes,
    cityId,
    citizenshipId,
    skills,
  } = req.body;

  try {
    const resume = await Resume.findByPk(resumeId);

    if (!resume) {
      return res.status(404).json({ error: "Резюме не найдено" });
    }

    await resume.update({
      first_name,
      last_name,
      phone,
      birthday,
      gender,
      about,
      position,
      salary,
      salary_type,
      main_language,
      cityId,
      citizenshipId,
    });

    // Удаляем связанные записи перед обновлением
    await WorkingHistory.destroy({ where: { resumeId } });
    await Education.destroy({ where: { resumeId } });
    await ForeignLanguage.destroy({ where: { resumeId } });
    await ResumeEmploymentType.destroy({ where: { resumeId } });

    // Создаем новые связанные записи
    if (workingHistories && workingHistories.length > 0) {
      await WorkingHistory.bulkCreate(
        workingHistories.map((history) => ({
          ...history,
          resumeId: resume.id,
        }))
      );
    }

    if (education && education.length > 0) {
      await Education.bulkCreate(
        education.map((educate) => ({
          ...educate,
          resumeId: resume.id,
        }))
      );
    }

    if (foreignLanguages && foreignLanguages.length > 0) {
      await ForeignLanguage.bulkCreate(
        foreignLanguages.map((language) => ({
          ...language,
          resumeId: resume.id,
        }))
      );
    }

    if (employmentTypes && employmentTypes.length > 0) {
      await ResumeEmploymentType.bulkCreate(
        employmentTypes.map((typeId) => ({
          resumeId: resume.id,
          employmentTypeId: typeId,
        }))
      );
    }

    if (skills && skills.length > 0) {
      const skillInstances = await Skill.findAll({
        where: { id: skills },
      });
      await resume.setSkills(skillInstances);
    }

    return res
      .status(200)
      .json({ message: "Резюме успешно обновлено", resume });
  } catch (error) {
    console.error("Error updating resume:", error);
    return res.status(500).json({ error: "Ошибка при обновлении резюме" });
  }
};

const searchResume = async (req, res) => {
  try {
    const { q, cityId, salary_from, salary_to, salary_type, citizenship } =
      req.query;
    const where = {};

    if (q) {
      where[Op.or] = [
        { first_name: { [Op.iLike]: `%${q}%` } },
        { last_name: { [Op.iLike]: `%${q}%` } },
        { position: { [Op.iLike]: `%${q}%` } },
        { "$skills.name$": { [Op.iLike]: `%${q}%` } },
      ];
    }
    if (cityId) where.cityId = cityId;
    if (salary_from) where.salary = { [Op.gte]: salary_from };
    if (salary_to) where.salary = { [Op.lte]: salary_to };
    if (salary_type) where.salary_type = salary_type;
    if (citizenship) where.citizenship = citizenship;

    const resumes = await Resume.findAll({
      include: [
        {
          model: Skill,
          as: "skills",
          through: {
            attributes: [],
          },
        },
      ],
      where,
    });
    res.status(200).json(resumes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createResume,
  getMyResumes,
  getResume,
  deleteResume,
  editResume,
  searchResume,
};
