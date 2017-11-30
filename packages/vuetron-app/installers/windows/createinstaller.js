const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')

getInstallerConfig()
  .then(createWindowsInstaller)
  .catch((error) => {
    console.error(error.message || error)
    process.exit(1)
  })

function getInstallerConfig () {
  console.log('creating windows installer')
  const rootPath = path.join('./')
  const outPath = path.join(rootPath, 'release-builds')

  return Promise.resolve({
    appDirectory: path.join(outPath, 'Vuetron-win32-ia32/'),
    authors: 'Samantha Salley, Brandon Danh, Kelly Gilliam, Louis Rouaze',
    noMsi: true,
    outputDirectory: path.join(outPath, 'windows-installer'),
    exe: 'Vuetron.exe',
    setupExe: 'VuetronInstaller.exe',
    setupIcon: path.join(rootPath, 'assets', 'vuetron-icon.png.ico')
  })

}
