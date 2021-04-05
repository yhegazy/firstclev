/* Notes:
  
  
  20210314:: Happy Pi Day! Also, today is DST. What should be 5:50a, is 6:50a. Ugh.
  
  
  20210314-1600:: Finally fixed the css. I need to spruce up the menu, but Thank God it is cleaner.  
  
  20210320-0535:: 
    Auto-collapse navbar - Done
    Contact/Map - Done
    Authentication - OnHold (This part requires a backend as the client-side functionality can be bypassed. For now, manually edit videoID here.)
  
  Janazah Rules - 
  
  TODO: Flask or Django backend for authentication -> Permanent Edit Video page
  
  Salah and Video Bots automated (Video Bot requires selenium. Complex configuration for a measely bot server beyond my comprehension.) - DONE
  
  20210403:: 
  
    HTTPS - DONE
    Server lock down - DONE
    Transfer Domain (firstclevelandmosque.org) -
    Created cron jobs for daily scraper and continuous builder -DONE (TEST 1 PASS, TEST 2 FAILURE)
    Clean up this TODO file - 

 20210404::
    Cron job failed. Corrected error in crontab. (TEST 3 FAILURE, TEST 3.5 PASS)
    Day/Night Time Switch - Done
        Hours are hard coded between 7a and 8p. 
            TODO: Make it dynamic
            
    Refactored AnnoucementPage. 
        Created Annoucement.js & automated the accordian. 
          For now, this will be done manually, but will really need to build an automated process later.
          Disabled Autocollapse
        
    Cleaned up table header and rows. Updated Python script to remove certain keywords.

 20210405::
    Cron job failed yet again. Corrected server time. (TEST 4...)
    Added Qiyam time and Hijra month. Updated python script.

    Created Utilities. This will dynamically set light and dark mode based on fajr and maghreb times.
      TODO: Make it work now.
  */