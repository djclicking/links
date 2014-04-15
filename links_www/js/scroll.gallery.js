// Infinite Scroll

function element_in_scroll(elem)
{
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
 
    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();
 
    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

function getPageName(url) {
    var index = url.lastIndexOf("/") + 1;
    var filenameWithExtension = url.substr(index);
    var filename = filenameWithExtension.split(".")[0];
    return filename;                                   
}

$(function(){
    var scrollFunction = function(e){
	var mycount = 1;
        if (element_in_scroll("#links div:last")) {
	        $('#loading').show();
                $(window).unbind('scroll');
                $.ajax({
                    type: "POST",
                    url: 'older.gallery.php?p=' + getPageName(document.location.href),
		    dataType: 'json',
		    cache: false,
                    data: { partialurl:$('input[name=partialurl]').attr('value'), older:$('#older').data('val'),json: "true" },
                    success: function( msg ){
			//$('#older').data('val',msg.olderid);

                    }
                }).done(function( msg ) {
                    //$("#contenttable tbody").append(msg.results).hide().fadeIn(999);

                    if (msg.results.length > 0) {

		        $('#loading').hide();
		        $(msg.results).hide().appendTo("#links").fadeIn(1000);
		        $('#older').data('val',msg.olderid);
			$(window).scroll(scrollFunction);


                    } else {

		        $('#loading').hide();
		        $('#nomoreresults').show();

		    }

		    mycount = mycount + 1;

                });
            };
    };

$(window).scroll(scrollFunction);

});


