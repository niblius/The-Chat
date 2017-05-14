- audio-message validation
- filters for files! no events!
- messages about: left chat, joined chat and so on.
- different rights
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
2) Requests to join (issued by admin of the chat). (when issuing use Modal). For notifications taht received a request use popup
3) Events on joining/leaving chat.
4) Search chats, use semantic search. Show Modal, when pressed on the chat
5) Join link: simply if such chat not found do search and press join.
6) CSS Height of the chat page and its components
7) Home page: use semantic steps create accout > create your chat > join chat others' chats
8) Forms width
9) Avatars for users and chats. (Can use same blob service).
10) vertical align of autoplay button and use CHECKBOX instead of icon
11) enter -> sends messages, other keys for record/sending/etc
12) audio-message validation
13) filters for files! no events!
14) remove user
15) loading progress, use semantic progress
