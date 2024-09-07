import { error } from "console";
import { Helpers } from "./utils/Helpers";
import * as cheerio from "cheerio";

const args = process.argv.slice(2);

const arg1 = args[0];
const arg2 = args[1];

async function crawlPage(
  baseUrl: string,
  url: string,
  memo: { [key: string]: number } = {},
  depth: number = 0, // Add depth to limit recursion
  maxDepth: number = 10 // Define max depth for recursion
) {
  const isValidUrl = Helpers.isValidUrl(baseUrl);
  if (!isValidUrl) {
    console.log("invalid url");
    return memo;
  }

  //base case
  if (depth > maxDepth) {
    return memo;
  }

  const leadingSlash = Helpers.sanitizeUrl(baseUrl, url);
  if (leadingSlash === false) {
    return memo;
  }
  // console.log(`Argument 1: ${leadingSlash}`);
  console.log("getting html body");
  const htmlBody = await Helpers.getHtmlBody(leadingSlash!);
  // console.log(htmlBody!);
  // console.log(await Helpers.getHtmlBody(leadingSlash!));
  console.log("getting links ");
  const links = [...new Set(await Helpers.getUrlLinksFromHtml(htmlBody!))];
  if (!links) {
    return memo;
  }
  // console.log(await Helpers.getUrlLinksFromHtml(htmlBody!));
  for (let link of links) {
    if (memo[link]) {
      memo[link] += 1;
    } else {
      console.log("crawling ....");
      memo[link] = 1;
      await crawlPage(baseUrl, link, memo, depth + 1, maxDepth);
    }
  }
  return memo;
}

//https://shopping-ecommerce-gamma.vercel.app/

crawlPage(arg1!, arg2!)
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
