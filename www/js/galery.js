'use strict';
(function () {
    var galeryWrapper = document.querySelector('.galery__wrapper');
    // load Galery json
    var galeryData = [];
    
    var successGalery = function (data) {
        galeryData = data;

        shuffle(galeryData.results);
        appendGalery(galeryData.results, galeryWrapper);
    };

    var erorrGalery = function (textMessage) {
        console.log(textMessage);
    };
    // Random array
    function shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    window.backend.loadGalery(successGalery, erorrGalery);

    // template galery
    var galeryTemplate = document.querySelector('template.galery-template');
    var photo = galeryTemplate.content.querySelector('.galery__item');

    var renderGalery = function (photoObject) {
        var photoElement = photo.cloneNode(true);
        photoElement.querySelector('img').setAttribute('data-src', photoObject.image);
        photoElement.setAttribute('data-link', photoObject.url);
        photoElement.setAttribute('data-category', photoObject.category_list[0].name);
        
        return photoElement;
    }

    var appendGalery = function(photoObject, container) {
        photoObject.forEach(function(item) {
            var card = renderGalery(item);
            var cardLink = encodeURI( card.getAttribute('data-link') );
        
            container.appendChild(card);

            card.addEventListener('click', function() {
                appendPopup(item, window.index.body);
            });
            
        });
        console.log('Render galery');
    }

    var galeryPopupTemplate = document.querySelector('template.popup-galery-template');
    var popup = galeryPopupTemplate.content.querySelector('.popup-galery');
    

    var renderGaleryPopup = function(item) {
        var popupGalery = popup.cloneNode(true);
        popupGalery.querySelector('img').src = item.image;
        popupGalery.querySelector('.popup-galery__title').textContent = item.name;
        popupGalery.querySelector('.popup-galery__link').setAttribute('data-link', item.url);
        popupGalery.querySelector('.popup-galery__description').innerHTML = item.description;
        // popupGalery.querySelector('.popup-galery__category').textContent = item.category_list[0].name;

        return popupGalery;
    }

    var appendPopup = function(data, container) {
        var popupItem = renderGaleryPopup(data);
        var popupLink = popupItem.querySelector('.popup-galery__link');
        var popupLinkUrl = encodeURI( popupLink.getAttribute('data-link') );
        
        container.appendChild(popupItem);
        galeryWrapper.classList.add('popup');
        setTimeout(() => {
            popupItem.classList.add('open');
            window.index.home.classList.add('short');
        }, 300);
       
        popupLink.addEventListener('click', function() {
            window.index.openBrowser(popupLinkUrl);
        });

        var close = popupItem.querySelector('.popup-close');

        close.addEventListener('click', function(){
            popupItem.classList.remove('open');
            galeryWrapper.classList.remove('popup');
            window.index.home.classList.remove('short');
            setTimeout(() => {
                popupItem.remove();
                
            }, 300);
        });
      
        var slider = Peppermint(document.getElementById('peppermint'), {
            dots: true,
            slideshow: false,
            speed: 500,
            disableIfOneSlide: true,
            onSetup: function(n) {
              console.log('Peppermint setup done. Slides found: ' + n);
            }
        });
    }
})();