import os
import boto3
from botocore.exceptions import NoCredentialsError

def upload_files_to_s3(bucket_name, directory):
    """
    Uploads the contents of the specified directory to the given S3 bucket.
    :param bucket_name: Name of the S3 bucket to upload files to.
    :param directory: Directory containing the files to upload.
    """
    # Create an S3 client
    s3_client = boto3.client('s3')
    
    # Walk through the directory
    for subdir, dirs, files in os.walk(directory):
        for file in files:
            full_path = os.path.join(subdir, file)
            with open(full_path, 'rb') as data:
                try:
                    s3_client.upload_fileobj(data, bucket_name, full_path[len(directory)+1:])
                    print(f"File {full_path} uploaded to {bucket_name}")
                except NoCredentialsError:
                    print("Credentials not available")
                except Exception as e:
                    print(f"Failed to upload {full_path}: {e}")

if __name__ == '__main__':
    # Define the name of your S3 bucket
    bucket_name = 'smuser.space'
    
    # Define the directory to upload
    directory_to_upload = 'out/'
    
    # Call the function to upload the directory contents to S3
    upload_files_to_s3(bucket_name, directory_to_upload)
