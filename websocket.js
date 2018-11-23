var websocket = new WebSocket('ws://127.0.0.1:9000')
websocket.onopen = function() {
  setMessageInnerHTML("WebSocket连接成功");
}