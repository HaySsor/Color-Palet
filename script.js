
function clickToCopy(data, i, modal) {
    navigator.clipboard.writeText(data.colors[i].hex.value);
    modal.classList.add('show-modal')
    setTimeout(() => {
        modal.classList.remove('show-modal')
    }, 800)
}
function renderPalet(data) {
    const modal = document.querySelector('.modal')
    document.querySelectorAll('.background').forEach((item, i) => {
        item.style.backgroundColor = data.colors[i].hex.value
        item.addEventListener('click', () => {
            clickToCopy(data, i, modal)
        })
    })
    document.querySelectorAll('.text').forEach((item, i) => {
        item.textContent = data.colors[i].hex.value
        item.addEventListener('click', () => {
            clickToCopy(data, i, modal)
        })
    })
}

const getNewColorSchemat = async () => {

    let inputColor = document.querySelector('.color-selector').value

    let mode = document.querySelector('#colors').value
    const LINK = "https://www.thecolorapi.com/scheme"

    let URL = `${LINK}?hex=${inputColor.slice(1)}&mode=${mode}&count=5`

    const res = await fetch(URL)
    const data = await res.json()

    return data
}


getNewColorSchemat().then(renderPalet)

document.querySelector('.form').addEventListener('submit', e => {
    e.preventDefault()
    getNewColorSchemat().then(renderPalet)
})

