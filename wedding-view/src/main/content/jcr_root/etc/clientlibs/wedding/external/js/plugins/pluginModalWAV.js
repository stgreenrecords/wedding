;var modalW = (function(){		// gj

    console.log('init Modal');

    function closeMWindow(query, mod){
        var	modal = document.querySelector(mod);
        document.querySelector(query).style.visibility = "hidden";
        modal.style.visibility = "hidden";
    }

    function openMWindow(query, mod){ //gg
        var	modal = document.querySelector(mod);
        modal.style.visibility = "visible";
        var mwindow3 = document.querySelector(query);
        mwindow3.style.visibility = "visible";
        mwindow3.style.left = (document.documentElement.clientWidth - mwindow3.getBoundingClientRect().width)/2 + "px";
        mwindow3.style.top = (document.documentElement.clientHeight - mwindow3.getBoundingClientRect().height)/3 + "px";
        listenerModal(modal);
    }

    function listenerModal(modal){

        modal.addEventListener("click", modalGo);

        function modalGo(evt) {
            if (evt.target === modal) {
                Array.from(this.children).forEach(function(elem) {elem.style.visibility = "hidden";});
                this.style.visibility = "hidden";
                evt.target.removeEventListener("click", modalGo);
            }
        }
        document.addEventListener('keydown', function(e) {
            if (e.keyCode === 27) modal.click();   // esc
        });

    }

    return {
        openMWindow: openMWindow,
        closeMWindow: closeMWindow,
        // listenerModal: listenerModal
    }

}());
