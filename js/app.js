/**
 * Created by MissQ on 2016/3/10.
 */
window.onload = function () {
    imgLocation("container","box")
    //一个jason实例imgData
    var imgData = {"data":[{"src":"3.jpg"},{"src":"2.jpg"},{"src":"1.jpg"},{"src":"4.jpg"},{"src":"5.jpg"}]}
    window.onscroll = function(){
        if(checkFlag()){
            var cparent = document.getElementById("container");
            for(var i=0;i<imgData.data.length;i++){
                //创建一个box子节点到cparent下
                var ccontent = document.createElement("div");
                ccontent.className = "box";
                cparent.appendChild(ccontent);
                //创建一个box_img子节点到box下
                var boximg = document.createElement("div");
                boximg.className = "box_img";
                ccontent.appendChild(boximg);
                //创建一个img子节点到box_img下
                var img = document.createElement("img");
                img.src = "img/" + imgData.data[i].src;
                boximg.appendChild(img);
            }
            imgLocation("container","box");
        }
    }
}

function checkFlag(){
    var cparent = document.getElementById("container");
    var ccontent = getChildElement(cparent,"box");
    var lastContentHeight = ccontent[ccontent.length - 1].offsetTop;
    var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;//滚动的高度
    var pageHeight = document.documentElement.clientHeight||document.body.clientHeight;//页面高度
    // console.log(lastContentHeight+":"+scrollTop+":"+pageHeight);
    if(lastContentHeight < scrollTop + pageHeight){
        return true;
    }
}

function imgLocation(parent,content) {
    //将parent下所有的content全部取出,即取出container中的box
    var cparent = document.getElementById(parent);
    var ccontent = getChildElement(cparent,content);

    var imgWidth = ccontent[0].offsetWidth;//确定一张照片的宽度
    var num = Math.floor(document.documentElement.clientWidth / imgWidth);//一排能放的照片数
    cparent.style.cssText = "width:" + imgWidth * num + "px;margin:0 auto";//确定总宽度

    var BoxHeightArr = [];//定义一个数组存放一排照片的高度
    for(var i = 0;i< ccontent.length;i++){
        if(i<num){
             BoxHeightArr[i] = ccontent[i].offsetHeight;
            // console.log(BoxHeightArr);
        }else {
            var minHeight = Math.min.apply(null,BoxHeightArr);//选取最小的高度
            var minIndex =  getMinHeightLocation(BoxHeightArr,minHeight);//最小高度的位置
            //设置下一张图片的位置
            ccontent[i].style.position = "absolute";
            ccontent[i].style.top = minHeight + "px";
            ccontent[i].style.left = ccontent[minIndex].offsetLeft + "px";
            BoxHeightArr[minIndex] = BoxHeightArr[minIndex] + ccontent[i].offsetHeight;
        }
    }
}

//获得高度最小的图片的位置
function getMinHeightLocation(BoxHeightArr,minHeight){
    for(var i in BoxHeightArr){
        if(BoxHeightArr[i] == minHeight){
            return i;
        }
    }
}

//获取所有content，并取出与参数content一样的 存入contentArr
function getChildElement(parent,content){
    var contentArr = [];
    var allContent = parent.getElementsByTagName("*");
    for(var i = 0;i<allContent.length;i++){
        if(allContent[i].className == content){
            contentArr.push(allContent[i]);
        }
    }
    return contentArr;
}