# First Cleveland Masjid 

<p>A content management system built in the ERA stack. (Express, Reactjs, Appwrite) </p>

<p>Built on Linode Server</p>
<code>
 apt update; apt upgrade
 apt install git
 git clone https://github.com/yhegazy/firstclev.git
</code>
<p>Update via <i>nano frontend/src/appwrite/appwriteConfig.js</i> with correct IP address or domain name</p>

<p>Update via <i>nano nano server/index.js</i> PORT to 4000</p>
<code>
 apt install nodejs npm 
 apt remove docker docker-engine docker.io
 apt update; apt install apt-transport-https ca-certificates curl gnupg lsb-release
 curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
 echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" |  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
 apt update; apt install docker-ce docker-ce-cli containerd.io
</code>

<p>Ensure docker is enabled and running:
<ul>
 <li>systemctl start docker</li>
 <li>systemctl enable docker</li>
 <li>systemctl enable containerd</li>
</ul>
</p>

<p>Don't forget to install:
 <code>apt install docker-compose</code>
 </p>

<p>Use the appwrite documentation to install.</p>

<p>then, restore:
 <code>docker run --rm --volumes-from "$(docker-compose ps -q appwrite)" -v $PWD/backup:/restore ubuntu bash -c "cd /storage/functions && tar xvf /restore/functions.tar --strip 1"</code>
 
 <code>docker run --rm --volumes-from "$(docker-compose ps -q appwrite)" -v $PWD/backup:/restore ubuntu bash -c "cd /storage/uploads && tar xvf /restore/uploads.tar --strip 1"</code>

</p>
<p>Make sure appwrite is running before going to the next step.</p>


<p>Next, create a Dockerfile in firstclev directory and add the following:</p>

 <code>
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
 </code>
 
 <p>At this point, the frontend directory requires a build and I haven't tested this part yet, so manually build it.</p>
 
<p> Next, add this code to the docker-compose.override.yml file before the traefik section under services:</p>
 
  <code>
   services:
     app:
       image: 'jc21/nginx-proxy-manager:latest'
       restart: unless-stopped
       ports:
         - '8081:80'
         - '81:81'
         - '443:443'
       volumes:
         - ./data:/data
         - ./letsencrypt:/opt/letsencrypt

     server:
       build: ../firstclev/
       container_name: fcm_server
       ports:
         - '4000:4000'
         - '80:4000'
       volumes:
         - ~/firstclev/server:/app
         - /app/node_modules
       networks:
         - gateway
    ...
  </code>

<p>Afterwards, <code>docker-compose -f appwrite/docker-compose.override.yml up -d --remove-orphans</code></p>
 
 
