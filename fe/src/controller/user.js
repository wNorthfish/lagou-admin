// import template from 'art-template'   引入需要 nodejs fs的环境  

// var html = template('../views/user.art', {     // 需要fs 模块，只能使用在node  后端
//     user:{
//         name:'aui'
//     }
// })


let _url = ''

import userView from '../views/user.art'

export default {
    render(){
        // $('.user-menu').html(html)   此法不可用，因为user-menu中的模板是存在可变性的，登录与未登录显示不一样
        // 有想 使用userView()  路由请求res.render()  来渲染， 在index.js 中设置第二套路由    
        
        // res.render(userView(req))
        // 再const routerUser = new SMERouter()   
        // routerUser.route('/', User.render)    routerUser.redirect('/') 
        // 不能使用，说明不支持平行路由

        // 此处是在模板上打洞，渲染用户模块，与模板无关，则也不能使用  sme-router 的  res.render方法，

        // 但可以使用  loader  像之前使用的 string-loader ，此处可使用 art-template-loader  
        // 需使用  template-web.js 文件
        // 在index.html  主页中引入template-web.js 文件 则在页面中存在template
        // 使用  template.render(source, data, options);

        // let html = template.render(userView(), {  // 可直接用userView({ isSignin:false })
        //     isSignin: true
        // })
        let html = userView({
            isSignin : false
        })
        $('.user-menu').html(html)
        this.bindEventToBtn()
    },

    bindEventToBtn(){
        $('.hidden-xs').on('click', function(){
            _url = $(this).attr('id') === 'btn-signin' ? '/api/signin' : '/api/signup'
            // if($(this).attr('id') === "btn-signin"){
            //     console.log('btn-signin')
            // } else {
            //     console.log('btn-signup')
            // }
        })

        $('#btn-submit').on('click',()=>{
            let data = $('#user-form').serialize()
            $.ajax({
                url: _url,
                type:'POST',
                data,
                success(result){
                    console.log(result)
                }
            })
        })
    }
}