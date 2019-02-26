var moment = require('moment');
var chakram = require('chakram');
let nemo


async function mouseOver(element) {
    await nemo.driver.actions().mouseMove(element).perform();
}

async function waitForJSReady () {
    return nemo.driver.wait(() => {
      return nemo.driver.executeScript(() => {
        return (document.readyState === 'complete')
      })
    }
  , 30 * 1000, 'JavaScript didn\'t load even after 12 seconds')
  }

async function waitForPage(pageName, timeout = 5000){
	await nemo.driver.wait(nemo.wd.until.urlContains(pageName), timeout)
}

async function waitForInVisible(elementLocatorBy, timeout = 10000){
	await nemo.driver.wait(function() {
        return nemo.view._finds(elementLocatorBy).then(function(eles){
          return eles.length == 0
        })
    }, timeout);
}

async function syncForElement(elementLocatorBy, timeout = 10000){
    await nemo.driver.sleep(500)
    let visible = true;
    let waittime = 0
    while (visible && waittime < timeout){
        try{
            await nemo.driver.wait(function() {
                return nemo.view._finds(elementLocatorBy).then(async function(eles){
                  return eles.length > 0 && await eles[0].isDisplayed()
                })
            }, 2000);
        } catch (err){            
            console.log(`wait for element visible fail: ${elementLocatorBy}`);        
        }    
        await nemo.driver.sleep(500)
        try{
            await nemo.driver.wait(function() {
                return nemo.view._finds(elementLocatorBy).then(async function(eles){
                  return eles.length == 0 || !(await eles[0].isDisplayed())
                })
            }, 2000).then( () => {
                visible = false;
            });

        }catch (err){
            console.log(`wait for element invisible fail: ${elementLocatorBy}`);        
        }
        waittime += 2000
    }    
	
}

export default {
    setup: (nemoInstance, callback) => {
        nemo = nemoInstance
        nemo.utils = {
			waitForJSReady,
            waitForPage,
            waitForInVisible,
            syncForElement,
            mouseOver			
        }
        callback()
    }
}
