const EXTENSION_STATUS = "extension_is_enable";
const btn_disable_ext = document.getElementById("disable-extension");
btn_disable_ext.classList.add("btn-disable-ext");

document.addEventListener("DOMContentLoaded", event => handleExtensionStatus());
btn_disable_ext.addEventListener("click", (event) => disableExtension(event))

async function disableExtension(event) {    
    const extensionStatus = await chrome.storage.session.get([EXTENSION_STATUS]);
    const extensionIsEnable = extensionStatus[EXTENSION_STATUS] || false;
    
    if (extensionIsEnable) {
        await chrome.storage.session.set({[EXTENSION_STATUS]: false});
        await changeIcon(false);
        await closeExtension();
        window.close();
    }
}

async function closeExtension() {
    const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    chrome.tabs.sendMessage(tab.id, {message: "CLOSE_EXTENSION"});
}

async function handleExtensionStatus(event) {

    const extension = await chrome.storage.session.get([EXTENSION_STATUS]);
    const extensionStatus = extension[EXTENSION_STATUS] || null;

    if (extensionStatus === null) {
        await chrome.storage.session.set({[EXTENSION_STATUS]: true});
        await changeIcon(true);

    } else if (extensionStatus === false) {
        await chrome.storage.session.set({[EXTENSION_STATUS]: true});
    }
}

async function changeIcon(iconIsEnable) {
    const data = await chrome.storage.session.get([EXTENSION_STATUS]);

    if (iconIsEnable) {
        await chrome.action.setIcon({
            path: "images/icon-green-32.png",
            tabId: data.id
        });

    } else {
        await chrome.action.setIcon({
            path: "images/icon-dark-24.png",
            tabId: data.id
        });
    }
}