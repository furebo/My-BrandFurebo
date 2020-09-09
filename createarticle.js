

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

    var input = document.querySelector('.image')
    var file = input.files[0];  
    var blogFileImageName = file.name;
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
    var articleTitle = document.createTextNode(newArticleTitle);
    li.appendChild(articleTitle);
    //var spanText = document.createTextNode('X');
    //spanText.setAttribute('doc-id',doc.id);
    viewBtn.addEventListener('click',viewArticle);
    btn.addEventListener('click',deleteArticle);
    span.appendChild(btn);
    li.appendChild(viewBtn);
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

}

db.collection('Blog').get().then((snapshot)=>{
    snapshot.docs.forEach((doc)=>{
        displayArticles(doc);
    })
})

