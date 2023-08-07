const {
    app,
    BrowserWindow,
    session,
    Menu
} = require('electron');

const path = require('path')
Menu.setApplicationMenu(null);

let win;
//  "prebuild": "rm -rf build && rm -rf ../server/api/dist/build ",
// "postbuild": "mv build ../server/api/dist/build",
function createWindow() {
    win = new BrowserWindow({
        height: 1000,
        width: 1290,
        backgroundColor: '#ffffff'
    });
    // win.loadFile('index.html')
    // win.loadURL(`file://${__dirname}/index.html`)
    win.loadURL('http://localhost:3000')
    //win.loadURL('http://192.168.1.100:5000');
    // win.loadURL('http://18.189.63.65:5000');
    win.once('ready-to-show', () => {
        win.show();
    });
    win.on('closed', function () {
        win = null;
    });
}
// app.on('ready', createWindow);

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('windows-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
    if (win === null) {
        createWindow();
    }
});