let prettifiedNumber = document.getElementById('prettified-number')
const form = document.getElementById('form')

const THOUSAND = 1e3
const TEN_THOUSAND = 1e4
const HUNDRED_THOUSAND = 1e5
const MILLION = 1e6
const TEN_MILLION = 1e7
const HUNDRED_MILLION = 1e8
const BILLION = 1e9

function getDivision(number, divisor, prefix) {
  return `${(+number / divisor).toFixed(2)}${prefix}`
}

function getPrettified(number, prefix) {
  let decimal = +number < TEN_THOUSAND || +number > MILLION && +number < TEN_MILLION ? 1 : 2
  return `${number.substr(0, decimal)}${number.substr(decimal, 1) == 0 ? '' : '.' + number.substr(2, 1) }${prefix}`
} 

function prettify () {
  const number = document.getElementById('raw-number').value.replace(/,/g, '')
  console.log("number:", number)
  if (!number) return 'Please enter a number'
  if (isNaN(number)) return 'Number not valid!'
  if (+number < THOUSAND) return number
  if (+number < HUNDRED_THOUSAND) {
    return getPrettified(number, 'k')
  }
  if (+number <= MILLION) {
    return getDivision(number, MILLION, 'M')
  }
  if (+number < HUNDRED_MILLION) {
    return getPrettified(number, 'M')
  }
  if (+number <= BILLION) {
    return getDivision(number, BILLION, 'b')
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
