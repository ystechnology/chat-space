$(function(){
    function buildMessage(message){
    if (message.image){
      var html = 
      `<div class="message" data-message-id = ${message.id}> 
        <div class="upper-message">
          <div class="upper-message__user-name">
            ${message.user_name}
          </div>
          <div class="upper-message__date">
            ${message.created_at}
          </div>
        </div>
        <div class="lower-message">
          <p class="lower-message__content">
            ${message.content}
          </p>
        </div>
        <img src=${message.image} >
      </div>`
    return html

  } else{
      var html = 
      `<div class="message" data-message-id = ${message.id}> 
        <div class="upper-message">
          <div class="upper-message__user-name">
            ${message.user_name}
          </div>
          <div class="upper-message__date">
            ${message.created_at}
          </div>
        </div>
        <div class="lower-message">
          <p class="lower-message__content">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  };
  
  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "Post",
      data: formData,
      dataType:'json',
      processData: false,
      contentType:  false
    })
    .done(function(message){
      var html = buildMessage(message);
      $('.messages').append(html);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');   
      $('form')[0].reset();
    })
    .fail(function(){
      alert('error');
    });
    return false;
  });

   function reloadMessages () {
      last_message_id = $('.message:last').attr("data-message-id");
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildMessage(message)
        });
        $('.messages').append(insertHTML);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      })
      .fail(function() {
        alert('error');
      });
    };
    if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 2000);
  }
});

