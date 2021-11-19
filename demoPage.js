var allBrowsispots = document.querySelectorAll('browsispot');
var browsiRailSpots = document.querySelectorAll('aside.browsiRail');
var browsiTopAd = document.querySelector('browsitopad');
var notHumanImg = document.querySelector('#notHumanImg');
//Data point value elements
var spotsFoundDisplay = document.getElementById('dataPointValueSpotsFound');
var adsPerPageDisplay = document.getElementById('dataPointValueAdsPerPage');
var adRequestsPerPageDisplay = document.getElementById('dataPointValueAdRequestsPerPage');
var networkSpeedDisplay = document.getElementById('dataPointValueNetworkSpeed');
var scrollSpeedDisplay = document.getElementById('dataPointValueScrollSpeed');
//User type dropdown
var runTypeBar = document.getElementById('runTypeBar');

function changeRunType(index) {

  if (runTypeBar.hasAttribute('disabled')) {
    runTypeBar.removeAttribute('disabled');
  }

  window.scroll(0, 0);
  var rndAd;
  var counter = 0;
  adsPerPageDisplay.textContent = 2;

  allBrowsispots.forEach((element) => {
    if (element.hasAttribute('adIndex')) {
      element.removeAttribute('adIndex');
      element.removeAttribute('observed');
      element.firstElementChild.style.margin = '';
      element.firstElementChild.style.float = '';
      element.firstElementChild.style.height = '0px;'
      element.firstElementChild.style.width = '0px';
      element.firstElementChild.style['display'] = 'none';
    }
  });

  if (window.innerWidth < 500) {  //Meaning it's mobile...

    // //Display or hide top ad
    // if (index == 1){
    //     browsiTopAd.style.height = "48px";
    //     browsiTopAd.style.width = "309px";
    //     browsiTopAd.style['background-image'] = "url('smallerAdA.png')";
    //     browsiTopAd.style.display = 'block';
    // } else {
    //     browsiTopAd.style.display = 'none';
    // }

    adsPerPageDisplay.textContent = 0;

    switch (index) {
      case 0: //Fast Scroller
        allBrowsispots[allBrowsispots.length - 1].setAttribute('adIndex', counter);
        rndAd = 'url(' + randomAd('mobile', counter - 1) + ')';
        allBrowsispots[allBrowsispots.length - 1].firstElementChild.style['background-image'] = rndAd;
        allBrowsispots[allBrowsispots.length - 1].firstElementChild.style['display'] = 'block';
        setMobileAdStyle(allBrowsispots.length - 1, allBrowsispots);
        counter++;

        setDataPointsValues(counter, 'Fast', 'green');
        break;

      case 1: //Slow Scroller
        // allBrowsispots.forEach((element) => {
        //     element.setAttribute('adIndex', counter);
        //     rndAd = 'url(' + randomAd('mobile',counter-1) + ')';
        //     element.firstElementChild.style['background-image'] = rndAd;
        //     element.firstElementChild.style['display'] = 'block';
        //     setMobileAdStyle(counter,allBrowsispots)
        //     counter++
        // })

        for (let i = 0; i < allBrowsispots.length; i++) {
          if (i % 2 == 0 || i == 0) {
            allBrowsispots[i].setAttribute('adIndex', counter);
            rndAd = 'url(' + randomAd('mobile', counter - 1) + ')';
            allBrowsispots[i].firstElementChild.style['background-image'] = rndAd;
            allBrowsispots[i].firstElementChild.style['display'] = 'block';
            setMobileAdStyle(i, allBrowsispots);
            counter++;
          }
        }

        setDataPointsValues(counter, 'Fast', 'green');

        break;

      case 2: //Slow Internet
        for (let i = 1; i < allBrowsispots.length; i++) {
          if (i % 3 == 0 || i == 1) {
            allBrowsispots[i].setAttribute('adIndex', counter);
            rndAd = 'url(' + randomAd('mobile', counter - 1) + ')';
            allBrowsispots[i].firstElementChild.style['background-image'] = rndAd;
            allBrowsispots[i].firstElementChild.style['display'] = 'block';
            setMobileAdStyle(i, allBrowsispots);
            counter++;
          }
        }
        setDataPointsValues(counter, 'Slow', 'red');


        break;

      case 3: //Non-Human
        adsPerPageDisplay.textContent = 0;
        setDataPointsValues(counter, 'Fast', 'green');
        break;

      default:
        break;
    }
  } else {  //Meaning it's desktop...

    //Display or hide rail&top ads
    if (index == 1) {
      browsiTopAd.style.display = 'block';
    } else {
      browsiTopAd.style.display = 'none';
    }
    browsiRailSpots.forEach((element) => {
      if (index != 3) {
        element.style.display = 'block';
      } else {
        element.style.display = 'none';
      }
    });

    switch (index) {
      case 0:
        notHumanImg.style['display'] = 'none';
        allBrowsispots[allBrowsispots.length - 1].setAttribute('adIndex', counter);
        rndAd = 'url(' + randomAd('desktop', counter - 1) + ')';
        allBrowsispots[allBrowsispots.length - 1].firstElementChild.style['background-image'] = rndAd;
        allBrowsispots[allBrowsispots.length - 1].firstElementChild.style['display'] = 'block';
        setDesktopAdStyle(allBrowsispots.length - 1, allBrowsispots);
        counter++;

        setDataPointsValues(counter, 'Fast', 'green');

        break;
      case 1:
        notHumanImg.style['display'] = 'none';
        for (let i = 0; i < allBrowsispots.length; i++) {
          if (i % 3 == 0 || i == 0) {
            allBrowsispots[i].setAttribute('adIndex', counter);
            rndAd = 'url(' + randomAd('desktop', counter - 1) + ')';
            allBrowsispots[i].firstElementChild.style['background-image'] = rndAd;
            allBrowsispots[i].firstElementChild.style['display'] = 'block';

            setDesktopAdStyle(i, allBrowsispots);

            counter++;
          }
        }

        adsPerPageDisplay.textContent = parseInt(adsPerPageDisplay.textContent) + 1;
        adRequestsPerPageDisplay.textContent = adsPerPageDisplay.textContent;

        setDataPointsValues(counter, 'Fast', 'green');

        break;
      case 2:
        notHumanImg.style['display'] = 'none';
        for (let i = 1; i < allBrowsispots.length; i++) {
          if (i == 1 || i == 6 || i == 11) {
            allBrowsispots[i].setAttribute('adIndex', counter);
            rndAd = 'url(' + randomAd('desktop', counter - 1) + ')';
            allBrowsispots[i].firstElementChild.style['background-image'] = rndAd;
            allBrowsispots[i].firstElementChild.style['display'] = 'block';

            setDesktopAdStyle(i, allBrowsispots);

            counter++;
          }
        }

        setDataPointsValues(counter, 'Slow', 'red');

        break;
      case 3:
        adsPerPageDisplay.textContent = 0;
        notHumanImg.style['background-image'] = 'url("pics/robotImg.jpeg")';
        notHumanImg.style['display'] = 'block';
        notHumanImg.style['height'] = '489px';
        notHumanImg.style['width'] = '100%';
        notHumanImg.style['background-repeat'] = 'no-repeat';
        setDataPointsValues(counter, 'Fast', 'green');
        break;
      default:
        break;
    }
  }
  adRequestsPerPageDisplay.textContent = adsPerPageDisplay.textContent;
}

