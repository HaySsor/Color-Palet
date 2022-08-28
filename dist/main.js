var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function getNewColorSchemat() {
    return __awaiter(this, void 0, void 0, function* () {
        let inputColor = document.querySelector(".color-selector");
        let mode = document.querySelector("#colors");
        const LINK = `https://www.thecolorapi.com/scheme`;
        let URL = `${LINK}?hex=${inputColor.value.slice(1)}&mode=${mode.value}&count=5`;
        const response = yield fetch(URL);
        const data = yield response.json();
        console.log(data.colors);
        return data.colors;
    });
}
function renderPalet(data) {
    const modal = document.querySelector('.modal');
    document.querySelectorAll('.background').forEach((item, index) => {
        item.style.backgroundColor = data[index].hex.value;
        item.addEventListener('click', () => {
            clickToCopy(data, index, modal);
        });
    });
    document.querySelectorAll('.text').forEach((item, index) => {
        item.textContent = data[index].hex.value;
        item.addEventListener('click', () => {
            clickToCopy(data, index, modal);
        });
    });
}
function clickToCopy(data, index, modal) {
    navigator.clipboard.writeText(data[index].hex.value);
    modal.classList.add('show-modal');
    setTimeout(() => {
        modal.classList.remove('show-modal');
    }, 800);
}
getNewColorSchemat().then(renderPalet);
document.querySelector('.form').addEventListener('submit', (e) => {
    e.preventDefault();
    getNewColorSchemat().then(renderPalet);
});
