var textboxs = document.getElementsByClassName('textbox');
var textboxId = 0;

function fixEvents(){
    // oninput="if(this.innerHTML.trim()==='<br>')this.innerHTML=''"
    for(var i = textboxId; i < textboxs.length; i++) {
        console.log(i);
        textboxs[i].addEventListener('keydown', (evt) => {
            if (evt.keyCode === 13) {
                textboxId = textboxs.length;
                

                evt.preventDefault();
            }
        });
    }
    textboxId = textboxs.length;
}