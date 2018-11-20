const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/gxNews', {server: {poolSize: 2}});


//设计新闻表
let gxnewsSchema = new mongoose.Schema({
    newTitle: {
        type: String,
        default: '公信置业新闻',
        required: true
    },
    newBody: {
        type: String,
        required: true
    },
    newDate: {
        type: String,
        required: true
    }
});

let news = mongoose.model('New', gxnewsSchema);



//设计banner表
let bannerSchema = new mongoose.Schema({
    imgUrl: {
        type: String,
        required: true
    }
})

let banner = mongoose.model('Banner', bannerSchema);

//查找所有新闻
// news.find(function (err, data) {
//     console.log(data);
// })


//删除新闻
// news.findByIdAndDelete('5bdbb56e1821080f28844e09',function(err, data) {
//     console.log(data);
// });


//添加新闻
// let one = new news({
//     newTitle:'公信5',
//     newDate:newDates,
//     newBody:'”我读到此处，在晶莹的泪光中，又看见那肥胖的、青布棉袍黑布马褂的背影。唉！我不知何时再能与他相见！'
// })
// .save();


//查找所有banner
// banner.find(function(err ,data){
//     console.log(data);
// })

//添加banner
// let two = new banner({
//     imgUrl:'/public/images/img_1.jpg'
// }).save();




module.exports = {
    addNews: news,
    addBanner: banner
};