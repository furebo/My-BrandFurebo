   
   
   window.addEventListener('load',retreiveData);
   var queryString = location.search.substring(1);
   var queryStringArr = queryString.split("|");
   var valueofId = queryStringArr[0];
   

   function retreiveData(){

      const mytime = document.querySelector('.time');
      mytime.textContent = new Date();
   
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

           var clicked = document.querySelector('.submition');

           if(clicked.onclick==true){

               clicked.setAttribute('data-id',doc);
               var bloguserName = document.querySelector('.username').value;
               var bloguserComments = document.querySelector('.userComments').value;
       
           //sumbit comments to firebase
               db.collection('Blog').doc(doc).add({name:bloguserName,
               comments:bloguserComments
              });
               bloguserName="";
               bloguserComments="";
           }

        const commentsList = document.querySelector('.comments-list');
        let li = document.createElement('li');
        let usname = document.createElement('span');
        let uscomment =document.createElement('span');
        li.setAttribute('data-id',doc);
        
        uscomment.textContent = doc.data().comments;
        usname.textContent = doc.data().name +" "+"said:"+" "+uscomment.textContent;
        

        li.appendChild(usname);
        commentsList.appendChild(li);

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
/*
       db.collection('Blog').get().then((snapshotd)=>{
        snapshotd.docs.forEach((doc2)=>{
            renderComments(doc2);
        })
    }) */



    /*
       firebase.database().ref('Pictures/rivers').on('value',function(snapshot){
        document.querySelector('.blogcoverimage').src = snapshot.val().Link;
        });  */
    }

    //document.querySelector('.submition').addEventListener('click',commentSubmission);

   

    
      

    
