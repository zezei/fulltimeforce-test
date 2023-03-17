# fulltimeforce-test
## Stack used:
- Ionic/Angular as Frontend
- NestJS as Backend

## Development decisions and clarifications:
1. Used a reactive/declarative approach to make code easy to understand and this also helps to improve the performance of Angular applications since change detection on push strategy can be used very effectively.

2. Used Single Component Angular Module (SCAM) approach. This pattern makes easier the migration to higher version of angular that support standalone component and also make the code more clear and reusable.

3. Hardcoded the github endpoint on .env file beacuse it is unlikely to change but is generally not considered a good practice in software development.

4. Errors handling on backend and frontend in case you reach the 60 requests per hour since i am not using the personal access token that increase the request to 5000/hr. You can test this by hitting the refresh button > 60times on the frontend app and you will se the error message.

5. Following branch-per-issue model

# Installation Steps

1. Clone repository
```
    git clone https://github.com/zezei/fulltimeforce-test.git

```

2. Install dependencies for the Ionic/Angular app and also for NestJS app

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

## Contact

If you have any doubt or troubel please feel free to contact me by  [email](mailto:catgolondrinas@gmail.com)