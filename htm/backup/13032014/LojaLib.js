function MostraMaxParcela(PrecoProd,MaxParcelas){
  var ComSem;
  maxParcela = MaxParcelas;
 if(PrecoProd>=30)MaxParcelas=10;
  if(PrecoProd==0||MaxParcelas==1||Juros.length==0)return;
  if(MaxParcelas==0||MaxParcelas>Juros.length)MaxParcelas=Juros.length;
  if(Juros[MaxParcelas-1]>0)ComSem=""; else ComSem="&nbsp;sem&nbsp;juros";
  document.write("ou&nbsp;<b>"+MaxParcelas+"x</b>"+ComSem+" de&nbsp;<b>"+FormatPrecoReais(CalculaParcelaJurosCompostos(PrecoProd,MaxParcelas))+"</b>");
}

// Filtros
function AjustaFiltros(){ 
  var bTemPathQts=false;
  var oUlPathCatQt=document.getElementById("idUlPathCatQtFC");
  if(oUlPathCatQt){bTemPathQts=true;}else{document.getElementById('idListaProdCategoriasFC').style.display='none';}
  var oUlAdic1Qt=document.getElementById("idUlAdic1QtFC");
  if(oUlAdic1Qt){bTemPathQts=true;}else{document.getElementById('idListaProdAdicional1FC').style.display='none';}
  var oUlAdic2Qt=document.getElementById("idUlAdic2QtFC");
  if(oUlAdic2Qt){bTemPathQts=true;}else{document.getElementById('idListaProdAdicional2FC').style.display='none';}
  var oUlAdic3Qt=document.getElementById("idUlAdic3QtFC");
  if(oUlAdic3Qt){bTemPathQts=true;}else{document.getElementById('idListaProdAdicional3FC').style.display='none';}
  //Caso n√£o tenha produtos em categorias/adicionais encontrados, remove div
}

//### Guarda em variavel a pagina atual
var sPagAtual=document.location.href.toUpperCase();

//### fun√ß√£o para link no topo
function LinkTop(sTitle,sPage,sParam,sStyle){ 
  sPageM=sPage.toUpperCase();
  if(sPageM=='CADASTRO' || sPageM=='TRACK'){sURL='https://www.rumo.com.br/';sTarget='top';}else {sURL='';sTarget='window'}
  if(sPagAtual.indexOf(sPageM+'.ASP')>=0 && sPagAtual.indexOf(sParam.toUpperCase())>=0){
    document.write('<table width=100% class='+sStyle+'_On align=center OnClick='+sTarget+'.location.href="'+sURL+sPage+'.asp?IDLoja='+IDLoja+sParam+'" cellspacing=0 cellpadding=0><tr><td align=center>'+sTitle+'</td></tr></table>');}
   else{
    document.write('<table width=100% class='+sStyle+'_Off align=center OnMouseOut=this.className="'+sStyle+'_Off" OnMouseOver=this.className="'+sStyle+'_Hover" OnClick='+sTarget+'.location.href="'+sURL+sPage+'.asp?IDLoja='+IDLoja+sParam+'" cellspacing=0 cellpadding=0><tr><td align=center>'+sTitle+'</td></tr></table>');}
}

//### fun√ß√£o para link no rodap√©
function LinkPag(sTitle,sPage,sParam,sStyle){ 
  sPageM=sPage.toUpperCase();
  if(sPageM=='CADASTRO' || sPageM=='TRACK'){sURL='https://www.rumo.com.br/';sTarget=' target=_top';}else {sURL='';sTarget=''}
  var str='<a href=';
  str+=sURL+sPage+'.asp?IDLoja='+IDLoja+sParam+' class='+sStyle;
  if(sPagAtual.indexOf(sPageM+'.ASP')>=0 && sPagAtual.indexOf(sParam.toUpperCase())>=0)str +='_On';
  else str +='_Off';
  str+=sTarget+'>'+sTitle+'</a>';
  document.write(str);
}


//### Fun√ß√£o que abre janela de chat
function MostraChatP(){
 popup=window.open('ChatLogin.asp?IDLoja='+IDLoja,'Chat','top=20,left=20,height=280,width=390,scrollbars=no,resizable=yes');
 popup.focus();return void(0);}

function PrepareTextUA_AS(sText){
  return sText.replace(/[^a-z0-9¿¡¬√«»… Õ—”‘’⁄‹‡·‚„ÁËÈÍÌÒÛÙı˙¸"".+]/gi,'-').replace(/\+\+/g,'-').toLowerCase();
}

