const model = require('../models/model');
const cron = require("node-cron");
const emailserver = require('../middlewares/email.mdw');

module.exports = function(app) {
    new cron.schedule("*/5 * * * * *", async function() {
        console.log("running a task every 5 second");
        const check = await model.checkExpireAuction();

        for (i = 0; i < check.length; i++) {
            //console.log("finish: " + check[i].ID);
            if (check[i].winner == undefined) {     // no winner when time's up, alert seller
                const status = {
                    id: check[i].ID,
                    TrangThai: 0
                }
                await model.setStatusSold(status);

                var string = 'Không có người mua' + check[i].TenSanPham + '. Hãy đăng lại sản phẩm nếu bạn muốn tiếp tục đấu giá';
                var title = 'Sản phẩm đấu giá của bạn đã hết hạn'
                emailserver.send(check[i].emailSeller, string, title)
            } else {                    
                const status = {                    //alert winner, seller when time's up
                    id: check[i].ID,
                    TrangThai: 0
                }
                const winner = {
                    id: check[i].ID,
                    IDNguoiThangDauGia: check[i].winner
                }
                await model.setStatusSold(status);
                await model.setWinner(winner);

                var string = 'Bạn đã mua ' + check[i].TenSanPham + ' với giá ' + check[i].bid + ' VND. Hãy đến trang sản phẩm để giao dịch với người bán';
                var title = 'Chúc mừng, bạn đã thắng tại sàn đấu giá trực tuyến'
                emailserver.send(check[i].emailWinner, string, title)
                string = 'Bạn đã bán ' + check[i].TenSanPham + ' với giá ' + check[i].bid + ' VND. Hãy đến trang sản phẩm để giao dịch với người thắng cuộc';
                title = 'Chúc mừng, sản phẩm đấu giá của bạn đã kết thúc'
                emailserver.send(check[i].emailSeller, string, title)

            }
        }
    });

};