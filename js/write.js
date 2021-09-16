var textboxs = document.getElementsByClassName('textbox');
var aaa;

function addEvent(x){
    x.addEventListener('keydown', (evt) => {
        if (evt.keyCode === 13) {

            evt.target.parentElement.parentElement.outerHTML = 
            evt.target.parentElement.parentElement.outerHTML + addNextElement(evt.target.tagName.toLocaleLowerCase());
            addEvent(document.getElementById(evt.target.id));
            
            fixEvents();

            document.getElementById(max).focus();
            // document.getElementById(max).innerHTML = "";
            
            evt.preventDefault();
        }
    });
}

fixEvents();
var max = -1;
function fixEvents(){
    // oninput="if(this.innerHTML.trim()==='<br>')this.innerHTML=''"
    max = -1;
    for(var i = 0; i < textboxs.length; i++) {
        if(textboxs[i].getAttribute("id") != null){
            if(max < textboxs[i].getAttribute("id")){
                max = textboxs[i].getAttribute("id");
            }
        }
    }

    for(var i = 0; i < textboxs.length; i++) {
        if(textboxs[i].getAttribute("id") == null){
            max++;
            console.table(max, textboxs[i]);

            textboxs[i].setAttribute("id", max);
            addEvent(textboxs[i]);
        }
    }
}

function addNextElement(tagName){
    switch(tagName){
        case "h1":
        case "img":
            tagName = "p";
            break;
        case "sep":
            tagName = "h1";
            break;
        case "ul":
            tagName = "li";
            break;
    }
    return addElement(tagName);
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