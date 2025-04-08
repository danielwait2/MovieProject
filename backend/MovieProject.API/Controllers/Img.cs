using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class MovieImagesController : ControllerBase
{
    private readonly BlobStorageService _blobStorageService;

    public MovieImagesController(BlobStorageService blobStorageService)
    {
        _blobStorageService = blobStorageService;
    }

    [HttpGet("{imageName}")]
    public async Task<IActionResult> GetImage(string imageName)
    {
        // You might want to sanitize the imageName to prevent path traversal attacks

        var imageStream = await _blobStorageService.GetImageFromZipAsync(imageName);
        if (imageStream == null)
        {
            return NotFound();
        }

        return File(imageStream, "image/jpeg");
        ;
    }

    [HttpGet("list")]
    public async Task<IActionResult> ListImages()
    {
        var images = await _blobStorageService.ListImagesInZipAsync();
        return Ok(images);
    }
}
