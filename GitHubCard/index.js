/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/
let res = {};
const cardItem = document.querySelector(".cards");

axios
  .get("https://api.github.com/users/JarenSmart")
  .then(response => {
    res = { ...response.data };
    cardItem.appendChild(gitCard(response.data));
  })
  .catch(err => {
    console.log("There was an error: ", err);
  });

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/
const followersArray = [];

axios
  .get("https://api.github.com/users/JarenSmart/followers")
  .then(response => {
    response.data.forEach(value => {
      followersArray.push(value.login);
      cardItem.appendChild(gitCard(value));
      console.log(value);
    });
  });
followersArray.forEach(value => {
  console.log(value);
});
/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/
console.log(res);
function gitCard(object) {
  //elements
  const card = document.createElement("div");
  const newImg = document.createElement("img");
  const cardInfo = document.createElement("div");
  const name = document.createElement("h3");
  const username = document.createElement("p");
  const location = document.createElement("p");
  const profile = document.createElement("p");
  const followers = document.createElement("p");
  const following = document.createElement("p");
  const bio = document.createElement("p");
  const profileAnchor = document.createElement("a");

  //content
  newImg.src = object.avatar_url;
  name.textContent = object.name || object.login; //TECHNICALLY SHOULD BE 'NAME'
  username.textContent = object.login;
  location.textContent = `Location:  ${object.location ||
    "Could not find location"}`;
  followers.textContent = `Followers: ${object.followers ||
    "Could not find followers"}`;
  following.textContent = `Following: ${object.following ||
    "Could not find following"}`;
  bio.textContent = `Bio: ${object.bio || "Could not find bio"}`;
  profileAnchor.href = `https://api.github.com/users/${object.login}`;

  //classes
  card.classList.add("card");
  cardInfo.classList.add("card-info");
  name.classList.add("name");
  username.classList.add("username");

  //structure and appending to DOM
  card.appendChild(newImg);
  card.appendChild(cardInfo);
  cardInfo.appendChild(name);
  cardInfo.appendChild(username);
  cardInfo.appendChild(location);
  cardInfo.appendChild(profile);
  profile.appendChild(profileAnchor);
  cardInfo.appendChild(followers);
  cardInfo.appendChild(following);
  cardInfo.appendChild(bio);

  return card;
}
/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
