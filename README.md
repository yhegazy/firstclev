# First Cleveland Masjid 

<p>بسم الله الرحمن الرحيم</p>

<p>This is a simple content management system built using the ERA (Express, React, Appwrite) stack on Linode. </p> 
<p>The following must be done in this order to avoid Nginx / Traefik SSL miscommunications and issues that neither side is accepting responsibility.</p>
 
 <h5>First, clone the project. We will need to update the appwriteConfig and the index.js files accordingly as described below:</h5>
 
 ```bash
 apt update; apt upgrade
 apt install nodejs npm 
 apt install git
 git clone https://github.com/yhegazy/firstclev.git
```

<p><code>nano frontend/src/appwrite/appwriteConfig.js</code> with correct IP address or domain name</p>
<p><code>nano server/index.js</code> and change the PORT to your choosing. Default is set for 4000</p>

<p>Next, install pm2 and nginx</p>
 ```bash
 apt install nginx
 npm install pm2
```

<p>Afterwards....</p>


 
 
