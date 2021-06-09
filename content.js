const botao = document.querySelector('button');
chrome.storage.sync.get('isChecked', ({ isChecked }) => {
  if (isChecked) {
    botao.innerText = 'Desabilitar Edição';
    botao.style.background = '#F01414';
    botao.style.color = '#040303';
  } else {
    botao.innerText = 'Habilitar Edição';
    botao.style.background = '#27F014';
    botao.style.color = '#232020';
  }
});
botao.addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: ativarDesign,
  });
});
function ativarDesign() {
  chrome.storage.sync.get('isChecked', ({ isChecked }) => {
    let checado = isChecked;
    if (checado) {
      switch (checado) {
        case true: {
          checado = true;
          break;
        }
        case false: {
          checado = false;
          break;
        }
        default: {
          return null;
        }
      }
      checado = !checado;
      chrome.storage.sync.set({ isChecked: checado });
      setarDesign(checado);
    } else {
      checado = false;
      switch (checado) {
        case true: {
          checado = true;
          break;
        }
        case false: {
          checado = false;
          break;
        }
        default: {
          return null;
        }
      }
      checado = !checado;
      chrome.storage.sync.set({ isChecked: checado });
      setarDesign(checado);
    }
  });

  function setarDesign(checado) {
    console.log(checado);
    if (checado) {
      alert('Agora você pode editar diretamente os textos');
      window.document.designMode = 'on';
    } else {
      alert('Editor desligado');
      window.document.designMode = 'off';
    }
  }
}
