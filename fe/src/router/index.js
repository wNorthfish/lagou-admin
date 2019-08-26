import SMERouter from 'sme-router'     // 引入安装的第三方路由
import homeController from '../controller/home'
import positionController from '../controller/position'
import activeNavUtil from '../utils/avtive-nav'
// import User from '../controller/user'



const router = new SMERouter('router-view', 'hash')   // router-view 就相当于插座  根据hash改变  渲染的元素id="router-view"  




// //sme-router 中间件  在每个路由匹配前先执行一遍 
// router.use((req, res, next) => {
//     // 路由跳转前先做高亮
//     console.log(req.url)
//     $(`.sidebar-menu li.nav a[href="/#${req.url}"]`)
//         .parent()
//         .addClass('active')
//         .siblings()
//         .removeClass('active')
// })
/////////将高亮独立出来，写在  utils/active-nav.js 中
router.use(activeNavUtil)



// router.route('/', (req, res, next) => {   //路由
//     res.render('hello im home')           //直接render首页模板  使用art-template或ejs   views下创建.atr文件
// })
router.route('/', homeController.render)   // 同上
router.route('/position', positionController.render)
router.route('/position_add', positionController.add)  // 添加职位路由
router.route('/position_edit',positionController.edit) // 添加职位修改路由

router.redirect('/position')   // 设置路由重定向  默认路由 (用户登录后默认进入首页)



export default router