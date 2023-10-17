var inputData = '';
var ouputData = '';

function convertHeaderTable() {
    document.querySelector('.reSult').innerHTML="";
    inputData = document.getElementById('input').value;
    inputData = inputData.replace(/icon-search/g, 'search-icon');
    inputData = inputData.replace(/doaction-point/g, 'doaction on'); 
    $(".reSult").append(inputData);
    $("colgroup").remove();
    var tr = document.getElementsByTagName("tr");
    for (var i = 0; i < tr.length; i++) {
        var cells = tr[i].cells;
        for (var j = 0; j < cells.length; j++) {
            var isfirstdepth = false;
            if (cells[j] && cells[j].nodeName == "TH" && cells[j].children.length > 0) {
                for (k = 0; k < cells[j].children.length; k++) {
                    if (cells[j].children[k].nodeName == "SPAN" && cells[j].children[k].className == "selection-grp") {
                        const div = document.createElement('div');

                        div.innerHTML = cells[j].querySelector('span').innerHTML
                        if (div.querySelectorAll('label')) {
                            for (var t = 0; t < div.querySelectorAll('label').length; t++) {
                                const iTg = document.createElement('i');
                                div.querySelectorAll('label')[t].insertBefore(iTg, div.querySelectorAll('label')[t].childNodes[0]);
                            }
                        }
                        div.setAttribute("class", "firstdepth-other"); 
                        tr[i].insertBefore(div, tr[i].childNodes[0]); 
                        cells[j].remove();
                        isfirstdepth == true;
                    }
                }
            }
            if (cells[j] && cells[j].nodeName == "TH" && cells[j + 1] && cells[j + 1].nodeName == "TD" && isfirstdepth == false) {
                const label = document.createElement("label");
                const textNode = document.createTextNode(cells[j].textContent);
                const atribuites = cells[j].attributes;
                if (atribuites.length > 0) {
                    for (var k = 0; k < atribuites.length; k++) {
                        label.setAttribute(atribuites[k].name, atribuites[k].textContent);
                    }
                } 
                label.appendChild(textNode);
                cells[j + 1].insertBefore(label, cells[j + 1].children[0])
                cells[j].remove();
            }
        }

    }
    for (var i = 0; i < tr.length; i++) {
        var cells = tr[i].cells;
        for (var j = 0; j < cells.length; j++) {
            const div = document.createElement('div');
            div.setAttribute("class", "search-inputbox");
            if (cells[j].nodeName == "TD") {
                const atribuites = cells[j].attributes;
                if (atribuites.length > 0) {
                    for (var k = 0; k < atribuites.length; k++) {
                        if (atribuites[k].name == "class") {
                            div.setAttribute(atribuites[k].name, div.classList + " " + atribuites[k].textContent);
                        } else {
                            div.setAttribute(atribuites[k].name, atribuites[k].textContent);
                        }

                    }
                }
                div.innerHTML = cells[j].innerHTML
                div.removeAttribute("rowspan");
                div.removeAttribute("colspan");
                tr[i].append(div);
            }
        }

    }
    $("td").remove(); 
    for (var i = 0; i < tr.length; i++) {
        var cells = tr[i].querySelectorAll('div');
        for (var j = 0; j < cells.length; j++) {
            const div = tr[i].querySelectorAll('div')[j]
            var isSearchIcon = false;
            var isDatepicker = false;
            var isMandatory = false;
            var isRadio = false;
            var isCheckBox = false;
            if (div.children.length > 0) {
                for (var k = 0; k < div.children.length; k++) {
                    if (div.children[k].attributes.length > 0) {
                        for (var h = 0; h < div.children[k].attributes.length; h++) {
                            if (div.children[k].attributes[h].name == "class" && div.children[k].attributes[h].textContent == "search-icon") {
                                isSearchIcon = true;
                            }
                            if (div.children[k].attributes[h].name == "data-nx" && div.children[k].attributes[h].textContent.indexOf("type:'date'") != -1) {
                                isDatepicker = true;
                            }
                            if (div.children[k].attributes[h].name == "data-nx" && div.children[k].attributes[h].textContent.indexOf("required:true") != -1) {
                                isMandatory = true;
                            }
                            if (div.children[k].attributes[h].name == "type" && div.children[k].attributes[h].textContent == "radio") {
                                isRadio = true;
                            }
                            if (div.children[k].attributes[h].name == "type" && div.children[k].attributes[h].textContent == "checkbox") {
                                isCheckBox = true;
                            }
                        }
                    }
                    if (div.children[k].nodeName == "SPAN" && div.children[k].classList.contains("selection-grp")) {
                        var isRadioSp = false;
                        var isCheckBoxSp = false;
                        if (div.children[k].querySelectorAll('label')) {
                            for (var c = 0; c < div.children[k].querySelectorAll('label').length; c++) {
                                var iTag = document.createElement('i');
                                div.children[k].querySelectorAll('label')[c].insertBefore(iTag, div.children[k].querySelectorAll('label')[c].childNodes[0]);
                            }
                        }
                        if (div.children[k].querySelectorAll('input')) {
                            for (var c = 0; c < div.children[k].querySelectorAll('input').length; c++) {
                                var atr = div.children[k].querySelectorAll('input')[c].attributes;
                                // debugger
                                if (atr) {
                                    for (var t = 0; t < atr.length; t++) {
                                        if (div.children[k].querySelectorAll('input')[c].attributes[t].name == "type"
                                            && div.children[k].querySelectorAll('input')[c].attributes[t].textContent == "radio") {
                                            isRadio = true;
                                            isRadioSp = true;
                                        }
                                        if (div.children[k].querySelectorAll('input')[c].attributes[t].name == "type"
                                            && div.children[k].querySelectorAll('input')[c].attributes[t].textContent == "checkbox") {
                                            isCheckBox = true;
                                            isCheckBoxSp = true;
                                        }
                                    }
                                }

                            }
                        } 
                        if (isRadioSp) div.children[k].setAttribute("class", div.children[k].classList + " radio-wrap")
                        if (isCheckBoxSp) div.children[k].setAttribute("class", div.children[k].classList + " check-wrap")
                    }
                }
            }
            if (isSearchIcon) div.setAttribute("class", div.classList + " search");
            if (isDatepicker) div.setAttribute("class", div.classList + " datepicker");
            if (isMandatory) div.setAttribute("class", div.classList + " mandatory");
            if (isRadio) div.setAttribute("class", div.classList + " radio");
            if (isCheckBox) div.setAttribute("class", div.classList + " checkbox"); 
        } 
    }
    var strResult = document.querySelector('.reSult').innerHTML;
    strResult = strResult.replace(/<table/g, '<dl')
    strResult = strResult.replace(/<\/table/g, '</dl')
    strResult = strResult.replace(/<tbody>/g, '')
    strResult = strResult.replace(/<\/tbody>/g, '')
    strResult = strResult.replace(/<tr>/g, '')
    strResult = strResult.replace(/<\/tr>/g, '') 
    strResult = strResult.replace(/state-alert /g, '') 
    strResult = strResult.replace(/<th>/g, '') 
    strResult = strResult.replace(/<\/th>/g, '') 
    strResult = strResult.replace(/box-r/g, '') 
    strResult = strResult.replace(/&nbsp;/g, '') 
    document.getElementById('ouput').value = strResult;
}

