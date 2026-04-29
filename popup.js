
const p_extStatus = document.getElementById("ext-status");
const btn_disable_ext = document.getElementById("disable-extension");
btn_disable_ext.classList.add("btn-disable-ext");
document.addEventListener("DOMContentLoaded", event => handleExtensionStatus());
document.addEventListener("click", (event) => disableExtension(event))
const extStatus = "extension_enable";

async function disableExtension(event) {
    
    const extension = await chrome.storage.session.get([extStatus]);
    const extensionStatus = extension[extStatus] || false;
    
    if (extensionStatus === true) {
        await chrome.storage.session.set({[extStatus]: false});
        await changeIcon(false);
        const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
        const data = await chrome.storage.session.get([extStatus]);
        p_extStatus.textContent = "Estado de la extension " + data[extStatus] + " ID " + tab.id;
    }
}

async function handleExtensionStatus(event) {

    const extension = await chrome.storage.session.get([extStatus]);
    const extensionStatus = extension[extStatus] || null;

    if (extensionStatus === null) {
        await chrome.storage.session.set({[extStatus]: true});
        await changeIcon(true);

    } else if (extensionStatus === false) {
        await chrome.storage.session.set({[extStatus]: true});
    }

    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    const data = await chrome.storage.session.get([extStatus]);
    p_extStatus.textContent = "Estado de la extension " + data[extStatus] + " ID " + tab.id;
}


async function changeIcon(iconIsEnable) {
    const data = await chrome.storage.session.get([extStatus]);

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