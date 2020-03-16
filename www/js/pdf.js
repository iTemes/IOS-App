'use strict';
(function () {
var loaderTemplate = document.querySelector('template.loader-template');
var loaderContent = loaderTemplate.content.querySelector('.loader');

function downloadOpenPdf(assetURL,store,fileName,container) {
    var container = container;
    loaderIndicatorOn(container)
  
    //URL of our asset
    var assetURL = assetURL;
    console.log('asset url -', assetURL);
    //File name of our important data file we didn't ship with the app
    var fileName = fileName + '-' + window.utils.dateNow + '.pdf';
    console.log('Название файла',fileName);
    //Directory
    var filePath = store + fileName;
    console.log("PATH TO FILE --", filePath);
    //Check for the file.
    window.resolveLocalFileSystemURL(filePath, readFile, downloadAsset);

    function downloadAsset() {
        var fileTransfer = new FileTransfer();
        fileTransfer.download(assetURL, filePath,
            function(entry) {
                console.log("Success!");
                readFile();
            },
            function(err) {
                console.log("Error");
                console.dir(err);
            }
        );
    }
    
    function readFile() {
        var url = filePath;

        //Open a pdf
        var options = {
            password: null,
            flatUI: true,
            showShadows: true,
            enableThumbs: true,
            disableRetina: false,
            enablePreview: false,
            bookmarks: true,
            landscapeDoublePage: true,
            landscapeSingleFirstPage: true,
            toolbarBackgroundColor: null,
            textColor: null,
            enableShare: true,
            page: 1
        }
        loaderIndicatorOff(container);
        PDFReader.open(url,options);
    }
};
    function loaderIndicatorOn(container){
        console.log('LOADING FILE');
        var loader = loaderContent.cloneNode(true);
        container.appendChild(loader);
    }

    function loaderIndicatorOff(container){
        console.log('STOP LOADING FILE');
        container.querySelector('.loader').remove();
    }

    window.pdf = {
        downloadOpenPdf: downloadOpenPdf
    };
})();


