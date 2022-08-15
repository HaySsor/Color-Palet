
function ClickToCopy(data, i, modal) {
    navigator.clipboard.writeText(data.colors[i].hex.value);
    modal.classList.add('show-modal')
    setTimeout(() => {
        modal.classList.remove('show-modal')
    }, 800)
}

const getNewColorSchemat = () => {

    let inputColor = document.querySelector('.color-selector').value
    const modal = document.querySelector('.modal')
    let mode = document.querySelector('#colors').value
    const LINK = "https://www.thecolorapi.com/scheme"

    let URL = `${LINK}?hex=${inputColor.slice(1)}&mode=${mode}&count=5`

    fetch(URL).then(res => res.json())
        .then(data => {
            document.querySelectorAll('.background').forEach((item, i) => {
                item.style.backgroundColor = data.colors[i].hex.value
                item.addEventListener('click', () => {
                    ClickToCopy(data, i, modal)
                })
            })
            document.querySelectorAll('.text').forEach((item, i) => {
                item.textContent = data.colors[i].hex.value
                item.addEventListener('click', () => {
                    ClickToCopy(data, i, modal)
                })
            })
        })
}

getNewColorSchemat()

document.querySelector('.form').addEventListener('submit', e => {
    e.preventDefault()
    getNewColorSchemat()
})

