curl -X POST '{backend_url}/admin/products/{id}/options/{option_id}' \
-H 'Authorization: Bearer {api_token}' \
-H 'Content-Type: application/json' \
--data-raw '{
    "title": "Size"
}'
