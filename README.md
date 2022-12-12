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

<img width="896" alt="createUser" src="https://user-images.githubusercontent.com/12969516/206975926-9390ab4b-ae03-4336-becf-e787eb832f27.png">


### 2. Retrieve a User
As an administrator, I want to be able to retrieve a specific user so that I can perform a given task (Update a User, Delete a User, Etc.)

<img width="873" alt="findAllUsers" src="https://user-images.githubusercontent.com/12969516/206975971-ddbd6d87-f59d-4b87-9c4e-2f6c559067dd.png">


### 3. Update a User
As an administrator, I want to be able to update a user so that I can alter the details associated with their account (Personal Information, Login, Password, Tuits (Content, Flagged Status, Blocked Status), Blocked Status)

<img width="894" alt="updateUser" src="https://user-images.githubusercontent.com/12969516/206976007-061dfeee-9420-4713-b707-8ff3f8d0da96.png">

 
### 4. Block a User
As an administrator, I want to be able to block a user so that I can prevent a user who has repeatedly violated the terms of service from interacting with the application. 

<img width="897" alt="blockUser" src="https://user-images.githubusercontent.com/12969516/206976023-db93ea30-c9eb-4d39-815e-f2d55dace271.png">

<img width="896" alt="unblockUser" src="https://user-images.githubusercontent.com/12969516/206976038-abff699e-ca40-489f-ba21-8bc5fab35fa8.png">


### 6. Flag a User’s Tuits
As an administrator, I want to be able to flag specific tuit from a user so that I can make other users aware of potentially false information

<img width="906" alt="flagTuit" src="https://user-images.githubusercontent.com/12969516/206976064-376f63d9-98b6-4234-bd62-712704331ceb.png">


### 7. Block a User’s Tuits
As an administrator, I want to be able to block a given Tuit from a given user so that I can prevent the spread of violent and/or harmful content.

<img width="908" alt="blockTuit" src="https://user-images.githubusercontent.com/12969516/206976118-b3f9293b-ca2a-4844-a1ae-f6514891fcb5.png">
