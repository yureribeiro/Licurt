const form = document.querySelector('form');
const input = document.querySelector('input');
const resultsContainer = document.querySelector('.results')

const API_URL = 'https://api.shrtco.de/v2'

form.addEventListener('submit', async function (event) {
  event.preventDefault()

  const inputValue = input.value

  if (!inputValue) {
  alert('Insira um link válido')
  }

  const shorted = await getShortedLink(inputValue)
  renderResults(shorted.result)

  input.value = ''
})


async function getShortedLink(link) {
  try {
    const result = await fetch(`${API_URL}/shorten?url=${link}`)
    return result.json()
  } catch (error) {
    alert(
      `O link que você tentou encurtar\n 
      é um link não permitido pelo política do próprio domínio`
      )
      return error
  }
}

function renderResults(data) {
  resultsContainer.innerHTML =
  `
    <div class="result">
      <div class="original-link">
        <p class="label-result">Seu link original:<p>
        <p>${data.original_link}</p>
      </div> 

      <div class="shorted">
        <p class="label-result">Seu link Curto:<p>
        <p id="link">${data.short_link}</p>

        <button class="button-copy" onclick="copyToClipboard()">Copiar</button>
      </div>
    </div>
  `
}


function copyToClipboard() {
  const copyTextElement = document.querySelector('.shorted #link')
  navigator.clipboard.writeText(copyTextElement.textContent)
}