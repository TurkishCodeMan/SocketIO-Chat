export default () => {
    $(".chat-messages").stop().animate({ scrollTop: $(".chat-messages")[0].scrollHeight }, 1000);

}