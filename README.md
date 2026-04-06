# Trello Custom API (Apps Script)

Google Apps Script project that wraps the [Trello REST API](https://developer.atlassian.com/cloud/trello/rest/) for boards, lists, cards, checklists, custom fields, labels, members, and actions. Some helpers integrate with a linked **CanvasAPILibrary** (see `appsscript.json`).

## Requirements

- **Google Apps Script** (V8 runtime). Deploy or edit in the Apps Script editor, or sync with [clasp](https://github.com/google/clasp) if you use it.
- **Script properties** (Project Settings → Script properties), used by the API client classes:
  - `SERVICE_TOKEN` — Trello API token  
  - `SERVICE_API_KEY` — Trello API key  

If either is missing, the `ApiCall` / `ApiCallPOST` / `ApiCallPUT` / `ApiCallDELETE` constructors throw a clear error.

## Project layout

| File | Role |
|------|------|
| `appsscript.json` | Manifest (timezone, runtime, library bindings). |
| `APICallGET.js` | GET requests (`ApiCall`). |
| `APICallPOST.js` | POST requests (`ApiCallPOST`). |
| `APICallPUT.js` | PUT requests (`ApiCallPUT`). |
| `APICallDelete.js` | DELETE requests (`ApiCallDELETE`). |
| `ManageBoards.js` | Boards. |
| `ManageLists.js` | Lists. |
| `ManageCards.js` | Cards, attachments, comments. |
| `ManageChecklists.js` | Checklists and items. |
| `ManageCustomFields.js` | Custom fields (uses `CanvasAPILibrary` in places). |
| `ManageLabels.js` | Labels. |
| `ManageMembers.js` | Board members and card membership. |
| `ManageActions.js` | Board / member / card actions. |
| `split-apps-script-export.mjs` | Splits a downloaded Apps Script `.json` export into these files (see below). |

## Splitting a Google Apps Script export

Google’s “download as JSON” bundle is one line with a `files` array. To expand it into separate files in this folder **and delete the bundle** (irreversible for that file):

```bash
node split-apps-script-export.mjs "Your Export Name.json"
```

- With no argument, the script looks for `Testing API Library.json` in the project directory.
- Output names follow Apps Script: `appsscript` → `appsscript.json`, `server_js` → `*.js` (or keeps `*.gs` if the name already ends with `.gs`).

Always keep a backup of the export JSON if you might need it again.

## Local editing

These files are plain JavaScript meant for Apps Script globals (`UrlFetchApp`, `PropertiesService`, etc.). A normal Node run of the modules will not execute without shims; use the Apps Script editor or clasp for running and testing.