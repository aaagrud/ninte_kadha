import json

def process_browser_history(file_path):
    """
    Reads browsing history from a JSON file and extracts only
    relevant data (title + URL) for AI processing.
    """
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            json_data = json.load(file)
        
        extracted_data = []

        for entry in json_data.get("Browser History", []):
            formatted_entry = {
                "title": entry.get("title", "No Title"),
                "url": entry.get("url", "No URL")
            }
            extracted_data.append(formatted_entry)

        return extracted_data

    except FileNotFoundError:
        print(f"Error: The file '{file_path}' was not found.")
        return []
    except json.JSONDecodeError:
        print(f"Error: The file '{file_path}' is not a valid JSON file.")
        return []