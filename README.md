# easy-house

# ionic standalone app
This is the second try with for this project, In the first one I go few problems and I gave it a break for to work on another project and then I decided to restart using standalone instead of ngModules. 

# tab1
In the tab1 you can see all ads that you post, at the top there is 3 buttons: bookmarks, create-ad and bookings,

I planned to implement bookmarks but I got short on time so I decided to give proprite to the other 2 buttons.
When you click on the "+" button you go the the cread-ad page where you can fill the form to creade a new ad and you can include up to 5 images, the images cannot be bigger than 1mb due to limitations on Firestore free tier.
The bubblechat button retreaves all the bookings you made.

# tab2
This is the Explorer tab, it shows all ads from all users, you can click in one ad and it will take you to the ad-page of that ad with its datails comming from the database. If the ad has a correct Eircode it will show a map with the house location.

# tab3
The profile tab shows your details and you can edit it including optinal profile pic.

# problems
Sometimes the ad-cards don't load correctly or in time and the page needs to be realoaded.

This app was build to android and many things don't look as the same as in the browser.

# future work
Initially I tried to implement a tab for chats but I couldnt make it, so the booking is a button that sends a message with your user and adId to the DB.
A proper booking system will be implemented in the futere where you will be notifed when someone wants to book a view on your ad and better management of the booking like accepting,
denying, setting date-time, etc.
