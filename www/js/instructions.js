'use strict';
(function () {
var resetBtn = document.querySelector('.reset__btn');
var searchBtn = document.querySelector('.search__btn');
var searchField = document.querySelector('.search__field');
var checkBtn = document.querySelector('.check-all__btn')


function resetFilters() {
    var group = document.querySelectorAll('.instructions .group');
    group.forEach(function(it){
        it.style.display ='block';
    });

    dissmisAll();
    searchField.value = "";
}

function checkAll() {
    var checkBox = document.querySelectorAll('.checkbox-instr');
    checkBtn.classList.add('cheked');
    checkBox.forEach(function(it) {
        it.checked = 1;
    });
}

function dissmisAll() {
    var checkBox = document.querySelectorAll('.checkbox-instr');
    checkBtn.classList.remove('cheked');
    checkBox.forEach(function(it) {
        it.checked = 0;
    });
}

function search() {
    hideRepeat();
    if ( searchField.value != "") {
        return searchByText();
    }

    closeGroup();

    var checkBox = document.querySelectorAll('.checkbox-instr');
    var checkedCount = 0;
    checkBox.forEach(function(it){
        if(it.checked) {
            checkedCount++;
            var currentGroup = document.querySelector(`[data-group='${it.value}']`);
            currentGroup.style.display ='flex';
        }
        
    });

    if(checkedCount == 0) {
        createSearchMessage();
    }
    scrollTop();
    window.index.toggleFilter();
}

function createSearchMessage(){
    var group = document.createElement('div');
    var groupTitle = document.createElement('h3');
    group.classList.add('group');
    group.classList.add('group--search');
    groupTitle.classList.add('group__title');
    groupTitle.classList.add('group__title--error');
    groupTitle.textContent = `Ничего не выбрано`;
    var repeat = document.createElement('a');
    repeat.textContent = 'Изменить параметры поиска';
    repeat.classList.add('search-repeat');
    group.appendChild(groupTitle);
    group.appendChild(repeat);
    repeat.addEventListener('click', window.index.toggleFilter);
    window.index.instructionsWrap.appendChild(group);
}

function closeFilter(){
    window.index.filters.classList.remove('show');
    backBtnFilter.style.display = "block";
}

function closeGroup(){
    var group = document.querySelectorAll('.instructions .group');
    group.forEach(function(it){
        it.style.display ='none';
    });
}

function scrollTop() {
    window.scrollTo(0, -200);
}

function hideRepeat(){
    var repeatBtns = document.querySelectorAll('.search-repeat');
    repeatBtns.forEach(function(it){
        it.remove();
    })
}

function appendSearchResult(data, container) {
    var group = document.createElement('div');
    var groupTitle = document.createElement('h3');
    var length = data.length;
    var storeCopy = cordova.file.cacheDirectory;

    groupTitle.classList.add('group__title');
    groupTitle.textContent = `Найдено: ${length}`;
    group.classList.add('group');
    group.classList.add('group--search');
    group.appendChild(groupTitle);
    container.appendChild(group);
    if(length !== 0) {
        data.forEach(function(item) {
            var instr = window.index.renderInstr(item);
            var instrLink = encodeURI( instr.getAttribute('data-link') );
            
            var itemLink = instr.getAttribute('item-link');
            group.appendChild(instr);
            scrollTop();
            //Open browser pdf
            var instrTitle = instr.querySelector('.instructions__title');
            var instrShare = instr.querySelector('.instructions__additional');
            var fileName = instrTitle.textContent;

            instrTitle.addEventListener('click', function() {
                window.pdf.downloadOpenPdf(instrLink,storeCopy,fileName,instr);
            });
        })
    }
    else {
        scrollTop();
        groupTitle.textContent = `Не найдено`;
        groupTitle.classList.add('group__title--error');
        var repeat = document.createElement('a');
        repeat.textContent = 'Изменить параметры поиска';
        repeat.classList.add('search-repeat');
        group.appendChild(repeat);
        repeat.addEventListener('click', window.index.toggleFilter);
    }
}

function searchByText() {
    closeGroup();
    window.index.toggleFilter();
    var searchValue = searchField.value.toLowerCase();
    var data = window.index.getDataInstr();
    var appendData = [];

    data.forEach(function(it){
        if (it.product_name.toLowerCase().includes(searchValue)){
            appendData.push(it);
        }
    });
    appendSearchResult(appendData,window.index.instructionsWrap);
    scrollTop();
}

resetBtn.addEventListener('click', resetFilters);
searchBtn.addEventListener('click', search);
checkBtn.addEventListener('click', checkAll);

window.instructions = {
    resetFilters : resetFilters,
    search: search,
    checkAll: checkAll,
    scrollTop: scrollTop
  };
})();


