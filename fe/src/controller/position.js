import positionListView from '../views/position-list.art'
import positionAddView from '../views/position-add.art'
import positionEditView from '../views/position-edit.art'
import _ from 'lodash'

function remove(id, res){
    $.ajax({
        url: '/api/position/delete',
        type: 'DELETE',
        data:{
            id
        },
        success(result){
            if(result.ret){
                res.go('/position?_=' + new Date().getTime())
            }
        }
    })
}

function loadData(pageNo, res){
    let start = pageNo * COUNT
    $.ajax({
        url: '/api/position/list',
        data:{
            start,
            count: COUNT
        },
        success(result){
            if(result.ret){
                res.render(positionListView({
                    ...result.data,
                    pageNo,
                    showPage:true,
                    pageCount: _.range(result.data.total / COUNT)
                }))
            } else {
                res.go('/home')
                alert('您好，请先登录！')
            }
        }
    })

}

const COUNT = 5

export default {
    render(req, res){

        loadData(0, res)

         // 添加按钮绑定事件  路由跳转问题
         $('#router-view').on('click','#addbtn',()=>{
            res.go('/position_add')
        })
        // 修改按钮绑定事件  路由跳转
        $('#router-view').on('click','.btn-update',function(){
            res.go('/position_edit', {
                id: $(this).attr('data-id')
            })
        })
        // 删除按钮绑定事件   请求删除
        $('#router-view').on('click','.btn-delete', function(){
            remove($(this).attr('data-id'),res)
        })
        // 分页按钮绑定事件   点击LodaData换页
        $('#router-view').on('click','#page li[data-index]', function(){
            console.log($(this).attr('data-index'))
            loadData($(this).attr('data-index'),res)
        })
        // 上翻页点击事件
        $('#router-view').on('click','#prev', function(){
            let currIndex = $('#page li[class="active"]').attr('data-index')
            let index = currIndex - 1
            if(index > -1){
                console.log(index)
                loadData(index, res)
            }
        })
        // 下翻页点击事件
        $('#router-view').on('click','#next', function(){
            let currIndex = $('#page li[class="active"]').attr('data-index')
            let index = ~~currIndex + 1
            let pagecount = ~~$(this).attr('data-pagecount')
            if(index < pagecount){
                console.log(index)
                loadData(index, res)
            }
        })

        // 搜索
        $('#router-view').on('click','#possearch', function(){
            let keywords = $('#keywords').val()
            $.ajax({
                url: '/api/position/search',
                type: 'POST',
                data: {
                    keywords
                },
                success(result){
                    if(result.ret){
                        res.render(positionListView({
                            ...result.data,
                            showPage:false
                        }))
                    }
                }
            })
        })
    },

    add(req, res){
        res.render(positionAddView({}))
        $('#posback').on('click', ()=>{ // 点击返回
            res.back()
        })
        
        $('#possubmit').on('click',()=>{
            $('#possave').ajaxSubmit({
                url: '/api/position/save',
                type: 'POST',
                clearForm: true,
                success(result){
                    if(result.ret){
                        res.back()
                    } else {
                        // alert(result.data.msg)
                    }
                }
                
            })
            // let data = $('#possave').serialize()
            // $.ajax({
            //     url: '/api/position/save',
            //     type: 'POST',
            //     data,
            //     success(result){
            //         if(result){
            //             res.back()
            //         } else {
            //             alert(result.data.msg)
            //         }
            //     }
                
            // })
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