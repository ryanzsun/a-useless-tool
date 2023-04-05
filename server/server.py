import http.server
import socketserver
import json
import os

PORT = 8000

web_dir = "."
os.chdir(web_dir)

class AjaxHandler(http.server.SimpleHTTPRequestHandler):
    def do_POST(self):
        # Get the length of the incoming request body
        content_length = int(self.headers['Content-Length'])

        # Read the request body
        body = self.rfile.read(content_length)

        # Parse the JSON data
        data = json.loads(body)

        # Handle the request
        if self.path == '/api/image':
            action = data['action']
            imageUrl = data['imageUrl']
            canvasWidth = data['canvasWidth']
            canvasHeight = data['canvasHeight']

            # Implement your own logic here to handle the request based on the action parameter
            if action == 'backward':
                # Handle backward action
                response = {'message': 'Backward action performed','url':'/Front120/F91.jpg'}
            elif action == 'forward':
                # Handle forward action
                response = {'message': 'Forward action performed','url':'/Front120/F92.jpg'}
            elif action == 'edit':
                # Handle edit action
                response = {'message': 'Edit action performed'}
            elif action == 'delete':
                # Handle delete action
                response = {'message': 'Delete action performed'}
            else:
                response = {'message': 'Invalid action'}

        else:
            response = {'message': 'Invalid endpoint'}

        # Send the response
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(response).encode())

    def do_GET(self):
        # Serve the webpage
        if self.path == '/':
            self.path = '/frontend/main.html'
        # if self.path.startswith('/Front120/'):
        #     # Serve image file
        #     try:
        #         print(self.path)
        #         with open(self.path, 'rb') as file:
        #             self.send_response(200)
        #             self.send_header('Content-type', 'image/png')
        #             self.end_headers()
        #             self.wfile.write(file.read())
        #     except FileNotFoundError:
        #         self.send_error(404, 'File not found')
        return http.server.SimpleHTTPRequestHandler.do_GET(self)

# Create the server
with socketserver.TCPServer(("", PORT), AjaxHandler) as httpd:

    print("Serving at port", PORT)

    # Start the server
    httpd.serve_forever()
