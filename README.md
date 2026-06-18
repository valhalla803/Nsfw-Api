```markdown
# NSFW Image Detection API

A lightweight Node.js API built with Express, TensorFlow, and NSFWJS to detect and filter adult content from image URLs.

## Features

* Scans images directly via URL.
* Bypasses basic hotlinking protections using custom User-Agent headers.
* Provides a combined metric (Adult Score) for explicit content.
* Supports customizable sensitivity thresholds per request.
* Clean, minimalist two-file codebase for easy maintenance.

## Requirements

* Node.js (v18 or higher)
* npm

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone [https://github.com/valhalla803/Nsfw-Api.git](https://github.com/valhalla803/Nsfw-Api.git)
   cd Nsfw-Api

```

2. Install dependencies:
```bash
npm install

```


3. Start the server:
```bash
node index.js

```


The server will initialize the model and listen on port 3000.

## API Reference

### Check Image: `/api/check`

* **Method:** `POST`
* **Content-Type:** `application/json`

**Request Body Parameters:**

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `url` | String | Yes | The direct link to the image you want to scan. |
| `threshold` | Number | No | Sensitivity limit (0 to 1). Defaults to `0.5`. Higher means less strict. |

**Example Request (cURL):**

```bash
curl -X POST http://localhost:3000/api/check \
-H "Content-Type: application/json" \
-d '{"url": "[https://example.com/photo.jpg](https://example.com/photo.jpg)", "threshold": 0.6}'

```

## Response Schema

A successful request returns a structured JSON object containing the evaluation state, individual raw probabilities, and final flags.

**Example JSON Response:**

```json
{
  "success": true,
  "url": "[https://example.com/photo.jpg](https://example.com/photo.jpg)",
  "adult_score": 0.9868626780807972,
  "is_adult_content": true,
  "results": [
    {
      "className": "Porn",
      "probability": 0.9630023837089539
    },
    {
      "className": "Sexy",
      "probability": 0.013240032829344273
    },
    {
      "className": "Neutral",
      "probability": 0.013073045760393143
    },
    {
      "className": "Hentai",
      "probability": 0.010620261542499065
    },
    {
      "className": "Drawing",
      "probability": 0.00006434670649468899
    }
  ]
}

```

**Response Fields Explained:**

| Field | Type | Description |
| --- | --- | --- |
| `success` | Boolean | Confirms whether the image was successfully fetched and analyzed. |
| `url` | String | The target image URL that was processed. |
| `adult_score` | Number | The sum of Porn, Hentai, and Sexy probabilities (ranges from 0 to 1). |
| `is_adult_content` | Boolean | Evaluates to `true` if `adult_score` meets or exceeds the specified threshold. |
| `results` | Array | Raw classification outputs directly from the NSFWJS model. |

**Model Classification Categories (className):**

| Category | Description |
| --- | --- |
| **Porn** | Explicit real-world imagery or full nudity. |
| **Sexy** | Suggestive real-world imagery, revealing outfits, or partial nudity. |
| **Hentai** | Explicit anime, manga, or digital illustrations. |
| **Neutral** | Safe, everyday real-world photos (people, landscapes, objects). |
| **Drawing** | Safe digital artwork, paintings, or clean illustrations. |

## Project Structure

```text
nsfw-api/
├── services/
│   └── nsfw.js         # TensorFlow engine initialization and image processing logic
├── index.js            # Express app setup, routing, and HTTP request handling
├── package.json        # Project metadata and npm dependency list
└── .gitignore          # Prevents tracking heavy folders like node_modules

```
