'use strict'
var chai = require('chai');
var  expect = chai.expect;

var nemo
describe('@GreendotTest@', async function () {


  beforeEach(async function() {    
    nemo = this.nemo
    await nemo.driver.manage().window().maximize();
  });

  afterEach(async function() {    
    if(this.currentTest.state != "passed"){
      await nemo.snap()
    }
  });


  it.only('visit home page', async function () { 
    const {home} = nemo.view   
    await nemo.driver.get(nemo.data.baseUrl)
    await nemo.utils.waitForJSReady()
    await home.RegisterCardWaitVisible().click()
    await nemo.utils.waitForJSReady()
    await nemo.driver.getCurrentUrl().then(url =>{        
        expect(url).to.includes("secure.greendot.com/registers")
    })
  })

})
