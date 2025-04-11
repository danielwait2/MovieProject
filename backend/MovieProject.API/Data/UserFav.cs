using System;
using System.Collections.Generic;

namespace MovieProject.API.Data;

public partial class UserFav
{
    public int? UserId { get; set; }

    public string? ShowId { get; set; }

    public int? Rating { get; set; }
}
