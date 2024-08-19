document.addEventListener('DOMContentLoaded', async () => {
    const { duplicateFile } = await chrome.storage.local.get('duplicateFile');
  
    if (duplicateFile) {
      document.getElementById('filePath').textContent = ` ${duplicateFile.path}`;
    }
  
    const okButton = document.getElementById("okbutton");
    okButton.addEventListener('click', () => {
      window.close();
    });
  
    document.getElementById('cancelBtn').addEventListener('click', async () => {
      const { pendingDownload } = await chrome.storage.local.get('pendingDownload');
      chrome.runtime.sendMessage({ action: 'cancel', downloadId: pendingDownload });
    });
  
  
    document.getElementById('continueBtn').addEventListener('click', async () => {
      const { pendingDownload } = await chrome.storage.local.get('pendingDownload');
      chrome.runtime.sendMessage({ action: 'continue', downloadId: pendingDownload });
    });

    document.getElementById('copyBtn').addEventListener('click',()=>{
      const  filePathElement = document.getElementById('filePath')
      const  filePath = filePathElement.innerText;
      const copyBtn =  document.getElementById('copyBtn')
      navigator.clipboard.writeText(filePath);
      copyBtn.innerText = `Path Copied!`;
    setTimeout(() => {
        copyBtn.innerText = `Copy Path`;
    }, 1000);
    })
  });
  const okButton = document.getElementById("okbutton");
    okButton.addEventListener('click', () => {
      window.close();
    });
  