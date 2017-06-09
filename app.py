from chalice import Chalice, Response
import datetime
import boto3

app = Chalice(app_name='chalice_helloworld')

client = boto3.client('dynamodb')

@app.route('/', methods=['GET'])
def list():
    response = client.scan( TableName="TweetyComments" )
    
    html = "<html><head><title>TweetyComments</title><style>tbody tr:nth-child(odd) {background: #eee;}</style></head><body><table>"
    
    for item in response['Items']:
        row = "<tr border=''>"
        row += "<td>" + item['content']['S'] + "</td>"
        row += "<td><a href='"+ item['url']['S'] + "'>" + item['url']['S'] + "</a></td>"
        row += "<td><input type='submit' value='Jira' /></td>"        
        row += "<td><input type='submit' value='Done' /></td>"        
        row += "</td>"
        
        html += row
    
    html += "</table></body></html>"
    
    return Response(body=html, status_code=200, headers={'Content-Type': 'text/html'})

@app.route('/store', methods=['POST'], cors=True)
def store():
    comment = app.current_request.json_body
    
    put_item = {
        "url": { "S": comment["url"] },
        "ts": { "N": str( comment["ts"] ) },
        "content": { "S": comment["content"] }
    }
    
    response = client.put_item( TableName="TweetyComments", Item=put_item )
    
    return {}
    
@app.route('/store_duplicates', methods=['POST'], cors=True)
def store_duplicates():
    comment = app.current_request.json_body
    
    put_item = {
        "from": { "S": comment["from"] },
        "to": { "S": comment["to"] },
        "ts": { "N": str( comment["ts"] ) }
    }
    
    response = client.put_item( TableName="TweetyDupes", Item=put_item )
    
    return {}
    
@app.route('/duplicates', methods=['GET'])
def list_duplicates():
    response = client.scan( TableName="TweetyDupes" )
    
    html = "<html><head><title>TweetyDupes</title><style>tbody tr:nth-child(odd) {background: #eee;}</style></head><body><table>"
    
    for item in response['Items']:
        row = "<tr border=''>"
        row += "<td><a href='"+ item['from']['S'] + "'>" + item['from']['S'] + "</a></td>"
        row += "<td><a href='"+ item['to']['S'] + "'>" + item['to']['S'] + "</a></td>"
        row += "<td><input type='submit' value='Jira' /></td>"        
        row += "<td><input type='submit' value='Done' /></td>"        
        row += "</td>"
        
        html += row
    
    html += "</table></body></html>"
    
    return Response(body=html, status_code=200, headers={'Content-Type': 'text/html'})
