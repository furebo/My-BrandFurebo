
document.querySelector('#myform').addEventListener('submit',myfunction);
function myfunction(e){
    e.preventDefault();
    function renderCredentials(doc){
        let username = document.querySelector('.username');
        username.setAttribute('data-id',doc.id);
         
    
        let userpassword = document.querySelector('.password');
        userpassword.setAttribute('data-id',doc.id);
     
    
        if(username.value == doc.data().username && userpassword.value == doc.data().userpassword){
            //alert('okey!')
          window.location.href='adminportal.html';
        }else{
            alert('Password or Username is incorrect!');
        }
    
    
    }
    
    db.collection('userAuthentication').get().then((snapshot)=>{
        snapshot.docs.forEach((doc)=>{
            renderCredentials(doc);
        })
    })
}
