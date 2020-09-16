   
   
   window.addEventListener('load',retreiveData);
   var queryString = location.search.substring(1);
   var queryStringArr = queryString.split("|");
   var valueofId = queryStringArr[0];
   

   function retreiveData(){

      const mytime = document.querySelector('.time');
      mytime.textContent = new Date();

      const commentsList = document.querySelector('.comments-list');
   
       function renderDocuments(doc){
           let title = document.querySelector('.blogtitle');
           title.setAttribute('data-id',doc);
           title.textContent = doc.data().title;
   
           let description = document.querySelector('.blogheaderParagraph');
           description.setAttribute('data-id',doc);
           description.textContent = doc.data().description; 
           
           let bodycontent = document.querySelector('.contents');
           bodycontent.setAttribute('data-id',doc);
           bodycontent.textContent = doc.data().bcontent;

           let blogcoverImage = document.querySelector('.blogcoverimage');
           blogcoverImage.setAttribute('data-id',doc);
           blogcoverImage.src = doc.data().picture;

        
        
        
        //let usname = document.createElement('span');
        
       // li.setAttribute('data-id',doc);

        var arrOfComments = doc.data().userComments;
        var myArray = [];
        for(var i=0;i<arrOfComments.length;i++){
            myArray.push(arrOfComments[i].name + " " + "said: " + arrOfComments[i].comments);
           }

        myArray.forEach((elem)=>{
            var li = document.createElement('li');
            var uscomment =document.createElement('span');
            uscomment.textContent = elem ;
            li.appendChild(uscomment);
            commentsList.appendChild(li);
        });
    }
/*
       const commentsList = document.querySelector('.comments-list');

       function renderComments(doc2){
    
        let li = document.createElement('li');
        let usname = document.createElement('span');
        let uscomment =document.createElement('span');
        li.setAttribute('data-id',doc2.id);
        
        uscomment.textContent = doc2.data().comments;
        usname.textContent = doc2.data().name +" "+"said:"+" "+uscomment.textContent;
        

        li.appendChild(usname);
        commentsList.appendChild(li);
    }
   */
      
       db.collection('Blog').doc(valueofId).get().then((snapshot)=>{
               renderDocuments(snapshot);
           
       })
    }

   
           var clicked = document.querySelector('.submition');

           clicked.addEventListener('click',submitComments);

           function submitComments(){
            var bloguserName = document.querySelector('.username').value;
            var bloguserComments = document.querySelector('.userComments').value;
            var bloguserEmail = document.querySelector('.readerEmail').value;
            //select a document to add an array of objects

            var documentOfComments = db.collection('Blog').doc(valueofId);

            //sumbit comments to firebase
            let commentObject = {name:bloguserName,comments:bloguserComments};

            documentOfComments.update({userComments:firebase.firestore.FieldValue.arrayUnion(commentObject)});

            alert('Comments saved successfully!');

            

            var commentsList = document.querySelector('.comments-list');

            var li = document.createElement('li');
            var uscomment =document.createElement('span');
            uscomment.textContent = bloguserName + " " + "said: " + bloguserComments;
            li.appendChild(uscomment);
            commentsList.appendChild(li);
           
        }
        bloguserName = "";
        bloguserComments = "";

   

    
      

    
