https://docs.google.com/document/d/1_Sx6vgzywbDPfBMFoz72sWtczq9pSrTRO6DWh5XX5xI/edit?usp=sharing

# Steps

# Install newest version of node
can use nvm to quickly change between node versions
- install Dependencies
```
npm install
```

# Add Firebase config 
inside of firebase dir do.
```
touch firebaseConfig.js
```
ask me for the api key n stuff

# Add Backend URL 
- add backend url 
```touch config.js```
```export const GO_IP = 'x';```

# To Run
- Deploy to eas cloud
```
eas update
```
-scan qr code on website

# Tips

-Need to rerun frontend if backend was stopped(backend url will have changed)

-But if frontend is changed you dont need to rerun backend(backend url will be same)
