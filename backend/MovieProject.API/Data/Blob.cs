using Azure.Storage.Blobs;
using Microsoft.Extensions.Configuration;
using System.IO.Compression;
using System.Threading.Tasks;

public class BlobStorageService
{
    private readonly string _connectionString;
    private readonly string _containerName;
    private readonly string _zipBlobName;

    public BlobStorageService(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("ImgConnection");
        _containerName = "movie-posters"; // Replace with your container name
        _zipBlobName = "Movie Posters.zip"; // Replace with your zip file name
    }

    public async Task<Stream> GetImageFromZipAsync(string imageName)
    {
        BlobServiceClient blobServiceClient = new BlobServiceClient(_connectionString);
        BlobContainerClient containerClient = blobServiceClient.GetBlobContainerClient(_containerName);
        BlobClient blobClient = containerClient.GetBlobClient(_zipBlobName);

        using (Stream zipStream = await blobClient.OpenReadAsync())
        using (ZipArchive archive = new ZipArchive(zipStream, ZipArchiveMode.Read))
        {
            // Try exact match first
            ZipArchiveEntry entry = archive.GetEntry(imageName);

            // If not found, try a more flexible approach
            if (entry == null)
            {
                // Try to find by filename only (ignoring path and case)
                entry = archive.Entries.FirstOrDefault(e =>
                    e.FullName.EndsWith(imageName, StringComparison.OrdinalIgnoreCase) ||
                    e.Name.Equals(imageName, StringComparison.OrdinalIgnoreCase));
            }

            if (entry != null)
            {
                MemoryStream memoryStream = new MemoryStream();
                using (Stream entryStream = entry.Open())
                {
                    await entryStream.CopyToAsync(memoryStream);
                }
                memoryStream.Position = 0;
                return memoryStream;
            }

        }

        return null;
    }


    // Optional: Method to list all images in the zip file
    public async Task<List<string>> ListImagesInZipAsync()
    {
        List<string> imageNames = new List<string>();

        BlobServiceClient blobServiceClient = new BlobServiceClient(_connectionString);
        BlobContainerClient containerClient = blobServiceClient.GetBlobContainerClient(_containerName);
        BlobClient blobClient = containerClient.GetBlobClient(_zipBlobName);

        using (Stream zipStream = await blobClient.OpenReadAsync())
        using (ZipArchive archive = new ZipArchive(zipStream, ZipArchiveMode.Read))
        {
            foreach (ZipArchiveEntry entry in archive.Entries)
            {
                if (entry.Name.EndsWith(".jpg") || entry.Name.EndsWith(".png") ||
                    entry.Name.EndsWith(".jpeg") || entry.Name.EndsWith(".gif"))
                {
                    imageNames.Add(entry.FullName);
                }
            }
        }

        return imageNames;
    }
}
