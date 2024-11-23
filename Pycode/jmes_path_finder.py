import json


def generate_jmespath_queries(json_data, current_path=""):
    queries_with_results = []

    if isinstance(json_data, dict):
        for key, value in json_data.items():
            new_path = f"{current_path}.{key}" if current_path else key
            queries_with_results.extend(generate_jmespath_queries(value, new_path))

    elif isinstance(json_data, list):
        for index, item in enumerate(json_data):
            new_path = f"{current_path}[{index}]"
            queries_with_results.extend(generate_jmespath_queries(item, new_path))

    else:
        # Base case: primitive data type (string, number, boolean, etc.)
        queries_with_results.append((current_path, json_data))

    return queries_with_results

def process_json(input_file):
    try:
        # Read and parse JSON data from the file
        with open(input_file, 'r') as infile:
            json_data = json.load(infile)

        # Generate JMESPath queries with their corresponding results
        jmespath_queries_with_results = generate_jmespath_queries(json_data)

        # Print the generated queries with their results
        print("Generated JMESPath Queries with Results:")
        for query, result in jmespath_queries_with_results:
            print(f"{query} = {result}")

        return jmespath_queries_with_results

    except json.JSONDecodeError as e:
        print(f"JSON format error: {e.msg} at line {e.lineno}, column {e.colno}")
        return None

# File name.
input_file = 'json_data_input.json'

# Process the JSON file and generate JMESPath queries with results
process_json(input_file)