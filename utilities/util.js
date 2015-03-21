var util = (function(w,d,$,pub){
  pub.injectStringData = function(str,name,value) { 
    return str.replace(new RegExp('#{'+name+'}','g'),value); 
  }; 
return pub; 
})(window,document,jQuery,{}); 