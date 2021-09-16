var textboxs = document.getElementsByClassName('textbox');
function addEvent(x){
    x.addEventListener('keydown', (evt) => {
        if (evt.keyCode === 13) {

            evt.target.parentElement.parentElement.outerHTML = 
            evt.target.parentElement.parentElement.outerHTML + addElement(evt.target.tagName.toLocaleLowerCase());
            addEvent(evt.target);
            fixEvents();
            // evt.preventDefault();
        }
    });
}

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
            console.table(max, textboxs[i]);

            textboxs[i].setAttribute("atdId", max);
            addEvent(textboxs[i]);
        }
    }
}

function addElement(tagName){
    switch(tagName){
        case "p":
            return getDefualtElement(`<p contenteditable class="textbox" placeholder="Type something..."></p>`)
            break;
        case "h1":
            return getDefualtElement(`<h1 contenteditable class="textbox title" placeholder="Type something..."></h1>`)
            break;
        case "p":
            break;
    }
}


















//////////////

function getDefualtElement(htl){
    return `
    <div class="item">
        <div class="item-plus">
            <div class="cors">+</div>
            <div class="menu">a</div>
            <div class="fake-menu"></div>
        </div>
        <div class="item-body">
            ${htl}
        </div>
    </div>`
}