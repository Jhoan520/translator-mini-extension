const style_ext = document.createElement("style");
const div_extension = document.createElement("div");
const div_original = document.createElement("div");
const div_traduction = document.createElement("div");
const div_options = document.createElement("div");
const p_text_original = document.createElement("p");
const p_text_traduction = document.createElement("p");
const btn_copy = document.createElement("button");
const img_copy = document.createElement("img");

initApp();
async function initApp() {
    await loadDOMElements();
    window.addEventListener("mouseup", (event) => runTranslation(event));
    btn_copy.addEventListener("click", (event) => copyToClipboard(event));
}

async function copyToClipboard(event) {
    const textCopy = p_text_traduction.textContent;
    if(textCopy.length === 0) return;    
    const clipboardItemData = {"text/plain": textCopy};
    const clipboardItem = new ClipboardItem(clipboardItemData);
    await navigator.clipboard.write([clipboardItem]);
}    

function runTranslation(event) {
    const textSelected = document.getSelection().toString().trim();

    if (textSelected.length > 0){
        const traductionObject = {textSelected: textSelected, status: "RUN_TRANSLATION"};
        
        chrome.runtime.sendMessage(traductionObject, (response) => {
            showTraduction(textSelected, response);
        });

    } else if (!event.target.closest(".text, .text-original, .text-traduction, .contenedor-traductor")) {
        div_extension.style.display = "none";
    }
};

async function loadDOMElements(){
    const copyIconURL = chrome.runtime.getURL("images/copy-icon.svg");
    const urlCSS = chrome.runtime.getURL("css/translator-ext.css");
    const resp = await fetch(urlCSS);
    const css = await resp.text();


    style_ext.innerText = css;
    document.head.appendChild(style_ext);
    div_extension.classList.add("contenedor-traductor");
    div_original.classList.add("div-original");
    p_text_original.classList.add("text");
    p_text_traduction.classList.add("text-traduction");
    div_options.classList.add("div-options");
    div_traduction.classList.add("div-traduccion");
    img_copy.src = copyIconURL;
    img_copy.alt = "Copy icon";
    btn_copy.classList.add("btn-copy");
    btn_copy.append(img_copy)
    div_options.append(btn_copy);
    div_original.appendChild(p_text_original);
    div_traduction.appendChild(p_text_traduction);
    div_extension.append(div_original,div_options, div_traduction);
    div_extension.style.display = "none";
    document.body.appendChild(div_extension);
};

function showTraduction(textOriginal, textTraduction) {
    p_text_original.innerText = textOriginal;
    p_text_traduction.innerText = textTraduction;
    div_extension.style.display = "block";
};
