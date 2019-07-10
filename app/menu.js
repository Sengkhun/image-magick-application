import _ from 'lodash';
import fs from 'fs';
import check from 'check-types';
import { app, dialog, Menu, shell, BrowserWindow } from 'electron';

import { APP_ACTION_TYPES } from 'actions/AppActions';
import { IMAGE_ACTION_TYPES, roateImage, flipImage} from 'actions/ImageActions';
import { removeFile } from 'lib/helpers';

const appName = 'Image Magick GUI';
const isMac = process.platform === 'darwin';

const open = store => () => {
  const file = dialog.showOpenDialog({ 
    properties: ['openFile'],
    filters: [
      { name: 'Images', extensions: ['jpg', 'jpeg', 'png'] }
    ]
  });
  if (check.nonEmptyArray(file)) {
    store.dispatch({
      type: IMAGE_ACTION_TYPES.openImage,
      payload: file && file[0]
    });
  }
};

const save = store => () => {
  const { images, imageOriginalPath } = store.getState().ImageReducer;
  const saveImage = _.last(images);
  if (saveImage) {
    const contents = fs.readFileSync(saveImage);
    fs.writeFileSync(imageOriginalPath, contents);
  }
};

const saveAs = store => () => {
  const { images, imageOriginalPath } = store.getState().ImageReducer;
  const saveImage = _.last(images);
  if (saveImage) {
    const file = dialog.showSaveDialog(null, { defaultPath: imageOriginalPath });
    if (file) {
      // save image
      fs.copyFileSync(saveImage, file);
    }
  }
};

const undo = store => () => {
  const { images } = store.getState().ImageReducer;
  const currentImage = _.last(images);
  if (currentImage) {
    // remove last image
    removeFile(currentImage);
    store.dispatch({ type: IMAGE_ACTION_TYPES.undoImage });
  }
};

const rotate = (store, degree) => () => {
  const { loading, reloadImage } = store.getState().AppReducer;
  const { images } = store.getState().ImageReducer;

  // if loading, do nothing
  if (loading) return;

  // show loading
  store.dispatch({
    type: APP_ACTION_TYPES.changeAppReducer,
    payload: { loading: true }
  });

  const currentImage = _.last(images);
  if (currentImage) {
    const callback = (ok, error) => {
      if (!ok) {
        console.log(error);
      }
      store.dispatch({
        type: APP_ACTION_TYPES.changeAppReducer,
        payload: { 
          loading: false, 
          reloadImage: true
        }
      });
    };
    roateImage(currentImage, degree, callback)(store.dispatch);
  }
};

const flip = (store, flip) => () => {
  const { loading, reloadImage } = store.getState().AppReducer;
  const { images } = store.getState().ImageReducer;

  // if loading, do nothing
  if (loading) return;

  // show loading
  store.dispatch({
    type: APP_ACTION_TYPES.changeAppReducer,
    payload: { loading: true }
  });

  const currentImage = _.last(images);
  if (currentImage) {
    const callback = (ok, error) => {
      if (!ok) {
        console.log(error);
      }
      store.dispatch({
        type: APP_ACTION_TYPES.changeAppReducer,
        payload: { 
          loading: false, 
          reloadImage: true
        }
      });
    };
    flipImage(currentImage, flip, callback)(store.dispatch);
  }
};

const openImageSizePanel = store => () => {
  store.dispatch({
    type: APP_ACTION_TYPES.changeAppReducer,
    payload: { controlPanel: 'imageSize' }
  });
};

export default class MenuBuilder {
  mainWindow: BrowserWindow;

  constructor(mainWindow: BrowserWindow, store) {
    this.mainWindow = mainWindow;
    this.store = store;
  }

  buildMenu() {
    if (
      process.env.NODE_ENV === 'development' ||
      process.env.DEBUG_PROD === 'true'
    ) {
      this.setupDevelopmentEnvironment();
    }

    const template =
      process.platform === 'darwin'
        ? this.buildDarwinTemplate()
        : this.buildDefaultTemplate();

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    return menu;
  }

  setupDevelopmentEnvironment() {
    this.mainWindow.openDevTools();
    this.mainWindow.webContents.on('context-menu', (e, props) => {
      const { x, y } = props;

      Menu.buildFromTemplate([
        {
          label: 'Inspect element',
          click: () => {
            this.mainWindow.inspectElement(x, y);
          }
        }
      ]).popup(this.mainWindow);
    });
  }

