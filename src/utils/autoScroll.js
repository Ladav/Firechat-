// auto scrolling message container
export const autoScroll = ($msgContainer) => {
    // fetch the last message
    const $lastMsg = $msgContainer.lastElementChild;

    // if there is no lastmsg return
    if(!$lastMsg) return;
    // height of the last message
    const extraMargin = getComputedStyle($lastMsg).marginBottom;    // margin is proveided after each msg
    const lastMsgHeight = $lastMsg.offsetHeight + parseInt(extraMargin);

    // height of the visible container
    const visibleContainerHeight = $msgContainer.offsetHeight;

    // height of whole scrollable container
    const scrollContainerHeight = $msgContainer.scrollHeight;

    // how far i have scrolled from the top
    const scrollHeight = visibleContainerHeight + Math.ceil($msgContainer.scrollTop) + 2;
    if (scrollContainerHeight - lastMsgHeight <= scrollHeight) {
        $msgContainer.scrollTop = $msgContainer.scrollHeight;
    }
};