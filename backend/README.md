- audio-message validation
- filters for files! no events!
- messages about: left chat, joined chat and so on.
- different rights, user multiple chat-users and multiple join offers
+ list of users, if admin ability to remove user from the chat
- link or id in the url. if doesn't start with @ - id
- url to join chat
- if there is a link set (means the chat is free to join), can join by simply going to chats/@link
- edit/remove message, if admin and not own message - remove any
- remove the chat, use semantic Confirm
- remove user use semantic Confirm
- for body of message (text of the message) use semantic text area with AUTO HIGHT
+ voices (upload to the server)
- avatars
- amazon


BUGS:
- audioContext creates new when you switch between chats
- delete user glitch (in console)
- no leading zero in "sent at"


TODO:
2) Requests to join (issued by admin of the chat). (when issuing use Modal). For notifications that received a request use popup.
3) Events on joining/leaving chat.
4) Search chats, use semantic search. Show Modal, when pressed on the chat. Use load icon (<input loading>) during search.
5) Join link: simply if such chat not found do search and press join.
6) Events on join requests.
7) CSS Height of the chat page and its components
8) Home page: use semantic steps create accout > create your chat > join chat others' chats
9) Forms width
10) Avatars for users and chats. (Can use same blob service).
11) vertical align of autoplay button and use CHECKBOX instead of icon
12) enter -> sends messages, other keys for record/sending/etc
13) audio-message validation
14) filters for files! no events!
15) remove user
16) loading progress, use semantic progress
