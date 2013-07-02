(function($){'use strict'var validateFlag={},errorMessages={},methods={dataname:function(string){var regEx=new RegExp(/^[A-ZÅÄÖa-zåäö0-9 ]{3,35}$/);errorMessages={dataname:'* Not a valid name.'}return regEx.test(string)},dataemail:function(string){var regEx=new RegExp(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+)*\w[\w-]{0,66})([a-z]{2,6}(?:\.[a-z]{2,4})?)$/i);errorMessages={dataemail:'* Not a valid E-mail.'}return regEx.test(string)},datausername:function(string){var regEx=new RegExp(/^[A-Za-z0-9_]{3,20}$/);errorMessages={datausername:'* Not a valid username.'}return regEx.test(string)},datapassword:function(string){var regEx=new RegExp(/^[A-Za-z0-9!@#$%^&*()_]{6,20}$/);errorMessages={datapassword:'* Not a valid password.'}return regEx.test(string)},datanumber:function(string){var regEx=new RegExp(/^[0-9-]+$/);errorMessages={datanumber:'* Must be a number.'}return regEx.test(string)},datarequired:function(string){var regEx=new RegExp(/\S/);errorMessages={datarequired:'* This field is required.'}return regEx.test(string)},datamaxlength:function(string,rule){var regEx=new RegExp('^\\S{0,'+rule+'}$');errorMessages={datamaxlength:'* Can´t be longer than '+rule+' characters.',};return regEx.test(string)},dataminlength:function(string,rule){var regEx=new RegExp('^\\S{'+rule+',}$');errorMessages={dataminlength:'* Must be atleast '+rule+' characters.',};return regEx.test(string)},datarange:function(string,rule){var regEx=new RegExp('^\\S{'+rule+'}$');errorMessages={datarange:'* Out of range. Must be between '+rule+' characters.',};return regEx.test(string)},dataregex:function(string,rule){var regEx=new RegExp(rule);errorMessages={dataregex:'* Incorrect input.',};return regEx.test(string)},datacreditcard:function(string,rule){var onlyDigits=string.replace(/-/g,'');switch(rule){case'visa':var regEx=new RegExp(/^4[0-9]{12}(?:[0-9]{3})?$/);errorMessages={datacreditcard:'* Not a valid '+rule+'card number.'};return regEx.test(onlyDigits);case'mastercard':var regEx=new RegExp(/^5[1-5][0-9]{14}$/);errorMessages={datacreditcard:'* Not a valid '+rule+' number.'};return regEx.test(onlyDigits);case'american express':var regEx=new RegExp(/^3[47][0-9]{13}$/);errorMessages={datacreditcard:'* Not a valid '+rule+' card number.'};return regEx.test(onlyDigits);case'Diners club':var regEx=new RegExp(/^3(?:0[0-5]|[68][0-9])[0-9]{11}$/);errorMessages={datacreditcard:'* Not a valid '+rule+' card number.'};return regEx.test(onlyDigits);case'Discover':var regEx=new RegExp(/^6(?:011|5[0-9]{2})[0-9]{12}$/);errorMessages={datacreditcard:'* Not a valid '+rule+' card number.'};return regEx.test(onlyDigits);case'JCB':var regEx=new RegExp(/^(?:2131|1800|35\d{3})\d{11}$/);errorMessages={datacreditcard:'* Not a valid '+rule+' card number.'};return regEx.test(onlyDigits);default:var regEx=new RegExp(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/);errorMessages={datacreditcard:'* Not a valid Creditcard number'};return regEx.test(onlyDigits)}},validateForm:function(settings){$('#formAt, #formAt input, #formAt textarea').on('focus',function(){var $this=$(this);$this.addClass('highlight').unbind('focusout').on('focusout',function(){$this.removeClass('highlight');methods.validateIfRequired($this,settings)})})},validateIfRequired:function($this,settings){var element=$this,input=$this.val(),id=$this.attr('id'),validationRules={},dataAttr={};$(element[0].attributes).each(function(){var data=/^data-/;if(data.test(this.nodeName)){dataAttr=this.nodeName.replace(/-/g,'');validationRules[dataAttr]=this.value.toLowerCase()}});if(!validationRules){console.log('nothing to validate')}else{for(var ruleCat in validationRules){var rule=validationRules[ruleCat],validate=methods[ruleCat](input,rule)if(!validate){$('#'+dataAttr).remove();$this.addClass('alert').after('<p id="'+dataAttr+'"class="errorMessage">'+errorMessages[dataAttr]+'</p>');validateFlag[id]=false}else{validateFlag[id]=true;$this.removeClass('alert');console.log('woho');$('#'+dataAttr).remove()}}}},};$.fn.format=function(method){return this.each(function(){var $this=$(this),preventPost;methods[method]();$this.on('submit',function(event){$('#formAt, input, select, textarea').each(function(){var thisId=$(this).attr('id');if(!validateFlag[thisId]){methods.validateIfRequired($(this));return preventPost=true}else{console.log('We succeded');return preventPost=false}});if(preventPost){event.preventDefault()}})})}})(jQuery);