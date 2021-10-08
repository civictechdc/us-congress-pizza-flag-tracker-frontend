export const STATUSES = [{
  "id": 1,
  "status_federal_office_code": "HOSS",
  "sequence_num": 1,
  "description": "Constituent request in"
}, {
  "id": 2,
  "status_federal_office_code": "HOSS",
  "sequence_num": 2,
  "description": "HOSS verified as printed and scanned physical QR code"
}, {
  "id": 3,
  "status_federal_office_code": "AOC",
  "sequence_num": 3,
  "description": "AOC received flag from HOSS"
}, {
  "id": 4,
  "status_federal_office_code": "AOC",
  "sequence_num": 4,
  "description": "AOC has flown flag and added certificate"
    // OPTIONAL: date specified vs soon as possible
}, {
  "id": 5,
  "status_federal_office_code": "Mail Services",
  "sequence_num": 5,
  "description": "Mail Services picked up flag from AOC"
}, {
  "id": 6,
  "status_federal_office_code": "STATE",
  "sequence_num": 6,
  "description": "Congressional Staffer received flag"
}, {
  "id": 7,
  "status_federal_office_code": "STATE",
  "sequence_num": 7,
  "description": "Staffer order closed (Flag ready for shipment)"
}, {
  "id": 8,
  "status_federal_office_code": "STATE",
  "sequence_num": 8,
  "description": "Constituent notified"
}, {
  "id": 9,
  "status_federal_office_code": "ALL",
  "sequence_num": 9,
  "description": "Order canceled"
}]

export const ORGCODES = [{  // top most organizational level meta data
  "organization_code": "HOSS"  
}, {
  "organization_code": "AOC"
}, {
  "organization_code": "Mail Services"
}, {
  "organization_code": "STATE"
}, {
  "organization_code": "ADMIN"
}]