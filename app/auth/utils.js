const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Укажите путь, куда будут сохраняться загруженные файлы
    cb(null, path.join(__dirname, "../../public/company"));
  },
  filename: function (req, file, cb) {
    // Определите имя файла (или его формат)
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = { upload };
