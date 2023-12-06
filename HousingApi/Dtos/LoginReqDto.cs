using System.ComponentModel.DataAnnotations;

namespace HousingApi.Dtos
{
    public class LoginReqDto
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
