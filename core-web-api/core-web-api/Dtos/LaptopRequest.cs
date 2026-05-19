using System.ComponentModel.DataAnnotations;

namespace core_web_api.Dtos
{
    public class LaptopRequest
    {
        [Required(ErrorMessage = "El nombre es obligatorio.")]
        [RegularExpression(@".*\S.*", ErrorMessage = "El nombre no puede estar vacio.")]
        [StringLength(100, ErrorMessage = "El nombre no puede superar los 100 caracteres.")]
        public required string Name { get; set; }
    }
}
