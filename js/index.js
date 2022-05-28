function initialize() {
  // Add an event listener whenever the form is submitted
  const form = document.querySelector("#github-form");
  form.addEventListener("submit", e => {
    e.preventDefault();
    fetchUsers(e);
  })
}

function fetchUsers(e) {
  const search = e.target.search.value;
  // Removes all active users
  const userList = document.querySelector("#user-list");
  while (userList.firstChild) {
    userList.removeChild(userList.firstChild)
  }
  
  fetch("https://api.github.com/search/users?q=" + search)
  .then(res => res.json())
  .then(data => Array.from(data.items).forEach(dataPoint => addUserToPage(dataPoint)))
  // .then(data => () => {
  //   
  //   console.log("data logged")
  //   // Adds all users to the page
  //   Array.from(data.items).forEach(user => addUserToPage(user))
  // })
  .catch(error => alert(error));
  e.target.reset();
}

function addUserToPage(user) {
  const li = document.createElement("li");
  li.className = "user_result"
  li.innerHTML = `
  <img src="${user.avatar_url}" class="user_avatar">
  <h3>${user.login}</h3>
  <a href="${user.html_url}">Link to Page</a>
  `
  li.querySelector(".user_avatar").addEventListener("click", () => fetchRepos(user.login))

  document.querySelector("#user-list").appendChild(li);
}

function fetchRepos(user) {
  // First, we want to remove all child nodes if there are any from the repos list
  const repoList = document.querySelector("#repos-list")
  while (repoList.firstChild) {
    repoList.removeChild(repoList.firstChild)
  }
  
  fetch("https://api.github.com/users/" + user + "/repos")
  .then(res => res.json())
  .then(data => data.forEach(repo => addRepoToPage(repo)))
  .catch(error => alert(error))
}

function addRepoToPage(repo) {
  const li = document.createElement("li");
  li.className = "repo_result"
  li.innerHTML = `
  <h3>${repo.name}</h3>
  <a href="${repo.html_url}">Link to Repo</a>
  `
  document.querySelector("#repos-list").appendChild(li);
}

document.addEventListener("DOMContentLoaded", initialize);