    var showRaw = false;
    var conv = new Showdown.converter();
    var t;
$(document).ready(function(){
    console.log("foo?");
    var editCont = $('.contentText');
    var formCont = $('.formatBox');
    $(formCont).html( '<p>'+conv.makeHtml($(editCont).val()) + '</p>' );
     
    $(formCont).bind('input', function() {
        $(editCont).val(formed( toMarkdown($(formCont).html() )) );
    })

    $(formCont).bind('keydown', function() {
        window.clearTimeout(t);
        t = window.setTimeout(function(){

            if(!showRaw) $(formCont).html(conv.makeHtml($(editCont).val()));
            focus();
        }, 2500);
    })

    $(formCont).blur( function() {
        if(!showRaw) $(formCont).html(conv.makeHtml(formed($(editCont).val())));
    })

    $('.save input').click(function() {
        if($('.title input').val().length < 1) {
            $('.title input').addClass('error');
            $('.title input').focus()
            return false;
        }
    
        if($('.contentText').val().length < 1) {
            $('.formatBox').addClass('error');
            $('.formatBox').focus()
            return false;
        }
    
    })

    addButtons()
})

var formed = function(value) {
    v = value.replace(/&gt;/g, '>', 'g');
    v = v.replace(/&lt;/g, '<', 'g');
    return v;
}

var rawForm = function(value) {
    v = value.replace('\n', '<br>', 'g');
        return v;
}

var addButtons = function() {
    var raw = document.createElement('a')
    $(raw).html("Show Raw");
    $(raw).attr('href', '#');
    $('.editor .content').append(raw);
    
    $(raw).click(function(){
        showRaw = !showRaw;
        if(showRaw) {
            $('.formatBox').html(rawForm($('.contentText').val()));
            $(raw).html("Show Formatting");
        } else {
            $('.formatBox').html(conv.makeHtml($('.contentText').val()));
            $(raw).html("Show Raw");
        }
        return false;    
    });

    var buttonList = {
        'bold':'** **',
        'italics' : '* *',
        'h1' : '#',
        'h2' : '##', 
        'h3' : '###',
        'h4' : '####',
        'link': '[]()',
        'code': '` `',
        'image': '![]()',
        'break': '---',
        'quote': '> ',
    }

    var editBox = $('.buttonBox');

    for(b in buttonList) {
        var button = document.createElement('div');
        console.log(buttonList[b]);
        $(button).addClass('button').attr('id', b).html(b);
        $(editBox).append(button); 
    }
    $(editBox).append('<div style="clear:both"></div>');

    $('.button').each(function(){
        $(this).click(function() {
            window.clearTimeout(t);
            $('.formatBox').html($('.formatBox').html() + buttonList[$(this).attr('id')]);
            focus();
        })
    })
}

var focus = function(){
    $('.formatBox').focus();
    var selObj = window.getSelection();
    var range  = selObj.getRangeAt(0).cloneRange();
    r = document.createRange();
    r.selectNodeContents(range.endContainer.lastChild); 
    selObj.addRange(r);
    selObj.collapseToEnd();
}
