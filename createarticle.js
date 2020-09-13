//uploading blog title , description ,image and content to the cloudstore collection
var form = document.getElementById('blogForm');
var creation = document.querySelector('.create');
var ImgUrl,uploadTask;

creation.addEventListener('click',(e)=>{
    e.preventDefault();

    
 
   /* db.collection('Blog').doc('K4kLGhH5QbBWZjpGebBw').update({title:form.title.value,
                               description:form.description.value,
                               bcontent:form.content.value
                              });
    form.title.value="";
    form.description.value="";
    form.content.value="";
    */
    var files;
    var reader;
    var input = document.querySelector('.image')
     input.addEventListener('click',showImage);
     function showImage(){
        input.onchange = e =>{
            files=e.target.files
            reader = new FileReader();
            reader.onload=function(){
            var seeImage = document.querySelector('.imgToUpdate')
            seeImage.src=reader.result;
            seeImage.style.display = "block"
            }
            reader.readAsDataURL(files[0])
            
            
         }
     }
       
    var file = input.files[0];
    var blogFileImageName = file.name;
    alert(blogFileImageName);
    uploadTask = firebase.storage().ref('images/'+blogFileImageName).put(file);

    uploadTask.snapshot.ref.getDownloadURL().then(function(url){
         ImgUrl = url;

         db.collection('Blog').add({title:form.title.value,
            description:form.description.value,
            bcontent:form.content.value,
            picture:ImgUrl
           });
       form.title.value="";
       form.description.value="";
       form.content.value="";
          });
    alert('Article Created successfully.');
    
})

var cancelling = document.querySelector('.dismiss');
cancelling.addEventListener('click',cancelCreation);
function cancelCreation(){
    window.location.href = "adminportal.html";
}

window.addEventListener('load',displayArticles);
function displayArticles(doc){
    var myArticles = [];
  
    var articlesContents = document.querySelector('.dropdown-content');
    var ul = document.createElement('ul');
    var li =document.createElement('li');
    var span = document.createElement('span');
    var btn = document.createElement('button');
    var btnUpdate = document.createElement('button');
    btnUpdate.classList.add('btnupdateButton');
    var btnUpdateTex = document.createTextNode('Update');
    btnUpdate.appendChild(btnUpdateTex);

    var viewBtn = document.createElement('button');
    viewBtn.classList.add('viewArticle');
    //viewBtn.setAttribute('doc-id'.doc.id);
    var viewText = document.createTextNode('View');
    viewBtn.appendChild(viewText);
    


    btn.classList.add('btnOfDelete');
    btn.setAttribute('doc-id',doc.id);
    var btntext = document.createTextNode('Delete');
    btn.appendChild(btntext);
    span.classList.add('spanDelete');
    li.classList.add('artLink');
    li.setAttribute('doc-id',doc.id);
    var newArticleTitle = doc.data().title;
    var newArticleDescription = doc.data().description;
    var newArticleContent = doc.data().bcontent;
    var imgSource = doc.data().picture;
    var articleTitle = document.createTextNode(newArticleTitle);
    li.appendChild(articleTitle);
    //var spanText = document.createTextNode('X');
    //spanText.setAttribute('doc-id',doc.id);
    viewBtn.addEventListener('click',viewArticle);
    btnUpdate.addEventListener('click',updateArticle);
    btn.addEventListener('click',deleteArticle);
    span.appendChild(btn);
    li.appendChild(viewBtn);
    li.appendChild(btnUpdate);
    li.appendChild(span);
    ul.appendChild(li);
    articlesContents.appendChild(ul); 

    function deleteArticle(){ 

        if(confirm("Are you shure you want to delete this article?")){
            db.collection('Blog').doc(doc.id).delete().then(function(){
                alert('Your article is deleted!')
                
            })
      }else{
            alert('You steel have your article!');
        }
      
    }

    function viewArticle(){
        window.location.href = "blogAdmin.html";
    }

    function updateArticle(){
    
            var artTitle = document.querySelector('.title');
            var artDescription = document.querySelector('.description');
            var artContent = document.querySelector('.content');
            var imageTobeUpdated = document.querySelector('.imgToUpdate');
            var updatingBtn = document.querySelector('.updateArticle');
            updatingBtn.addEventListener('click',updateThisArticle);
        
            artTitle.value = newArticleTitle;
            artDescription.value = newArticleDescription;
            artContent.value = newArticleContent;
            imageTobeUpdated.setAttribute('src',imgSource);
            imageTobeUpdated.style.display = "block";

            function updateThisArticle(e){
                e.preventDefault();
                db.collection('Blog').doc(doc.id).set({title:form.title.value,
                    description:form.description.value,
                    bcontent:form.content.value})
        
                    alert(doc.id);
            }

           
       
    }

   

   

}

db.collection('Blog').get().then((snapshot)=>{
    snapshot.docs.forEach((doc)=>{
        displayArticles(doc);
    })
})