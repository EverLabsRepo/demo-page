//Data point value elements
const spotsFoundDisplay = document.getElementById('dataPointValueSpotsFound');
const networkSpeedDisplay = document.getElementById('dataPointValueNetworkSpeed');
const scrollSpeedDisplay = document.getElementById('dataPointValueScrollSpeed');
const floater = document.getElementById('floater');
const runType = document.getElementById('runTypeBar');
const NO_FLOATER = 'https://cdn.avantisvideo.com/avm/js/video-loader.js?id=4102c20e-d414-456e-897a-9a26f6d87257&tagId=98';
const FLOATER = 'https://cdn.avantisvideo.com/avm/js/video-loader.js?id=4102c20e-d414-456e-897a-9a26f6d87257&tagId=99';

const types = {
  0: document.getElementById('fastScroller'),
  1: document.getElementById('slowScroller'),
  2: document.getElementById('slowInternet'),
  3: document.getElementById('hidden')
}
const pointsValues = {
  0: {spotsFound: 0, networkSpeed: 'Fast', networkSpeedColor: 'green'},
  1: {spotsFound: 0, networkSpeed: 'Fast', networkSpeedColor: 'green'},
  2: {spotsFound: 0, networkSpeed: 'Slow', networkSpeedColor: 'red'},
  3: {spotsFound: 0, networkSpeed: 'Fast', networkSpeedColor: 'green'},
}


function changeVideoType() {
  window.scroll(0, 0);
  const typeIndex = runType.selectedIndex;
  localStorage.setItem('typeIndex', typeIndex);
  const video = document.getElementById('vid-container0') || '';
  types[typeIndex].append(video);
  setDataPointsValues(pointsValues[typeIndex].spotsFound, pointsValues[typeIndex].networkSpeed, pointsValues[typeIndex].networkSpeedColor);
}

const onLoadPage = () => {
  let type = +localStorage.getItem('typeIndex');
  if (!JSON.parse(localStorage.getItem('floater'))) {
    createScript(types[type], FLOATER);
  } else {
    createScript(types[type], NO_FLOATER);
  }
  floater.checked = JSON.parse(localStorage.getItem('floater'));
  runType.selectedIndex = type;
  setDataPointsValues(pointsValues[type].spotsFound, pointsValues[type].networkSpeed, pointsValues[type].networkSpeedColor);
}

const onClickFloater = () => {
  localStorage.setItem('floater', !JSON.parse(localStorage.getItem('floater')));
  window.location.reload(true);
}

const createScript = (parent, url) => {
  const jQueryScript = document.createElement('script');
  jQueryScript.setAttribute('src', url);
  jQueryScript.setAttribute('id', 'avantisJS');
  parent.appendChild(jQueryScript);
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
