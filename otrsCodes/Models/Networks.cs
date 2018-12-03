namespace otrsCodes.Models
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public partial class Networks
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Networks()
        {
            Codes = new HashSet<Codes>();
        }

        public int Id { get; set; }

        public int CountryId { get; set; }

        public int ColorId { get; set; }

        [Required]
        [StringLength(20)]
        public string Name { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Codes> Codes { get; set; }

        public virtual Colors Colors { get; set; }

        public virtual Countries Countries { get; set; }
    }
}
