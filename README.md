# First Cleveland Masjid 

A content management system built in the ERA stack. 
(Express, Reactjs, Appwrite)


# For Docker
You will need ot build the frontend directory first prior to running the Dockerfile

<code>#Use a Node 16 base image
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
