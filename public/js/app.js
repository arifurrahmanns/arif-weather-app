const dataDiv = document.querySelector('.weatherInfo')
const searchbtn = document.querySelector('form')
const inputValue = document.querySelector('#search')


searchbtn.addEventListener('submit', (e) => {
    e.preventDefault()
    const inputValueo = inputValue.value
    dataDiv.innerHTML = '<div class = "searchResult"> <h3> Loading...</h3></div>'



    fetch('http://localhost:3000/weather?address=' + inputValueo).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                return dataDiv.innerHTML = '<div class = "searchResult"><h2>' + data.error + '</h2></div>'

            }

            dataDiv.innerHTML = '<div class = "searchResult"><h3>Search result of <span>' + data.address + '.</span></h3><div class="dataInner"><h1>' + data.location + '.</h1><h2>' + data.forecast + '</h2></div></div>'



        })
    })
})