function convertMainTable(){
    document.querySelector('.reSult').innerHTML="";
    inputData = document.getElementById('input').value;
    inputData = inputData.replace(/icon-search/g, 'search-icon');
    inputData = inputData.replace(/doaction-point/g, 'doaction on'); 
    $(".reSult").append(inputData);
    var tr = document.getElementsByTagName("tr");
    if(tr){
        for(var i =0 ; i < tr.length; i++){
            var cells = tr[i].cells;
            if(cells){
                for(var j =0; j < cells.length; j++){
                    var div = document.createElement('div');
                    var span = document.createElement('span');
                    div.setAttribute("class","wide-td");
                    span.setAttribute("class","main-inputbox");
                    if(cells[j].nodeName=="TD"){
                        var isSearchIcon = false;
                        var isDatepicker = false;
                        var isMandatory = false;
                        var isRadio = false;
                        var isCheckBox = false;
                        if(cells[j].children){
                            for(var k = 0; k < cells[j].children.length; k++){
                                for(var t = 0; t < cells[j].children[k].attributes.length; t++){
                                    if (cells[j].children[k].attributes[t].name == "class" && cells[j].children[k].attributes[t].textContent == "search-icon") {
                                        isSearchIcon = true;
                                    }
                                    if (cells[j].children[k].attributes[t].name == "data-nx" && cells[j].children[k].attributes[t].textContent.indexOf("type:'date'") != -1) {
                                        isDatepicker = true;
                                    }
                                    if (cells[j].children[k].attributes[t].name == "data-nx" && cells[j].children[k].attributes[t].textContent.indexOf("required:true") != -1) {
                                        isMandatory = true;
                                    }
                                    if (cells[j].children[k].attributes[t].name == "type" && cells[j].children[k].attributes[t].textContent == "radio") {
                                        isRadio = true;
                                    }
                                    if (cells[j].children[k].attributes[t].name == "type" && cells[j].children[k].attributes[t].textContent == "checkbox") {
                                        isCheckBox = true;
                                    }
                                } 
                            }
                        }
                        if (isSearchIcon) span.setAttribute("class", span.classList + " search");
                        if (isDatepicker) span.setAttribute("class", span.classList + " datepicker");
                        if (isMandatory) span.setAttribute("class", span.classList + " mandatory");
                        if (isRadio) span.setAttribute("class", span.classList + " radio");
                        if (isCheckBox) span.setAttribute("class", span.classList + " checkbox"); 
                        span.innerHTML=cells[j].innerHTML;
                        div.appendChild(span);
                        cells[j].innerHTML = "";
                        cells[j].append(div);
                    }
                }
            }
        }
    }
    var strResult = document.querySelector('.reSult').innerHTML;
    document.getElementById('ouput').value = strResult; 
}

function convertHTML(){
    inputData = document.getElementById('input').value;
    inputData = inputData.replace('/oceans/script/comm/sysfiles.js','/oceans/script/comm/_sysfiles.js'); 
    inputData = inputData.replace(/icon-search/g, 'search-icon');
    inputData = inputData.replace(/doaction-point/g, 'doaction on');
    inputData = inputData.replace('class="buttonset fr">', 'class="buttonset fr"><button type="button" class="search-showhide-icon" id="logDetailSearch"></button><button type="button" class="dofilter-save" id="btnSave"></button><button type="button" class="dorefresh" id="logCondClear"></button>');
    if(inputData.indexOf('<footer>')==-1){
        inputData = inputData.replace('</main>', '</main><footer></footer>');  
    }
    $(".reSult").append(inputData); 
    document.getElementById('ouput').value = inputData;           
}

// https://webformatter.com/html 