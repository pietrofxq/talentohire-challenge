let prettifiedNumber = document.getElementById('prettified-number')
const form = document.getElementById('form')

const THOUSAND = 1000
const TEN_THOUSAND = 10000
const HUNDRED_THOUSAND = 100000
const MILLION = 1000000

function prettify () {
  const number = document.getElementById('raw-number').value.replace(/,/g, '')
  if (!number) return 'Please enter a number'
  if (isNaN(number)) return 'Number not valid!'
  if (+number < THOUSAND) return number
  if (+number < TEN_THOUSAND) {
    return `${number[0]}${number[1] > 0 ? '.' + number[1] : ''}k`
  }
  if (+number < HUNDRED_THOUSAND) {
    return `${number.substr(0, 2)}.${number.substr(2, 1)}k`
  }
  if (+number <= MILLION) {
    return (number / MILLION).toFixed(2) + 'M'
  }
  return 'Number out of scope!'
}

const animationEndEvent = (function whichAnimationEvent () {
  let t
  const el = document.createElement('fakeelement')

  const animations = {
    'animation'      : 'animationend',
    'OAnimation'     : 'oAnimationEnd',
    'MozAnimation'   : 'animationend',
    'WebkitAnimation': 'webkitAnimationEnd'
  }

  for (t in animations){
    if (el.style[t] !== undefined){
      return animations[t]
    }
  }
})()

prettifiedNumber.addEventListener(animationEndEvent, () => {
  prettifiedNumber.classList.remove('animate')
})

form.addEventListener('submit', (e) => {
  e.preventDefault()
  prettifiedNumber.classList.add('animate')
  setTimeout(() => {
    prettifiedNumber.innerHTML = prettify()
  }, 100) 
})
