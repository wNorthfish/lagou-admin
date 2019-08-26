import positionListView from '../views/position-list.art'
import positionAddView from '../views/position-add.art'
import positionEditView from '../views/position-edit.art'

export default {
    render(req, res){
        $.ajax({
            url: '/api/position/list',
            success(result){
                if(result.ret){
                    res.render(positionListView({
                        list: result.data
                    }))

                    // 添加按钮绑定事件  路由跳转问题
                    $('#addbtn').on('click',()=>{
                        res.go('/position_add')
                    })
                    // 修改按钮绑定事件  路由跳转
                    $('.btn-update').on('click',function(){
                        res.go('/position_edit', {
                            id: $(this).attr('data-id')
                        })
                    })
                } else {
                    res.go('/')
                    alert('您好，请先登录！')
                }
            }
        })

    },

    add(req, res){
        res.render(positionAddView({}))
        $('#posback').on('click', ()=>{ // 点击返回
            res.back()
        })
        $('#possubmit').on('click',()=>{
            let data = $('#possave').serialize()
            $.ajax({
                url: '/api/position/save',
                type: 'POST',
                data,
                success(result){
                    if(result){
                        res.back()
                    } else {
                        alert(result.data.msg)
                    }
                }
                
            })
        })
    },

    edit(req, res){
        // 先做ajax请求 拿到此条数据渲染到修改界面
        $.ajax({
            url: '/api/position/findone',
            type: 'POST',
            data: {
                id: req.body.id
            },
            success(result){
                res.render(positionEditView(result.data))
                $('#posback').on('click', ()=>{ // 点击返回
                    res.back()
                })

                $('#possubmit').on('click', ()=>{
                    let data = $('#possedit').serialize()
                    
                    $.ajax({
                        url: '/api/position/put',
                        type: 'PUT',
                        data:data + '&id=' + req.body.id,
                        success(result){
                            if(result){
                                res.back()
                            } else {
                                alert(result.data.msg)
                            }
                        }
                        
                    })
                })
            }
        })

    }

}