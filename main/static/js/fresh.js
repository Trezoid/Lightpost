$(document).ready(function() {
    $('.save input').click(function() {
        if($('.title input').val().length < 1) {
            $('.title input').addClass('error');
            $('.title input').focus()
            return false;
        }else if($('.contentText').val().length < 1) {
            $('.formatBox').addClass('error');
            $('.formatBox').focus()
            return false;
        } else {
        
        var overlay = document.createElement('div');
        $(overlay).addClass('overlay');
        $(overlay).html(" ");
        $('body').append(overlay);

        var createUser = document.createElement('div');
        $(createUser).addClass('user');
        $(createUser).html(
            '<div class="details"><p>Just one more thing:</p><p>We need you to join so we know where to put your post!</p></div>'+
            '<div class="username"><label for="uName">Username</label><input type="text" name="uName"/></div>'+
            '<div class="password"><label for="uPass">Password</label><input type="password" name="uPass"/></div>'+
            '<div class="email"><label for="email">Email</label><input type="email" name="email"/></div>'+
            '<div class="save"><input class="innerSave" type="submit" value="Join!"/></div>');
        $('body').append(createUser); 
        console.log('click function!'); 
        $('.innerSave').click(function() {
            var res = $.getJSON('new/'+$('.username input').val(), function(data){
                console.log(data);
            if(data.isUnique == true ){

            var u = $('.username input');
            $(u).attr('type', 'hidden');
            var p = $('.password input');
            $(p).attr('type', 'hidden');
            var e = $('.email input');
            $(e).attr('type', 'hidden');
            $('.postForm').append(u, p, e);
            $('.postForm').submit();
            } else { 
                var error = document.createElement('p');
                $(error).html('That username is already taken. Please choose a new one');
                $('.username').prepend(error);
            }
            })
        });
        return false;
        }
    });
});
