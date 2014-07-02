var links  = document.getElementsByTagName('a');

//for(var i = 0; i < links.length; i++){

   // var url = links[i].href
   
$(function() {




    var url = 'http://hh.ru/vacancy/10366643';
    
    cuttedUrl = url.substr(0, url.indexOf('?') === -1 ? url.length : url.indexOf('?'));

    
    
    var resp = false;
    chrome.runtime.sendMessage(
        {title:cuttedUrl,url:cuttedUrl,add:false},
        function(responce){
            if(responce.resp !=== 'no') {
                resp = responce.resp;
            }
            
        }
    );

    
    
    if(localStorage[cuttedUrl]){
        links[i].style.color="black"
    }
});
//}

$('a').on('click', function(event){

    var url = event.currentTarget.href;
    
    cuttedUrl = url.substr(0, url.indexOf('?') === -1 ? url.length : url.indexOf('?'));
    
    chrome.runtime.sendMessage({title:event.currentTarget.innerHTML,url:cuttedUrl,add:true});
    
});
