
let aboutBtn = document.querySelector('.btnAbout');
aboutBtn.addEventListener('click',abouContent);
let aboutmeContent = document.querySelector('.about');
function abouContent(){
    db.collection('Aboutme').doc('rFK5xaqNlaVYLGY5XdKQ').update({about:aboutmeContent.value});
    aboutmeContent.value =" ";
}
