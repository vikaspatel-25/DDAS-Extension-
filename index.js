document.addEventListener('DOMContentLoaded', async () => {
    const { duplicateFile } = await chrome.storage.local.get('duplicateFile');
  
    if (duplicateFile) {
      document.getElementById('filePath').textContent = ` ${duplicateFile.path}`;
    }
    
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
  