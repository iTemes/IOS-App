'use strict';

(function () {

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    store = cordova.file.cacheDirectory;
    console.log('Cashe directory load -', store);
 
    var notificationOpenedCallback = function(jsonData) {
       console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
     };

     window.plugins.OneSignal
       .startInit("8021bba6-4ac4-42d4-8b79-97a4ae6fb082")
       .handleNotificationOpened(notificationOpenedCallback)
       .endInit();
}

//Cashe memory,The directory to store data
var store;

var homeBtn = document.querySelector('.back-home');
var backBtn = document.querySelectorAll('.back');
var backBtnFilter = document.querySelector('.back--filters');
var instructions = document.querySelector('.instructions-link');
var catalogs = document.querySelector('.catalogs-link');
var catalogWrap = document.querySelector('.catalogs');
var catalogContainer = document.querySelector('.catalogs-wrapper');
var instructionsWrap = document.querySelector('.instructions');
var galery = document.querySelector('.galery-link');
var galeryWrap = document.querySelector('.galery');
var body = document.querySelector('body');
var home = document.querySelector('.content');
var contacts = document.querySelector('.contacts');
// var showContacts = document.querySelector('.show-contacts');
var info = document.querySelector('.info');
var showInfo = document.querySelector('.show-info');
var errorCatalog = document.querySelector('.error--catalog');
var errorInstr = document.querySelector('.error--instr ');
var errorTop = document.querySelectorAll('.error--top ');
var errors = document.querySelectorAll('.error');
var topAppError = document.querySelector('.topApp-error');
var filters = document.querySelector('.filters');
var uncollapseFilter = document.querySelector('.filters__title');
var loaderInst = document.querySelectorAll('.loader--instr');
var loaderCatalog = document.querySelectorAll('.loader--catalog');
var loaderMain = document.querySelectorAll('.loader--main');
var isLoad = true;
var menuBtns = document.querySelectorAll('.bot-menu .nav-btn');
var topSliderContainer = document.querySelector('.top-slider');
var insperationContainer = document.querySelector('.top-menu__wrapper--insper');

function clearActiveMenu() {
    menuBtns.forEach(function(it){
        it.classList.remove('active');
    });
}

function backHome() {
    closeInstr();
    closeCatalogs();
    closeGalery();
    clearActiveMenu();
    closeInfo();

    homeBtn.classList.add('active');
    contacts.classList.remove('active');
    info.classList.remove('active');
    body.classList.remove('open');
    home.classList.remove('short');
    filters.classList.remove('open');

    window.instructions.scrollTop();
}

function prevPage() {
    closeCatalogs();
    closeInstr();
    closeGalery();
    homeBtn.classList.add('active');
    contacts.classList.remove('active');
    body.classList.remove('open');
    info.classList.remove('active');
    window.instructions.scrollTop();
}

function closeGalery() {
    galeryWrap.classList.remove('active');
    galeryWrap.style.visibility = 'hidden';
    galeryWrap.style.zIndex = '1';
    home.classList.remove('short');
}

function openGalery () {
    closeInstr();
    closeCatalogs();
    clearActiveMenu();
    closeInfo();

    setTimeout(() => {
        home.classList.add('short');
    }, 400);

    galeryWrap.classList.add('active');
    body.classList.add('open');
    galeryWrap.style.visibility = 'visible';
    galeryWrap.style.zIndex = '2';
    filters.classList.remove('open');

    window.instructions.scrollTop();
    var bLazy = new Blazy({
        offset: 50    
    });
}

function closeCatalogs() {
    catalogWrap.classList.remove('active');
    catalogWrap.style.visibility = 'hidden';
    catalogWrap.style.zIndex = '1';
    home.classList.remove('short');
}

function openCatalogs () {
    closeInstr();
    closeGalery();
    closeInfo();
    clearActiveMenu();

    setTimeout(() => {
        home.classList.add('short');
    }, 400);

    catalogs.classList.add('active');
    catalogWrap.classList.add('active');
    body.classList.add('open');
    catalogWrap.style.visibility = 'visible';
    catalogWrap.style.zIndex = '2';
    filters.classList.remove('open');

    window.instructions.scrollTop();
}

function closeInstr() {
    instructionsWrap.classList.remove('active');
    instructionsWrap.style.zIndex = '1';
    instructionsWrap.style.visibility = 'hidden';
    filters.classList.remove('show');
    filters.classList.remove('open');
    home.classList.remove('short');
}

function openInstr () {
    closeCatalogs();
    closeGalery();
    clearActiveMenu();
    closeInfo();

    setTimeout(() => {
        home.classList.add('short');
    }, 400);

    instructions.classList.add('active');
    instructionsWrap.classList.add('active');
    body.classList.add('open');
    instructionsWrap.style.visibility = 'visible';
    instructionsWrap.style.zIndex = '2';
    backBtnFilter.style.display = "block";
    filters.classList.add('open');
    window.instructions.scrollTop();
}

function openContacts () {
    closeInstr();
    closeCatalogs();
    clearActiveMenu();
    
    showContacts.classList.add('active');
    info.classList.remove('active');
    contacts.classList.add('active');
    body.classList.add('open');
    filters.classList.remove('open');

    window.instructions.scrollTop();
}

function closeInfo() {
    clearActiveMenu();
    info.classList.remove('active');
    home.classList.remove('short');
}

function openInfo () {
    closeInstr();
    closeCatalogs();
    clearActiveMenu();

    setTimeout(() => {
        home.classList.add('short');
    }, 400);
    
    showInfo.classList.add('active');
    contacts.classList.remove('active');
    info.classList.add('active');
    body.classList.add('open');
    filters.classList.remove('open');

    window.instructions.scrollTop();
}

function toggleFilter() {
    if(filters.classList.contains('show')){
        filters.classList.remove('show');
        backBtnFilter.style.display = "block";
    }
    else {
        filters.classList.add('show');
        backBtnFilter.style.display = "none";
    }
    
}

function removeLoader(loader) {
    loader.forEach(function(it){
        it.classList.add('close');
    })
    
}

function addLoader(loader) {
    loader.forEach(function(it){
        it.classList.remove('close');
    })
    
}

catalogs.addEventListener('click', openCatalogs);
instructions.addEventListener('click', openInstr);
// showContacts.addEventListener('click', openContacts);
galery.addEventListener('click', openGalery);
showInfo.addEventListener('click', openInfo);
uncollapseFilter.addEventListener('click', toggleFilter);

backBtn.forEach(it => {
  it.addEventListener('click', prevPage);
});

homeBtn.addEventListener('click', backHome);

var loadData = [];
var loadInstr = [];
var loadTopSlider = [];
var loadTrend = [];
var loadInsperations = [];


var successInsperationsLoad = function(data) {
    loadInsperations = data;

    console.log('Insperations is loaded: ', loadInsperations)
    appendInsperations(loadInsperations,insperationContainer);
}

var errorTopSliderLoad = function (textMessage) {
    var text = document.querySelector('.error--top .error-text');
    text.innerHTML = `${textMessage} <br><br>Что-то пошло не так :( <br>Повторите попытку позже`;
    errorTop.forEach(function(it){
        it.classList.remove('close');
    })
    topAppError.classList.add('active');
    console.log(textMessage);
}

var successTopSliderLoadPresentation = function(data) {
    loadTrend = data;
    appendPopupPresentation(loadTrend, body);
    console.log('Top slider presentation is loaded: ', loadTrend)
}

var successHandler = function (data) {
    loadData = data;
    isLoad = false;
    
    // console.log('Catalogues loaded -', data);
    
    appendCatalogs(loadData, catalogContainer);
};

var erorrHandler = function (textMessage) {
    console.log(textMessage);
    addLoader(loaderCatalog);
    showErrorCatalog(textMessage);
    
};

var showErrorCatalog = function(textMessage) {
    var text = document.querySelector('.error--catalog .error-text');
    text.innerHTML = `${textMessage} <br><br>Что-то пошло не так :( <br>Повторите попытку позже`;
    errorCatalog.classList.remove('close');
    topAppError.classList.add('active');
}

var showErrorInstr = function(textMessage) {
    var text = document.querySelector('.error--instr .error-text');
    text.innerHTML = `${textMessage} <br><br>Что-то пошло не так :( <br>Повторите попытку позже`;
    errorInstr.classList.remove('close');
}

var closeError = function() {
    errors.forEach( function(it) {
        it.children[0].innerHTML='';
        it.classList.add('close');
    });
    topAppError.classList.remove('active');
    
    window.backend.load(successHandler, erorrHandler);
    window.backend.loadInstr(successInstr, erorrInstr);

    window.backend.loadMain(successTopSliderLoad,errorTopSliderLoad);
    window.backend.loadInsperations(successInsperationsLoad,errorTopSliderLoad);
}

// функционал попапа на главной странице
var topMenu = document.querySelector('.top-slider');

var presentationPopupTemplate = document.querySelector('template.popup-presentation-template');
var presentation = presentationPopupTemplate.content.querySelector('.popup-presentation');

var presentationSlideTemplate = document.querySelector('template.presentation-slide-template');
var presentationSlide = presentationSlideTemplate.content.querySelector('.presentation-slide');

var renderPresentationPopup = function(item) {
    var popupGalery = presentation.cloneNode(true);
    popupGalery.querySelector('.popup-galery__link').setAttribute('data-link', item[0].fields.external_url);
    return popupGalery;
}

var renderPresentationSlide = function(item) {
    var slide = presentationSlide.cloneNode(true);
    slide.querySelector('.presentation-slide__img img').src = 'https://www.centrsvet.ru/media/' + item.fields.image_url;
    slide.querySelector('.presentation-slide__title').textContent = item.fields.title;
    slide.querySelector('.presentation-slide__text').innerHTML = item.fields.description;

    if(item.fields.video_url !="") {
        slide.setAttribute('data-video', item.fields.video_url);
        var videoUrl = 'https://www.centrsvet.ru/media/' + item.fields.video_url;
        slide.addEventListener('click', function(evt){
            console.log(videoUrl, ' -video url');
            openVideo(videoUrl)
        });
    }
   
    return slide;
}

var appendPopupPresentation = function(data, container) {
    var popupItem = renderPresentationPopup(data);
    var popupItemWrapper = popupItem.querySelector('.popup-presentation__wrapper');
    var popupLink = popupItem.querySelector('.popup-galery__link');
    var popupLinkUrl = encodeURI( popupLink.getAttribute('data-link') );

    data.forEach(function(it){
        var slideItem = renderPresentationSlide(it);
        popupItemWrapper.appendChild(slideItem);
    })

    container.appendChild(popupItem);
    
    popupLink.addEventListener('click', function() {
        window.index.openBrowser(popupLinkUrl);
    });

    var close = popupItem.querySelector('.popup-close');
    close.addEventListener('click', function(){
        popupItem.classList.remove('open');
        window.index.home.classList.remove('short');
        setTimeout(() => {
            popupItem.remove();  
        }, 300);
    });

    // setTimeout(() => {
    //     var top_slider = Peppermint(document.getElementById('peppermint'), {
    //         dots: false,
    //         slideshow: false,
    //         speed: 500,
    //         disableIfOneSlide: true,
    //         onSetup: function(n) {
    //             console.log('Top setup done. Slides found: ' + n);
    //         }
    //     });
    // }, 600);
    

    setTimeout(() => {
        popupItem.classList.add('open');
        window.index.home.classList.add('short');
    }, 300);

}

// insperations render

var insperationsTemplate = document.querySelector('template.top-menu__item-template');
var insperationItem = insperationsTemplate.content.querySelector('.top-menu__item');

var renderInsperation = function(item) {
    var insperation = insperationItem.cloneNode(true);
    insperation.querySelector('.top-menu__item img').src = 'https://www.centrsvet.ru/media/' + item.fields.image_url;
    insperation.querySelector('.small-title').textContent = item.fields.title;
    
    return insperation;
}

var appendInsperations = function(slides,container) {
    slides.forEach(function(item) {
        var card = renderTopSlider(item);
        container.appendChild(card);

        card.addEventListener('click', function() {
            var apiUrl = this.getAttribute('data-url');
            console.log(apiUrl);

            //Load and open topSliderPresentation
            window.backend.loadTrend(successTopSliderLoadPresentation, errorTopSliderLoad, apiUrl);
        });
    });
}

// Load catalogs
window.backend.load(successHandler, erorrHandler);

// template card
var catalogTemplate = document.querySelector('template.card-template');
var catalog = catalogTemplate.content.querySelector('.content__item');

var renderCatalog = function (catalogObject) {
    var catalogElement = catalog.cloneNode(true);
    catalogElement.querySelector('img').src = catalogObject.image;
    catalogElement.querySelector('.content__title').textContent = catalogObject.title;
    catalogElement.setAttribute('data-link', catalogObject.link);

    if(catalogObject.is_new){
        catalogElement.classList.add('new');
    }
    
    return catalogElement;
}
var clearCatalogs = function(){
    var catalogItems = document.querySelectorAll('.content__item');
    catalogItems.forEach(function(it){
        it.remove();
    })
}
var appendCatalogs = function(catalogObject, container) {
    clearCatalogs();
    catalogObject.forEach(function(item) {
        var card = renderCatalog(item);
        var cardLink = encodeURI( card.getAttribute('data-link') );
       
        var fileName = card.querySelector('.content__title').textContent;
        container.appendChild(card);
       
        //Open browser pdf
        card.addEventListener('click', function() {
            window.pdf.downloadOpenPdf(cardLink,store,fileName,card);
        });
        
    });
    console.log('Render catalogs');
    removeLoader(loaderCatalog);
}

//template topSlider
var renderTopSlider = function(catalogObject) {
    var prefixImg = 'https://www.centrsvet.ru/media/';
    var catalogElement = catalog.cloneNode(true);
    var dataUrl = 'https://www.centrsvet.ru/api/slider/' + catalogObject.fields.external_url;
    catalogElement.querySelector('img').src = prefixImg + catalogObject.fields.image_url;
    catalogElement.querySelector('.content__title').textContent = catalogObject.fields.title;
    catalogElement.setAttribute('data-url', dataUrl); // присваиваем ссылку для api
    
    return catalogElement;
}
var appendTopSlider = function(slides, container) {
    slides.forEach(function(item) {
        var card = renderTopSlider(item);
        container.appendChild(card);

        card.addEventListener('click', function() {
            var apiUrl = this.getAttribute('data-url');
            console.log(apiUrl);

            //Load and open topSliderPresentation
            window.backend.loadTrend(successTopSliderLoadPresentation, errorTopSliderLoad, apiUrl);
        });
    });
    removeLoader(loaderMain);
}

var successTopSliderLoad = function(data) {
    loadTopSlider = data;

    console.log('Top slider is loaded: ', loadTopSlider)
    appendTopSlider(loadTopSlider,topSliderContainer);
    
}

//instructions load
var successInstr = function (data) {
    loadInstr = data;
    // console.log('Instructions loaded -', loadInstr);
    appendInstr(loadInstr, instructionsWrap);
    appendFilter(loadInstr,checkboxContainer);
};

var erorrInstr = function (textMessage) {
    console.log(textMessage);
    addLoader(loaderInst);
    showErrorInstr(textMessage);
};

// load Instructions file
window.backend.loadInstr(successInstr, erorrInstr);

// template instructions
var instrTemplate = document.querySelector('template.instr-template');
var instructionRow = instrTemplate.content.querySelector('.instructions__item');

var renderInstr = function (instrObject) {
    var instrElement = instructionRow.cloneNode(true);
    var link = 'https://www.centrsvet.ru/catalog/' + instrObject.category_slug + '/' + instrObject.product_slug;
    var pdfFile = 'none';
   
    if(instrObject.files.length) {
        pdfFile = instrObject.files[0];
    }
    instrElement.querySelector('.instructions__title').textContent = instrObject.product_name;
    instrElement.setAttribute('data-link', pdfFile);
    instrElement.setAttribute('item-link', link);
    
    return instrElement;
}

var appendInstr = function(instrObject, container) {
    var sorted = createObjectInstr(sortCategories(loadInstr),instrObject);
    // console.log('Данные для отрисовки - ', sorted);
    var emmptyCounter = 0;

    sorted.forEach(function(item) {
        var group = document.createElement('div');
        var groupTitle = document.createElement('h3');

        groupTitle.classList.add('group__title');
        group.classList.add('group');
        group.setAttribute('data-group', item.name);;
        group.appendChild(groupTitle);
        
        if(item.name !== null) {
            groupTitle.textContent = item.name.toLowerCase();
        }
       
        container.appendChild(group);
        
        item.list.forEach(function(instruction) {
            var instr = renderInstr(instruction);
            var instrLink = encodeURI(instr.getAttribute('data-link'));
            var itemLink = encodeURI(instr.getAttribute('item-link'));
            
           
            if (instrLink !== 'none') {
                group.appendChild(instr);
                //Open browser pdf
                var instrTitle = instr.querySelector('.instructions__title');
                var instrShare = instr.querySelector('.instructions__additional');
                var fileName = instrTitle.textContent;

                instrTitle.addEventListener('click', function() {
                    window.pdf.downloadOpenPdf(instrLink,store,fileName,instr);
                });

            }
            else  {
                emmptyCounter++;
            }
       
            
        });
            
        
    });
    removeLoader(loaderInst);
    console.log('Render instructions');
}

var sortCategories = function(instrList) {
    var uniqueCategories = [];
    instrList.forEach(function(item) {
              
        var newCat = item.category_name;
        if(!uniqueCategories.includes(newCat)) {
            uniqueCategories.push(newCat);
        }
    });

   
    return uniqueCategories;
}

var createObjectInstr = function(category, instrList) {
    var instrArray = [];

    category.forEach(function(it) {
        var newElement = {
            name: it,
            list: []
        }
        instrList.forEach(function (instr) {
            if(instr.category_name == newElement.name) {
                newElement.list.push(instr);
            }
        });
        
        instrArray.push(newElement);
    });



    return instrArray;
}


// template filter
var filterTemplate = document.querySelector('template.filter-template');
var filterRow = filterTemplate.content.querySelector('.filter__group');
var checkboxContainer = document.querySelector('.filter__checkbox');

var renderFilter = function (instrObject) {
    var filterElement = filterRow.cloneNode(true);
    if(instrObject!== null){
        filterElement.querySelector('label').textContent = instrObject.toLowerCase();
        filterElement.querySelector('label').setAttribute('for', instrObject);
        filterElement.querySelector('input').setAttribute('id', instrObject);
        filterElement.querySelector('input').setAttribute('value', instrObject);
    }
    
    return filterElement;
}

var appendFilter = function(categories, container) {
    var titles = sortCategories(categories);
    titles.forEach(function(it){
        if(it !== null) {
            var checkbox = renderFilter(it);
            container.appendChild(checkbox);
        }
        
    })
}

var getDataInstr = function(){
    return loadInstr;
}

var openBrowser = function(url) {
    var ref = cordova.InAppBrowser.open(url,'_blank','location=no,closebuttoncaption=< Back,closebuttoncolor=#ffffff,enableViewportScale=yes,hidenavigationbuttons=yes,usewkwebview=yes,transitionstyle=crossdissolve');
    ref.show();
}

var openVideo = function(videoUrl) {
    var options = {
        successCallback: function() {
            console.log("Video was closed without error.");
        },
        errorCallback: function(errMsg) {
            console.log("Error! " + errMsg);
        },
        shouldAutoClose: true,  
        controls: true 
    };
    window.plugins.streamingMedia.playVideo(videoUrl, options);
}

//Load topSlider
window.backend.loadMain(successTopSliderLoad,errorTopSliderLoad);

//Load topInsperations
window.backend.loadInsperations(successInsperationsLoad,errorTopSliderLoad);

//Табы в FAQ
var questionTitile = document.querySelectorAll('.question__title');
questionTitile.forEach(function(it){
    it.addEventListener('click', function(){
        if (it.classList.contains('active')) {
            it.classList.remove('active');
        } else it.classList.add('active');
    });
});

// Переключение homescreen
var togglersScreens = document.querySelectorAll('.toggler');
var togglerFirst = document.querySelector('.toggler-first');
var togglerSecond = document.querySelector('.toggler-second');
var homeWrapper = document.querySelector('.home');

var disableTooglers = function(){
    togglersScreens.forEach(function(it){
        it.classList.remove('active');
    })
}

togglerFirst.addEventListener('click', function(){
    disableTooglers();
    togglerFirst.classList.add('active');
    homeWrapper.classList.remove('next');
});

togglerSecond.addEventListener('click', function(){
    disableTooglers();
    togglerSecond.classList.add('active');
    homeWrapper.classList.add('next');
    window.instructions.scrollTop();
});

window.index = {
    filters: filters,
    getDataInstr: getDataInstr,
    closeError: closeError,
    renderInstr: renderInstr,
    instructionsWrap: instructionsWrap,
    toggleFilter: toggleFilter,
    openBrowser: openBrowser,
    store: store,
    body: body,
    home: home
  };
})();