  buildDarwinTemplate() {
    const subMenuAbout = {
      label: appName,
      submenu: [
        {
          label: `About ${appName}`,
          selector: 'orderFrontStandardAboutPanel:'
        },
        { type: 'separator' },
        { label: 'Services', submenu: [] },
        { type: 'separator' },
        {
          label: `Hide ${appName}`,
          accelerator: 'Command+H',
          selector: 'hide:'
        },
        {
          label: 'Hide Others',
          accelerator: 'Command+Shift+H',
          selector: 'hideOtherApplications:'
        },
        { label: 'Show All', selector: 'unhideAllApplications:' },
        { type: 'separator' },
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    };
    const subMenuFile = {
      label: 'File',
      submenu: [
        { label: 'New', accelerator: 'CmdOrCtrl+N' },
        { label: 'Open', accelerator: 'CmdOrCtrl+O', click: open(this.store) },
        { label: 'Save', accelerator: 'CmdOrCtrl+S', click: save(this.store) },
        { label: 'Save as ...', accelerator: 'CmdOrCtrl+Shift+S', click: saveAs(this.store) },
        { role: isMac ? 'close' : 'quit' }
      ]
    };
    const subMenuEdit = {
      label: 'Edit',
      submenu: [
        { label: 'Undo', accelerator: 'Command+Z', selector: 'undo:', click: undo(this.store) },
        { label: 'Redo', accelerator: 'Shift+Command+Z', selector: 'redo:' },
        { type: 'separator' },
        { label: 'Cut', accelerator: 'Command+X', selector: 'cut:' },
        { label: 'Copy', accelerator: 'Command+C', selector: 'copy:' },
        { label: 'Paste', accelerator: 'Command+V', selector: 'paste:' },
        {
          label: 'Select All',
          accelerator: 'Command+A',
          selector: 'selectAll:'
        }
      ]
    };
    const subMenuImage = {
      label: 'Image',
      submenu: [
        { label: 'Adjustments', submenu: [
            { label: 'Colorize', accelerator: 'CommandOrControl+B' }
          ] 
        },
        { type: 'separator' },
        { label: 'Image Size', accelerator: 'Alt+CommandOrControl+I', click: openImageSizePanel(this.store) },
        { label: 'Image Rotation', submenu: [
            { label: '180°', click: rotate(this.store, 180) },
            { label: '90° Clockwise', click: rotate(this.store, 90) },
            { label: '90° Counter Clockwise', click: rotate(this.store, -90) },
            { type: 'separator' },
            { label: 'Flip Horizontal', click: flip(this.store, '+flop') },
            { label: 'Flip Vertical', click: flip(this.store, '+flip') },
          ] 
        }
      ]
    };
    const subMenuViewDev = {
      label: 'View',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'Command+R',
          click: () => {
            this.mainWindow.webContents.reload();
          }
        },
        {
          label: 'Toggle Full Screen',
          accelerator: 'Ctrl+Command+F',
          click: () => {
            this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
          }
        },
        {
          label: 'Toggle Developer Tools',
          accelerator: 'Command+D',
          click: () => {
            this.mainWindow.toggleDevTools();
          }
        }
      ]
    };
    const subMenuViewProd = {
      label: 'View',
      submenu: [
        {
          label: 'Toggle Full Screen',
          accelerator: 'Ctrl+Command+F',
          click: () => {
            this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
          }
        },
        // {
        //   label: 'Toggle &Developer Tools',
        //   accelerator: 'Alt+Command+I',
        //   click: () => {
        //     this.mainWindow.toggleDevTools();
        //   }
        // }
      ]
    };
    const subMenuWindow = {
      label: 'Window',
      submenu: [
        {
          label: 'Minimize',
          accelerator: 'Command+M',
          selector: 'performMiniaturize:'
        },
        { label: 'Close', accelerator: 'Command+W', selector: 'performClose:' },
        { type: 'separator' },
        { label: 'Bring All to Front', selector: 'arrangeInFront:' }
      ]
    };
    const subMenuHelp = {
      label: 'Help',
      submenu: [
        {
          label: 'Learn More',
          click() {
            shell.openExternal('http://electron.atom.io');
          }
        },
        {
          label: 'Documentation',
          click() {
            shell.openExternal(
              'https://github.com/atom/electron/tree/master/docs#readme'
            );
          }
        },
        {
          label: 'Community Discussions',
          click() {
            shell.openExternal('https://discuss.atom.io/c/electron');
          }
        },
        {
          label: 'Search Issues',
          click() {
            shell.openExternal('https://github.com/atom/electron/issues');
          }
        }
      ]
    };

    const subMenuView =
      process.env.NODE_ENV === 'development' ? subMenuViewDev : subMenuViewProd;

    return [subMenuAbout, subMenuFile, subMenuEdit, subMenuImage, subMenuView, subMenuWindow, subMenuHelp];
  }

  buildDefaultTemplate() {
    const templateDefault = [
      {
        label: '&File',
        submenu: [
          {
            label: '&Open',
            accelerator: 'Ctrl+O'
          },
          {
            label: '&Close',
            accelerator: 'Ctrl+W',
            click: () => {
              this.mainWindow.close();
            }
          }
        ]
      },
      {
        label: '&View',
        submenu:
          process.env.NODE_ENV === 'development'
            ? [
                {
                  label: '&Reload',
                  accelerator: 'Ctrl+R',
                  click: () => {
                    this.mainWindow.webContents.reload();
                  }
                },
                {
                  label: 'Toggle &Full Screen',
                  accelerator: 'F11',
                  click: () => {
                    this.mainWindow.setFullScreen(
                      !this.mainWindow.isFullScreen()
                    );
                  }
                },
                {
                  label: 'Toggle &Developer Tools',
                  accelerator: 'Ctrl+D',
                  click: () => {
                    this.mainWindow.toggleDevTools();
                  }
                }
              ]
            : [
                {
                  label: 'Toggle &Full Screen',
                  accelerator: 'F11',
                  click: () => {
                    this.mainWindow.setFullScreen(
                      !this.mainWindow.isFullScreen()
                    );
                  }
                }
              ]
      },
      {
        label: 'Help',
        submenu: [
          {
            label: 'Learn More',
            click() {
              shell.openExternal('http://electron.atom.io');
            }
          },
          {
            label: 'Documentation',
            click() {
              shell.openExternal(
                'https://github.com/atom/electron/tree/master/docs#readme'
              );
            }
          },
          {
            label: 'Community Discussions',
            click() {
              shell.openExternal('https://discuss.atom.io/c/electron');
            }
          },
          {
            label: 'Search Issues',
            click() {
              shell.openExternal('https://github.com/atom/electron/issues');
            }
          }
        ]
      }
    ];

    return templateDefault;
  }
}
