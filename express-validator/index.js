const { body } = require("express-validator");

function register() {
  return [
    body("username")
      .notEmpty()
      .isLength({ min: 4, max: 25 })
      .custom((value, ctx) => {
        if (value) {
          const usernameRegex = /^[a-z]+[a-zA-Z0-9\_\.]{2,}/gi;
          if (usernameRegex.test(value)) {
            return true;
          }

          throw "نام کاربری صحیح نمیباشد.";
        }
        throw "نام کاربری نمیتواند حالی باشد";
      }),

    body("email").not().isEmail().withMessage("ایمیل وارد شده صحیح نمیباشد"),
    body("mobile").not().isMobilePhone("fa-IR").withMessage("harchi"),
    body("password")
      .isLength({ min: 6, max: 16 })
      .withMessage("")
      .custom((value, ctx) => {
        if (!value) throw "";
        if (value !== ctx?.req?.body?.confirmPassword)
          throw "ramz ba tekrare an barabar nist";
        return true;
      }),
    param("id").isMongoId().withMessage(""),
  ];
}

module.exports = {
  register,
};
