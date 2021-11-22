//Data point value elements
const spotsFoundDisplay = document.getElementById('dataPointValueSpotsFound');
const adsPerPageDisplay = document.getElementById('dataPointValueAdsPerPage');
const adRequestsPerPageDisplay = document.getElementById('dataPointValueAdRequestsPerPage');
const networkSpeedDisplay = document.getElementById('dataPointValueNetworkSpeed');
const scrollSpeedDisplay = document.getElementById('dataPointValueScrollSpeed');
const floater = document.getElementById('floater');
const runType = document.getElementById('runTypeBar');
const floaterScript = document.getElementById('floaterScript');
const fastScroller = document.getElementById('fastScroller');
const slowScroller = document.getElementById('slowScroller');
const slowInternet = document.getElementById('slowInternet');
const hidden = document.getElementById('hidden');
// floaterScript.style.display = 'none';

function changeVideoType() {
  window.scroll(0, 0);
  const typeIndex = runType.selectedIndex;
  const video = document.getElementById('vid-container0') || '';

  switch (typeIndex) {
    case 0: //Fast Scroller
      if (floater.checked) {
        floaterScript.children[0].setAttribute('id','avantisJS');
      }
      else {
        fastScroller.append(video);
      }
      setDataPointsValues(0, 'Fast', 'green');
      break;

    case 1: //Slow Scroller
      if (floater.checked) {
        floaterScript.children[0].setAttribute('id','avantisJS');
      }
      else {
        slowScroller.append(video);
      }
      setDataPointsValues(0, 'Fast', 'green');
      break;

    case 2: //Slow Internet
      if (floater.checked) {
        floaterScript.children[0].setAttribute('id','avantisJS');
      }
      else {
        slowInternet.append(video);
      }
      setDataPointsValues(0, 'Slow', 'red');
      break;

    case 3: //Non-Human
      if (floater.checked) {
        floaterScript.children[0].setAttribute('id','avantisJS');
      }
      else {
        hidden.append(video);
      }
      setDataPointsValues(0, 'Fast', 'green');
      break;

    default:
      break;
  }
}

function setDataPointsValues(spotsFound, networkSpeed, networkSpeedColor) {
  spotsFoundDisplay.textContent = spotsFound;
  networkSpeedDisplay.textContent = networkSpeed;
  networkSpeedDisplay.style.color = networkSpeedColor;
}

var checkScrollSpeed = (function (settings) {
  settings = settings || {};
  var lastPos, newPos, timer, delta,
    delay = settings.delay || 50; // in "ms" (higher means lower fidelity )
  function clear() {
    lastPos = null;
    delta = 0;
  }
  clear();
  return function () {
    newPos = window.scrollY;
    if (lastPos != null) { // && newPos < maxScroll
      delta = newPos - lastPos;
    }
    lastPos = newPos;
    clearTimeout(timer);
    timer = setTimeout(clear, delay);
    return Math.abs(delta);
  };
})();

// listen to "scroll" event
window.onscroll = function () {
  scrollSpeedDisplay.textContent = checkScrollSpeed();
  setTimeout(function () { scrollSpeedDisplay.textContent = 0; }, 800);
};

// wait for ad to appear in viewport
var observer = new IntersectionObserver(function (entries) {
  if (entries[0].isIntersecting === true) {
    if (!entries[0].target.attributes.observed && !!entries[0].target.attributes.adindex) {
      var tempEntry = entries[0].target;
      tempEntry.setAttribute('observed', '');
      adsPerPageDisplay.textContent = parseInt(adsPerPageDisplay.textContent) + 1;
      adRequestsPerPageDisplay.textContent = adsPerPageDisplay.textContent;
    }
  }
}, { threshold: [0] });
