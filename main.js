var beforContent =""; 
var afterContent =""
var cntTemp = '';
function convertGrid(){ 
   beforContent = document.getElementById("content").value;
   afterContent = document.getElementById("content").value;  
    var dynamicGrid = beforContent.search('dynamicGrid')
    var numberingTitleText = beforContent.search('numberingTitleText')
    var totalCntString = beforContent.search('totalCntString')
    var toolbarPosition = beforContent.search('toolbarPosition')
    var gridHdr = beforContent.search('gridHeader')
    var grid = beforContent.trim().search('grid:') 
    var gridHeader = 'gridHeader:'; 
    var space =" ";
    var arrLg =[];
    if(grid ==0 && gridHdr >0){
    for(var i = gridHdr-2; i > 0; i--) {
      // debugger 
      if(beforContent.charAt(i)== '\n')
      break;
      space = space + " ";
    }
   if(dynamicGrid>=0){  
      for(var i= dynamicGrid + 11; i<beforContent.length; i++) {
       if(beforContent.charAt(i)==',') 
            break;
            cntTemp += beforContent.charAt(i); 
      } 
      afterContent = afterContent.replace('dynamicGrid' + cntTemp,'dynamicGrid:true'); 
      cntTemp = '';
   }else{ 
      afterContent = afterContent.replace(gridHeader,'dynamicGrid:true, \n'+space + gridHeader); 
   }

   if(numberingTitleText>=0){  
      for(var i= numberingTitleText + 18; i<beforContent.length; i++) {
       if(beforContent.charAt(i)==',') 
            break;
            cntTemp += beforContent.charAt(i); 
      } 
      afterContent = afterContent.replace('numberingTitleText' + cntTemp,'numberingTitleText:"%$No.:No.$%"');
      cntTemp = '';
   } 
   if(totalCntString>=0){   
      for(var i= totalCntString + 14; i<beforContent.length; i++) {
       if(beforContent.charAt(i)==',') 
            break;
            cntTemp += beforContent.charAt(i); 
      } 
      afterContent = afterContent.replace('totalCntString' + cntTemp,'totalCntString: "Total %d result(s)"'); 
      cntTemp = '';
   }else{ 
      afterContent = afterContent.replace(gridHeader,'totalCntString: "Total %d result(s)", \n' +space + gridHeader); 
   }
   var toolbarId = '#';
   for(var j = grid + 6;j<beforContent.length; j++ ){ 
      if(beforContent.trim().charAt(j) == ':') 
      break;
      toolbarId += beforContent.trim().charAt(j); 
    } 
    toolbarId = toolbarId.replace(/\n|\r/g, "");
    toolbarId = toolbarId.replace(/\s+/g,'').trim();
   if(toolbarPosition>=0){  
       
      for(var i= toolbarPosition + 15; i<beforContent.length; i++) {
       if(beforContent.charAt(i)==',') 
            break; 
            cntTemp += beforContent.charAt(i); 
      } 
      
      afterContent = afterContent.replace('toolbarPosition' + cntTemp,'toolbarPosition:'+'"' + toolbarId.trim() + '"'); 
      cntTemp = '';
   }else{ 
      afterContent = afterContent.replace(gridHeader,'toolbarPosition:' + '"'+ toolbarId.trim() +'"' +', \n'+space + gridHeader); 
   }   
   var p ='';
   for(var i=0; i<beforContent.length; i++){
      var w = beforContent.charAt(i);
      var y = beforContent.charAt(i+1);
      var d = beforContent.charAt(i+2);
      var t = beforContent.charAt(i+3);
      var h = beforContent.charAt(i+4);
      var f = beforContent.charAt(i+5); 
      if(w+y+d+t+h+f =='width:'){  
         var k = '';   
         for(var j = i+5; j <beforContent.length; j++){ 
            if(beforContent.charAt(j)=='%')
            break;
            if(Number.isFinite(parseInt(beforContent.charAt(j))) || beforContent.charAt(j)=='.'){ 
               p += beforContent.charAt(j)
            } 
         }
         k = (parseInt(p)*1280/100).toString(); 
         afterContent = afterContent.replace(p+'%',k+'px');  
      } 
      p=''; 
      var n = beforContent.charAt(i);
      var a = beforContent.charAt(i+1);
      var m = beforContent.charAt(i+2);
      var e = beforContent.charAt(i+3); 
      var u = beforContent.charAt(i+4); 
      if(n+a+m+e+u =='name:'){   
         var c = ''; 
         for(var w = i; w <beforContent.length; w++){  
            if(beforContent.charAt(w)=='}' && beforContent.charAt(w+1).trim()==',')
            break;
            c += beforContent.charAt(w) 
            
         } 
         var r='' 
            for(var k = i; k <beforContent.length; k++){ 
               if(beforContent.charAt(k)==',' )
               break;
               r += beforContent.charAt(k) 
            } 
            var dtTmp = r.trim().replace('name:','');
            
            if(c.indexOf('align:')==-1){  
               if((dtTmp.startsWith('"%$')== false || dtTmp.substring(dtTmp.length-3) !='$%"')&& (dtTmp.replace(/"/g,'').trim()!='')){  
                  var tmp = r.replace(dtTmp.replace(/"/g,''),'%$'+dtTmp.replace(/"/g,'')+':nokey$%')
                  arrLg.push(dtTmp.replace(/"/g,''));
                  afterContent = afterContent.replace(r,tmp+',align: left');    
               }else{
                  afterContent = afterContent.replace(r,r+',align: left');  
               }
               
            }else{
               if((dtTmp.startsWith('"%$')== false || dtTmp.substring(dtTmp.length-3) !='$%"')&& (dtTmp.replace(/"/g,'').trim()!='')){ 
                  var tmp = r.replace(dtTmp.replace(/"/g,''),'%$'+dtTmp.replace(/"/g,'')+':nokey$%')  
                  arrLg.push(dtTmp.replace(/"/g,''));
                  afterContent = afterContent.replace(r,tmp); 
               }
            }
            
            
        
      } 
      
      // afterContent = afterContent.replace(c,c+',align: left'); 
      document.getElementById("reSult").value = afterContent
   } 
   
   if(arrLg.length > 0){ 
      var arrTmp= arrLg.toString();  
      document.getElementById('multiLaguage').innerHTML= arrTmp.replace(/,/g,'\n')
      document.querySelector("dialog").showModal();
      // document.write('multi laguage: \n'+ arrTmp.replace(',','\n')); 
   }
   arrLg = [];  
}else{
   alert("data is not valid");
}

}

function convertTable(){ 
   beforContent = document.getElementById("content").value;
   afterContent = document.getElementById("content").value;   
   var arrLg =[];
   // afterContent = afterContent.replace('/oceans/script/comm/sysfiles.js', '/oceans/script/comm/_sysfiles.js'); 
   afterContent = afterContent.replace(/icon-search/g, 'search-icon');
   afterContent = afterContent.replace(/doaction-point/g, 'doaction on');
   afterContent = afterContent.replace(/<table>/g, '');
   afterContent = afterContent.replace(/<\/table>/g, '');
   afterContent = afterContent.replace(/<tbody>/g, '');
   afterContent = afterContent.replace(/<\/tbody>/g, '');
   afterContent = afterContent.replace(/<tr/g, '<dl');
   afterContent = afterContent.replace(/<\/tr/g, '</dl');
   afterContent = afterContent.replace(/<th/g, '<label');
   afterContent = afterContent.replace(/<\/th/g, '</label');
   afterContent = afterContent.replace(/<td/g, '<div');
   afterContent = afterContent.replace(/<\/td/g, '</div');
   // if(afterContent.indexOf('<footer>')==-1){
   //    afterContent = afterContent.replace('</main>', '</main>\n          <footer></footer>');  
   // }else{ 
   // }
   
   var startColgroup = beforContent.trim().indexOf('<colgroup');
   var endColgroup = beforContent.trim().indexOf('</colgroup');
   var tmp ='';
   for(var i=0;i<beforContent.length;i++){
      // colgroup
      var a = beforContent.charAt(i);
      var b = beforContent.charAt(i+1);
      var c = beforContent.charAt(i+2);
      var d = beforContent.charAt(i+3);
      var e = beforContent.charAt(i+4); 
      var g = beforContent.charAt(i+5);
      var h = beforContent.charAt(i+6);
      var l = beforContent.charAt(i+7);
      var m = beforContent.charAt(i+8);  
      if(a+b+c+d+e+g+h+l+m=='<colgroup'){ 
         for(var j = i; j<beforContent.length;j++){
             var a = beforContent.charAt(j);
             var b = beforContent.charAt(j-1);
             var c = beforContent.charAt(j-2);
             var d = beforContent.charAt(j-3);
             var e = beforContent.charAt(j-4); 
             var g = beforContent.charAt(j-5);
             var h = beforContent.charAt(j-6);
             var l = beforContent.charAt(j-7);
             var m = beforContent.charAt(j-8);
             var n = beforContent.charAt(j-9);
             var o = beforContent.charAt(j-10);
             tmp += beforContent.charAt(j);
             if(o+n+m+l+h+g+e+d+c+b+a =='</colgroup>'){ 
               afterContent = afterContent.replace(tmp, '');
               break;
             }  
         } 
         tmp='';
      }  
   }
   beforContent = afterContent;
   for(var i=0;i<beforContent.length;i++){
      var a = beforContent.charAt(i);
      var b = beforContent.charAt(i+1);
      var c = beforContent.charAt(i+2);
      if(a+b+c =='<dl'){
         var tmp2='';
         for(var j = i; j<beforContent.length;j++){
            var a = beforContent.charAt(j);
            var b = beforContent.charAt(j-1);
            var c = beforContent.charAt(j-2);
            var d = beforContent.charAt(j-3);
            tmp += beforContent.charAt(j);
            if(d+c+b+a =='</dl')break;
         } 
         for(var k =0 ; k< tmp.length;k++){
            var a = tmp.charAt(k);
            var b = tmp.charAt(k+1);
            var c = tmp.charAt(k+2);
            var d = tmp.charAt(k+3);
            if(a+b+c+d =='<div'){
               for(var h = k; h<tmp.length;h++){
                  var a = tmp.charAt(h);
                  var b = tmp.charAt(h-1);
                  var c = tmp.charAt(h-2);
                  var d = tmp.charAt(h-3);
                  var v = tmp.charAt(h-4);
                  tmp2 += tmp.charAt(h);
                  if(v+d+c+b+a =='</div')break;
               }  
               var searchIcon = tmp2.includes('search-icon')  ? ' search':'';
               var required = tmp2.includes('required:true') ? ' required':'';
               var typeDate = tmp2.includes('type:'+'date')  ? ' datepicker':'';
               var selectbox = tmp2.includes('selectbox')  ? ' selectbox':'';
               var sunffixes = searchIcon+required+typeDate+selectbox;
               var tmp3 = tmp2.replace('<div', '<div class = "search-inputbox' + sunffixes+'"')
               tmp3 = tmp3.replace('class="co-w"','');
               afterContent = afterContent.replace(tmp2, tmp3);
               tmp2 ='';
             }

      }
   } 
   }
   
   document.getElementById("reSult").value = afterContent;
}
function closeDialog(){
   document.querySelector("dialog").close();
}
// function clickToCopy(e) {
//    let input = document.createElement('input')  
//    document.body.appendChild(input)  
//    input.value = document.getElementById("test").value // gán giá trị vào input
//    input.select()  // focus vào input
//    document.execCommand('copy')  
//    input.remove()  
// }
 


