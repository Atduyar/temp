var textboxs = document.getElementsByClassName('textbox');
var icerikDiv = document.getElementById("div-icerik");
var aaa;

function addEvent(x){
    x.addEventListener('keydown', (evt) => {
        if (evt.keyCode === 13) {

            addElementToNext(evt.target.parentElement.parentElement, findNextElement(evt.target.tagName))
            // evt.target.parentElement.parentElement.outerHTML += addNextElement(evt.target.tagName.toLocaleLowerCase());
            // addEvent(document.getElementById(evt.target.id));
            
            // fixEvents();

            // document.getElementById(max).focus();
            // document.getElementById(max).innerHTML = "";
            
            evt.preventDefault();
        }
        else if (key === "Backspace" || key === "Delete") {
            if(evt.target.textContent = ""){
                deleteElement(evt.target.parentElement.parentElement);
            }
        }
    });
    x.addEventListener('paste', function (evt) {
        evt.preventDefault();
        var text = evt.clipboardData.getData('text/plain').replace(/\n/g,"");
        console.log(text);
        document.execCommand('insertText', false, text);
    })
}

addElementToEnd("h1");
addElementToEnd("p");
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

function findNextElement(tagName){
    switch(tagName.toLocaleLowerCase()){
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
    return tagName;
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

function addElementToEnd(tagName){
    icerikDiv.innerHTML += addElement(tagName);
}
function addElementToNext(thisItem, tagName){
    aaa = thisItem;
    thisItem.outerHTML += addElement(tagName.toLocaleLowerCase());//outerHTML brok this element event
    addEvent(document.getElementById(thisItem.getElementsByClassName("item-body")[0].children[0].id));//fix event
    
    fixEvents();

    document.getElementById(max).focus();
}
function deleteElement(item){
    item.outerHTML = "";
}














function openItemMenu(t){
    if(t.classList.contains("open")){
        t.classList.remove("open");
        console.log("0");
    }
    else{
        t.classList.add("open");
        console.log("1");
    }

    // t.style = "--thisItemHeight: "+ t.offsetHeight +"px;"
    // t.parentElement.classList.toggle('open')
}


//////////////

function getDefualtElement(htl){
    return `
    <div class="item">
        <div class="item-plus" onclick="openItemMenu(this)">
            <div class="fake-top"></div>
            <div class="cros">
                <div>
                    <svg height="426.66667pt" viewBox="0 0 426.66667 426.66667" width="426.66667pt" xmlns="http://www.w3.org/2000/svg"><path d="m405.332031 192h-170.664062v-170.667969c0-11.773437-9.558594-21.332031-21.335938-21.332031-11.773437 0-21.332031 9.558594-21.332031 21.332031v170.667969h-170.667969c-11.773437 0-21.332031 9.558594-21.332031 21.332031 0 11.777344 9.558594 21.335938 21.332031 21.335938h170.667969v170.664062c0 11.777344 9.558594 21.335938 21.332031 21.335938 11.777344 0 21.335938-9.558594 21.335938-21.335938v-170.664062h170.664062c11.777344 0 21.335938-9.558594 21.335938-21.335938 0-11.773437-9.558594-21.332031-21.335938-21.332031zm0 0"/></svg>
                </div>
            </div>
            <div class="menu">
                <ul>
                    <li onclick="addElementToNext(this.parentElement.parentElement.parentElement.parentElement, 'h1')">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 190 190" style="enable-background:new 0 0 190 190;" xml:space="preserve"><path id="XMLID_27_" d="M175,0H15C6.716,0,0,6.716,0,15v38.99c0,8.284,6.716,15,15,15c8.284,0,15-6.716,15-15V30h50v130H56.836  c-8.284,0-15,6.716-15,15s6.716,15,15,15h76.328c8.284,0,15-6.716,15-15s-6.716-15-15-15H110V30h50v23.99c0,8.284,6.716,15,15,15  c8.284,0,15-6.716,15-15V15C190,6.716,183.284,0,175,0z"/>
                        </svg>
                    </li>
                    <li onclick="addElementToNext(this.parentElement.parentElement.parentElement.parentElement, 'p')">
                        <svg xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px" viewBox="0 0 190 190" xml:space="preserve" version="1.1"><path stroke="null" d="m151,57l-112,0c-5.7988,0 -10.5,4.7012 -10.5,10.5l0,27.293c0,5.7988 4.7012,10.5 10.5,10.5c5.7988,0 10.5,-4.7012 10.5,-10.5l0,-16.793l35,0l0,91l-16.2148,0c-5.7988,0 -10.5,4.7012 -10.5,10.5s4.7012,10.5 10.5,10.5l53.4296,0c5.7988,0 10.5,-4.7012 10.5,-10.5s-4.7012,-10.5 -10.5,-10.5l-16.2148,0l0,-91l35,0l0,16.793c0,5.7988 4.7012,10.5 10.5,10.5c5.7988,0 10.5,-4.7012 10.5,-10.5l0,-27.293c0,-5.7988 -4.7012,-10.5 -10.5,-10.5z" id="XMLID_27_"/></svg>
                    </li>
                </ul>
            </div>
            <div class="fake-menu"></div>
        </div>
        <div class="item-body">
            ${htl}
        </div>
    </div>`
}