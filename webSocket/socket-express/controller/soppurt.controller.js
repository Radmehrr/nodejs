class SupportController {
  renderChatRoom(req, res, next) {
    try {
      return res.render("index.ejs");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  SupportController: new SupportController(),
};
