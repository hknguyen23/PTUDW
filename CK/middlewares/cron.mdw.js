const model = require('../models/model');
const cron = require("node-cron");
const emailserver = require('../middlewares/email.mdw');

module.exports = function (app) {
  new cron.schedule("*/5 * * * * *", async function() {
    console.log("running a task every 5 second");
    const check = await model.checkExpireAuction();
    console.log(check);

    for (i = 0; i < check.length; i++){
      console.log("finish: " + check[i].ID);

      if (check[i].winner == undefined){
        const status = {
          id: check[i].ID,
          TrangThai: 0
        }
        await model.setStatusSold(status);

        var string = 'No one buy your product. Please upload your product again if you want to try again' + check[i].ID;
        var title = 'Your auction has run out of time'
        emailserver.send(check[i].emailSeller, string, title)

      }
      else{
        const status = {
          id: check[i].ID,
          TrangThai: 0
        }
        const winner = {
          id: check[i].ID,
          IDNguoiThangDauGia: check[i].winner
        }
        await model.setStatusSold(status);
        await model.setWinner(winner);

        var string = 'you\'r winner, bought: ' + check[i].ID + ' at ' + check[i].bid + 'VND. Please go to product page to contact the seller';
        var title = 'Congratulation! You won an auction'
        emailserver.send(check[i].emailWinner, string, title)
        string = 'Product was sold. Sold: ' + check[i].ID + ' at ' + check[i].bid + 'VND. Please go to product page to contact the buyer.';
        title = 'Congratulation! Your auction has finished'
        emailserver.send(check[i].emailSeller, string, title)

      }
    }
  });

};


