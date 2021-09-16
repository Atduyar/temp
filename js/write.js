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
            max++;
            console.log(max);
            textboxs[i].setAttribute("atdId", max);
            textboxs[i].addEventListener('keydown', (evt,t) => {
                if (evt.keyCode === 13) {

                    console.log(t);
                    fixEvents();
                    evt.preventDefault();
                }
            });
        }
    }
    textboxId = max;
}