/**
 * Calls the given callback when the ESC key is pressed, and when
 * the user clicks outside the given element.
 * @param {HTMLElement} element
 * @param {Function} callback
 */
export function autoEscape(element, callback) {
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") callback();
  });
  document.addEventListener("mousedown", (e) => {
    if (!element.contains(e.target)) callback();
  });
}

/**
 * Throttles execution of any function
 * @param {Function} fn - Function to fire
 * @param {Number} timeoutMs - time in milliseconds to buffer all calls to fn.
 */
export function throttle(fn, timeoutMs = 100) {
  let handle;
  return function executedFunction(...args) {
    const fire = () => {
      clearTimeout(handle);
      fn(...args);
    };
    clearTimeout(handle);
    handle = setTimeout(fire, timeoutMs);
  };
}

/**
 * Debounces events that occur repeatedly, such as resize and mousemove events.
 * @param {Function} fn
 */
export function debounce(fn) {
  // This holds the requestAnimationFrame reference, so we can cancel it if we wish
  let frame;

  // The debounce function returns a new function that can receive a variable number of arguments
  return (...params) => {
    // If the frame variable has been defined, clear it now, and queue for next frame
    if (frame) {
      cancelAnimationFrame(frame);
    }

    // Queue our function call for the next frame
    frame = requestAnimationFrame(() => {
      // Call our function and pass any params we received
      fn(...params);
    });
  };
}

/**
 * Tests whether any word in text starts with searchString (case insensitive)
 * @param {String} text
 * @param {String} searchString
 * @returns {Number} position in string, or -1 if not found
 */
export function startsWithWord(text, searchString) {
  const rx = new RegExp("\\b" + searchString, "i");
  const match = text.match(rx);
  return match?.index || -1;
}

/**
 * Truncate string at given length-3 and add '...' when truncated
 * @param {String} str
 * @param {Number} maxLength
 * @returns {String}
 */
export function truncateString(str, maxLength) {
  return str.length > maxLength ? `${str.slice(0, maxLength - 3)}...` : str;
}

export function debug() {
  return ["localhost", "127.0.0.1"].includes(location.hostname);
}

/**
 * Determines whether the request comes from a mobile device using user-agent.
 */
export const isMobile = () =>
  /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

/**
 * Deep-proxifies an object to pass control over access to the given handler
 * @param {Object} object to proxify
 * @param {Object} proxyHandler - as in Proxy class
 * @returns {Object} proxied object
 */
export function deepProxy(obj, proxyHandler = {}) {
  // local function for deep proxying (recursive)
  const proxify = (obj, path = "#") => {
    for (const key of Object.keys(obj)) {
      const type = typeof obj[key];
      if (type === "object" || Array.isArray(obj[key])) {
        const subPath = `${path}/${key}`;
        if (obj[key] != null) obj[key] = proxify(obj[key], subPath);

        const p = path.lastIndexOf("/template");
        if (p !== -1) {
          const localPath = path.substring(0, p);
          obj[key]._parentPath = localPath;
        }
      }
    }

    const internalHandler = {};

    if (proxyHandler.get)
      internalHandler.get = (target, property) => {
        return proxyHandler.get(target, property, path);
      };

    if (proxyHandler.set)
      internalHandler.set = (target, property, value) => {
        return proxyHandler.set(target, property, value, path);
      };

    return new Proxy(obj, internalHandler);
  };

  return proxify(obj);
}

/**
 * Input Template.
 * @type {string}
 */
const inputTemplate = /*html*/ `
<label>
  <span data-label></span>
  <span class="placeholder"></span>
</label>`;

/**
 * Enhance inputs having data-label attribute.
 *
 * @param {HTMLElement|Document|null} root On which root element we should apply it.
 */
export function enhanceInputWithLabel(input) {
  const labelText = input.getAttribute("data-label") ?? "";
  if (labelText.length) {
    const label = parseHTML(inputTemplate)[0];
    const type = input.getAttribute("type") || "text";
    input.insertAdjacentElement("beforebegin", label);
    label.querySelector(".placeholder").replaceWith(input);
    label.querySelector("span[data-label]").textContent = labelText;
    input.removeAttribute("data-label");
    input.setAttribute("type", type);
  }

  const icon = input.getAttribute("data-icon") || "";
  if (icon) {
    const iconColor = input.getAttribute("data-icon-color") || "";
    const iconSize = input.getAttribute("data-icon-size") || "";
    const iconHtml = /*html*/ `<svg-icon icon="${icon}" color="${iconColor}" size="${iconSize}"></svg-icon>`;
    input.insertAdjacentElement("afterend", parseHTML(iconHtml)[0]);
  }
}

/**
 * Matches the beginning of words in a sentence (case-insensitive)
 * @param {String} text text to search
 * @param {String} prefix of words to find
 * @returns { Boolean } true if one or more words in the text start with the prefix
 */
export function matchWordStart(text, prefix) {
  const regex = new RegExp(`\\b(${prefix})\\w*`, "gi");
  return regex.test(text);
}

export function kebabToWords(str) {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Queues a call for when the main thread is free.
 * @param {Function} fn - the function to call
 */
export function enQueue(fn) {
  setTimeout(fn, 0);
}

/**
 * Generates an HTML NodeList by parsing the given HTML string
 * @param {String} html
 * @returns {NodeListOf<ChildNode>} DOM element
 */
export function parseHTML(html) {
  return new DOMParser().parseFromString(html, "text/html").body.childNodes;
}