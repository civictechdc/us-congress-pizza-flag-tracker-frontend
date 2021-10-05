export default function getToken() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.accessToken) {
    return user.accessToken;
  } else {
    return "";
  }
}
