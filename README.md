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

<h5>Next, let's install docker:</h5> 

```bash 
 apt remove docker docker-engine docker.io
 apt update; apt install apt-transport-https ca-certificates curl gnupg lsb-release
 curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
 echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" |  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
 apt update; apt install docker-ce docker-ce-cli docker-compose containerd.io
```

<p>Let's ensure that docker is enabled and running:
<code>systemctl start docker; systemctl enable docker; systemctl enable containerd;</code>
</p>

<p>Let's create a <code>Dockerfile</code> in <i>firstclev</i> directory and add the following:</p>

 ```docker
  #Use a Node 16 base image
  FROM node:19-alpine
  #USER root
  RUN mkdir -p fcm/server
  RUN mkdir -p fcm/frontend
  #FRONT END 
  WORKDIR /fcm/frontend
  COPY frontend /fcm/frontend
  RUN npm install -g npm@9.4.2
  RUN npm install
  #BACK END
  WORKDIR /fcm/server
  COPY server/package.json .
  RUN npm install
  COPY server .
  ENV NODE_ENV production
  EXPOSE 4000
  CMD ["node", "index.js"]
  ```
 
 <p>At this point, the frontend directory requires a build and I haven't tested this part yet, so manually build it. Install packages if necessary.</p>
 <p><code>cd ~</code></p> to go back to the root directory. 
 <p>Here we will create the appwrite directory, and we'll build a custom docker-compose.yml file. 


```docker
 
 version: '3'
 services:
   app:
     image: 'jc21/nginx-proxy-manager:latest'
     restart: unless-stopped
     ports:
       - '80:80'
       - '81:81'
       - '443:443'
     volumes:
       - ./data:/data
       - ./letsencrypt:/etc/letsencrypt

   server:
     build: ../firstclev/
     container_name: fcm_server
     ports:
       - '4000:4000'
     volumes:
       - ~/firstclev/server:/app
       - /app/node_modules
 
```

<p>Afterwards, <code>docker-compose -f appwrite/docker-compose.yml up -d --remove-orphans</code></p>

<p>It is important to get Nginx / Nginx Proxy Manager active and running first, appwrite second because (at the time of writing this) traefik and nginx are sharing let's encrypt directory and files and none wants to play nice.(<a href="https://community.traefik.io/t/running-traefik-and-nginx-proxy-manager-on-the-same-server/15573/8">Case in point</a>)</p>


<p>Append appwrite docker-compose.yml information to your docker-compose.yml file.</p>
<p>Lastly,

 ```bash
 docker kill $(docker ps -q)
 docker system prune - a 
 docker compose -f appwrite/docker-compose.yml up -d --remove-orphans --renew-anon-volumes
 ```
 
</p>


<p>Lastly, make sure appwrite is running.</p>


 
 
