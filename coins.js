function gencoin(){
    var coin_container = document.createElement('div');
    coin_container.className="coin_container";
    var id = new Date().getTime();
    coin_container.id=id;
    
    var coin = document.createElement('div');
    coin.className = coin_selected+" coin";
    coin.style.backgroundImage="url('"+chrome.extension.getURL('sprite.png')+"')";
    coin_container.appendChild(coin);
    
    var p=getPosition();
    coin_container.style.top=(p.y-16)+"px";
    coin_container.style.left=(p.x-8)+"px";
    
    document.body.appendChild(coin_container);
    document.getElementById(id).addEventListener(
        'webkitAnimationEnd',
        function(){
            var e;
            if(e=document.getElementById(id))document.body.removeChild(e);
        }, 
        false
    );
}

function getPosition(e) {
    e = e || window.event;
    var cursor = {x:0, y:0};
    if (e.pageX || e.pageY) {
        cursor.x = e.pageX;
        cursor.y = e.pageY;
    } 
    else {
        var de = document.documentElement;
        var b = document.body;
        cursor.x = e.clientX + 
            (de.scrollLeft || b.scrollLeft) - (de.clientLeft || 0);
        cursor.y = e.clientY + 
            (de.scrollTop || b.scrollTop) - (de.clientTop || 0);
    }
    return cursor;
}
document.addEventListener('click',gencoin,false);
var coin_selected;
chrome.extension.sendRequest({getCoin: "selected"}, function(response) {
  coin_selected=response.coin_selected;
});

var auto_add;
chrome.extension.sendRequest({autoAdd: "bool"}, function(response) {
  if(response.auto_add=="true"){
    document.addEventListener('mousemove',gencoin,false);
  }
});