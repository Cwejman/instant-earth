# Instant Earth
[Legacy] A birthday present for my great father. It's hooks into the Himawari8 satelites webdirectory and view latest realtime image of earth, both infrared and normal images.

### Ingredients
Instant earth is paired to a Node.js server using socket.io. The client app recieves latest http-links from the Himawari8 satelite web directory and displays them in realtime. The user can switch between infrared and normal images. JQuery is used switching between images.

### Images
Normal realtime image

<img src="/readme/normal.png" width=160 height=284 />

Infrared realtime image

<img src="/readme/infrared.png" width=160 height=284 />

### TO DO
* Auto update when new image, instead of restarting app
* Possible add more satelites
* Go back one or two images
