import http.server
import socketserver
import json
import os

PORT = 8000

web_dir=".."
os.chdir(web_dir)

class AjaxHandler(http.server.BaseHTTPRequestHandler):
    def do_POST(self):
        # Get the length of the incoming request body
        content_length = int(self.headers['Content-Length'])

        # Read the request body
        body = self.rfile.read(content_length)

        # Parse the JSON data
        data = json.loads(body)

        # Handle the request
        response = self.handle_ajax_request(data)

        # Send the response
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(response).encode())

    def handle_ajax_request(self, data):
        # Implement your own logic here to handle the AJAX request
        # and return a response in the format that you want
        return {'message': 'Hello, world!'}

# Create the server
# with socketserver.TCPServer(("", PORT), AjaxHandler) as httpd:
with socketserver.TCPServer(("", PORT), http.server.SimpleHTTPRequestHandler) as httpd:

    print("Serving at port", PORT)

    # Start the server
    httpd.serve_forever()
