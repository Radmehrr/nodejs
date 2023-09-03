module.exports = {
  ROLES: Object.freeze({
    USER: "user",
    ADMIN: "admin",
    WRITER: "writer",
    TEACHER: "teacher",
    SUPPLIER: "supplier",
  }),

  PERMISSIONS: Object.freeze({
    USER: ["profile"],
    ADMIN: ["all"],
    SUPERADMIN: ["all"],
    CONTENT_MANAGER: ["course", "blog", "category", "product"],
    TEACHER: ["course", "blog"],
    SUPPLIER: ["product"],
    ALL: "all",
  }),

  ACCESS_TOKEN_SECRET_KEY:
    "4D94C7E49B3A4B4AC31842BB0CF53601D730635DF31CD94B23498DDA6E5F78EE",
  REFRESH_TOKEN_SECRET_KEY:
    "C2FFB9F02952304897DF91CC26506467595537F108792875688F6A574D2D40D4",
  MongoDbObjectIdPattern: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i,
};
