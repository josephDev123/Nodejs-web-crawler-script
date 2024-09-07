import * as cheerio from "cheerio";
import { link } from "fs";

export class Helpers {
  // constructor(private readonly ) {
  //   // this.cheerio =cheerio
  // }
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
        return false;
      }
    } catch (e) {
      console.log("backwards slash");
      return false;
    }
  }

  static TheSameHostVerify(baseUrl: string, sanitize_url: string) {
    if (new URL(baseUrl).host == new URL(sanitize_url).host) {
      return;
    } else {
      return false;
    }
  }

  static async getHtmlBody(url: string) {
    console.log(url);
    try {
      const response = await fetch(url);

      // Check if the content-type is text/html
      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("text/html")) {
        const html = await response.text();
        return html;
      } else {
        console.log("The content is not HTML.");
        throw new Error("The content is not HTML.");
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }

  static async getUrlLinksFromHtml(html: string) {
    if (!html) {
      return [];
    }
    const $ = cheerio.load(html);
    $.html();
    // Array to store the extracted links
    const linksArray: string[] = [];

    // Iterate over each <a> element and extract the href attribute
    $("a").each((i, link) => {
      const href = $(link).attr("href");
      if (href) {
        linksArray.push(href);
      }
    });

    return linksArray;
  }
}
