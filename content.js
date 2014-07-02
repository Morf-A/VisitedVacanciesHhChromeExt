$(function() {
    chrome.runtime.sendMessage(
        {add:false},
        function(responce){
            if(responce.resp.length !== 0) {
                var storedUlrs = responce.resp;
                var links  = document.getElementsByTagName('a');
                for(var i = 0; i < links.length; i++){
                    var url = links[i].href;
                    cuttedUrl = url.substr(0, url.indexOf('?') === -1 ? url.length : url.indexOf('?'));
                    if($.inArray(cuttedUrl, storedUlrs) !== -1) {
                        links[i].style.color="black"
                    }
                }  
            }
        }
    );
});


$('a').on('click', function(event){
    var url = event.currentTarget.href;
    cuttedUrl = url.substr(0, url.indexOf('?') === -1 ? url.length : url.indexOf('?'));
    chrome.runtime.sendMessage({title:event.currentTarget.innerHTML,url:cuttedUrl,add:true});
});
