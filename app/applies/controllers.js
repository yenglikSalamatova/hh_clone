const Apply = require("./Apply");
const { NEW, INVITATION, DECLINED } = require("./utils");
const sendMail = require("../utils/sendMail");
const Vacancy = require("../vacancy/models/Vacancy");
const Resume = require("../resume/Resume");
const User = require("../auth/User");
const Company = require("../auth/Company");
const { Op } = require("sequelize");

const createApply = async (req, res) => {
  try {
    const resume = await Resume.findByPk(req.body.resumeId);
    const vacancy = await Vacancy.findByPk(req.body.vacancyId);
    const user = await User.findByPk(vacancy.userId);

    if (!resume || !vacancy) {
      return res
        .status(401)
        .json({ message: "Вакансия или резюме на найдены" });
    }

    const apply = await Apply.create({
      resumeId: req.body.resumeId,
      vacancyId: req.body.vacancyId,
      status: NEW,
    });

    sendMail(
      user.email,
      `Новый отклик на вакансию ${vacancy.name}`,
      `
      Имя соискателя: ${resume.first_name}
      Фамилия соискателя: ${resume.last_name}
      Номер соискателя: ${resume.phone}
      `
    );

    res.status(201).json({ apply });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const getEmployeeApplies = async (req, res) => {
  try {
    const resumes = await Resume.findAll({ where: { userId: req.user.id } });
    const ids = resumes.map((item) => item.id);
    const applies = await Apply.findAll({
      where: {
        resumeId: { [Op.in]: ids },
      },
      include: {
        association: "vacancy",
      },
    });
    res.status(200).json({ applies });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const deleteApply = async (req, res) => {
  try {
    const apply = await Apply.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const acceptEmployee = async (req, res) => {
  try {
    await Apply.update(
      {
        status: INVITATION,
      },
      {
        where: {
          id: req.body.applyId,
        },
      }
    );
    const apply = await Apply.findByPk(req.body.applyId);
    console.log(apply);
    const vacancy = await Vacancy.findByPk(apply.vacancyId);
    console.log(vacancy);
    const resume = await Resume.findByPk(apply.resumeId);
    console.log(resume);
    const user = await User.findByPk(resume.userId);
    const company = await Company.findByPk(req.user.companyId);
    sendMail(
      user.email,
      `Вы были приглашены на вакансию ${vacancy.name}`,
      `
    Компания: ${company.name}, пригласила вас на вакансию ${vacancy.name},
    приходите по адресу: ${company.address} или свяжитесь с менеджером ${req.user.full_name}: ${req.user.phone}, ${req.user.email}
    `
    );
    res.status(200).json({ message: "Updated: invitation" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const declineEmployee = async (req, res) => {
  try {
    await Apply.update(
      {
        status: DECLINED,
      },
      {
        where: {
          id: req.body.applyId,
        },
      }
    );
    const apply = await Apply.findByPk(req.body.applyId);
    const vacancy = await Vacancy.findByPk(apply.vacancyId);
    const resume = await Resume.findByPk(apply.resumeId);
    const user = await User.findByPk(resume.userId);
    const company = await Company.findByPk(req.user.companyId);
    sendMail(
      user.email,
      `Отказ на вакансию ${vacancy.name}`,
      `
    Компания: ${company.name}, к сожалению ваша кандидатура не подходит на вакансию ${vacancy.name}
    `
    );

    res.status(200).json({ message: "Updated: declinded" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const getVacancyApplies = async (req, res) => {
  try {
    const { status } = req.query;
    const applies = await Apply.findAll({
      where: {
        id: req.params.id,
        ...(status && { status }),
      },
      include: {
        association: "resume",
      },
    });
    res.status(200).json({ applies });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createApply,
  getEmployeeApplies,
  deleteApply,
  acceptEmployee,
  declineEmployee,
  getVacancyApplies,
};
