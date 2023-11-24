import { Contents } from './parts/contents'
import './style.css'

const num = 1
for(let i = 0; i < num; i++) {
  const div = document.createElement('div')
  div.classList.add('js-main')
  document.body.appendChild(div)
}

document.querySelectorAll('.js-main').forEach((el:any) => {
  new Contents({
    el: el,
  })
})
