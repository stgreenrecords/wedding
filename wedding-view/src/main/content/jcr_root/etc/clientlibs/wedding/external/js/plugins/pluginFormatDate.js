// $(document).ready(function() {

;var formatDate = (function(datt){
 	function format(datt) {	     
    	var date = new Date (Number(datt));	
	  	var dd = date.getDate();
	  	if (dd < 10) dd = '0' + dd;
	  	var mm = date.getMonth() + 1;
	  	if (mm < 10) mm = '0' + mm;
	 	var yy = date.getFullYear();		 		
	  	return dd + '.' + mm + '.' + yy;
	}
	return {f:format}	
}());

// });