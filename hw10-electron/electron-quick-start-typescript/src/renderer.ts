// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process unless
// nodeIntegration is set to true in webPreferences.
// Use preload.js to selectively enable features
// needed in the renderer process.

import { ipcRenderer, IpcRendererEvent } from "electron";
import * as fs from "fs";

window.addEventListener("DOMContentLoaded", () => {
    const btn: HTMLElement = document.getElementById("folderchooser");

    btn.addEventListener("click", (ev: Event) => {
        ipcRenderer.send("showFolderDialog");
    });
});

document.getElementById("clearselection").addEventListener("click", () => {
    const selectionField = document.getElementById("selectedfolders") as HTMLInputElement;
    selectionField.value = "";
    document.getElementsByTagName("ul")[0].innerHTML = "";
});

ipcRenderer.on("selectedfolders", (evt: IpcRendererEvent, selectedfolders: string[]) => {
    const selectedFolderElem: HTMLInputElement = document.getElementById("selectedfolders") as HTMLInputElement;
    selectedFolderElem.value = selectedFolderElem.value !== "" ? selectedFolderElem.value + "|": selectedFolderElem.value ;
    selectedFolderElem.value += selectedfolders.join(" | ");
});

ipcRenderer.on("fileslist", (event: IpcRendererEvent, fileName: string, stats: fs.Stats) => {
    const filetemplate = document.getElementById("filerec") as HTMLTemplateElement;
    const filedisplayrec = filetemplate.content;
    const spanElements = filedisplayrec.querySelectorAll("span");
    spanElements[0].innerText = fileName;
    spanElements[1].innerText = stats.size.toString();
    spanElements[2].innerText = stats.mtime.toString();
    // spanElements[3].id = fileName + "_tags";
    // const btnElements = filedisplayrec.querySelectorAll("button");

    // btnElements[0].id = fileName;
    const nodeElement: Node = filedisplayrec.cloneNode(true);

    document.getElementById("filelist").appendChild(nodeElement);

    // for (let tagElement of document.getElementsByClassName("addtag")) {
    //     tagElement.addEventListener("click", addtaghandler);
    // }
});