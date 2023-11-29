import os
import boto3
import logging
import mimetypes
from botocore.exceptions import NoCredentialsError

# Configure logging
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

def upload_files_to_s3(bucket_name, directory):
    """
    Uploads the contents of the specified directory to the given S3 bucket.
    :param bucket_name: Name of the S3 bucket to upload files to.
    :param directory: Directory containing the files to upload.
    """
    # Create an S3 client
    s3_client = boto3.client('s3')
    
    # Check if the directory exists
    if not os.path.isdir(directory):
        logging.error(f"The directory {directory} does not exist.")
        return

    try:
        # Walk through the directory
        for subdir, dirs, files in os.walk(directory):
            for file in files:
                full_path = os.path.join(subdir, file)
                with open(full_path, 'rb') as data:
                    try:
                        # Guess the MIME type of the file
                        content_type = mimetypes.guess_type(full_path)[0] or 'application/octet-stream'
                        # Set the correct content type when uploading the file
                        s3_client.upload_fileobj(data, bucket_name, full_path[len(directory):].lstrip(os.sep), ExtraArgs={'ContentType': content_type})
                        logging.info(f"File {full_path} uploaded to {bucket_name} with content type {content_type}")
                    except NoCredentialsError:
                        logging.error("Credentials not available")
                        return
                    except Exception as e:
                        logging.exception(f"Failed to upload {full_path}: {e}")
    except Exception as e:
        logging.exception(f"An error occurred while processing the directory {directory}: {e}")

if __name__ == '__main__':
    # Define the name of your S3 bucket
    bucket_name = 'smuser.space'
    
    # Define the directory to upload
    directory_to_upload = 'out/'
    
    # Call the function to upload the directory contents to S3
    upload_files_to_s3(bucket_name, directory_to_upload)
