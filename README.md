# Epitech iCal
This project was made for Epitech students, to allow them to get an `iCal` link to their registered events.  
Some similar projects already existed for Google Calendar, but the idea here was to make Apple devices compatible. So I decided to create a link that'll provide you, your events as an `iCal` format.

### Disclaimer
To get your informations, the server needs to authenticate to your intranet account. For this, it'll use your autologin link. This means that **the server will have access to all of your intranet data.**  
Obviously, nothing will be done except to get the information from the calendar, but I preferred to keep you informed.

## How to use ?
Just go on your Epitech intranet. Section "Administration", then go on "Generate autologin link." (*It'll allow the server to get all your events informations.*)  
Copy only the last part of the URL.  
*example: `https://intra.epitech.eu/auth-29az35erty56ui22o` » `auth-29az35erty56ui22o`*  
Now, you can add this part to the `http://intra.mathislebonniec.fr/events/[your-auth-link]`, and this will give you your intranet calendar!

### Use the iCal
* iOS Calendar
  * Go to the Calendar application. Tap "Calendars" at the bottom center. Then "Add subscribed calendar", and fill the input with the previously get URL. Finally, tap to "Subscribe".
* Google Calendar
  * *Coming soon*
