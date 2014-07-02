chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        var title = request.title; 
        var url = request.url;
        var addFlag = request.add;
        if(addFlag) {
            chrome.bookmarks.search(
                url,
                function(node){    
                    if(0 === node.length){
                        addUrl(title, url);          
                    }
                }
            ); 
        } else {
            // Получим массив ссылок
            var childrenNodes = [];
            chrome.bookmarks.search(
                'VisitedVacancies',
                function(node){  
                    if(0 !== node.length){
                        chrome.bookmarks.getSubTree(
                            node[0].id, 
                            function(nodes){
                                childrenNodes = nodes; 
                            }
                        );
                    }
                   
                }  
            );
            // Зачем-то нужна задержка времени
            var intervalID = setInterval(function(){
                if(childrenNodes[0] !== undefined) {
                    var urlArr = childrenNodes[0].children;
                    var result = [];
                    for(var i = 0; i < urlArr.length; i++) {
                        result[i] = urlArr[i].url;
                    }
                    sendResponse({resp:result});
                    clearInterval(intervalID);
                }
            }, 100); 
        }
        return true;
    }
);

function addUrl(title, value){
    chrome.bookmarks.search(
        'VisitedVacancies',
        function(node){    
            var parentId = false;
            if(0 === node.length){
                chrome.bookmarks.create(
                    {
                        'parentId': '2',
                        'title': 'VisitedVacancies',
                    },
                    function(newFolder) {
                        parentId = newFolder.id;
                        console.log("added folder VisitedVacancies");
                    }
                );
            } else {
                parentId = node[0].id;
            }
            
            var intervalID = setInterval(function(){
                if(parentId !== false) {
                    chrome.bookmarks.create({
                            'parentId': parentId,
                            'title': title,
                            'url': value
                        },
                        function(newBookmark) {
                            console.log("added bookmark: " + newBookmark.title);
                        }
                    );
                    clearInterval(intervalID);
                }
            }, 100);
        }
    );
}