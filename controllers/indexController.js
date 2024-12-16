async function mainPage(req, res) {
  await res.render("index", { title: "Main Page" });
}

module.exports = {mainPage}