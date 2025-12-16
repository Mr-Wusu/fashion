## About the project

This project is a remake of the nextjs-blews repository. It is mainly for proof of skill!
To overcome the burden of NDA. It is ficticious in terms of names and positions.
Where the nextjs-blews uses Nextjs, clerk (for authentication and authorization) and convex for backend to store images or cloth info in general, this project uses Nextjs, cloudinary for storing images and MongoDB for storing other cloth details including references to the cloudinary images. It is ongoing and has better experience for users in terms of loading states courtesy of React's useActionState used in patnership with Nextjs' server actions! The app has two major end-users: admin and non-admin users; and ui/access/features differs based on the end-user.
For admin access use (or just confirm with app owner):
email:
password:
Admin gets to:
upload clothes and delete them from database (CRUD operations),
receive users' clothes suggestions,
see all orders made by every user,

## Some major concepts/technologies used

- React's useActionState
- Redux Toolkit for global state management.
- NextJs' server actions

## To do's

- Make authentication and authorisation cookies-based.
- Add a reset password feature for users who forgot their password.
- Persist cart to db, such that it reflects the true status of a said user's cart.
- Add feature for making payment for cloth.
- Add feature for receiving cloth suggestions from users.
- Make the navigation ui adapt to mobile screens.
- Also work on the editing feature on clothes for admin account.
