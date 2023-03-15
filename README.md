# fulltimeforce-test

# Installation Steps

1. Clone repository
```
    git clone https://github.com/zezei/fulltimeforce-test.git

```

2. Install npm dependencies for the Ionic/Angular app and also for NestJS app

Note: Node version > 14.2 required
```
    cd fulltimeforce-test
    cd frontend
    npm install
    cd ../backend
    npm install
```

3. Build the ionic app into the NestJS APP public folder

*Note: the angular.json was already modified so it will automatic build the ionic app inside the the ```backend/public``` folder*

```
    cd ../frontend
    npm run build --prod
```

4. Start the nestJS app from the root folder

```
 cd ../backend
 #check if you are on root backend app directory
 npm run start 
```

5. Navigate to http://localhost:3000/home
