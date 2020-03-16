'use strict';

(function () {
  var INSTRUCTIONS_URL = 'https://www.centrsvet.ru/catalog/api/product_pdf_files/';
  var URL_LOAD = 'https://www.centrsvet.ru/art.json';
  var GALERY_URL = 'https://www.centrsvet.ru/centrsvet_api/ProductForApp/';
  var MAIN_URL = 'https://www.centrsvet.ru/api/slider/app_top/';
  var TREND_URL ='https://www.centrsvet.ru/api/slider/app_trend/';
  var NEW_URL = '';
  var INSPERATIONS_URL = 'https://www.centrsvet.ru/api/slider/app_insperations/';
  var URL_UPLOAD = '';
  var LOAD_TIMEOUT = 10000;
  var UPLOAD_TIMEOUT = 5000;
  var SUCCESS_CODE = 200;
  
  var ERRORS = {
    ERROR_LOAD: 'Произошла ошибка во время загрузки. Статус ответа: ',
    ERROR_SERVER: 'Произошла ошибка соединения',
    ERROR_TIMEOUT: 'Запрос не успел выполниться за '
  };
  
  var LOAD_METHOD = 'GET';
  var UPLOAD_METHOD = 'POST';

  var configXhr = function (loadHandler, errorHandler, url, method, timeout, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        loadHandler(xhr.response);
      } else {
        errorHandler(ERRORS.ERROR_LOAD + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      errorHandler(ERRORS.ERROR_SERVER);
    });
    xhr.addEventListener('timeout', function () {
      errorHandler(ERRORS.ERROR_TIMEOUT + xhr.timeout + 'мс');
    });

    xhr.timeout = timeout;
    xhr.open(method, url);
    
    if (data) {
      xhr.send(data);
    } else {
      xhr.send();
    }
  };

  var load = function (loadHandler, errorHandler) {
    configXhr(loadHandler, errorHandler, URL_LOAD, LOAD_METHOD, LOAD_TIMEOUT);
  };

  var upload = function (data, loadHandler, errorHandler) {
    configXhr(loadHandler, errorHandler, URL_UPLOAD, UPLOAD_METHOD, UPLOAD_TIMEOUT, data);
  };
 
  var loadInstr = function (loadHandler, errorHandler) {
    configXhr(loadHandler, errorHandler, INSTRUCTIONS_URL, LOAD_METHOD, LOAD_TIMEOUT);
  };

  var loadGalery = function (loadHandler, errorHandler) {
    configXhr(loadHandler, errorHandler, GALERY_URL, LOAD_METHOD, LOAD_TIMEOUT);
  };

  var loadMain = function (loadHandler, errorHandler) {
    configXhr(loadHandler, errorHandler, MAIN_URL, LOAD_METHOD, LOAD_TIMEOUT);
  };

  var loadTrend = function (loadHandler, errorHandler,url) {
    configXhr(loadHandler, errorHandler, url, LOAD_METHOD, LOAD_TIMEOUT);
  };

  var loadNew = function (loadHandler, errorHandler) {
    configXhr(loadHandler, errorHandler, NEW_URL, LOAD_METHOD, LOAD_TIMEOUT);
  };

  var loadInsperations = function (loadHandler, errorHandler) {
    configXhr(loadHandler, errorHandler, INSPERATIONS_URL, LOAD_METHOD, LOAD_TIMEOUT);
  };

  window.backend = {
    load: load,
    upload: upload,
    loadInstr: loadInstr,
    loadGalery: loadGalery,
    loadMain: loadMain,
    loadTrend: loadTrend,
    loadNew: loadNew,
    loadInsperations: loadInsperations
  };
})();



