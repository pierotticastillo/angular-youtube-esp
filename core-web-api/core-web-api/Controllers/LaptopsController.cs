using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using core_web_api.Dtos;
using core_web_api.Entities;

namespace core_web_api.Controllers
{
    [Route("api/laptops")]
    [ApiController]
    public class LaptopsController : ControllerBase
    {
        private readonly ApplicationDbContext context;

        public LaptopsController(ApplicationDbContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<List<Laptop>> Get()
        {
            return await context.Laptops.AsNoTracking().ToListAsync();
        }

        [HttpGet("{id:int}", Name = "GetLaptopById")]
        public async Task<ActionResult<Laptop>> Get(int id)
        {
            var laptop = await context.Laptops.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
            if (laptop == null)
            {
                return NotFound();
            }
            return laptop;
        }

        [HttpPost]
        public async Task<ActionResult<Laptop>> Post([FromBody] LaptopRequest request)
        {
            var laptopName = request.Name.Trim();
            if (await LaptopNameExists(laptopName))
            {
                return Conflict(new { message = "Ya existe una laptop con ese nombre." });
            }
            var laptop = new Laptop { Name = laptopName };
            context.Add(laptop);
            await context.SaveChangesAsync();
            return CreatedAtRoute("GetLaptopById", new { id = laptop.Id }, laptop);
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, [FromBody] LaptopRequest request)
        {
            var existingLaptop = await context.Laptops.FirstOrDefaultAsync(x => x.Id == id);
            if (existingLaptop == null)
            {
                return NotFound();
            }
            var laptopName = request.Name.Trim();
            if (await LaptopNameExists(laptopName, id))
            {
                return Conflict(new { message = "Ya existe una laptop con ese nombre." });
            }
            existingLaptop.Name = laptopName;
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var deletedRows = await context.Laptops.Where(x => x.Id == id).ExecuteDeleteAsync();
            if (deletedRows == 0)
            {
                return NotFound();
            }

            return NoContent();
        }

        private async Task<bool> LaptopNameExists(string name, int? excludedId = null)
        {
            var normalizedName = name.ToLower();

            return await context.Laptops
                .AsNoTracking()
                .AnyAsync(x => x.Name.Trim().ToLower() == normalizedName && (!excludedId.HasValue || x.Id != excludedId.Value));
        }
    }
}
