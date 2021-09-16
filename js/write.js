var textboxs = document.getElementsByClassName('textbox');

function fixEvents(){
    // oninput="if(this.innerHTML.trim()==='<br>')this.innerHTML=''"
    var max = -1;
    for(var i = 0; i < textboxs.length; i++) {
        if(textboxs[i].getAttribute("atdId") == null){
            console.log(i);
            textboxs[i].setAttribute("atdId", i);
            textboxs[i].addEventListener('keydown', (evt) => {
                if (evt.keyCode === 13) {
                    textboxId = textboxs.length;
                    
    
                    evt.preventDefault();
                }
            });

        }
        else{
            if(max < textboxs[i].getAttribute("atdId")){
                max = textboxs[i].getAttribute("atdId");
            }
        }
    }
    console.log(-1);
    textboxId = max;
}