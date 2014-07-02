chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        var title = request.title; 
        var url = request.url;
        var addFlag = request.add;
        chrome.bookmarks.search(
            url,
            function(node){    
                if(0 === node.length){
                    addUrl(title, url);          
                }
            }
        ); 
        
        
        
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
        sendResponse({resp:'ok'});
        
        
        return true;
    } 
);

function addUrl(title, value){
    chrome.bookmarks.search(
        'VisitedVacancies',
        function(node){    
            var parentId;
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
            
            
            chrome.bookmarks.create({
                    'parentId': parentId,
                    'title': title,
                    'url': value
                },
                function(newBookmark) {
                    console.log("added bookmark: " + newBookmark.title);
                }
            );
        }
    );
}