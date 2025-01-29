from db_connector import db


def print_collections():
    """Print all collections and their documents in the database, excluding 'fs.chunks'."""
    collections = db.list_collection_names()

    for collection_name in collections:
        if collection_name == "fs.chunks":
            continue  # Skip the fs.chunks collection

        print(f"\n--- Collection: {collection_name} ---")
        collection = db[collection_name]
        documents = list(collection.find())

        if documents:
            for doc in documents:
                doc['_id'] = str(doc['_id'])
                print(doc)
        else:
            print("No documents found.")


if __name__ == "__main__":
    print_collections()
