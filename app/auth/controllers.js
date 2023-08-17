const sendEmail = require("../utils/sendMail");
const AuthCode = require("./AuthCode");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Role = require("./Role");
const User = require("./User");
const Company = require("./Company");
const { v4: uuidv4 } = require("uuid");

const sendVerificationEmail = (req, res) => {
  const generateCode = () => {
    const code = uuidv4().substr(0, 8);
    return code;
  };

  const verificationCode = generateCode();
  const message = `Ваш код авторизации: ${verificationCode}`;

  const validTill = new Date();
  validTill.setMinutes(validTill.getMinutes() + 2);

  AuthCode.create({
    email: req.body.email,
    code: verificationCode,
    valid_till: validTill,
  });

  sendEmail(req.body.email, "Код авторизации hh.kz", message);
  res.status(200).send("ok");
};

const verifyCode = async (req, res) => {
  console.log(req.body);
  const authCode = await AuthCode.findOne({
    where: { email: req.body.email },
    order: [["valid_till", "DESC"]],
  });

  if (!authCode) {
    return res.status(401).json({ message: "Учетная запись на найдена" });
  }

  if (authCode.valid_till < new Date()) {
    return res
      .status(401)
      .json({ message: "Срок кода истек. Получите новый код" });
  }

  if (authCode.code !== req.body.code) {
    return res.status(401).json({ message: "Код недействителен" });
  }

  let user = await User.findOne({ where: { email: req.body.email } });
  const role = await Role.findOne({ where: { name: "employee" } });

  if (!user) {
    user = await User.create({
      roleId: role.id,
      email: req.body.email,
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      full_name: user.full_name,
      phone: user.phone,
      role: { id: role.id, name: role.name },
      exp: Math.floor(Date.now() / 1000) + 5 * 60 * 60,
    },
    process.env.JWT_KEY
  );
  res.status(200).json({ token });
};

const signUp = async (req, res) => {
  try {
    const role = await Role.findOne({
      where: {
        name: "manager",
      },
    });

    const company = await Company.create({
      name: req.body.company_name,
      description: req.body.company_description,
      address: req.body.company_address,
      logo: `/company/${req.file.filename}`,
    });

    const user = await User.create({
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
      full_name: req.body.full_name,
      companyId: company.id,
      roleId: role.id,
    });
    res.status(200).end();
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error when sign up" });
  }
};

const logIn = async (req, res) => {
  try {
    if (
      !req.body.email ||
      req.body.email === 0 ||
      !req.body.password ||
      req.body.password.length === 0
    )
      return res.status(401).send({ message: "Bad Credential" });
    else {
      const user = await User.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (!user)
        return res
          .status(401)
          .send({ message: "User with that email is not exists" });

      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch)
        return res.status(401).send({ message: "Password is incorrect" });
      const role = await Role.findByPk(user.roleId);
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          full_name: user.full_name,
          phone: user.phone,
          role: { id: role.id, name: role.name },
          exp: Math.floor(Date.now() / 1000) + 5 * 60 * 60,
        },
        process.env.JWT_KEY
      );
      return res.status(200).json({ token });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error when login" });
  }
};

module.exports = {
  sendVerificationEmail,
  verifyCode,
  signUp,
  logIn,
};
