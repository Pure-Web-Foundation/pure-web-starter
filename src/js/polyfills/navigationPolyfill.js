// import "navigation-polyfill";
// import navigation from "navigation-polyfill";
// window.navigation = navigation;

const checkNavigationInterception = (url) => {
  let interception;
  const navigateEvent = new CustomEvent("navigate");

  navigateEvent.destination = {
    url: url,
  };
  navigateEvent.intercept = (o) => {
    if (o) interception = o;
  };

  window.navigation.dispatchEvent(navigateEvent);

  navigateEvent.intercept();
  if (interception) {
    navigateEvent.interception = interception;
  }
  return navigateEvent;
};

window.navigation = new EventTarget();
const me = this;
document.addEventListener("click", (e) => {
  if (e.target.href) {
    let navigateEvent = checkNavigationInterception(e.target.href);

    if (
      navigateEvent.interception &&
      typeof navigateEvent.interception.handler === "function"
    ) {
      e.preventDefault();
      e.stopPropagation();

      window.history.pushState({}, "", navigateEvent.destination.url);
      navigateEvent.interception.handler.bind(me).call();
      window.addEventListener(
        "popstate",
        (event) => {
          let navigateEvent = checkNavigationInterception(window.location.href);
          if (
            navigateEvent.interception &&
            typeof navigateEvent.interception.handler === "function"
          ) {
            navigateEvent.interception.handler.bind(me).call();
          }
        },
        {
          once: true,
        }
      );
    }
  }
});
