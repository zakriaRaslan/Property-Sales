using HousingApi.Data.Repositories;
using HousingApi.Interfaces;

namespace HousingApi.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AppDbContext _dbContext;

        public UnitOfWork(AppDbContext dbcontext)
        {
            _dbContext = dbcontext;
        }

        public ICityRepository CityRepository =>
            new CityRepository(_dbContext);

        public async Task<bool> SaveAsync()
        {
            return await _dbContext.SaveChangesAsync() > 0;
        }
    }
}
