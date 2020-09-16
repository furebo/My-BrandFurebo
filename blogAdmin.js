
//following codes are for testing

/*window.addEventListener('load',retreiveData);
function retreiveData(){
    firebase.database().ref('Pictures/mapetite/').on('value',function(snapshot){
        document.getElementById('mapetiteimage').src = snapshot.val().Link;
    })
} */

window.addEventListener('load',retreiveData);

function retreiveData(){

    function renderNewBlog(doc){
        //codes for prepanding the blog
var mainDiv = document.querySelector('.main');
var containerr  = document.createElement('div');
containerr.classList.add('containerr');

mainDiv.prepend(containerr);

secondDiv = document.createElement('div');
secondDiv.classList.add('secondDiv');
containerr.appendChild(secondDiv);

var heading2 = document.createElement('h2');
heading2.classList.add('titlee');
heading2.setAttribute('data-id',doc.id)
var newblogTitle = doc.data().title;
var textnode = document.createTextNode(newblogTitle);
heading2.appendChild(textnode);
secondDiv.appendChild(heading2);

var paragraph = document.createElement('p');
paragraph.classList.add('description');
paragraph.setAttribute('data-id',doc.id);
var blogdescr = doc.data().description;
var descriptionTextNode = document.createTextNode(blogdescr);
paragraph.appendChild(descriptionTextNode);

var span = document.createElement('span');
var anchor = document.createElement('A');

anchor.setAttribute('href','articles.html?'+ doc.id);
anchor.setAttribute('data-id',doc.id);
var anchorText = document.createTextNode('...Continue Reading...');
anchor.appendChild(anchorText);
span.appendChild(anchor);
paragraph.appendChild(span);

secondDiv.insertBefore(paragraph, secondDiv.childNodes[1]);

var image = document.createElement('IMG');
image.classList.add('blogNewImage');
image.setAttribute('data-id',doc.id);
var imgSource = doc.data().picture;
image.setAttribute('src',imgSource);
secondDiv.insertBefore(image,null);

}

 db.collection('Blog').get().then((snapshot)=>{
        snapshot.docs.forEach((doc)=>{
            renderNewBlog(doc);
        })
    })

//getting blog images from firebase

    /*firebase.database().ref('Pictures/myBlogImage/').on('value',function(snapshot){
        document.querySelector('.newmyImage').src = snapshot.val().Link;
     }); */
    /*
     firebase.database().ref('Pictures/rivers').on('value',function(snapshot){
     document.querySelector('.newblogImage').src = snapshot.val().Link;
     }); */  
  }       

//login to the admin page

    var mylist = document.getElementById('list');
    mylist.addEventListener('click',myfunction);
    function myfunction(){
    document.querySelector('.lists').setAttribute('href','login.html');
   
}


