window.addEventListener('load',retreiveData);
        function retreiveData(){

            function renderAboutContent(doc){
                let aboutmecontent = document.querySelector('.abtCont');
                aboutmecontent.setAttribute('data-id',doc.id);
                aboutmecontent.textContent = doc.data().about;
            }

            
       db.collection('Aboutme').get().then((snapshot)=>{
        snapshot.docs.forEach((doc)=>{
            renderAboutContent(doc);
        })
    })
           
        }

            function myfunction(){
                document.getElementById('menu').style.display="block";
               
                document.getElementById('mybody').addEventListener('click',hideFunction);
                document.getElementById('menu').addEventListener('click',hideFunction);
            

                function hideFunction(){
                    document.getElementById('menu').style.display="none";
                    
                }

                function aboutFunction(){
                    var topLength = document.getElementById('nametop').style.height;
                    
                }
            }
/*
As a software develloper I always dream about making a big move forward throuth 
                        the opportunities around me and overcome challenges that I may face sometimes. 
                        Algthout my professianal is  taking many effort from learnng basics of programming 
                        toward my succes in the industry.<br><br>
                        
                    
                    
                        As a web developper I am interested a lot in web programming using modern programming langueges and
                         this is important thing to become more skilled in web development that is why I joined Andela the 
                         community where I fetch more knowldge and improve my programing ability more significantly with the
                          assistance of high specialist in software engeneering .<br><br>
                          
                        Being a longlife learner in web programming is helpfull for me to thrive to the mastery of my craft.
 */
        