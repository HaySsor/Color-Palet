async function getNewColorSchemat():Promise<{}[]> {
	let inputColor: HTMLInputElement = document.querySelector(".color-selector");

	let mode: HTMLSelectElement = document.querySelector("#colors");
	const LINK: string = `https://www.thecolorapi.com/scheme`;

	let URL: string = `${LINK}?hex=${inputColor.value.slice(1)}&mode=${
		mode.value
	}&count=5`;

	const response = await fetch(URL);
	const data = await response.json();
    console.log(data.colors)
	return data.colors;
}

function renderPalet(data:{}){
    const modal:HTMLElement = document.querySelector('.modal')
    document.querySelectorAll('.background').forEach((item:HTMLElement ,index:number)=>{
        item.style.backgroundColor = data[index].hex.value
        item.addEventListener('click', () => {
            clickToCopy(data, index, modal)
        })
    })
    document.querySelectorAll('.text').forEach((item:HTMLElement, index:number) => {
        item.textContent = data[index].hex.value
        item.addEventListener('click', () => {
            clickToCopy(data, index, modal)
        })
    })
}
function clickToCopy(data:{}, index:number, modal:HTMLElement) {
    navigator.clipboard.writeText(data[index].hex.value);
    modal.classList.add('show-modal')
    setTimeout(() => {
        modal.classList.remove('show-modal')
    }, 800)
}

getNewColorSchemat().then(renderPalet)

document.querySelector('.form').addEventListener('submit', (e:Event) => {
    e.preventDefault()
    getNewColorSchemat().then(renderPalet)
})