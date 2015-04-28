var master = {window: {el: null, width: null, height: null}};
$(document).ready(function(TamanhoTela) {
    $(window).resize(TamanhoTela).trigger('resize');
    function TamanhoTela() {
        master.window.width = $(window).width();
        master.window.height = $(window).height();
        
//        Torna o menu de produtos em submenu do principal
        if(master.window.width < 500){
            $('.secondaryMenu li').appendTo('#subMenu');
        } else{
            $('#subMenu li').appendTo('.secondaryMenu');
        }
    }
    
//    Altera menu de acordo com a posição do scroll
    $(window).scroll(function(){
        var Lemenu = $('.header').offset(),
            menuTop = Lemenu.top;
        if(menuTop > 250){
            $('.header').addClass('restyle');
        } else {
            $('.header').removeClass('restyle');
        }
    });
    
//    Abre menu mobile
    $('#mobolMenu').click(function(){
        $(this).toggleClass('on');
        $('.header').toggleClass('closed');
    });
    $('#menuProduto>a').click(function(){
         $('#subMenu').slideToggle('fast');
    })
    
    
    
//    Carregar mais produtos
    $( "#loadMore" ).click(loadImages);
    function loadImages() {
        //Chamada em ajax aqui
        $( ".hiddenProduct" ).first().fadeIn( "slow", function showNext() {
            $( this ).next( ".hiddenProduct" ).fadeIn( 'slow', showNext );
        });
    }
    
    
    
//    Abrir Modal de produto
    $( ".produtos .section .productsHolder li" ).click(openModal);
    function openModal() {
        var id = $(this).data('id');
        alert(id);
    }
    
    
    
    
//    Mapa dos parceiros
    
    selectTheMap();
    $('svg #Estados path').click(superSelection);
    
    
    function selectTheMap() {
        var hash = window.location.hash,
            hashtoFind = hash.replace('#', ''),
            finder2 = document.getElementsByClassName(hashtoFind);
        $('.encontreList').find(finder2).filter(':even').addClass('even');
        $('.encontreList').find(finder2).fadeIn('fast');
        $('svg #Estados').find(hash).css('fill', '#ffa400');
    }
    
    function superSelection() {
        var estadoUF = $(this).attr('id'),
            finder = document.getElementsByClassName(estadoUF);
        $('svg #Estados path').removeAttr('style');
        $(this).css('fill', '#ffa400');
        
        $('.encontreList>li').fadeOut('400');
        setTimeout(function(){
            $('.encontreList').find(finder).filter(':even').addClass('even');
            $('.encontreList').find(finder).fadeIn('fast');
        }, 400);
    }
    
    
    
    
    
//    Galeria
    $( function() {
  
  $('#galeria').isotope({
    layoutMode: 'masonryHorizontal',
    itemSelector: '.item',
    masonryHorizontal: {
      rowHeight: 175
    }
  });
        
    $('a.rionGallery').click(openUp);
    $('button.md-close').click(closeIt);
        
        
        
    function openUp() {
        var src = $(this).attr('href');
        var type = $(this).data('type');
        if(type == 'image') {
            $('.md-modal').addClass('md-show');
            $('.md-content img').attr('src', src);
            $('.md-content>.image').show();
            return false;
        }
        else if(type == 'youtube') {
            $('.md-modal').addClass('md-show');
            $('.md-content .youtube').html('<iframe width="640" height="360" src="' + src + '" frameborder="0" allowfullscreen></iframe>');
            $('.md-content>.youtube').show();
            return false;
        }
        return false;
    } 
    function closeIt() {
        $('.md-modal').removeClass('md-show');
        $('.md-content>div').css('display', 'none');
    }
});
});