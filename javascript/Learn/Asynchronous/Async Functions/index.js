// Handling success and errors with async/await
async function getUser() {
  try {
    // Handle success in try
    const response = await fetch("https://api.github.com/users/octocat");
    const data = await response.json();

    console.log(data);
  } catch (error) {
    // Handle error in catch
    console.error(error);
  }
}
