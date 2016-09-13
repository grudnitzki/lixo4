if (FC$.Page!="Cart"){
//AutoSuggest
jQuery.noConflict();
jQuery(function (jQuery) {
     				     
						jQuery.widget( "custom.autocomplete", jQuery.ui.autocomplete, {
				        _renderMenu: function( ul, items ) {
				            var self = this,
				                currentCategory = "";
				            jQuery.each( items, function( index, item ) {
				                if ( item.category != currentCategory ) {
					                  ul.append( "<li class='ui-autocomplete-category'><span class='as-categoria'><br>" + item.category + "</span></li>" );
				                    currentCategory = item.category;
				                }
				                self._renderItem( ul, item );
				            });
				        }
				    });

//				    jQuery("#autocomplete").each(function(){
            	jQuery("#autocomplete").autocomplete({
//            	jQuery(this).autocomplete({
            	select: function( event, ui ) { 
								if (ui.item.q){
									jQuery('#autocomplete-form').submit();
									return false;	         
								}
								if (ui.item.c){
									var idProducts = ui.item.id;
									window.location.href = "/prod,IDLoja,"+FC$.IDLoja+",IDProduto,"+idProducts+","+ PrepareTextUA_AS(ui.item.c+"-"+ui.item.label);
									return false;	         
								}
								if (ui.item.u){
					        window.location.href = ui.item.u.replace("&amp;","&");
					        return false;           
								}
								if(ui.item.s){
									var idNews = ui.item.id;
									window.location.href = "Noticias.asp?IDLoja="+FC$.IDLoja+"&IDNoticia="+idNews;            
									return false;	         
								}
			        },
	            focus: function(event,ui) {
//	                jQuery('input#autocomplete').val(ui.item.label
										jQuery('input#autocomplete').val(ui.item.label
//											jQuery('input#autocomplete').val()
														.replace(/&quot;/gi,'"').replace(/&apos;/gi,"'").replace(/&amp;/gi,"&")
														.replace(/&lt;/gi,"<").replace(/&gt;/gi,">").replace(/&#192;/gi,"�")
														.replace(/&#193;/gi,"�").replace(/&#194;/gi,"�").replace(/&#195;/gi,"�")
														.replace(/&#196;/gi,"�").replace(/&#197;/gi,"�").replace(/&#198;/gi,"�")
														.replace(/&#199;/gi,"�").replace(/&#200;/gi,"�").replace(/&#201;/gi,"�")
														.replace(/&#202;/gi,"�").replace(/&#203;/gi,"�").replace(/&#204;/gi,"�")
														.replace(/&#205;/gi,"�").replace(/&#206;/gi,"�").replace(/&#207;/gi,"�")
														.replace(/&#208;/gi,"�").replace(/&#209;/gi,"�").replace(/&#210;/gi,"�")
														.replace(/&#211;/gi,"�").replace(/&#212;/gi,"�").replace(/&#213;/gi,"�")
														.replace(/&#214;/gi,"�").replace(/&#216;/gi,"�").replace(/&#217;/gi,"�")
														.replace(/&#218;/gi,"�").replace(/&#219;/gi,"�").replace(/&#220;/gi,"�")
														.replace(/&#221;/gi,"�").replace(/&#222;/gi,"�").replace(/&#223;/gi,"�")
														.replace(/&#224;/gi,"�").replace(/&#225;/gi,"�").replace(/&#226;/gi,"�")
														.replace(/&#227;/gi,"�").replace(/&#228;/gi,"�").replace(/&#229;/gi,"�")
														.replace(/&#230;/gi,"�").replace(/&#231;/gi,"�").replace(/&#232;/gi,"�")
														.replace(/&#233;/gi,"�").replace(/&#234;/gi,"�").replace(/&#235;/gi,"�")
														.replace(/&#236;/gi,"�").replace(/&#237;/gi,"�").replace(/&#238;/gi,"�")
														.replace(/&#239;/gi,"�").replace(/&#240;/gi,"�").replace(/&#241;/gi,"�")
														.replace(/&#242;/gi,"�").replace(/&#243;/gi,"�").replace(/&#244;/gi,"�")
														.replace(/&#245;/gi,"�").replace(/&#246;/gi,"�").replace(/&#248;/gi,"�")
														.replace(/&#249;/gi,"�").replace(/&#250;/gi,"�").replace(/&#251;/gi,"�")
														.replace(/&#252;/gi,"�").replace(/&#253;/gi,"�").replace(/&#254;/gi,"�")
														.replace(/&#255;/gi,"�")
	                					);
	                return false;
	            },			                                    
              source: function (request, response) {
                  jQuery.ajax({
                      url: "autosuggest.asp?idloja="+FC$.IDLoja+"&format=1&q="+request.term+"&g1="+g1+"&g2="+g2+"&g3="+g3,
                      dataType: "json",
                      type: "GET",                     
                			success: function (data) {
												var json0 = data.SearchTerms;
												var json1 = data.Products;
												var json2 = data.RelatedPages;
//												var json3 = data.News;
												
												
												if(jQuery.isArray(json0)) {
												    json0 = json0;
												}else{
													json0 = [  ];
												};													
												if(jQuery.isArray(json1)) {
												    json1 = json1;
												}else{
													json1 = [  ];
												};													
												if(jQuery.isArray(json2)) {
												    json2 = json2;
												}else{
													json2 = [  ];
												};													
//												if(jQuery.isArray(json3)) {
//												    json3 = json3;
//												}else{
//													json3 = [  ];
//												};
																																							
												var json = [].concat(json0,json1,json2);
//												var json = [].concat(json0,json1,json2,json3);
												
																						
													//console.log(json);
												
                        response(jQuery.map(json, function (item) {
                            return {
                                category: item.category,
                            		//Termos
                            		t: item.label,
                            		q: item.q,
                                //Produtos
                                nm: item.label,
                                id: item.id,
                                c: item.c,
                                im: item.im,
                                op: item.op,
                                fp: item.fp,
                                v: item.v,
																//Paginas	
                                p: item.label,
                                u: item.u,
                                //Noticias
                                id: item.id,
                                t:item.label,
                                s: item.s,
                                d: item.d,
                                label: item.label
                                }
                        }))                         

                      },
                      error: function (a, b, c) {
                          debugger;
                      }
                  });
              },
              minLength: 3
            //});
            }).data("autocomplete")._renderItem = function(ul, item) {

								jQuery('li.active:even').css('background-color', '#fdd7db');

			          		//Termos
					          if (item.q){
					          
					          var sPlural = '';
					          if (item.q >1){sPlural = 's';}else {sPlural = '&nbsp;&nbsp;';}
					         
					         var t = item.label.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + jQuery.ui.autocomplete.escapeRegex(this.term) + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<strong>$1</strong>");				   
										return jQuery("<li class='active'></li>")                
                    .data("item.autocomplete", item)
										.append("<a><table width='100%'><tr valign='0'><tr><td width='90%' id='as-nome-termos'><span>"+t+"</span></td><td align='right' id='as-qtd-termos'><span>"+item.q+"&nbsp;Produto"+sPlural+"&nbsp;</span></td></tr></table></a>")
										.appendTo(ul);										
                }  

			          		//Produtos
					          if (item.c){
					          
					          if (item.fp == 0){
					          	valor = "Consulte-nos";
					          }else{
					          	valor = FormatPrice(item.fp,'R$');
					          }

					          if(item.fp!=item.op){
					            sSale="<span style='background-color:#65984d;color:#ffffff;padding:3px;'>&nbsp;"+FormatNum(((item.op-item.fp)/item.op)*100)+"%&nbsp;off&nbsp;</span>&nbsp;&nbsp;";}
					          else{
					            sSale=""
					          }
					          
					          var nm = item.label.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + jQuery.ui.autocomplete.escapeRegex(this.term) + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<strong>$1</strong>");				
					          return jQuery("<li class='active'></li>")                
                    .data("item.autocomplete", item)                    
										.append("<a><table width='100%'><tr valign='0'><tr><td align=center width='55px'><span><img src='"+ FC$.PathPrd  + item.im + "' id='as-img-prod'></span></td><td width='55%'><span id='as-nome-prod'>" + nm + "</a></span><br/><span id='as-cat-prod'>" + item.c + "</span></td><td width=25 class='as-sale'>"+ sSale +"</td><td align='right' id='as-valor-prod' nowrap='nowrap'><span>" + valor +"</span></td></tr></table></a>")										
										.appendTo(ul);
                }   
                		//Paginas            
					          if (item.u){           
					          var p = item.label.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + jQuery.ui.autocomplete.escapeRegex(this.term) + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<strong>$1</strong>");				   
                    return jQuery("<li class='active'></li>")
                    .data("item.autocomplete", item)
										.append("<a><table width='100%'><tr valign='0'><td id='as-nome-pag'><a href='" + item.u + "'>" + p + "</a></td></tr></table></a>")
										.appendTo(ul);										
                }
                		//Noticias
					          if (item.s){        
					          var t = item.label.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + jQuery.ui.autocomplete.escapeRegex(this.term) + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<strong>$1</strong>");				   
                    return jQuery("<li class='active'></li>")
                    .data("item.autocomplete", item)
										.append("<a><table width='100%'><tr valign='0'><td width='65%' id='as-nome-not'>" + t + "</td><td align='right' id='as-data-not'>" + item.d + "</td></tr></table></a>")
										.appendTo(ul);										
                }
              }
        });
        
        
//AutoSuggest Toolbar
jQuery.noConflict();
jQuery(function (jQuery) {
     				     
						jQuery.widget( "custom.autocomplete", jQuery.ui.autocomplete, {
				        _renderMenu: function( ul, items ) {
				            var self = this,
				                currentCategory = "";
				            jQuery.each( items, function( index, item ) {
				                if ( item.category != currentCategory ) {
					                  ul.append( "<li class='ui-autocomplete-category'><span class='as-categoria'><br>" + item.category + "</span></li>" );
				                    currentCategory = item.category;
				                }
				                self._renderItem( ul, item );
				            });
				        }
				    });


				    jQuery("#autocomplete-toolbar").each(function(){
//            	jQuery("#autocomplete").autocomplete({
            	jQuery(this).autocomplete({
            	select: function( event, ui ) { 
								if (ui.item.q){
									jQuery('#autocomplete-form-toolbar').submit();
									return false;	         
								}
								if (ui.item.c){
									var idProducts = ui.item.id;
									window.location.href = "ListaProdutos.asp?IDLoja="+FC$.IDLoja+"&IDProduto="+idProducts;
									return false;	         
								}
								if (ui.item.u){
					        window.location.href = ui.item.u.replace("&amp;","&");
					        return false;           
								}
								if(ui.item.s){
									var idNews = ui.item.id;
									window.location.href = "Noticias.asp?IDLoja="+FC$.IDLoja+"&IDNoticia="+idNews;            
									return false;	         
								}
			        },
	            focus: function(event,ui) {
//	                jQuery('input#autocomplete').val(ui.item.label
										jQuery('input#autocomplete-toolbar').val(ui.item.label
//											jQuery('input#autocomplete').val()
														.replace(/&quot;/gi,'"')
														.replace(/&apos;/gi,"'")
														.replace(/&amp;/gi,"&")
														.replace(/&lt;/gi,"<")
														.replace(/&gt;/gi,">")
														.replace(/&#192;/gi,"�")
														.replace(/&#193;/gi,"�")
														.replace(/&#194;/gi,"�")
														.replace(/&#195;/gi,"�")
														.replace(/&#196;/gi,"�")
														.replace(/&#197;/gi,"�")
														.replace(/&#198;/gi,"�")
														.replace(/&#199;/gi,"�")
														.replace(/&#200;/gi,"�")
														.replace(/&#201;/gi,"�")
														.replace(/&#202;/gi,"�")
														.replace(/&#203;/gi,"�")
														.replace(/&#204;/gi,"�")
														.replace(/&#205;/gi,"�")
														.replace(/&#206;/gi,"�")
														.replace(/&#207;/gi,"�")
														.replace(/&#208;/gi,"�")
														.replace(/&#209;/gi,"�")
														.replace(/&#210;/gi,"�")
														.replace(/&#211;/gi,"�")
														.replace(/&#212;/gi,"�")
														.replace(/&#213;/gi,"�")
														.replace(/&#214;/gi,"�")
														.replace(/&#216;/gi,"�")
														.replace(/&#217;/gi,"�")
														.replace(/&#218;/gi,"�")
														.replace(/&#219;/gi,"�")
														.replace(/&#220;/gi,"�")
														.replace(/&#221;/gi,"�")
														.replace(/&#222;/gi,"�")
														.replace(/&#223;/gi,"�")
														.replace(/&#224;/gi,"�")
														.replace(/&#225;/gi,"�")
														.replace(/&#226;/gi,"�")
														.replace(/&#227;/gi,"�")
														.replace(/&#228;/gi,"�")
														.replace(/&#229;/gi,"�")
														.replace(/&#230;/gi,"�")
														.replace(/&#231;/gi,"�")
														.replace(/&#232;/gi,"�")
														.replace(/&#233;/gi,"�")
														.replace(/&#234;/gi,"�")
														.replace(/&#235;/gi,"�")
														.replace(/&#236;/gi,"�")
														.replace(/&#237;/gi,"�")
														.replace(/&#238;/gi,"�")
														.replace(/&#239;/gi,"�")
														.replace(/&#240;/gi,"�")
														.replace(/&#241;/gi,"�")
														.replace(/&#242;/gi,"�")
														.replace(/&#243;/gi,"�")
														.replace(/&#244;/gi,"�")
														.replace(/&#245;/gi,"�")
														.replace(/&#246;/gi,"�")
														.replace(/&#248;/gi,"�")
														.replace(/&#249;/gi,"�")
														.replace(/&#250;/gi,"�")
														.replace(/&#251;/gi,"�")
														.replace(/&#252;/gi,"�")
														.replace(/&#253;/gi,"�")
														.replace(/&#254;/gi,"�")
														.replace(/&#255;/gi,"�")
	                					);
	                return false;
	            },			                                    
              source: function (request, response) {
                  jQuery.ajax({
                      url: "autosuggest.asp?idloja="+FC$.IDLoja+"&format=1&q="+request.term+"&g1="+g1+"&g2="+g2+"&g3="+g3+"&g4="+g4,
                      dataType: "json",
                      type: "GET",                     
                			success: function (data) {
												var json0 = data.SearchTerms;
												var json1 = data.Products;
												var json2 = data.RelatedPages;
//												var json3 = data.News;
												
												
												if(jQuery.isArray(json0)) {
												    json0 = json0;
												}else{
													json0 = [  ];
												};													
												if(jQuery.isArray(json1)) {
												    json1 = json1;
												}else{
													json1 = [  ];
												};													
												if(jQuery.isArray(json2)) {
												    json2 = json2;
												}else{
													json2 = [  ];
												};													
//												if(jQuery.isArray(json3)) {
//												    json3 = json3;
//												}else{
//													json3 = [  ];
//												};
																																							
												var json = [].concat(json0,json1,json2);
//												var json = [].concat(json0,json1,json2,json3);
												
																						
													//console.log(json);
												
                        response(jQuery.map(json, function (item) {
                            return {
                                category: item.category,
                            		//Termos
                            		t: item.label,
                            		q: item.q,
                                //Produtos
                                nm: item.label,
                                id: item.id,
                                c: item.c,
                                im: item.im,
                                op: item.op,
                                fp: item.fp,
                                v: item.v,
																//Paginas	
                                p: item.label,
                                u: item.u,
                                //Noticias
                                id: item.id,
                                t:item.label,
                                s: item.s,
                                d: item.d,
                                label: item.label
                                }
                        }))                         

                      },
                      error: function (a, b, c) {
                          debugger;
                      }
                  });
              },
              minLength: 3
            });
            }).data("autocomplete")._renderItem = function(ul, item) {

								jQuery('li.active:even').css('background-color', '#fdd7db');

			          		//Termos
					          if (item.q){
					          
					          var sPlural = '';
					          if (item.q >1){sPlural = 's';}else {sPlural = '&nbsp;&nbsp;';}
					         
					         var t = item.label.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + jQuery.ui.autocomplete.escapeRegex(this.term) + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<strong>$1</strong>");				   
										return jQuery("<li class='active'></li>")                
                    .data("item.autocomplete", item)
										.append("<a><table width='100%'><tr valign='0'><tr><td width='90%' id='as-nome-termos'><span>"+t+"</span></td><td align='right' id='as-qtd-termos'><span>"+item.q+"&nbsp;Produto"+sPlural+"&nbsp;</span></td></tr></table></a>")
										.appendTo(ul);										
                }  

			          		//Produtos
					          if (item.c){
					          
					          if (item.fp == 0){
					          	valor = "Consulte-nos";
					          }else{
					          	valor = FormatPrice(item.fp,'R$');
					          }

					          if(item.fp!=item.op){
					            sSale="<span style='background-color:#65984d;color:#ffffff;padding:3px;'>&nbsp;"+FormatNum(((item.op-item.fp)/item.op)*100)+"%&nbsp;off&nbsp;</span>&nbsp;&nbsp;";}
					          else{
					            sSale=""
					          }
					          
					          var nm = item.label.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + jQuery.ui.autocomplete.escapeRegex(this.term) + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<strong>$1</strong>");				
					          return jQuery("<li class='active'></li>")                
                    .data("item.autocomplete", item)                    
										.append("<a><table width='100%'><tr valign='0'><tr><td align=center width='55px'><span><img src='"+ FC$.PathPrd  + item.im + "' id='as-img-prod'></span></td><td width='55%'><span id='as-nome-prod'>" + nm + "</a></span><br/><span id='as-cat-prod'>" + item.c + "</span></td><td width=25 class='as-sale'>"+ sSale +"</td><td align='right' id='as-valor-prod' nowrap='nowrap'><span>" + valor +"</span></td></tr></table></a>")										
										.appendTo(ul);
                }   
                		//Paginas            
					          if (item.u){           
					          var p = item.label.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + jQuery.ui.autocomplete.escapeRegex(this.term) + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<strong>$1</strong>");				   
                    return jQuery("<li class='active'></li>")
                    .data("item.autocomplete", item)
										.append("<a><table width='100%'><tr valign='0'><td id='as-nome-pag'><a href='" + item.u + "'>" + p + "</a></td></tr></table></a>")
										.appendTo(ul);										
                }
                		//Noticias
					          if (item.s){        
					          var t = item.label.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + jQuery.ui.autocomplete.escapeRegex(this.term) + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<strong>$1</strong>");				   
                    return jQuery("<li class='active'></li>")
                    .data("item.autocomplete", item)
										.append("<a><table width='100%'><tr valign='0'><td width='65%' id='as-nome-not'>" + t + "</td><td align='right' id='as-data-not'>" + item.d + "</td></tr></table></a>")
										.appendTo(ul);										
                }
              }
        });        
}