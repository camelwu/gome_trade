var businessProperty={
    "sources": '020',
    "version": '0.1',
    "businessType": 'TRANSACTION_QUERYUSERYTRANSACTIONS',
    "invokeSource": 'APP'
},
userNo='100041176703',
pageNo=1,
pageSize=12,
transactionTag='',
utils = {
    "000":{
        imgs:'all',
        text:'全部',
        temp:''
    },
    "040":{
        imgs:'hongbao',
        text:'返利'
    },
    "010":{
        imgs:'chongzhi',
        text:'充值'
    },
    "050":{
        imgs:'tuikuan',
        text:'退款'
    },
    "020":{
        imgs:'tixian',
        text:'提现'
    },
    "030":{
        imgs:'fanli',
        text:'返利'
    },
    "093":{
        imgs:'zhifu',
        text:'支付'
    },
    fColor:(s)=>{
        let str = 'green'
        if(s=='+'){
            return 'red'
        }
        return str
    },
    fTime:(time)=>{
        let newstr = '',
        ary = time.split("");
        newstr = ary[0]+ary[1]+ary[2]+ary[3]+'-'+ary[4]+ary[5]+'-'+ary[6]+ary[7]+' '+ary[8]+ary[9]+':'+ary[10]+ary[11]+':'+ary[12]+ary[13]
        return newstr;
    },
    fMoney:(m)=>{
        m = parseFloat(m);
        if(isNaN(m)){
            return 0;
        }else{
            m = m/100;
            return m.toFixed(2);
        }
    },
    fUrlstr:(name)=>{
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    },
    fHashstr:(key)=>{
        var arr = (location.hash || "").replace(/^\#/,'').split("&");
        var params = {};
        for(var i=0; i<arr.length; i++){
            var data = arr[i].split("=");
            if(data.length == 2){
                params[data[0]] = data[1];
            }
        }
        return params[key];
    },
    getList:()=>{
        $.ajax({
            url:'/transactionCodelist',
            success:function(res) {
                $('.tab-hide').show();
                if (res.code == 0) {
                    let datal = res.data.map,
                    htmlstr = ejs.render($("#t-list").html(), { lists: datal.transactionList })

                    $("#myList").html(htmlstr)
                } else {
                    console.log(res.msg)
                }
            },
            complete:function(){
                $('.loading').hide();
            },
            error:function(){
                alert('show err page!')
                $('#error').show();
            }
        });
    },
    getDetail:(tag,no)=>{

        $('.loading').show();
        $('#t-list').hide();
        $('#myDetail').show();
        // shekong
        var tag = utils.fHashstr('tag'),
        no=utils.fHashstr('no');
        $.ajax({
            type: 'get',
            url: '/transactionRecord',
            data: {
                "businessProperty": businessProperty,
                "transactionNo": ''+no,
                "userNo": userNo
            },
            success: function (res) {
                if (res.code == 0) {
                    $('.tab-hide').hide();
                    $('.loading').show(); 
                    let data = res.data, htmlstr = '';
                    htmlstr = ejs.render($("#"+tag).innerHTML, { data: data })
                    $("#myDetail").html(htmlstr)
                } else {
                    console.log(res.msg)
                }
            },
            error:function(){
                alert('err');
            }
        });
    },
    backList:()=>{
        
    }
}
$('h-cnt p').click(function(){
    $(".box").slideUp(3000);
})
$("#btn1").click(function () {
    $(".box").slideDown(3000);
})

$(document).ready(function () {
    $("#grape").hide()    
    if (utils.fHashstr('tag')&&utils.fHashstr('no')) {//detail页面
        utils.getDetail()
    }else{//list页面，还需要修改后续获取数据的参数，post&data！！！
        utils.getList();      
    }
})
$(window).on("hashchange", function() {
    console.log('has chg')
    utils.getDetail()
});
$(document).on('click', '.header p', function showpayWays () {
    $('#master').show();
    $(".but-box").slideDown(200)
});
$(document).on('click','.b-close',function(){
    $('#master').hide();
    $(".but-box").slideUp(200)
});
$(document).on('click','#master',function(){
    $('#master').hide();
    $(".but-box").slideUp(200)
})
$(document).on('click','.but-box ul li',function(){
    $('#master').hide();
    $(".but-box").slideUp(200)
})

// .mouseleave(function () {
//     $(".but-box").slideUp();
// })
