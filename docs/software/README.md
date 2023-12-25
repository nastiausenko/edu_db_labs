# Реалізація інформаційного та програмного забезпечення

```sql
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema DBLabs
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `DBLabs` ;

-- -----------------------------------------------------
-- Schema DBLabs
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `DBLabs` DEFAULT CHARACTER SET utf8 ;
USE `DBLabs` ;

-- -----------------------------------------------------
-- Table `DBLabs`.`Role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DBLabs`.`Role` ;

CREATE TABLE IF NOT EXISTS `DBLabs`.`Role` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `description` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DBLabs`.`User`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DBLabs`.`User` ;

CREATE TABLE IF NOT EXISTS `DBLabs`.`User` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `password` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `surname` VARCHAR(45) NOT NULL,
  `nickname` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `picture` MEDIUMBLOB NULL,
  `Role_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_User_Role_idx` (`Role_id` ASC) VISIBLE,
  CONSTRAINT `fk_User_Role`
    FOREIGN KEY (`Role_id`)
    REFERENCES `DBLabs`.`Role` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DBLabs`.`Quiz`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DBLabs`.`Quiz` ;

CREATE TABLE IF NOT EXISTS `DBLabs`.`Quiz` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(45) NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DBLabs`.`Question`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DBLabs`.`Question` ;

CREATE TABLE IF NOT EXISTS `DBLabs`.`Question` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(45) NOT NULL,
  `number` INT UNSIGNED NOT NULL,
  `description` VARCHAR(100) NULL,
  `Quiz_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Question_Quiz1_idx` (`Quiz_id` ASC) VISIBLE,
  CONSTRAINT `fk_Question_Quiz1`
    FOREIGN KEY (`Quiz_id`)
    REFERENCES `DBLabs`.`Quiz` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DBLabs`.`Answer`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DBLabs`.`Answer` ;

CREATE TABLE IF NOT EXISTS `DBLabs`.`Answer` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `text` VARCHAR(100) NULL,
  `option` VARCHAR(45) NULL,
  `file` MEDIUMBLOB NULL,
  `Question_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Answer_Question1_idx` (`Question_id` ASC) VISIBLE,
  CONSTRAINT `fk_Answer_Question1`
    FOREIGN KEY (`Question_id`)
    REFERENCES `DBLabs`.`Question` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DBLabs`.`Respondent`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DBLabs`.`Respondent` ;

CREATE TABLE IF NOT EXISTS `DBLabs`.`Respondent` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `User_id` INT NOT NULL,
  `Answer_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Respondent_User1_idx` (`User_id` ASC) VISIBLE,
  INDEX `fk_Respondent_Answer1_idx` (`Answer_id` ASC) VISIBLE,
  CONSTRAINT `fk_Respondent_User1`
    FOREIGN KEY (`User_id`)
    REFERENCES `DBLabs`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Respondent_Answer1`
    FOREIGN KEY (`Answer_id`)
    REFERENCES `DBLabs`.`Answer` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DBLabs`.`Option`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DBLabs`.`Option` ;

CREATE TABLE IF NOT EXISTS `DBLabs`.`Option` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(45) NULL,
  `number` INT UNSIGNED NOT NULL,
  `Question_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Option_Question1_idx` (`Question_id` ASC) VISIBLE,
  CONSTRAINT `fk_Option_Question1`
    FOREIGN KEY (`Question_id`)
    REFERENCES `DBLabs`.`Question` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DBLabs`.`SelectedOption`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DBLabs`.`SelectedOption` ;