//FunÁ„o que valida a busca  
function VerTexto(oNome){
 if (oNome.Texto.value=='' || oNome.Texto.value.length<2){
   alert('Busca inv·lida.');
   oNome.Texto.focus();
   return false;}
 else{
   location.href="/prod,IDLoja,"+ FC$.IDLoja +",digitada,true,texto,"+ PrepareTextUA(oNome.Texto.value);
   //BuscaURL(oNome.Texto.value);
   return false;
   }
}

//function MostraFreteGratis(iPeso){
//frete gratis
//if(iPeso==0)document.write("frete");
//}

function MostraFreteGratis(iPeso){
  //iPeso=parseFloat(iPeso.replace(",","."));
  //alert(iPeso);
  //if(iPeso==0)document.write("<div id='fc-frete'><img src='"+sCaminhoImages+"BtFreteGratis.gif'></div>");
  if(iPeso==0)document.write("<div id='fc-frete'>FRETE GR¡TIS</div>");
}


//comprar sem sair da pagina
var oDivShowCartOnPage=null;
var iLastCartOnPage=0;

function ShowCartOnPage(IDLoja,iErr,sMsg,sCartText,sCheckoutText,este){
  var oPos=getPos(este);
  if(oDivShowCartOnPage==null){
    var oNewElement=document.createElement("div");
    oNewElement.setAttribute("id","DivShowCartOnPage"); 
    oDivShowCartOnPage=este.parentNode.insertBefore(oNewElement,este);
  }
  oDivShowCartOnPage.style.color="#555555";
  oDivShowCartOnPage.style.marginTop="-100px";
  oDivShowCartOnPage.style.marginLeft="-70px";
  oDivShowCartOnPage.style.position="absolute";
  oDivShowCartOnPage.style.zIndex="1";
  oDivShowCartOnPage.style.visibility="visible";
  if(iErr==0)sBackColor=""; else sBackColor="949494"
  var sHTML="<table width=250 height=141 border=0 cellpadding=3 cellspacing=3 class='fc-botfin'>";
     sHTML+="<tr>";
     sHTML+="<td colspan=5 align=center style='background-color:#"+ sBackColor +";color:#000000;font-size:12;font-family:verdana;cursor:pointer;padding-left:39px;padding-top:31px; height: 36px'>"+ sMsg +"</td>";
     sHTML+="<td align=right><img src='"+FC$.PathImg+"cancel.png' hspace=5 style='cursor:pointer' onclick=oDivShowCartOnPage.style.visibility='hidden'></td>";
     sHTML+="</tr>";
     if(iErr==0){
       sHTML+="<tr>";
       sHTML+="<td width=3>&nbsp;</td>";
       sHTML+="<td align=center style=padding-bottom:18px;padding-left:20px><a onclick=oDivShowCartOnPage.style.visibility='hidden' style=color:#444444;text-decoration:none;font-size:14;cursor:pointer>CONTINUAR COMPRANDO</a></td>";
       sHTML+="<td width=3>&nbsp;</td>";
       sHTML+="<td align=center style=padding-bottom:18px;padding-left:20px><a href='addproduto.asp?idloja="+ IDLoja +"' style=color:#444444;text-decoration:none;font-size:14;color:#00b900>FINALIZAR PEDIDO</a></td>";
       sHTML+="</tr>";
       este.style.backgroundImage="url('"+sCaminhoImagens+"BotGridComprar.png')"; //Volta botao comprar
       MostraDadosCesta();
       readCart();
       updateCart();       													
     }
     else{
       sHTML+="<tr height=20>";
       sHTML+="<td colspan=5 align=center><img src='images/cancel_off.png' hspace=5 style='cursor:pointer' onclick=oDivShowCartOnPage.style.visibility='hidden'></td>";
       sHTML+="</tr>";
     }
     sHTML+="</table>";
  oDivShowCartOnPage.style.top=oPos.y;
  oDivShowCartOnPage.style.left=oPos.x;
  oDivShowCartOnPage.innerHTML=sHTML;
  iLastCartOnPage++;
  //setTimeout("if(iLastCartOnPage=="+ iLastCartOnPage +")oDivShowCartOnPage.style.visibility='hidden';",8000);
  setTimeout("if(iLastCartOnPage=="+ iLastCartOnPage +")oDivShowCartOnPage.style.visibility='hidden';",8000);
}

