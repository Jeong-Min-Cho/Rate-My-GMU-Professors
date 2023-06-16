function detectBrowserName() {
  const userAgent = navigator.userAgent;

  if (userAgent.includes("Firefox")) {
    return "Firefox";
  } else if (userAgent.includes("Chrome")) {
    return "Chrome";
  } else if (userAgent.includes("Edge")) {
    return "Edge";
  } else {
    return "Unknown";
  }
}

export default detectBrowserName;
