import SMERouter from 'sme-router'     // 引入安装的第三方路由

const router = new SMERouter('router-view', 'hash')   // router-view 就相当于插座 渲染的元素id="router-view"

import Home from '../controller/home'
import Position from '../controller/position'


//sme-router 中间件  在每个路由匹配前先执行一遍 
router.use((req, res, next) => {
    // 路由跳转前先做高亮
    console.log(req.url)
    $(`.sidebar-menu li.nav a[href="/#${req.url}"]`)
        .parent()
        .addClass('active')
        .siblings()
        .removeClass('active')
})


// router.route('/', (req, res, next) => {   //路由
//     res.render('hello im home')           //直接render首页模板  使用art-template或ejs   views下创建.atr文件
// })
router.route('/', Home.render)   // 同上
router.route('/position', Position.render)

router.redirect('/')   // 设置路由重定向  默认路由 (用户登录后默认进入首页)



export default router