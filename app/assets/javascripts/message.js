$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="message" data-message-id=${message.id}>
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
       </div>`;
     return html;
   } else {
     var html =
      `<div class="message" data-message-id=${message.id}>
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
       </div>`;
   };
   return html;
}

$('#new_message').on('submit', function(e){
  e.preventDefault();
  var formData = new FormData(this);
  var url = $(this).attr('action')
  $.ajax({
    url: url,
    type: "POST",
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false
  })
    .done(function(data){
      var html = buildHTML(data);
      $('.main_chat__message-list').append(html);
      $('.main_chat__message-list').animate({ scrollTop: $('.main_chat__message-list')[0].scrollHeight});
      $('.form__submit').prop('disabled', false);      
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  })


  var reloadMessages = function () {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      last_message_id = $('.message:last').data("message-id"); 

      $.ajax({ 
        url: "api/messages", 
        type: 'get', 
        dataType: 'json',
        data: {id: last_message_id} 
      })
      .done(function (messages) { 
        var insertHTML = '';
        $.each(messages, function(i,message) {
          insertHTML = buildHTML(message); 
          $(".main_chat__message-list").append(insertHTML);
          $('.main_chat__message-list').animate({scrollTop: $('.main_chat__message-list')[0].scrollHeight}, 'fast');
        });        
      })
      .fail(function () {
        alert('自動更新に失敗しました');
      });      
    }
  };
  setInterval(reloadMessages, 7000);
});
