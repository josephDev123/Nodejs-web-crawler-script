import { Helpers } from "./utils/Helpers";
import * as cheerio from "cheerio";

const args = process.argv.slice(2);

const arg1 = args[0];
const arg2 = args[1];

function crawlPage(baseUrl: string, url: string, memo = {}) {
  const isValidUrl = Helpers.isValidUrl(baseUrl);
  if (!isValidUrl) {
    console.log("invalid url");
    return false;
  }

  const leadingSlash = Helpers.sanitizeUrl(baseUrl, url);
  console.log(`Argument 1: ${leadingSlash}`);
}

crawlPage(arg1!, arg2!);
