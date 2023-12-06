using System.ComponentModel.DataAnnotations;

namespace HousingApi.Dtos
{
    public class CityDto
    {
        public int Id { get; set; }
        [Required]
        [StringLength(15, MinimumLength = 2, ErrorMessage = "The MinimumLength For Name Is {1} And Max Is {2}")]
        [RegularExpression("^(?=.*[a-zA-Z])(?:[a-zA-Z0-9]+)$", ErrorMessage = "This Name Is Not Valid")]
        public string Name { get; set; }
        [Required]
        public string Country { get; set; }

    }
}
