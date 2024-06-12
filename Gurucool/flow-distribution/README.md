# Flow Distribution Algorithm

## Overview
This Node.js application distributes users to astrologers in a fair and balanced manner, with the ability to give preference to top astrologers.

## API Endpoints

### Distribute Users
- **URL:** `/astrologers/distribute`
- **Method:** `POST`
- **Payload:**
  ```json
  {
    "users": [
      { "id": 1, "name": "User 1" },
      { "id": 2, "name": "User 2" }
    ]
  }