//mostra dados cesta
var IDLoja="<IDLojaNum>";
function MostraDadosCesta(){
  if (window.XMLHttpRequest){xmlhttp=new XMLHttpRequest();}
  else{xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");}
  xmlhttp.open("GET","XMLCart.asp?IDLoja="+IDLojaNum+"",false);
  xmlhttp.send();
  xmlDoc=xmlhttp.responseXML; 
  var x=xmlDoc.getElementsByTagName("item");
  var z=xmlDoc.getElementsByTagName("cart");
  try{currencyProdCart=(z[0].getElementsByTagName("currency")[0].childNodes[0].nodeValue);}
  catch(e){currencyProdCart=""}
  try{TotalQtyProdCart=(z[0].getElementsByTagName("TotalQty")[0].childNodes[0].nodeValue);}
  catch(e){TotalQtyProdCart="0"}
  try{subtotalProdCart=""+(z[0].getElementsByTagName("subtotal")[0].childNodes[0].nodeValue);}
  catch(e){subtotalProdCart=""}
  var iItensCesta=TotalQtyProdCart;
  if(iItensCesta==0){sItem="0 ITENS"; document.getElementById("ValorItensCesta").innerHTML="";} 
  else if(iItensCesta==1){sItem="1 ITEM"}
  else {sItem=iItensCesta+" ITENS"}
  try{document.getElementById("QtdItensCesta").innerHTML=sItem;}
  catch(e){}
  try{document.getElementById("ValorItensCesta").innerHTML=currencyProdCart + " " + subtotalProdCart;}
  catch(e){}
}

//function FuncCartOnPage(IDLoja,iErr,sMsg,sCartText,sCheckoutText,este){
//  if(iErr==0)MostraDadosCesta();
//}

function MontaMaxParcelaCart(Valor){
  return("Em atÈ 3x de "+FormatPrecoReais(CalculaParcelaJurosCompostos(Valor,3)));
}



function ExibeBotoesCesta(bExibeDuasLinhasBotoes){
  try{
    document.write("<style>.EstContinuarComprando{display:none;}</style>");
    var table=document.getElementById('TabItens');

    if(bExibeDuasLinhasBotoes){
      var row=table.insertRow(0);
      var cell=row.insertCell(-1);
      cell.colSpan=5;
      var sCel1="<table width='100%'><tr>";
            sCel1+="<td width='33%' align='left'><a href='home.asp?IDLoja="+ IDLojaNum +"'><img src='"+ sCaminhoImages +"BotContComprando.png' title='Continuar comprando' border='0'></a></td>";
            sCel1+="<td width='34%' align='center'><a href='#R' onclick='document.Lista.submit()'><img src='"+ sCaminhoImages +"BotRecalcular.png' title='Recalcular' border='0'></a></td>";
            sCel1+="<td width='33%' align='right'><a href='#C' onclick='ComprarImg()'><img src='"+ sCaminhoImages +"BotComprar.png' title='Comprar' border='0'></a></td>";
          sCel1+="</tr></table>";
      cell.innerHTML=sCel1;
    }

    var row=table.insertRow(-1);
    var cell=row.insertCell(-1);
    cell.colSpan=5;
    var sCel2="";
    cell.innerHTML=sCel2;

  }catch(e){}
  try{document.getElementById("TabBotoes").style.display='none';}catch(e){}
}

function ComprarImg(){
  document.getElementsByName("Comprar")[0].click();
}

//Nome caracteres EstiloProduto.htm <ProdLista>
function NomeProdReticencias(nomeProd){
var nomeSubString = nomeProd.substring(0,57);
	if(nomeSubString.length >= 57){
	      document.write(nomeSubString.replace('"','\"')+"...");
	}else{
		document.write(nomeSubString.replace('"','\"'));
	}
}


function AtivaLinkMenu222(){ 
  var URLLocationHref = location.href;
  var sActive="";
  if(URLLocationHref.substring(45) == "/prod,idloja,343,IDCategoria,186284,masturbadores")sActive="Link186284";
  else if(FC$.Page=="Categories")sActive="LinkCat";
  else if(FC$.Page=="Products" && sPag.indexOf('PROMOCAO')>=0)sActive="LinkProm";
  else if(FC$.Page=="Products" && sPag.indexOf('LANCAMENTO')>=0)sActive="LinkLanc";
  else if(FC$.Page=="Cart")sActive="LinkPedido";
  else if(FC$.Page=="Help")sActive="LinkAjuda";
  if(sActive!="")document.getElementById(sActive).className="AtivarMenuDropDown_On";
}

function OnMouseOutMenu2(ItemMenu){
  if(ItemMenu.className=='AtivarMenuDropDown_Hover')ItemMenu.className="AtivarMenuDropDown_Off";
}
function OnMouseOverMenu2(ItemMenu){
  if(ItemMenu.className=='AtivarMenuDropDown_Off')ItemMenu.className="AtivarMenuDropDown_Hover";
}