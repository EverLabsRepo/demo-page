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
  0: {spotsFound: 0, networkSpeed: 'Fast', networkSpeedColor: '#1e90ff'},
  1: {spotsFound: 0, networkSpeed: 'Fast', networkSpeedColor: '#1e90ff'},
  2: {spotsFound: 0, networkSpeed: 'Slow', networkSpeedColor: 'red'},
  3: {spotsFound: 0, networkSpeed: 'Fast', networkSpeedColor: '#1e90ff'},
}

function changeVideoType() {
  window.scroll(0, 0);
  const typeIndex = runType.selectedIndex;
  const video = document.getElementById('vid-container0') || '';
  types[typeIndex].append(video);
  setDataPointsValues(pointsValues[typeIndex].spotsFound, pointsValues[typeIndex].networkSpeed, pointsValues[typeIndex].networkSpeedColor);
}

const onLoadPage = () => {
  const typeIndex = runType.selectedIndex;
  if (!floater.checked) {
    createScript(types[typeIndex], FLOATER);
    sessionStorage.setItem('d_avnts_target', {tag: 98})
    sessionStorage.setItem('m_avnts_target', {tag: 98})
  } else {
    createScript(types[typeIndex], NO_FLOATER);
    sessionStorage.setItem('d_avnts_target', {tag: 99})
    sessionStorage.setItem('m_avnts_target', {tag: 99})
  }
  setDataPointsValues(pointsValues[typeIndex].spotsFound, pointsValues[typeIndex].networkSpeed, pointsValues[typeIndex].networkSpeedColor);
}

const removePlayer = () => {
  document.querySelectorAll("script#avantisJS, div[id^='vid-container'], div[id^='avantisContainer']").forEach((element) => {
    element.parentElement?.removeChild(element);
  });
  delete window['avnts_player'];
}

const onClickFloater = () => {
  removePlayer();
  onLoadPage();
}

const createScript = (parent, url) => {
  const jQueryScript = document.createElement('script');
  jQueryScript.setAttribute('src', url);
  jQueryScript.setAttribute('id', 'avantisJS');
  parent.appendChild(jQueryScript);
}

const setDevice = (selectObject) => {
  if (selectObject.value === 'mobile') {
    document.getElementById('body').classList.add('mobile');
  } else {
    document.getElementById('body').classList.remove('mobile');
  }
  removePlayer();
  onLoadPage();
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
