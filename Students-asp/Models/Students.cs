using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Schsystem.Models
{
    public class Students
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [DisplayName("Guardian Name")]
        public string? Name { get; set; }
        [DisplayName("Guardian Name")]
        public string? GuidanceName { get; set; }
        [DisplayName("Guardian Phone")]
        public int GuidanceNo { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;
    }
}
