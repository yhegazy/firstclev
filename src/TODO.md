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
    Created cron jobs for daily scraper and continuous builder -DONE (TEST 1 Success, TEST 2 FAILURE)
    Clean up this TODO file - 

 20210404::
    Cron job failed. Corrected error in crontab. (TEST 3)
    Day/Night Time Switch - Done
        Hours are hard coded between 7a and 8p. 
            TODO: Make it dynamic
            
    Refactored AnnoucementPage. 
        Created Annoucement.js & automated the accordian. 
          For now, this will be done manually, but will really need to build an automated process later.
          Disabled Autocollapse
        
    Clean up table info
        Regex the words views and Streamed out. OUT!! (lol)
   
  */