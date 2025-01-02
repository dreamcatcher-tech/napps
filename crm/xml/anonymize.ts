/**
 * pseudoAnonymize.ts
 *
 * Example usage:
 *   deno run --allow-read --allow-write pseudoAnonymize.ts short.xml > short_anon.xml
 *
 * If you want to read from standard input instead:
 *   cat short.xml | deno run --allow-read pseudoAnonymize.ts > short_anon.xml
 */

import { DOMParser } from 'https://deno.land/x/deno_dom/deno-dom-wasm.ts'

// ---------------------
// Some helper arrays to produce pseudo-random data
// ---------------------
const randomTitles = ['Mr', 'Mrs', 'Ms', 'Miss', 'Dr']
const randomLastNames = [
  'Smith',
  'Johnson',
  'Taylor',
  'Williams',
  'Brown',
  'Adams',
  'Wilson',
  'Campbell',
  'Anderson',
  'Clark',
  'Morgan',
  'MacDonald',
  'Lee',
  'Walker',
  'Stone',
  'King',
  'Bennett',
  'Young',
  'Reid',
  'Scott',
  'Gray',
  'Wright',
]
const randomFirstNames = [
  'Alex',
  'Sam',
  'Taylor',
  'Jordan',
  'Chris',
  'Casey',
  'Sydney',
  'Morgan',
  'Jamie',
  'Robin',
  'Pat',
  'Charlie',
  'Dana',
  'Reece',
  'Harper',
  'Peyton',
  'Jessie',
  'Drew',
  'Billie',
  'Hayden',
]
const randomStreetNames = [
  'Kingston Street',
  'Rata Avenue',
  'Clyde Street',
  'Bush Road',
  'Lake Road',
  'Victoria Street',
  'Queen Street',
  'Kauri Grove',
  'Totara Place',
  'Tui Road',
  'Tawa Drive',
  'Hilton Place',
  'York Avenue',
  'Claremont Way',
  'Balmoral Lane',
  'Sunrise Street',
]

// Generate a random integer in [min, max]
function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// Make a phone in the format "XXX XXXX" or "XXX XXXX"
function randomPhone(): string {
  const first = randInt(100, 999).toString()
  const second = randInt(1000, 9999).toString()
  return `${first} ${second}`
}

/**
 * Pseudo-randomly offset a postcode by up to ±10.
 * E.g. 3204 could become anything in [3194..3214].
 */
function pseudoNearbyPostcode(originalPostcode: string): string {
  // parse original as number
  const originalNum = parseInt(originalPostcode, 10)
  if (isNaN(originalNum)) {
    // fallback to something in the 3200 range
    return (3200 + randInt(0, 10)).toString()
  }
  const offset = randInt(-10, 10)
  const newCode = originalNum + offset
  // ensure we keep it in a plausible NZ range, but not guaranteed perfect
  return Math.max(3000, Math.min(9999, newCode)).toString()
}

// Generate new name (title + lastName)
function randomFullName(): string {
  const title = randomTitles[randInt(0, randomTitles.length - 1)]
  const lastName = randomLastNames[randInt(0, randomLastNames.length - 1)]
  return `${title} ${lastName}`
}

/**
 * Pseudo-anonymize a <name> element node
 */
function anonymizeNameElement(nameElement: Element) {
  // <name>
  const nameNode = nameElement.querySelector('name')
  if (nameNode && nameNode.textContent) {
    nameNode.textContent = randomFullName()
  }

  // <contact>
  const contactNode = nameElement.querySelector('contact')
  if (contactNode && contactNode.textContent) {
    contactNode.textContent =
      randomFirstNames[randInt(0, randomFirstNames.length - 1)]
  }

  // <address1> but keep <address2> and <address3>
  const address1Node = nameElement.querySelector('address1')
  if (address1Node && address1Node.textContent) {
    const streetNum = randInt(1, 120) // random house number
    const streetName =
      randomStreetNames[randInt(0, randomStreetNames.length - 1)]
    address1Node.textContent = `${streetNum} ${streetName}`
  }

  // <phone>
  const phoneNode = nameElement.querySelector('phone')
  if (phoneNode && phoneNode.textContent) {
    phoneNode.textContent = randomPhone()
  }

  // <postcode>
  const postcodeNode = nameElement.querySelector('postcode')
  if (postcodeNode && postcodeNode.textContent) {
    postcodeNode.textContent = pseudoNearbyPostcode(postcodeNode.textContent)
  }

  // Also update <delivery1> if desired
  // (Often the same as address1)
  const delivery1Node = nameElement.querySelector('delivery1')
  if (delivery1Node && delivery1Node.textContent) {
    const streetNum = randInt(1, 120)
    const streetName =
      randomStreetNames[randInt(0, randomStreetNames.length - 1)]
    delivery1Node.textContent = `${streetNum} ${streetName}`
  }
}

async function readXML(): Promise<string> {
  // If a filename was passed in as first argument, read from file.
  // Otherwise read from stdin.
  const filename = Deno.args[0]
  if (filename) {
    const data = await Deno.readTextFile(filename)
    return data
  } else {
    throw new Error('No filename provided')
  }
}

async function main() {
  const xmlString = await readXML()

  // Parse the XML
  const doc = new DOMParser().parseFromString(xmlString, 'text/xml')
  if (!doc) {
    console.error('Error parsing XML document.')
    Deno.exit(1)
  }

  // Find all <name> elements
  const nameElements = doc.querySelectorAll('name')
  for (const nameEl of nameElements) {
    anonymizeNameElement(nameEl)
  }

  // Output the transformed XML
  // NOTE: The DOMParser from deno_dom does not provide a built-in `serialize()`.
  // We can manually reconstruct or use .outerHTML on the <table> or doc.documentElement.
  // This is a naive approach that might not produce perfect indentation or XML prolog:
  const result = doc.documentElement?.outerHTML ?? ''

  // Print to stdout
  console.log(`<?xml version="1.0"?>`)
  console.log(result)
}

if (import.meta.main) {
  await main()
}
