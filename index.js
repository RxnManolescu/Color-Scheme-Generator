const form = document.getElementById('form')

const schemeContainer = document.querySelector('.scheme-container')


form.addEventListener('submit', function(e) {
    e.preventDefault()
    const colorValue = document.getElementById('color-picker').value
    const colorValueNoHash = colorValue.substring(1)
    const theme = document.getElementById('theme')
    const themeNameValue = theme.value


    const queryParams = {
        hex: colorValueNoHash,
        mode: themeNameValue,
        count: 5
    }

    const queryString = new URLSearchParams(queryParams).toString()

    fetch(`https://www.thecolorapi.com/scheme?${queryString}`)
        .then(res => res.json())
        .then(data => {
            const colors = data.colors.map(color => color.hex.value)

            colors.forEach(color => {
                const schemeContainerInnerHTML = `
                    <div class="scheme-container-inner">
                        <div class="scheme-container-single" style="background-color: ${color};" data-hex=${color}></div>
                        <p class="color-hex" data-hex=${color}>${color}</p>
                    </div>`
                schemeContainer.insertAdjacentHTML('beforeend', schemeContainerInnerHTML)
        })
    })
    schemeContainer.innerHTML = ''
})

schemeContainer.addEventListener('click', function(e) {
    e.preventDefault()
    const hexCode = e.target.dataset.hex
    if (hexCode) {
        navigator.clipboard.writeText(hexCode)
    }
})