CREATE TABLE IF NOT EXISTS `DBLabs`.`SelectedOption` (
  `Answer_id` INT NOT NULL,
  `Option_id` INT NOT NULL,
  INDEX `fk_SelectedOption_Answer1_idx` (`Answer_id` ASC) VISIBLE,
  INDEX `fk_SelectedOption_Option1_idx` (`Option_id` ASC) VISIBLE,
  CONSTRAINT `fk_SelectedOption_Answer1`
    FOREIGN KEY (`Answer_id`)
    REFERENCES `DBLabs`.`Answer` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_SelectedOption_Option1`
    FOREIGN KEY (`Option_id`)
    REFERENCES `DBLabs`.`Option` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `DBLabs`.`Role`
-- -----------------------------------------------------
START TRANSACTION;
USE `DBLabs`;
INSERT INTO `DBLabs`.`Role` (`name`, `description`) VALUES ('Respondent', 'A user that taking a survey');
INSERT INTO `DBLabs`.`Role` (`name`, `description`) VALUES ('Editor', 'The user who edits the survey');
INSERT INTO `DBLabs`.`Role` (`name`, `description`) VALUES ('Admin', 'The user is the owner of the survey');

COMMIT;
```

## RESTfull сервіс для управління даними

### Вхідний файл програми

```js
const express = require("express");
const cors = require("cors");
const quetsionRouter = require("./routes/quetsionRouter");
const quizRouter = require("./routes/quizRouter");
const userRouter = require("./routes/userRouter");
const AppError = require("./utils/appError");
const errorHandler = require("./utils/errorHandler");
const app = express();

app.use(express.json());
app.use(cors());
app.use(quetsionRouter);
app.use(quizRouter);
app.use(userRouter);

app.all("*", (req, res, next) => {
    next(new AppError(`The URL ${req.originalUrl} does not exists`,404));
});
app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
```

### Файл для встановлення доступу до бази даних

```js
const mysql = require("mysql2");
require("dotenv").config();

const dbConnect = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
})

dbConnect.connect();

module.exports = dbConnect;
```

### CRUD для користувачів

#### Маршрути

```js
const express = require("express");
const controllers = require("../controllers/userController");
const router = express.Router();

router.route("/user").get(controllers.getAllUsers);

router.route("/user").post(controllers.createUser);

router.route("/user/:id").get(controllers.getUserById);

router.route("/user/:id").put(controllers.updateUserInfo);

router.route("/user/:id").delete(controllers.deleteUser);

module.exports = router;

```

#### Контролер
```js
const AppError = require("../utils/appError");
const dbConnect = require("../services/database");

exports.getAllUsers = (req, res, next) => {
    dbConnect.query("SELECT * FROM user", function (err, data, fields) {
        if (err) return next(new AppError(err));
        res.status(200).json({
            status: "success",
            length: data?.length,
            data: data,
        });
    });
};

exports.createUser = (req, res, next) => {
    if (!req.body) return next(new AppError("No form data found", 404));
    const values = [
        req.body.id,
        req.body.password,
        req.body.name,
        req.body.surname,
        req.body.nickname,
        req.body.email,
        req.body.picture,
        req.body.Role_id,
    ];

    dbConnect.query(
        "INSERT INTO user (id, password, name, surname, nickname, email, picture, Role_id) VALUES(?)",
        [values],
        function (err, data, fields) {
            if (err) return next(new AppError(err, 500));
            res.status(201).json({
                status: "success",
                message: "user added",
            });
        }
    );
};

exports.getUserById = (req, res, next) => {
    if (!req.params.id) {
        return next(new AppError("No user id found", 404));
    }
    dbConnect.query(
        "SELECT * FROM user WHERE id = ?",
        [req.params.id],
        function (err, data, fields) {
            if (data.length === 0) return next(new AppError("User not found", 404))
            if (err) return next(new AppError(err, 500));
            res.status(200).json({
                status: "success",
                length: data?.length,
                data: data,
            });
        }
    );
};

exports.updateUserInfo = (req, res, next) => {
    if (!req.params.id) {
        return next(new AppError("No user id found", 404));
    }
    dbConnect.query(
        "UPDATE user SET password=?, name=?, surname=?, nickname=?, email=?, picture=?, Role_id=? WHERE id=?",
        [
            req.body.password,
            req.body.name,
            req.body.surname,
            req.body.nickname,
            req.body.email,
            req.body.picture,
            req.body.Role_id,
            req.params.id,
        ],
        function (err, data, fields) {
            if (err) return next(new AppError(err, 500));
            res.status(201).json({
                status: "success",
                message: "user info updated",
            });
        }
    );
};

exports.deleteUser = (req, res, next) => {
    if (!req.params.id) {
        return next(new AppError("No todo id found", 404));
    }
    dbConnect.query(
        "DELETE FROM user WHERE id=?",
        [req.params.id],
        function (err, fields) {
            if (err) return next(new AppError(err, 500));
            res.status(201).json({
                status: "success",
                message: "user deleted",
            });
        }
    );
};

```

### CRUD для опитувань

#### Маршрути

```js
const express = require("express");
const controllers = require("../controllers/quizController");
const router = express.Router();

router.route("/quiz").get(controllers.getAllQuizes);

router.route("/quiz").post(controllers.createQuiz);

router.route("/quiz/:id").get(controllers.getQuizById);

router.route("/quiz/:id").put(controllers.updateQuiz);

router.route("/quiz/:id").delete(controllers.deleteQuiz);

module.exports = router;

```

#### Контролер
```js
const AppError = require("../utils/appError");
const dbConnect = require("../services/database");

exports.getAllQuizes = (req, res, next) => {
    dbConnect.query("SELECT * FROM quiz", function (err, data, fields) {
        if (err) return next(new AppError(err));
        res.status(200).json({
            status: "success",
            length: data?.length,
            data: data,
        });
    });
};

exports.createQuiz = (req, res, next) => {
    if (!req.body) return next(new AppError("No form data found", 404));
    const values = [
        req.body.description,
        req.body.name,
    ];

    dbConnect.query(
        "INSERT INTO quiz (description, name) VALUES(?)",
        [values],
        function (err, data, fields) {
            if (err) return next(new AppError(err, 500));
            res.status(201).json({
                status: "success",
                message: "quiz added",
            });
        }
    );
};

exports.getQuizById = (req, res, next) => {
    if (!req.params.id) {
        return next(new AppError("No quiz id found", 404));
    }
    dbConnect.query(
        "SELECT * FROM quiz WHERE id = ?",
        [req.params.id],
        function (err, data, fields) {
            if (data.length === 0) return next(new AppError("Quiz not found", 404))
            if (err) return next(new AppError(err, 500));
            res.status(200).json({
                status: "success",
                length: data?.length,
                data: data,
            });
        }
    );
};

exports.updateQuiz = (req, res, next) => {
    if (!req.params.id) {
        return next(new AppError("No quiz id found", 404));
    }
    dbConnect.query(
        "UPDATE quiz SET description=?, name=? WHERE id=?",
        [
            req.body.description,
            req.body.name,
            req.params.id,
        ],
        function (err, data, fields) {
            if (err) return next(new AppError(err, 500));
            res.status(201).json({
                status: "success",
                message: "quiz updated",
            });
        }
    );
};

exports.deleteQuiz = (req, res, next) => {
    if (!req.params.id) {
        return next(new AppError("No todo id found", 404));
    }
    dbConnect.query(
        "DELETE FROM quiz WHERE id=?",
        [req.params.id],
        function (err, fields) {
            if (err) return next(new AppError(err, 500));
            res.status(201).json({
                status: "success",
                message: "quiz deleted",
            });
        }
    );
};

```
### CRUD для питань

#### Маршрути

```js
const express = require("express");
const controllers = require("../controllers/questionController");
const router = express.Router();

router.route("/question").get(controllers.getAllQuestions);

router.route("/question").post(controllers.createQuestion);

router.route("/question/:id").get(controllers.getQuestionById);

router.route("/question/:id").put(controllers.updateQuestion);

router.route("/question/:id").delete(controllers.deleteQuestion);

module.exports = router;

```

#### Контролер

```js
const AppError = require("../utils/appError");
const dbConnect = require("../services/database");

exports.getAllQuestions = (req, res, next) => {
    dbConnect.query("SELECT * FROM question", function (err, data, fields) {
        if (err) return next(new AppError(err));
        res.status(200).json({
            status: "success",
            length: data?.length,
            data: data,
        });
    });
};

exports.createQuestion = (req, res, next) => {
    if (!req.body) return next(new AppError("No form data found", 404));
    const values = [
        req.body.id,
        req.body.type,
        req.body.number,
        req.body.description,
        req.body.Quiz_id,
    ];

    dbConnect.query(
        "INSERT INTO question (id, type, number, description, Quiz_id) VALUES(?)",
        [values],
        function (err, data, fields) {
            if (err) return next(new AppError(err, 500));
            res.status(201).json({
                status: "success",
                message: "question added",
            });
        }
    );
};

exports.getQuestionById = (req, res, next) => {
    if (!req.params.id) {
        return next(new AppError("No question id found", 404));
    }
    dbConnect.query(
        "SELECT * FROM question WHERE id = ?",
        [req.params.id],
        function (err, data, fields) {
            if (data.length === 0) return next(new AppError("Question not found", 404))
            if (err) return next(new AppError(err, 500));
            res.status(200).json({
                status: "success",
                length: data?.length,
                data: data,
            });
        }
    );
};

exports.updateQuestion = (req, res, next) => {
    if (!req.params.id) {
        return next(new AppError("No question id found", 404));
    }
    dbConnect.query(
        "UPDATE question SET type=?, number=?, description=? WHERE id=?",
        [
            req.body.type,
            req.body.number,
            req.body.description,
            req.params.id,
        ],
        function (err, data, fields) {
            if (err) return next(new AppError(err, 500));
            res.status(201).json({
                status: "success",
                message: "question updated",
            });
        }
    );
};

exports.deleteQuestion = (req, res, next) => {
    if (!req.params.id) {
        return next(new AppError("No todo id found", 404));
    }
    dbConnect.query(
        "DELETE FROM question WHERE id=?",
        [req.params.id],
        function (err, fields) {
            if (err) return next(new AppError(err, 500));
            res.status(201).json({
                status: "success",
                message: "question deleted",
            });
        }
    );
};

```

