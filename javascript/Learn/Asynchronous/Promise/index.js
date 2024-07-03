function getUsers(onSuccess) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Handle resolve and reject in the asynchronous API
      if (onSuccess) {
        resolve([
          { id: 1, name: "Jerry" },
          { id: 2, name: "Elaine" },
          { id: 3, name: "George" },
        ]);
      } else {
        reject("Failed to fetch data!");
      }
    }, 1000);
  });
}
// Run the getUsers function with the false flag to trigger an error
getUsers(false)
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });

// Fetch a user from the GitHub API
fetch("https://api.github.com/users/octocat")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error(error);
  });
