;var modalW = (function(){		// gj
	
		// var modal = document.querySelector("#entrance-form");
		console.log('init Modal');
		var modal;

		function modalle(query){
			modal = document.querySelector(query);			 
		} 

		function closeMWindow(query){
        	document.querySelector(query).style.visibility = "hidden";	
        	modal.style.visibility = "hidden";
        }

        function openMWindow(query){ //gg
        	modal.style.visibility = "visible";
			var mwindow3 = document.querySelector(query);
    		mwindow3.style.visibility = "visible";
	        mwindow3.style.left = (document.documentElement.clientWidth - mwindow3.getBoundingClientRect().width)/2 + "px";
	        mwindow3.style.top = (document.documentElement.clientHeight - mwindow3.getBoundingClientRect().height)/3 + "px";
	    }	

	    function listenerModal(){
		    modal.addEventListener("click", function(evt) { 
		        if (evt.target === modal) {
		            this.style.visibility = "hidden";
		            Array.from(this.children).forEach(function(elem) {
		                elem.style.visibility = "hidden";
		            });
                }
            });
		}

	    return {
	    	modalle: modalle,
	    	openMWindow: openMWindow,
	    	closeMWindow: closeMWindow,
	    	listenerModal: listenerModal
	    }

}());
