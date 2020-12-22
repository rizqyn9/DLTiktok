const puppeteer = require('puppeteer');
const dataLink = require('./db.json')
const dataArray = dataLink.data
const parallel = 1

const chromeOptions = {
  headless : false,
  slowMo : 10
};



// (async () => {
//     const browser = await puppeteer.launch(chromeOptions);
//     for(let i= 0; i <linkArr.length ; i++){

//       const page = await browser.newPage();
//       await page.goto('https://snaptik.app');
//       await page.waitForSelector('#url')
           
//       await page.type('#url',url);
//       await page.click('#send');
//       await page.waitForSelector('#download-block')
//       await console.log("Okay");
//       await page.on('load')
//       await page.keyboard.press('Tab');
//       await page.keyboard.press('Tab');
//       await page.keyboard.press('Tab');
//       await page.keyboard.press('Tab');
//       await page.keyboard.press('Tab');
//       await page.keyboard.press('Enter');
//       await console.log("Berhasil di Download ");
//     }
    
//   })();

const downloadTiktok = async (dataArray, parallel) => {
  const parallelBatch = Math.ceil((dataArray.length/parallel))

  console.log(`Will result ${parallelBatch} Batch`);

  let k = 0;
  for(let i = 0; i < dataArray.length; i+= parallel){
    k++
    console.log(`Batch ${k} of ${parallelBatch}`);
    const browser = await puppeteer.launch(chromeOptions);
    const page = await browser.newPage()


    const promises = []
    for(let j = 0; j < parallel ; j++){
      const elem = i+j;
      if(dataArray[elem] !== undefined){
        console.log(`I will Downloaded ${elem}`);
        promises.push(browser.newPage().then(async page => {
          try{
            await page.goto('https://snaptik.app');
            await page.waitForSelector('#url')
                
            await page.type('#url',dataArray[elem]);
            await page.click('#send');
            await page.waitForSelector('#download-block',{waitUntil:'networkidle2'})
            await console.log("Okay");
            await page.on('load')
            await page.keyboard.press('Tab');
            await page.keyboard.press('Tab');
            await page.keyboard.press('Tab');
            await page.keyboard.press('Tab');
            await page.keyboard.press('Tab');
            await page.keyboard.press('Enter');
            await console.log(`Berhasil di Download ke ${elem}`);

          } catch (err) {
            console.log("Ada Kesalahan");
          }
        }))
      }
    }
    await Promise.all(promises)
    // await browser.close()

    console.log("Sukses");
  }
}
downloadTiktok(dataArray,parallel)