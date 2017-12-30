const prettifiedNumber = document.getElementById('prettified-number')
const form = document.getElementById('form')

const THOUSAND = 1e3
const TEN_THOUSAND = 1e4
const HUNDRED_THOUSAND = 1e5
const MILLION = 1e6
const TEN_MILLION = 1e7
const HUNDRED_MILLION = 1e8
const BILLION = 1e9

const ANIMATION_TIMEOUT = 100

function getRawNumber () {
  return document.getElementById('raw-number').value.replace(/,|\./g, '') // accept numbers with comma or dot too
}

function getDivision (number, divisor, prefix) {
  return `${(+number / divisor).toFixed(2)}${prefix}`
}

// Return 1 if number has 1 digit before comma or 2 if 2
function getDecimalSizeFromNumber (number) {
  return (+number < TEN_THOUSAND) || (+number > MILLION && +number < TEN_MILLION) ? 1 : 2
}

function getPrettified (number, prefix) {
  const decimal = getDecimalSizeFromNumber(number)
  return `${number.substr(0, decimal)}${number.substr(decimal, 1) === '0' ? '' : '.' + number.substr(2, 1)}${prefix}`
}

function isNumberInAllowedRange (number) {
  return +number < BILLION
}

function validateNumber (number) {
  let message = ''
  if (!number) message = 'Please enter a number'
  else if (isNaN(number)) message = 'Number not valid!'
  else if (!isNumberInAllowedRange(number)) message = 'Number out of scope!'

  return {
    valid: number && !isNaN(number) && isNumberInAllowedRange(number),
    invalidMessage: message
  }
}

function prettify () {
  const number = getRawNumber()
  let numberValidation = validateNumber(number)
  if (!numberValidation.valid) return numberValidation.invalidMessage

  if (+number < THOUSAND)         return number
  if (+number < HUNDRED_THOUSAND) return getPrettified(number, 'k')
  if (+number <= MILLION)         return getDivision(number, MILLION, 'M')
  if (+number < HUNDRED_MILLION)  return getPrettified(number, 'M')
  if (+number <= BILLION)         return getDivision(number, BILLION, 'b')
}

const animationEndEvent = (function whichAnimationEvent () {
  const el = document.createElement('fakeelement')

  const animations = {
    'animation': 'animationend',
    'OAnimation': 'oAnimationEnd',
    'MozAnimation': 'animationend',
    'WebkitAnimation': 'webkitAnimationEnd'
  }

  for (let t in animations) {
    if (el.style[t] !== undefined) {
      return animations[t]
    }
  }
})()

prettifiedNumber.addEventListener(animationEndEvent, function () {
  prettifiedNumber.classList.remove('animate')
})

form.addEventListener('submit', function (e) {
  e.preventDefault()
  prettifiedNumber.classList.add('animate')
  setTimeout(function () {
    prettifiedNumber.innerHTML = prettify()
  }, ANIMATION_TIMEOUT)
})
