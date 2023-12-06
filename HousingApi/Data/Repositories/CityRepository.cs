using Microsoft.EntityFrameworkCore;

namespace HousingApi.Data.Repositories
{
    public class CityRepository : ICityRepository
    {
        private readonly AppDbContext _dbContext;

        public CityRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<City>> GetCitiesAsync()
        {
            var Cities = await _dbContext.Cities.ToListAsync();
            return Cities;
        }
        public void SetCity(City city)
        {
            _dbContext.Cities.Add(city);
        }
        public void DeleteCity(int cityId)
        {
            var city = _dbContext.Cities.Find(cityId);
            if (city != null)
            {
                _dbContext.Cities.Remove(city);
            }
        }

        public void UpdateCity(City city)
        {

        }

        public async Task<City> FindCityAsync(int cityId)
        {
            var city = await _dbContext.Cities.FindAsync(cityId);

            return city;


        }
    }
}