function setDataPointsValues(spotsFound, networkSpeed, networkSpeedColor) {
  spotsFoundDisplay.textContent = spotsFound;
  networkSpeedDisplay.textContent = networkSpeed;
  networkSpeedDisplay.style.color = networkSpeedColor;
}

function setDesktopAdStyle(relevantAds, allBrowsispots) {
  if (allBrowsispots[relevantAds].firstElementChild.style.backgroundImage.indexOf('Wide') > -1) {
    // allBrowsispots[relevantAds].firstElementChild.style.width = '718px';
    // allBrowsispots[relevantAds].firstElementChild.style.height = '163px';
    allBrowsispots[relevantAds].firstElementChild.style.width = '710px';
    allBrowsispots[relevantAds].firstElementChild.style.height = '160px';
  } else {
    allBrowsispots[relevantAds].firstElementChild.style.width = '300px';
    allBrowsispots[relevantAds].firstElementChild.style.height = '250px';
    allBrowsispots[relevantAds].firstElementChild.style.float = 'right';
    allBrowsispots[relevantAds].firstElementChild.style.margin = '10px'
  }
}
function setMobileAdStyle(relevantAds, allBrowsispots) {
  if (allBrowsispots[relevantAds].firstElementChild.style.backgroundImage.indexOf('smaller') > -1) {
    allBrowsispots[relevantAds].firstElementChild.style.width = '309px';
    allBrowsispots[relevantAds].firstElementChild.style.height = '48px';
  } else {
    allBrowsispots[relevantAds].firstElementChild.style.width = '300px';
    allBrowsispots[relevantAds].firstElementChild.style.height = '250px';
  }
}

function randomAd(device, previousAdIndex) {
  if (device == 'mobile') {
    var adArr = ["'pics/300x250A.png'", "'pics/300x250B.png'", "'pics/300x250C.png'", "'pics/smallerAdA.png'"];
  } else if (device == 'desktop') {
    let previousAd = document.querySelector('browsispot[adindex="' + previousAdIndex + '"]');
    if (previousAdIndex > -1 && previousAd && previousAd.firstElementChild.style.backgroundImage.indexOf('Wide') > -1) {
      var adArr = ["'pics/300x250A.png'", "'pics/300x250B.png'", "'pics/300x250C.png'"];
    } else {
      var adArr = ["'pics/300x250A.png'", "'pics/300x250B.png'", "'pics/300x250C.png'", "pics/718x163AWide.png", "pics/718x163BWide.png"];
    }
  }
  return adArr[Math.floor(Math.random() * ((adArr.length - 1) - 0 + 1))];
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
allBrowsispots.forEach((element) => {
  observer.observe(element);
})
