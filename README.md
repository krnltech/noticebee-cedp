# Noticebee CEDP

## For connecting client boards

make a jwt token with the following params.

```json
{
  "boardId": "617146c0180089449dc76d20", //string
  "orgid": "616e5f763722b1c852b6b55a" //string
}
```

connect to <https://ncedp-api.noticebee.com> via a socket.io type connection using a socket.io client. in the connection query params, add token as a query params.

```json
{
  "token": "yourGeneratedToken" //string
}
```

You must also set the transport type to web-socket in the config of your socket.io client.

## <span style="color:red">⚠️WARNING⚠️ You must use a socket.io client. Not a regular websocket client.</span>

## All events to listen

### Update Board

By listening to an event called "updateBoard", returns a parameter called board with boardid in it. If the board matches with the client board id, reload all the assets.

```json
{
  "board": "617146c0180089449dc76d20" //string
}
```

### Send Screenshot

By listening to an event called "sendScreenshot", take a screenshot, upload to the object storage server and then an url will be returned. Use this url and emit it back to the server along with the date, time and board id with the event "currentScreenShot" as a json. This "sendScreenshot" event also returns a board id in json to identify which board should send screenshots.

```json
{
  "time": "time and date string", //string
  "board": "617146c0180089449dc76d20" //string
  "url": "image urll" //string
}
```

### Content Loaded

When a content is loaded, send an emit named "contentLoaded" with the content id, and board id in a json.

```json
{
  "content": "contentId", //string
  "board": "617146c0180089449dc76d20", //string
  "message": "success" //string
}
```

More events will be added soon.
