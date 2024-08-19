
chrome.downloads.onDeterminingFilename.addListener(async (downloadItem, suggest) => {
  console.log("hello")
    const filename = downloadItem.filename;
    const fileSize = downloadItem.fileSize;
  
    const data = {
      filename: filename,
      fileSize: fileSize
    };
  
    try {
      const response = await fetch('http://localhost:8003/checkDuplicateFile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      console.log("hello2");
      const result = await response.json();
  
      if (result.exist) {
       
        console.log(result.exist);
        console.log(downloadItem);
        // Store the download ID and duplicate file path
        // await chrome.storage.local.set({ pendingDownload: downloadItem.id, duplicateFile: result.filePath });
        
        let objectFile = result.exist;
        
        await chrome.storage.local.set({
          pendingDownload: downloadItem.id,
          duplicateFile: objectFile
        });

        // Open the extension popup for the user to make a decision
        chrome.tabs.create({
          url: chrome.runtime.getURL("index.html"),
          active:true
          });  
        
          // Suggest an empty filename to temporarily hold the download
        suggest({ filename: "" });
  
      } 
      if(result.msg){
       console.log(result.msg)
       suggest({ filename: filename });
      }
  
    } catch (error) {
      console.log('Error checking file on server:', error);
      suggest({ filename: filename });
    }
  });


  // Listener for messages from the popup or content scripts
  chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    const { action } = message;
  
    // Retrieve the pending download ID from storage
    const { pendingDownload } = await chrome.storage.local.get("pendingDownload");
  
    if (action === 'cancel' && pendingDownload) {
      chrome.downloads.cancel(pendingDownload);
      sendResponse({ status: "canceled" });
  
    } else if (action === 'open' && pendingDownload) {
      chrome.downloads.open(pendingDownload);
      sendResponse({ status: "opened" });
  
    } else if (action === 'continue' && pendingDownload) {
      chrome.downloads.resume(pendingDownload);
      sendResponse({ status: "continued" });
    }
  });
  