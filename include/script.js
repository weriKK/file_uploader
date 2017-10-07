$(function(){

    var ul = $('#upload ul');

    $('#drop a').click(function(){
        // Simulate a click on the file input button
        // to show the file browser dialog
        $(this).parent().find('input').click();
    });

    // Init the jQuery File Upload plugin
    $('#upload').fileupload({
        dropZone: $('#drop'),
        dataType: 'json',
        add: function(e, data){
            var tpl = $('<li class="working"><input type="text" value="0" data-width="48" data-height="48" data-fgColor="#0788a5" data-readOnly="1" data-bgColor="#3e4043" /><p></p><span></span></li>');

            tpl.find('p').text(data.files[0].name).append('<i>' + formatFileSize(data.files[0].size) + '</i>');
            data.context = tpl.appendTo(ul);

            tpl.find('input').knob();

            tpl.find('span').click(function(){
                if(tpl.hasClass('working')){
                    jqXHR.abort();
                }

                tpl.fadeOut(function(){
                    tpl.remove();
                });
            });

            var jqXHR = data.submit();
        },
        progress: function(e, data){
            var progress = parseInt(data.loaded / data.total * 100, 10);
            data.context.find('input').val(progress).change();

            if(100 == progress){
                data.context.removeClass('working');
            }
        },
        done: function(e, data){
            console.log(data);
            data.context.find('p').append('<i>' + data.jqXHR.responseJSON.files[0]['url'] + '</i>');
            
        },
        fail: function(e, data){
            data.context.addClass('error');
        }
    });

    $(document).on('drop dragover', function(e){
        e.preventDefault();
    });

    function formatFileSize(bytes){
        var KB = 1024;
        var MB = 1024*KB;
        var GB = 1024*MB;

        if (typeof bytes !== 'number'){
            return '';
        }

        if (GB <= bytes) { return (bytes/GB).toFixed(2)+' GB'; }
        if (MB <= bytes) { return (bytes/MB).toFixed(2)+' MB'; }
        return (bytes/KB).toFixed(2)+' KB';
    }
});

