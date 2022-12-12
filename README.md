## TUIT PROJECT

### GROUP MEMBERS
1. Cesar Guerrero
2. Nidhi Shah
3. Spatika Himanth

### Description
Our group is interested in building the admin feature because we believe access control is an important part of a social networking website. Access control can be achieved when few users have rights to edit and delete while most users have view and create rights. Creating an admin tool helps us achieve different roles and responsibilities. It also provides the application the flexibility to make updates to the system without directly interacting with the database. This feature will ensure that posts and users are under surveillance and are restricted to post, comment on anything that hurts the community. It is a stand-alone feature from the existing system. This feature will help us build and understand the complete application system and connect the front-end, back-end, and database components. 

### Database Design
The database model is created to include few new parameters to differentiate between a user and an admin. It also helps track flagged and blocked tuits along with blocked users.

![img1](../Datamodel.jpg)


### User Stories and Acceptance Criteria

### 1. Add a User
As an administrator, I want to be able to add users so that I can do testing on fake data that I created as well as potentially help real users who are unable to create an account

![img1](../createUser.png)

### 2. Retrieve a User
As an administrator, I want to be able to retrieve a specific user so that I can perform a given task (Update a User, Delete a User, Etc.)

![img1](../findAllUsers.png)


### 3. Update a User
As an administrator, I want to be able to update a user so that I can alter the details associated with their account (Personal Information, Login, Password, Tuits (Content, Flagged Status, Blocked Status), Blocked Status)

![img1](../updateUser.png)
 
### 4. Block a User
As an administrator, I want to be able to block a user so that I can prevent a user who has repeatedly violated the terms of service from interacting with the application. 

![img1](../blockUser.png)

![img1](../unblockUser.png)

### 6. Flag a User’s Tuits
As an administrator, I want to be able to flag specific tuit from a user so that I can make other users aware of potentially false information

![img1](../flagTuit.png)

### 7. Block a User’s Tuits
As an administrator, I want to be able to block a given Tuit from a given user so that I can prevent the spread of violent and/or harmful content.

![img1](../blockTuit.png)