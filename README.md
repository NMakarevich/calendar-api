# Calendar API
This app is analogue of diary. You can create tasks for selected date.

## How to run
1. Install [Docker](https://www.docker.com/)
2. Clone this repository: ```git clone https://github.com/NMakarevich/calendar-api.git```
3. Move to project folder: ```cd calendar-api```
4. Create in root folder `.env` file and fill it using `.env.example`
5. In terminal enter command: ```docker compose up```

In docker will create containers with REST app (port 3000) and database (port 5432).
Now you can send request to the app by url `http://localhost:3000`

## API endpoints
You can get list of all available endpoints with request examples by [Swagger](http://localhost:3000/api)

### Auth `/auth`
* `POST /signup` - create new user (it's required to first for working with app)
* `POST /login` - login with created user

### User `/user`
* `POST /` - create new user
* `GET /:id` - get user by `id`
* `PATCH /:id/password` - update user password
* `PATCH /:id/photo` - upload user photo
* `PATCH /:id/profile` - update user data
* `DELETE /:id` - delete user with entered `id`

You can insert url for user photo directly in layout using this path `http://localhost:3000/user/photo/%photo_name%`
`photo_name` is stored in `User` entity in field `imageName`

### Task `/task`
* `POST /` - create new task
* `GET /?query` - get all tasks of authorized user. You can use query params (year, month, day) to get tasks for selected year/month/day
* `GET /:id` - get task by `id`
* `PATCH /:id` - update task data
* `DELETE /:id` - delete task with `id`
 