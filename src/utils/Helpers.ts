export class Helpers {
  static isValidUrl(url: string) {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  }

  static sanitizeUrl(baseUrl: string, url: string) {
    console.log("verifying url");
    try {
      if (url.startsWith("/")) {
        const newUrl = new URL(baseUrl);
        newUrl.pathname = url;
        console.log("concat relative url");
        return newUrl.toString();
      } else if (new URL(url)) {
        return url;
      } else {
        console.log("invalid url");
        return;
      }
    } catch (e) {
      console.log("backwards slash");
      return;
    }
  }
}
