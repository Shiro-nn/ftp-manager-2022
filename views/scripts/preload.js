const { ipcRenderer } = require('electron');
let Connections = {
    active: [],
    latest: [],
    total: []
}
window.addEventListener('DOMContentLoaded', () => {
    CreateBar();
    for (const type of ['chrome', 'node', 'electron']) {
        console.log(`${type}-version`, process.versions[type]);
    }
    ipcRenderer.on('load_page', (_event, type, activeConns, latestConns) => {
        if(activeConns == null || activeConns == undefined) activeConns = [];
        if(latestConns == null || latestConns == undefined) latestConns = [];
        Connections.active = activeConns;
        Connections.latest = latestConns;
        if(type == 1){
            if(activeConns.length == 0) return RenderMainMenu(latestConns);
        }
    })
})
function RenderMainMenu(latestConns) {
    const root = document.getElementById('render');
    root.innerHTML = '';
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.type = 'text/css';
    style.href = './styles/mainmenu.css';
    style.media = 'all';
    root.appendChild(style);
    const e0 = document.createElement('div');
    e0.className = 'q0';
    root.appendChild(e0);
    const e1 = document.createElement('div');
    e1.className = 'q1';
    e0.appendChild(e1);
    const e2 = document.createElement('div');
    e2.className = 'q2';
    e1.appendChild(e2);
    const e3 = document.createElement('div');
    e3.className = 'q3';
    e1.appendChild(e3);
    {
        const e4 = document.createElement('a');
        e4.className = 'q4';
        e3.appendChild(e4);

        const e5 = document.createElement('div');
        e5.className = 'q5';
        e5.style.display = 'none';
        e5.innerHTML = '<svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M432'+
        ' 256C432 264.8 424.8 272 416 272h-176V448c0 8.844-7.156 16.01-16 16.01S208 456.8 208 448V272H32c-8.844 0-16-7.15-16-15.99C16 247'+
        '.2 23.16 240 32 240h176V64c0-8.844 7.156-15.99 16-15.99S240 55.16 240 64v176H416C424.8 240 432 247.2 432 256z"></path></svg>';
        e4.appendChild(e5);
        
        const es = document.createElement('span');
        es.innerHTML = 'Новое соединение';
        e4.appendChild(es);
    }
    {
        const e4 = document.createElement('a');
        e4.className = 'q4';
        e3.appendChild(e4);

        const e5 = document.createElement('div');
        e5.className = 'q5';
        e5.style.display = 'none';
        e5.innerHTML = '<svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">'+
        '<path fill="currentColor" d="M464 480H96c-35.35 0-64-28.65-64-64V112C32 103.2 24.84 96 16 96S0 103.2 0 112V416c0 53'+
        '.02 42.98 96 96 96h368c8.836 0 16-7.164 16-16S472.8 480 464 480zM512 0H160C124.7 0 96 28.65 96 64v288c0 35.35 28.65 '+
        '64 64 64h352c35.35 0 64-28.65 64-64V64C576 28.65 547.3 0 512 0zM128 64c0-17.67 14.33-32 32-32h64v64H128V64zM544 352c0 17.67-'+
        '14.33 32-32 32H160c-17.67 0-32-14.33-32-32V128h416V352zM544 96H256V32h256c17.67 0 32 14.33 32 32V96z"></path></svg>';
        e4.appendChild(e5);
        
        const es = document.createElement('span');
        es.innerHTML = 'Соединения';
        e4.appendChild(es);
    }
    for (let i = 0; i < latestConns.length && i < 3; i++) {
        const connect = latestConns[i];
        const e4 = document.createElement('a');
        e4.className = 'q4';
        e3.appendChild(e4);

        const e5 = document.createElement('div');
        e5.className = 'q5';
        e5.style.display = 'none';
        e5.innerHTML = '<svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d='+
        '"M256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C172.2 512 97.87 471.8 51.19 409.6C45.88 402.5 47.31 392.5 54'+
        '.37 387.2C61.44 381.9 71.47 383.3 76.78 390.4C117.7 444.8 182.7 480 256 480C379.7 480 480 379.7 480 256C480 132.3 379.7 32'+
        ' 256 32C166.7 32 89.51 84.3 53.55 160H144C152.8 160 160 167.2 160 176C160 184.8 152.8 192 144 192H16C7.164 192 0 184.8 0 1'+
        '76V48C0 39.16 7.164 32 16 32C24.84 32 32 39.16 32 48V131.1C75.66 53.29 159.6 0 256 0zM256 128C264.8 128 272 135.2 272 144V'+
        '249.4L347.3 324.7C353.6 330.9 353.6 341.1 347.3 347.3C341.1 353.6 330.9 353.6 324.7 347.3L244.7 267.3C241.7 264.3 239.1 26'+
        '0.2 239.1 256V144C239.1 135.2 247.2 128 255.1 128H256z"></path></svg>';
        e4.appendChild(e5);
        
        const es = document.createElement('span');
        es.innerHTML = connect.name;
        e4.appendChild(es);
    }
}
function CreateBar() {
    const e1 = document.createElement('div');
    e1.id = 'AppNavbarSystem';
    document.getElementsByTagName('body')[0].appendChild(e1);
    const e5 = document.createElement('img');
    e5.src = '../icons/ftp_icon.png';
    e1.appendChild(e5);
    const e2 = document.createElement('span');
    e2.className = 'LogoText';
    e2.innerHTML = 'FTP';
    e1.appendChild(e2);
    const e3 = document.createElement('span');
    e3.className = 'ButtonsSelector';
    e1.appendChild(e3);
    {
        const e4 = document.createElement('div');
        e4.className = 'AppButon';
        e4.innerHTML = '<svg width="12" height="12" xmlns="http://www.w3.org/2000/svg"><g><line stroke-linecap="undefined" ' +
            'stroke-linejoin="undefined" id="svg_11" y2="5.9375" x2="12" y1="5.875" x1="0" stroke="#8c8c8c" fill="none"/></g></svg>';
        e4.addEventListener('click', () => ipcRenderer.send('navbarEvent', 1));
        e3.appendChild(e4);
    }
    {
        const e4 = document.createElement('div');
        e4.className = 'AppButon';
        e4.innerHTML = '<svg width="12" height="12" xmlns="http://www.w3.org/2000/svg"><g><line stroke="#8c8c8c" stroke-linecap=' +
            '"undefined" stroke-linejoin="undefined" id="svg_7" y2="11.99999" x2="0" y1="0" x1="0" fill="none"/><line stroke="#8c8c8c" ' +
            'stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_8" y2="12" x2="12" y1="0" x1="12" fill="none"/><line stroke=' +
            '"#8c8c8c" stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_9" y2="12" x2="11.9375" y1="12" x1="-0.0625" fill="none"/>' +
            '<line stroke="#8c8c8c" stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_10" y2="0" x2="12" y1="0" x1="0" fill="none"/></g></svg>';
        e4.addEventListener('click', () => ipcRenderer.send('navbarEvent', 2));
        e3.appendChild(e4);
    }
    {
        const e4 = document.createElement('div');
        e4.className = 'AppButon';
        e4.innerHTML = '<svg width="12" height="12" xmlns="http://www.w3.org/2000/svg"><g><line stroke="#8c8c8c" stroke-linecap="undefined"' +
            ' stroke-linejoin="undefined" id="svg_4" y2="12.15625" x2="12.12499" y1="-0.15623" x1="0.00002" fill="none"/><line stroke="#8c8c8c"' +
            ' stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_6" y2="0.03127" x2="12.12499" y1="12.09375" x1="0.00002" fill="none"/></g></svg>';
        e4.addEventListener('click', () => ipcRenderer.send('navbarEvent', 3));
        e3.appendChild(e4);
    }
}