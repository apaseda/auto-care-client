export const isUserLoggedIn = () => {
  return !!localStorage.getItem("__currentUser");
};
