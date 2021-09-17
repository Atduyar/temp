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
    x.addEventListener('paste', function (evt) {
        evt.preventDefault()
        var text = e.clipboardData.getData('text/plain')
        document.execCommand('insertText', false, text)
    })
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
        <div class="item-plus" onclick="this.parentElement.classList.toggle('open')">
            <div class="cros">
                <div>
                    <svg height="426.66667pt" viewBox="0 0 426.66667 426.66667" width="426.66667pt" xmlns="http://www.w3.org/2000/svg"><path d="m405.332031 192h-170.664062v-170.667969c0-11.773437-9.558594-21.332031-21.335938-21.332031-11.773437 0-21.332031 9.558594-21.332031 21.332031v170.667969h-170.667969c-11.773437 0-21.332031 9.558594-21.332031 21.332031 0 11.777344 9.558594 21.335938 21.332031 21.335938h170.667969v170.664062c0 11.777344 9.558594 21.335938 21.332031 21.335938 11.777344 0 21.335938-9.558594 21.335938-21.335938v-170.664062h170.664062c11.777344 0 21.335938-9.558594 21.335938-21.335938 0-11.773437-9.558594-21.332031-21.335938-21.332031zm0 0"/></svg>
            </div>
        </div>
        <div class="menu">a</div>
        <div class="fake-menu"></div>
    </div>
        <div class="item-body">
            ${htl}
        </div>
    </div>`
}