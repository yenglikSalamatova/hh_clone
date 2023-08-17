const { Op } = require("sequelize");
const Skill = require("./Skill");

const getAllSkills = async (req, res) => {
  const skills = await Skill.findAll();

  res.status(200).json({ skills });
};

const getSkillsByKey = async (req, res) => {
  const skills = await Skill.findAll({
    where: { name: { [Op.iLike]: `%${req.params.key}%` } },
  });

  res.status(200).json({ skills });
};

module.exports = { getAllSkills, getSkillsByKey };
