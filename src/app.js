const { ipcRenderer } = require('electron')
const floatingContent = document.querySelector('.floating-content')

document.addEventListener('mouseenter', (event) => {
  ipcRenderer.send('enable-click-through')
  event.stopPropagation()
})

floatingContent.addEventListener('mouseenter', () => {
  ipcRenderer.send('disable-click-through')
})
