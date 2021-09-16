var textboxs = document.getElementsByClassName('textbox');
var textboxId = 0;

function fixEvents(){
    // oninput="if(this.innerHTML.trim()==='<br>')this.innerHTML=''"
    for(var i = 0; i < textboxs.length; i++) {
        if(textboxs[i].getAttribute("id") > textboxId){
            console.log(i);
            textboxs[i].setAttribute("id", i);
            textboxs[i].addEventListener('keydown', (evt) => {
                if (evt.keyCode === 13) {
                    textboxId = textboxs.length;
                    
    
                    evt.preventDefault();
                }
            });

        }
    }
    console.log(-1);
    textboxId = textboxs.length;
}