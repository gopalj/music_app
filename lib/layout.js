$(document).ready(function(){

    var url="http://private-f4bf5-music6.apiary-mock.com/search",shownPageid=0;
    window.shownPageid=0;
    var items ;
    var animating = false;
    
    function getProducts(){
        $.ajax({
        url: url,
        cache: true,
        success: function(data){
            //setGlobalData(data);
            showProducts(data);
        },
        complete: function(){
            $('#loading').hide();
        },
        error: function() {
            alert('An error has occurred, Please check your internet connection and try again!');
        }
    });

    }

    function showProducts(products){
        var $mdiv = $("<div>", {id: "products", "class": "products_list", "type":"none"}),
            $page,
            pageid=0;

            if($(window).width() < 400){
                imgHeight=($(window).height()-(60+200))/3;
            } else {
                imgHeight=($(window).height()-(60+190))/3;
            }
            

            $.each(products, function(id,item){
                if(id == 0 || (id % 9 == 0)){
                    $page = $("<span>",{id:"page"+pageid, "class": "page"});
                }
                
                var $pdiv = $("<div>",{id: id, "class": "product"});
                var $ptitle = $("<div>",{id: id, "class": "ptitle"});
                var $pimg = $("<span>",{id: id, "class": "pimg","style":"height:"+imgHeight+"px;background-image:url('"+item.m+"')"});
                

                $ptitle.html(item.title);
                
              

                $($pdiv).append($pimg, $ptitle);
                $($page).append($pdiv);
                if(id == 0 || (id % 9 == 0)){
                    $($mdiv).append($page);
                    pageid+=1;
                }

                
            });

            $('#content').html($mdiv);
            $('#loading').hide();
            items = $(".page");
    }

    

    $(window).scroll(function() {
        clearTimeout($.data(this, 'scrollTimer'));
        if (!animating) {
            $.data(this, 'scrollTimer', setTimeout(function() {
                items.each(function(key, value) {
                    if ($(value).offset().top > $(window).scrollTop()) {
                        animating = true;
                        $('body').animate( { scrollTop: $(value).offset().top-60 + 'px' }, 250);
                        setTimeout(function() { animating = false; }, 300);
                        return false;
                    }
                });
            }, 200));
        }
    });

    $('#loading').show();    
    getProducts();

});