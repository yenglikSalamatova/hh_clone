const Resume = require("../resume/Resume");
const validateResume = (req, res, next) => {
  try {
    let errors = {};

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
      educations,
      foreignLanguages,
      employmentTypes,
    } = req.body;

    // Проверка обязательных полей
    if (!first_name) {
      errors.first_name = "Имя обязательно для заполнения";
    }

    if (!last_name) {
      errors.last_name = "Фамилия обязательна для заполнения";
    }

    if (!phone) {
      errors.phone = "Телефон обязателен для заполнения";
    }

    if (!birthday) {
      errors.birthday = "Дата рождения обязательна для заполнения";
    }

    if (!position) {
      errors.position = "Должность обязательна для заполнения";
    }

    if (salary === undefined) {
      errors.salary = "Зарплата обязательна для заполнения";
    } else if (typeof salary !== "number" || salary < 0) {
      errors.salary = "Зарплата должна быть положительным числом";
    }

    if (!salary_type) {
      errors.salary_type = "Тип зарплаты обязателен для заполнения";
    }

    if (!main_language) {
      errors.main_language = "Основной язык обязателен для заполнения";
    }

    // ...

    // Проверка наличия ошибок
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const isAuthorOfResume = async (req, res, next) => {
  try {
    const id = req.params.id || req.body.id;
    const resume = await Resume.findByPk(id);
    if (!resume)
      res.status(400).send({ message: "Resume with that id is not exist" });
    else if (req.user.id === resume.userId) {
      next();
    } else {
      res.status(403).send({ message: "Access Forbidden" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { validateResume, isAuthorOfResume };
