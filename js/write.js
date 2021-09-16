var textboxs = document.getElementsByClassName('textbox');

function fixEvents(){
    // oninput="if(this.innerHTML.trim()==='<br>')this.innerHTML=''"
    var max = -1;
    for(var i = 0; i < textboxs.length; i++) {
        if(textboxs[i].getAttribute("atdId") != null){
            if(max < textboxs[i].getAttribute("atdId")){
                max = textboxs[i].getAttribute("atdId");
            }
        }
    }

    for(var i = 0; i < textboxs.length; i++) {
        if(textboxs[i].getAttribute("atdId") == null){
            console.log(max);
            max++;
            textboxs[i].setAttribute("atdId", max);
            textboxs[i].addEventListener('keydown', (evt) => {
                if (evt.keyCode === 13) {
                    textboxId = max;


                    evt.preventDefault();
                }
            });
        }
    }
    console.log(-1);
    textboxId = max;
}