import json
json_data=[{}]
parsed_json = (json.loads(json_data))
print(json.dumps(parsed_json, indent=4, sort_keys=True))