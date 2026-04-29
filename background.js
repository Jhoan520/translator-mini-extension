const apiTraduction = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=es&oe=UTF-8&dt=t&dj=1&q";

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {

    if (message.status === "RUN_TRANSLATION") {
        const resp =  await getTraduction(message.textSelected);
        sendResponse(resp);
    }
});

async function getTraduction(text) {
    // const resp = await fetch(`${apiTraduction}=${text}`);
    // const data = await resp.json();
    // let traducion = data.sentences.map(sent => sent.trans).join("\n");
    return text;
    //return traducion;
};

