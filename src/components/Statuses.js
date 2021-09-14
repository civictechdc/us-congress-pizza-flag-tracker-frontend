export const STATUSES = [{
  "id": 1,
  "office_code": "HOSS",
  "sequence_num": 1,
  "description": "Constituent request in"
}, {
  "id": 2,
  "office_code": "HOSS",
  "sequence_num": 2,
  "description": "HOSS verified as printed and scanned physical QR code"
}, {
  "id": 3,
  "office_code": "HOSS",
  "sequence_num": 3,
  "description": "Gets flag (physical delivery to AOC)" 
    // should this maintain consistent tense: 
    // "HOSS sent flag to AOC flag office? (physical delivery)"
    // or is it meant to be: 
    // "HOSS gets flag ready for delivery to AOC flag office?"
    // in process "gets" ambiguity vs definitive status:
    // "Flag ready for delivery from HOSS to AOC flag office"
}, {
  "id": 4,
  "office_code": "AOC flag office",
  "sequence_num": 4,
  "description": "office got flag"
    // "AOC flag office received flag from HOSS" -> minimize ambiguity
    // is it worth noting who received the flag for tracking purposes vs PII concerns?
}, /* {
  "id": 5,
    // alternate 5
    // subsequent ids will need to be renumbered if using alternate 5
  "office_code": "AOC flag office",
  "sequence_num": 4.4,
  "description": "AOC flag office has flown flag but not added certificate"
}, {
 "id": 6,
    // alternate 5 "id path"
  "office_code": "AOC flag office",
  "sequence_num": 4.7,
    // it is not intended that 4.4 sequentially leads to 4.7
    // but rather either 4 > 4.4 > 5
    // or instead        4 > 4.7 > 5 
  "description": "AOC flag office has not flown flag but has added certificate"  
}, */
{
  "id": 5,
  "office_code": "AOC flag office",
  "sequence_num": 5,
  "description": "has flown flag/added certificate"
    // AOC flag office has flown flag and added certificate
    // OPTIONAL: date specified vs soon as possible
}, {
  "id": 6,
  "office_code": "Mail Services",
  "sequence_num": 6,
  "description": "picked up from AOC flag office"
    // Mail Services picked up flag from AOC flag office
}, {
  "id": 7,
  "office_code": "[any of congressional offices]",
    // when displayed on frontend, perhaps have frontend use
    // if id < 7 then display statuses.office_code
    // else display order.office_code
  "sequence_num": 7,
  "description": "Staffer gets flag"
    // past vs continuous tense?
    // Congressional Staffer received flag
    // Congressional Office received flag
    // if Staffer, track who received vs PII concern?
}, {
  "id": 8,
  "office_code": "[any of congressional offices]",
  "sequence_num": 8,
  "description": "Staffer order closed (can be: shipped)"
    // Does this imply there's a Staffer who placed the order and therefore belongs to said Staffer?
    // If so, what happens if turn over?
    // if concerned about PII, perhaps:
    // "Flag ready for shipment"
}, {
  "id": 9,
  "office_code": "[any of congressional offices]",
  "sequence_num": 9,
  "description": "Staffer constituent notified"
    // depending on 8's comments, Congressional Office's constituent notified
    // or constituent notified
    //
    // flag goes from
    //   seq_num 8: "(can be: shipped)"
    // to
    //   seq_num 9: "constituent notified"
    //
    // possibly add seq_num 8.5 "flag *actually* shipped"?
}]