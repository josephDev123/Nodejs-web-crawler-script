import { Helpers } from "./utils/Helpers";
import * as cheerio from "cheerio";

const args = process.argv.slice(2);

const arg1 = args[0];
const arg2 = args[1];

async function crawlPage(baseUrl: string, url: string, memo = {}) {
  const isValidUrl = Helpers.isValidUrl(baseUrl);
  if (!isValidUrl) {
    console.log("invalid url");
    return false;
  }

  const leadingSlash = Helpers.sanitizeUrl(baseUrl, url);
  console.log(`Argument 1: ${leadingSlash}`);
  console.log("getting html body");
  const htmlBody = await Helpers.getHtmlBody(leadingSlash!);
  // console.log(htmlBody!);
  // console.log(await Helpers.getHtmlBody(leadingSlash!));
  console.log("getting links body");
  const links = await Helpers.getUrlLinksFromHtml(htmlBody!);
  console.log(await Helpers.getUrlLinksFromHtml(htmlBody!));
}

//https://shopping-ecommerce-gamma.vercel.app/

crawlPage(arg1!, arg2!);
