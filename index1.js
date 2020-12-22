const puppeteer = require('puppeteer');
const dataLink = require('./db.json')
const dataArray = dataLink.data
const parallel = 1

const chromeOptions = {
  headless : false,
  slowMo : 10
};

function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
}


(async () => {
    const browser = await puppeteer.launch(chromeOptions);
    for(let i= 0; i <4 ; i++){

      const page = await browser.newPage();
      await page.goto('https://snaptik.app');
      await page.waitForSelector('#url')
           
      await page.type('#url',dataArray[i]);
      await page.click('#send');
      await page.waitForSelector('#download-block')
      await console.log("Okay");
      await page.on('load')
      await delay(3000)
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await console.log("Berhasil di Download ");
      await delay(3000)
      if(i%2 == 0) await page.close().then(await puppeteer.launch(chromeOptions))
    }
    
  })();


