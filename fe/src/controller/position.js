import positionView from '../views/position.art'

export default {
    render(req, res, next){
        $.ajax({
            url: '/api/position/list',
            success(result){
                if(result.ret){
                    res.render(positionView({
                        list: result.data
                    }))
                } else {
                    res.go('/')
                    alert('您好，请先登录！')
                }
            }
        })

    }
}